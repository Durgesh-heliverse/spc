// GraphQL utility functions for fetching course schedules

// Fetch extended function with Strapi header
async function fetchExtended(url, options = {}) {
  const defaultHeaders = {
    "Strapi-Response-Format": "v4"
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  const response = await fetch(url, mergedOptions);
  return response;
}

// Get course by slug using GraphQL
async function getCourseBySlug(slug) {
  const GET_COURSES = `query Query($slug: String, $pagination: PaginationArg, $coachesPagination2: PaginationArg) {
  courses(filters: { slug: { eq: $slug } }, pagination: $pagination) {
   data{
    id
    attributes{
     course_schedule{
      data{
        attributes{
          get_schedule_id
          learn_more_coach {
            display_name
            coaches(pagination: $coachesPagination2) {
              get_coach_name
              coachDetails {
                name
                imageInstructor {
                  desktop_image {
                    alternativeText
                    url
                  }
                }
              }
            }
          }
        }
      }
     }
    }
   }
  }
}`;

  const response = await fetch(`https://cms-new.skillbookacademy.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_COURSES,
      variables: {
        slug: slug,
        pagination: {
          limit: 1
        },
        coachesPagination2: {
          limit: 30
        }
      }
    })
  });

  const responseData = await response.json();
  console.log("GraphQL response for getCourseBySlug:", responseData);
  return responseData?.data?.courses;
}

// Get course by city using GraphQL
async function getCourseByCity(slug) {
  const GET_COURSES_City = `query Query($slug: String, $pagination: PaginationArg, $coachesPagination2: PaginationArg) {
  cityBasedCourses(filters: { slug: { eq: $slug } }, pagination: $pagination) {
   data{
    id
    attributes{
     course_schedule{
      data{
        attributes{
          get_schedule_id
          learn_more_coach {
            display_name
            coaches(pagination: $coachesPagination2) {
              get_coach_name
              coachDetails {
                name
                imageInstructor {
                  desktop_image {
                    alternativeText
                    url
                  }
                }
              }
            }
          }
        }
      }
     }
    }
   }
  }
}`;

  const response = await fetch(`https://cms-new.skillbookacademy.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_COURSES_City,
      variables: {
        slug: slug,
        pagination: {
          limit: 1
        },
        coachesPagination2: {
          limit: 30
        }
      }
    })
  });

  const responseData = await response.json();
  console.log("GraphQL response for getCourseByCity:", responseData);
  return responseData?.data?.cityBasedCourses;
}

// Format date helper function
function formatDate(dateString) {
  if (!dateString) return '';
  // Use moment.js to parse date string (same as SessionsRow.jsx)
  // Moment treats date-only strings (YYYY-MM-DD) as local dates without timezone conversion
  const date = moment(dateString);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const month = months[date.month()]; // moment uses 0-11 for months
  const day = date.date(); // moment uses date() instead of getDate()
  const dayName = date.format('ddd'); // moment format for day name
  
  return {
    month: month,
    day: day,
    dayName: dayName
  };
}

// Moment helper function - EXACT copy from SessionsRow.jsx
// This uses moment-timezone to convert times exactly like the widget does
function Moment(value, format, timezone) {
  if (!value || !timezone) return '';
  // Use moment-timezone exactly like SessionsRow.jsx does
  // moment(value, "hh:mm a") parses the time, .tz(timezone) converts to timezone, .format(format) formats it
  return moment(value, "hh:mm a").tz(timezone).format(format);
}

// Fetch and populate first course schedule
async function populateFirstCourseSchedule(slug, paramTimeZone) {
  try {
    if (!slug) {
      console.log("Slug not found");
      return;
    }

    // Fetch course data
    const [timeZoneResponse, cityData, coursesData] = await Promise.all([
      fetch("https://geo.skillbookacademy.com/api/my-location"),
      getCourseByCity(slug),
      getCourseBySlug(slug),
    ]);

    const timeZoneData = await timeZoneResponse.json();
    
    console.log("City data:", cityData);
    console.log("Courses data:", coursesData);
    
    // Determine whether to use city data or course data
    // Check if cityData has data array with length > 0, otherwise use coursesData
    let fetchedData = (cityData?.data && cityData.data.length > 0) ? cityData : coursesData;
    
    console.log("Fetched data:", fetchedData);
    
    // Get schedule ID and learn_more_coach - handle both array and object structures
    let scheduleId = null;
    let learnMoreCoach = null;
    
    if (fetchedData?.data && Array.isArray(fetchedData.data) && fetchedData.data.length > 0) {
      const firstItem = fetchedData.data[0];
      const scheduleAttrs = firstItem?.attributes?.course_schedule?.data?.attributes;
      
      if (scheduleAttrs) {
        scheduleId = scheduleAttrs.get_schedule_id || null;
        learnMoreCoach = scheduleAttrs.learn_more_coach || null;
      }
    } else if (Array.isArray(fetchedData) && fetchedData.length > 0) {
      const firstItem = fetchedData[0];
      const scheduleAttrs = firstItem?.data?.attributes?.course_schedule?.data?.attributes || 
                           firstItem?.attributes?.course_schedule?.data?.attributes;
      
      if (scheduleAttrs) {
        scheduleId = scheduleAttrs.get_schedule_id || null;
        learnMoreCoach = scheduleAttrs.learn_more_coach || null;
      }
    }
    
    console.log("Schedule ID extracted:", scheduleId);
    console.log("Learn more coach data:", learnMoreCoach);
    
    if (!scheduleId) {
      console.error("Schedule ID not found!");
      return;
    }

    // Fetch schedules data
    const schedulesResponse = await fetchExtended(
      `https://cms-new.skillbookacademy.com/api/get-schedules?course_id=${scheduleId}&prod=true`
    );
    const schedulesData = await schedulesResponse.json();

    if (!schedulesData?.data || schedulesData.data.length === 0) {
      console.log("No schedule data available");
      return;
    }

    // Filter upcoming schedules
    let upcomingSchedules = schedulesData.data
      .filter(item => item.is_upcoming !== "No" && item.show_hide !== "Hide");

    // Filter by timezone if paramTimeZone is provided
    if (paramTimeZone) {
      const timeZones = paramTimeZone.split(',').map(tz => tz.trim());
      upcomingSchedules = upcomingSchedules.filter(item => {
        return timeZones.includes(item.timezone_name);
      });
    }

    // Sort by start date
    upcomingSchedules.sort((a, b) => {
      return new Date(a.start_date) - new Date(b.start_date);
    });

    if (upcomingSchedules.length === 0) {
      console.log("No upcoming schedules");
      return;
    }

    // Get first schedule
    const firstSchedule = upcomingSchedules[0];
    console.log("First schedule data:", firstSchedule);

    // Populate HTML - ensure DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log("DOM loaded, populating schedule HTML");
        populateScheduleHTML(firstSchedule, learnMoreCoach, timeZoneData);
        populateMobileSessionHTML(firstSchedule, learnMoreCoach, timeZoneData);
      });
    } else {
      console.log("DOM already ready, populating schedule HTML");
      // Use setTimeout to ensure elements are available
      setTimeout(() => {
        populateScheduleHTML(firstSchedule, learnMoreCoach, timeZoneData);
        populateMobileSessionHTML(firstSchedule, learnMoreCoach, timeZoneData);
      }, 100);
    }

  } catch (error) {
    console.error("Error fetching schedule data:", error);
  }
}

// Get instructor data matching logic (same as SessionsRow.jsx)
// Only show instructors if there's an exact match with get_coach_name
// Match the full instructor_name string exactly - don't split and match individual names
function getInstructorData(event, learnMoreCoach) {
  const instructors = [];

  if (learnMoreCoach?.coaches && event?.instructor_name) {
    // Match the full instructor_name string exactly with get_coach_name
    const fullInstructorName = event.instructor_name.trim();
    const normalizedFullName = fullInstructorName.toLowerCase().replace(/ /g, "");
    
    // Find exact match with full string only
    const foundCoach = learnMoreCoach.coaches.find(
      (coach) =>
        coach?.get_coach_name?.toLowerCase().replace(/ /g, "") === normalizedFullName
    );

    // Only add instructors if there's an exact match with get_coach_name
    if (foundCoach && foundCoach.coachDetails && foundCoach.coachDetails.length > 0) {
      // Add ALL coachDetails from this matched coach
      foundCoach.coachDetails.forEach((coachDetail) => {
        const imageUrl = coachDetail.imageInstructor?.desktop_image?.url || event.instructor_image || "";
        instructors.push({
          name: coachDetail.name,
          image: imageUrl
        });
      });
    }
    // If no exact match found, don't add anything (only show if matched)
  }

  // Filter out instructors with no valid name
  const validInstructors = instructors.filter(instructor => 
    instructor?.name && instructor.name.trim() !== ""
  );

  return validInstructors;
}

// Populate HTML with schedule data
function populateScheduleHTML(firstSchedule, learnMoreCoach, timeZoneData, retryCount = 0) {
  console.log("populateScheduleHTML called with:", firstSchedule, "retry:", retryCount);
  
  const monthEl = document.querySelector('.ns-month');
  const daysEl = document.querySelector('.ns-days');
  const weekEl = document.querySelector('.ns-week');
  const timeEl = document.querySelector('.ns-time');
  const trainersEl = document.querySelector('.ns-trainers');

  console.log("Found elements:", {
    monthEl: !!monthEl,
    daysEl: !!daysEl,
    weekEl: !!weekEl,
    timeEl: !!timeEl,
    trainersEl: !!trainersEl
  });

  // Retry if elements not found (max 5 retries)
  if (!monthEl && retryCount < 5) {
    console.log("Elements not found, retrying in 200ms...");
      setTimeout(() => {
        populateScheduleHTML(firstSchedule, learnMoreCoach, timeZoneData, retryCount + 1);
      }, 200);
      return;
    }

  if (!firstSchedule) {
    console.log("No schedule data provided");
    return;
  }

  if (!monthEl || !daysEl || !weekEl || !timeEl || !trainersEl) {
    console.error("Required DOM elements not found after retries");
    return;
  }

  if (firstSchedule.start_date) {
    const startDate = formatDate(firstSchedule.start_date);
    const endDate = firstSchedule.end_date ? formatDate(firstSchedule.end_date) : null;
    
    console.log("Setting date:", { startDate, endDate });
    
    if (monthEl) {
      monthEl.textContent = startDate.month;
      monthEl.classList.remove('loading-skeleton-text');
      console.log("Month set to:", startDate.month);
    }
    if (daysEl) {
      if (endDate && endDate.day !== startDate.day) {
        daysEl.textContent = `${startDate.day}-${endDate.day}`;
        console.log("Days set to:", `${startDate.day}-${endDate.day}`);
      } else {
        daysEl.textContent = startDate.day;
        console.log("Days set to:", startDate.day);
      }
      daysEl.classList.remove('loading-skeleton-text');
    }
    if (weekEl) {
      const endDayName = endDate ? formatDate(firstSchedule.end_date).dayName : null;
      if (endDayName && endDayName !== startDate.dayName) {
        weekEl.textContent = `${startDate.dayName} - ${endDayName}`;
        console.log("Week set to:", `${startDate.dayName} - ${endDayName}`);
      } else {
        weekEl.textContent = startDate.dayName;
        console.log("Week set to:", startDate.dayName);
      }
      weekEl.classList.remove('loading-skeleton-text');
    }
  } else {
    console.log("No start_date in schedule");
  }

  if (firstSchedule.start_time && firstSchedule.end_time) {
    // Use EXACT same logic as SessionsRow.jsx
    // Set moment default timezone (same as SessionsRow)
    moment.tz.setDefault("America/New_York");
    
    // Get local timezone (same as SessionsRow)
    const localTz = moment.tz.guess(true);
    const timezoneOffset = new Date().getTimezoneOffset();
    
    // Get timezone zone name from timeZoneData (same as SessionsRow gets from timezone?.timezone?.name)
    const zone = timeZoneData?.timezone?.name || null;
    
    // Get timezone code/abbreviation (same as SessionsRow)
    // SessionsRow uses: code ? code : moment.tz.zone(localTz)?.abbr(timezoneOffset)
    let code = timeZoneData?.timezone?.abbreviation || null;
    if (!code) {
      code = moment.tz.zone(localTz)?.abbr(timezoneOffset);
    }
    
    // Check if both times have same AM/PM (EXACT logic from SessionsRow.jsx line 205-206)
    const startAMPM = Moment(firstSchedule.start_time, "A", zone ? zone : localTz);
    const endAMPM = Moment(firstSchedule.end_time, "A", zone ? zone : localTz);
    const sameAMPM = startAMPM === endAMPM;
    
    // Format time string - EXACT format from SessionsRow.jsx lines 205-224
    let timeText = '';
    if (sameAMPM) {
      // Same AM/PM - format like SessionsRow line 208-210
      if (zone) {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm", zone)} - `;
      } else {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", localTz)} - `;
      }
    } else {
      // Different AM/PM - format like SessionsRow line 214-216
      if (zone) {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", zone)} - `;
      } else {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", localTz)} - `;
      }
    }
    
    // Add end time (SessionsRow line 219-221)
    if (zone) {
      timeText += `${Moment(firstSchedule.end_time, "hh:mm A", zone)} `;
    } else {
      timeText += `${Moment(firstSchedule.end_time, "hh:mm A", localTz)} `;
    }
    
    // Add timezone abbreviation (SessionsRow line 223)
    timeText += code ? code : moment.tz.zone(localTz)?.abbr(timezoneOffset);
    
    console.log("Setting time:", { 
      originalStart: firstSchedule.start_time,
      originalEnd: firstSchedule.end_time,
      zone: zone,
      localTz: localTz,
      code: code,
      sameAMPM: sameAMPM,
      timeText: timeText
    });
    
    if (timeEl) {
      // Clear any hardcoded content first
      timeEl.textContent = '';
      timeEl.innerHTML = '';
      
      // Set the new time
      timeEl.textContent = timeText;
      timeEl.classList.remove('loading-skeleton-text');
      
      // Force update - sometimes need to trigger reflow
      timeEl.style.display = 'none';
      void timeEl.offsetHeight; // Trigger reflow
      timeEl.style.display = '';
      
      console.log("Time successfully set to:", timeText);
      console.log("Time element after setting:", timeEl.textContent);
      console.log("Time element innerHTML:", timeEl.innerHTML);
    } else {
      console.error("Time element (.ns-time) not found!");
      // Try to find it again
      const timeElRetry = document.querySelector('.ns-time');
      if (timeElRetry) {
        console.log("Found time element on retry, setting value...");
        timeElRetry.textContent = timeText;
      }
    }
  } else {
    console.log("No start_time or end_time in schedule");
  }

  // Populate instructors if available - using same logic as SessionsRow.jsx
  if (trainersEl && firstSchedule.instructor_name) {
    console.log("Setting instructors:", firstSchedule.instructor_name);
    trainersEl.innerHTML = '';
    
    // Get instructor data using learn_more_coach matching
    const instructors = getInstructorData(firstSchedule, learnMoreCoach);
    
    console.log("Instructor data after matching:", instructors);
    
    // Show up to 2 instructors
    instructors.slice(0, 2).forEach((instructor) => {
      const trainerDiv = document.createElement('div');
      trainerDiv.className = 'ns-trainer';
      
      // Only show image if it exists and is valid
      if (instructor.image && instructor.image.trim() !== '') {
        trainerDiv.innerHTML = `
          <img src="${instructor.image}" alt="${instructor.name}" onerror="this.style.display='none'" />
          <span>${instructor.name}</span>
        `;
      } else {
        // No image, just show name
        trainerDiv.innerHTML = `
          <span>${instructor.name}</span>
        `;
      }
      
      trainersEl.appendChild(trainerDiv);
      console.log("Added instructor:", instructor.name, "with image:", instructor.image ? 'yes' : 'no');
    });
  } else {
    console.log("No instructor_name in schedule or trainersEl not found");
  }

  // Update register button link if available
  const registerBtn = document.querySelector('.ns-btn-primary');
  if (registerBtn) {
    const registerUrl = firstSchedule.register_url || firstSchedule.registration_url;
    if (registerUrl) {
      registerBtn.onclick = () => {
        window.open(registerUrl, '_blank');
      };
      // Also make it a link for accessibility
      registerBtn.style.cursor = 'pointer';
    }
    // Remove loading skeleton and restore button content
    registerBtn.classList.remove('loading-skeleton-button');
    if (!registerBtn.querySelector('img')) {
      registerBtn.innerHTML = 'Register <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/fi_507257_2_1aec358d9a.svg" alt="">';
    }
  }
  
  // Update view all dates button
  const viewAllBtn = document.querySelector('.ns-btn-ghost');
  if (viewAllBtn) {
    viewAllBtn.classList.remove('loading-skeleton-button');
    if (!viewAllBtn.querySelector('img')) {
      viewAllBtn.innerHTML = 'View all dates <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Layer_93_6da3d19c24.svg" alt="">';
    }
  }

  // Remove loading state from next session card now that data is populated
  const nextSessionCard = document.getElementById('nextSessionCard');
  if (nextSessionCard) {
    nextSessionCard.classList.remove('loading');
  }

  // Update floating CTA date
  const floatingCtaDate = document.querySelector('.floating-cta-date');
  if (floatingCtaDate && firstSchedule.start_date) {
    // Use moment.js to parse dates (same as SessionsRow.jsx) to avoid timezone issues
    const startDate = moment(firstSchedule.start_date);
    const endDate = firstSchedule.end_date ? moment(firstSchedule.end_date) : null;
    
    let formattedDate = '';
    if (endDate && !endDate.isSame(startDate, 'day')) {
      // Same month and year
      if (startDate.month() === endDate.month() && startDate.year() === endDate.year()) {
        formattedDate = `${startDate.format('MMMM')} ${startDate.date()}-${endDate.date()}, ${startDate.year()}`;
      } 
      // Different months, same year
      else if (startDate.year() === endDate.year()) {
        formattedDate = `${startDate.format('MMMM')} ${startDate.date()} - ${endDate.format('MMMM')} ${endDate.date()}, ${startDate.year()}`;
      }
      // Different years
      else {
        formattedDate = `${startDate.format('MMMM')} ${startDate.date()}, ${startDate.year()} - ${endDate.format('MMMM')} ${endDate.date()}, ${endDate.year()}`;
      }
    } else {
      // Single date
      formattedDate = `${startDate.format('MMMM')} ${startDate.date()}, ${startDate.year()}`;
    }
    
    floatingCtaDate.textContent = formattedDate;
    
    // Let IntersectionObserver handle visibility based on scroll position
    // Check if course section is in view before showing floating CTA
    // Only show on desktop devices (width > 1024px)
    const floatingCta = document.querySelector('#floating-cta');
    const courseSection = document.querySelector('.course-display-google-landing');
    const isDesktop = window.innerWidth > 1024;
    
    if (floatingCta && formattedDate && courseSection) {
      // Hide on mobile/tablet
      if (!isDesktop) {
        floatingCta.style.setProperty('display', 'none', 'important');
        return;
      }

      // Check if course section is currently in view
      const rect = courseSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView) {
        // Course section is out of view - show floating CTA (desktop only)
        floatingCta.style.setProperty('display', 'block', 'important');
      } else {
        // Course section is in view - keep floating CTA hidden
        floatingCta.style.setProperty('display', 'none', 'important');
      }
    }
  }
}

// Populate mobile session HTML with schedule data
function populateMobileSessionHTML(firstSchedule, learnMoreCoach, timeZoneData, retryCount = 0) {
  console.log("populateMobileSessionHTML called with:", firstSchedule, "retry:", retryCount);
  
  const mobileHeaderDate = document.querySelector('.mobile-session-header-date');
  const mobileMonth = document.querySelector('.mobile-session-date-month');
  const mobileDays = document.querySelector('.mobile-session-date-days');
  const mobileWeekdays = document.querySelector('.mobile-session-date-weekdays');
  const mobileTime = document.querySelector('.mobile-session-time');
  const mobileDuration = document.querySelector('.mobile-session-duration');
  const mobileInstructorNames = document.querySelector('.mobile-session-instructor-names');
  const mobileAvatars = document.querySelectorAll('.mobile-session-avatar-img');
  const mobileRegisterBtn = document.querySelector('.mobile-session-register-btn');

  // Retry if elements not found (max 5 retries)
  if (!mobileMonth && retryCount < 5) {
    console.log("Mobile elements not found, retrying in 200ms...");
    setTimeout(() => {
      populateMobileSessionHTML(firstSchedule, learnMoreCoach, timeZoneData, retryCount + 1);
    }, 200);
    return;
  }

  if (!firstSchedule) {
    console.log("No schedule data provided for mobile");
    return;
  }

  // Populate header date (e.g., "23 AUG - 25 AUG")
  if (mobileHeaderDate && firstSchedule.start_date) {
    const startDate = formatDate(firstSchedule.start_date);
    const endDate = firstSchedule.end_date ? formatDate(firstSchedule.end_date) : null;
    
    if (endDate && endDate.day !== startDate.day) {
      mobileHeaderDate.textContent = `${startDate.day} ${startDate.month} - ${endDate.day} ${endDate.month}`;
    } else {
      mobileHeaderDate.textContent = `${startDate.day} ${startDate.month}`;
    }
  }

  // Populate date block
  if (firstSchedule.start_date) {
    const startDate = formatDate(firstSchedule.start_date);
    const endDate = firstSchedule.end_date ? formatDate(firstSchedule.end_date) : null;
    
    if (mobileMonth) {
      mobileMonth.textContent = startDate.month;
    }
    if (mobileDays) {
      if (endDate && endDate.day !== startDate.day) {
        mobileDays.textContent = `${startDate.day}-${endDate.day}`;
      } else {
        mobileDays.textContent = startDate.day;
      }
    }
    if (mobileWeekdays) {
      const endDayName = endDate ? formatDate(firstSchedule.end_date).dayName : null;
      if (endDayName && endDayName !== startDate.dayName) {
        mobileWeekdays.textContent = `${startDate.dayName} - ${endDayName}`;
      } else {
        mobileWeekdays.textContent = startDate.dayName;
      }
    }
  }

  // Populate time and duration
  if (firstSchedule.start_time && firstSchedule.end_time) {
    moment.tz.setDefault("America/New_York");
    const localTz = moment.tz.guess(true);
    const timezoneOffset = new Date().getTimezoneOffset();
    const zone = timeZoneData?.timezone?.name || null;
    
    let code = timeZoneData?.timezone?.abbreviation || null;
    if (!code) {
      code = moment.tz.zone(localTz)?.abbr(timezoneOffset);
    }
    
    const startAMPM = Moment(firstSchedule.start_time, "A", zone ? zone : localTz);
    const endAMPM = Moment(firstSchedule.end_time, "A", zone ? zone : localTz);
    const sameAMPM = startAMPM === endAMPM;
    
    let timeText = '';
    if (sameAMPM) {
      if (zone) {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm", zone)} - `;
      } else {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", localTz)} - `;
      }
    } else {
      if (zone) {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", zone)} - `;
      } else {
        timeText = `${Moment(firstSchedule.start_time, "hh:mm A", localTz)} - `;
      }
    }
    
    if (zone) {
      timeText += `${Moment(firstSchedule.end_time, "hh:mm A", zone)} `;
    } else {
      timeText += `${Moment(firstSchedule.end_time, "hh:mm A", localTz)} `;
    }
    
    timeText += code ? code : moment.tz.zone(localTz)?.abbr(timezoneOffset);
    
    if (mobileTime) {
      mobileTime.textContent = timeText;
    }
  }

  // Calculate and populate duration
  if (firstSchedule.start_date && mobileDuration) {
    const startDate = moment(firstSchedule.start_date);
    const endDate = firstSchedule.end_date ? moment(firstSchedule.end_date) : startDate;
    const duration = endDate.diff(startDate, 'day') + 1;
    mobileDuration.textContent = `${duration} ${duration === 1 ? 'Day' : 'Days'}`;
  }

  // Populate instructors
  if (firstSchedule.instructor_name && learnMoreCoach) {
    const instructors = getInstructorData(firstSchedule, learnMoreCoach);
    
    // Update instructor names
    if (mobileInstructorNames && instructors.length > 0) {
      const names = instructors.map(inst => inst.name).join(' & ');
      mobileInstructorNames.textContent = names;
    }
    
    // Update avatar images (up to 2)
    if (mobileAvatars && mobileAvatars.length > 0) {
      instructors.slice(0, 2).forEach((instructor, idx) => {
        if (mobileAvatars[idx] && instructor.image && instructor.image.trim() !== '') {
          mobileAvatars[idx].src = instructor.image;
          mobileAvatars[idx].alt = instructor.name;
          mobileAvatars[idx].onerror = function() {
            this.style.display = 'none';
          };
        }
      });
    }
  }

  // Update register button
  if (mobileRegisterBtn) {
    const registerUrl = firstSchedule.register_url || firstSchedule.registration_url;
    if (registerUrl) {
      mobileRegisterBtn.onclick = () => {
        window.open(registerUrl, '_blank');
      };
      mobileRegisterBtn.style.cursor = 'pointer';
    }
  }
}

