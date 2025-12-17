// Date Component - Vanilla JavaScript Implementation
// Based on date-widget project

// Fetch utility
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

// GraphQL Queries
async function getCourseBySlug(slug) {
  const GET_COURSES = `query Query($slug: String, $pagination: PaginationArg, $readMoreCoachPagination2: PaginationArg ,$coachesPagination2: PaginationArg ,$testimonialsPagination2: PaginationArg ,$credImagesPagination2: PaginationArg ,$imagesPagination2: PaginationArg, $infoListCardPagination2: PaginationArg) {
  courses(filters: { slug: { eq: $slug } }, pagination: $pagination) {
   data{
    id
    attributes{
     course_schedule{
      data{
        attributes{
          get_schedule_id
          filter_category{
            data{
              attributes{
                category
              }
            }
          }
          read_more_coach(pagination: $readMoreCoachPagination2){
            about
            get_coach_name
            highlight_images{
              desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
              mobile_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }
             image{
              desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
              mobile_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }
            position
            read_more_instructors{
              about
                desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }

          }
          learn_more_coach {
            display_name
            coaches(pagination: $coachesPagination2) {
              get_coach_name
              coachDetails {
                name
                position
                imageInstructor {
                  desktop_image {
                    alternativeText
                    url
                  }
                }
                about
                testimonials(pagination: $testimonialsPagination2) {
                  name
                  time
                  image {
                    desktop_image {
                      alternativeText
                      url
                    }
                  }
                  rating
                  text
                }
                credentials {
                  name
                  cred_images(pagination: $credImagesPagination2) {
                    desktop_image {
                      alternativeText
                      url
                    }
                  }
                }
                images(pagination: $imagesPagination2) {
                  desktop_image {
                    url
                    alternativeText
                  }
                }
              }
            }
          }

          studentEnrolled{
          student
          studentText

          }
          difficultyItems {
          image{
          desktop_image{
            url
            alternativeText
          }
          }
          difficultyText
          }
          infoListCard(pagination: $infoListCardPagination2) {
            image {
              desktop_image {
                alternativeText
                url
              }
            }
            text
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
        pagination: { limit: 100 },
        readMoreCoachPagination2: { limit: 100 },
        coachesPagination2: { limit: 30 },
        testimonialsPagination2: { limit: 20 },
        credImagesPagination2: { limit: 50 },
        imagesPagination2: { limit: 30 },
        infoListCardPagination2: { limit: 15 }
      }
    })
  });
  
  const { data } = await response.json();
  return data?.courses;
}

async function getCourseByCity(slug) {
  const GET_COURSES_City = `query Query($slug: String, $pagination: PaginationArg, $readMoreCoachPagination2: PaginationArg, $coachesPagination2: PaginationArg, $testimonialsPagination2: PaginationArg, $credImagesPagination2: PaginationArg, $imagesPagination2: PaginationArg, $infoListCardPagination2: PaginationArg) {
  cityBasedCourses(filters: { slug: { eq: $slug } }, pagination: $pagination) {
   data{
    id
    attributes{
     course_schedule{
      data{
        attributes{
          get_schedule_id
          filter_category{
            data{
              attributes{
                category
              }
            }
          }
          read_more_coach(pagination: $readMoreCoachPagination2){
            about
            get_coach_name
            highlight_images{
              desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
              mobile_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }
             image{
              desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
              mobile_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }
            position
            read_more_instructors{
              about
                desktop_image{
                data{
                  attributes{
                    url
                    alternativeText
                  }
                }
              }
            }

          }
          learn_more_coach {
            display_name
            coaches(pagination: $coachesPagination2) {
              get_coach_name
              coachDetails {
                name
                position
                imageInstructor {
                  desktop_image {
                    alternativeText
                    url
                  }
                }
                about
                testimonials(pagination: $testimonialsPagination2) {
                  name
                  time
                  image {
                    desktop_image {
                      alternativeText
                      url
                    }
                  }
                  rating
                  text
                }
                credentials {
                  name
                  cred_images(pagination: $credImagesPagination2) {
                    desktop_image {
                      alternativeText
                      url
                    }
                  }
                }
                images(pagination: $imagesPagination2) {
                  desktop_image {
                    url
                    alternativeText
                  }
                }
              }
            }
          }
          studentEnrolled{
            student
            studentText
          }
          difficultyItems {
            image{
              desktop_image{
                url
                alternativeText
              }
            }
            difficultyText
          }
          infoListCard(pagination: $infoListCardPagination2) {
            image {
              desktop_image {
                alternativeText
                url
              }
            }
            text
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
        pagination: { limit: 100 },
        readMoreCoachPagination2: { limit: 100 },
        coachesPagination2: { limit: 30 },
        testimonialsPagination2: { limit: 20 },
        credImagesPagination2: { limit: 50 },
        imagesPagination2: { limit: 30 },
        infoListCardPagination2: { limit: 15 }
      }
    })
  });
  
  const { data } = await response.json();
  return data?.cityBasedCourses;
}

// Main Date Component Initialization
(function() {
  const container = document.querySelector('.showing-spc-highlights-widget-main-courses');
  if (!container) return;

  // Check for required URL parameters (classidusd or classidcad)
  function getUrlParams() {
    if (typeof window === 'undefined') return { classidusd: null, classidcad: null };
    const urlParams = new URLSearchParams(window.location.search);
    return {
      classidusd: urlParams.get('classidusd'),
      classidcad: urlParams.get('classidcad')
    };
  }

  // Immediately hide floating CTA if classid exists or section is visible (run before anything else)
  (function hideFloatingCtaIfClassId() {
    const urlParams = getUrlParams();
    const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
    const sectionVisible = container && 
      container.style.display !== 'none' && 
      window.getComputedStyle(container).display !== 'none';
    
    if (hasClassId || sectionVisible) {
      const floatingCta = document.querySelector('#floating-cta');
      if (floatingCta) {
        floatingCta.style.setProperty('display', 'none', 'important');
      }
    }
  })();

  // Function to handle layout changes based on section visibility and classid params
  function handleLayoutChanges() {
    const courseWrapper = document.querySelector('.vi-course-main-wrapper');
    const courseDisplay2Flex = document.querySelector('.course-display-2-flex');
    const courseDisplayLFlex = document.querySelector('.course-display-l-flex');
    const floatingCta = document.querySelector('#floating-cta');

    // Check URL params
    const urlParams = getUrlParams();
    const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
    
    // Check if section is visible (not display: none)
    const sectionVisible = container && 
      container.style.display !== 'none' && 
      window.getComputedStyle(container).display !== 'none';
    
    // Condition 1: If section is hidden OR no classid params, make .vi-course-main-wrapper full width
    if (!hasClassId || !sectionVisible) {
      if (courseWrapper) {
        courseWrapper.style.width = '100%';
      }
    } else {
      // Reset to original width when section is visible and has classid
      if (courseWrapper) {
        courseWrapper.style.width = '65%';
      }
    }

    // Condition 2a: Hide floating CTA when classid params are present OR section is visible
    if (hasClassId || sectionVisible) {
      if (floatingCta) {
        floatingCta.style.display = 'none';
        // Use important to override any other styles that might show it
        floatingCta.style.setProperty('display', 'none', 'important');
      }
    } else {
      // Show floating CTA only when no classid AND section is hidden
      if (floatingCta) {
        floatingCta.style.removeProperty('display');
      }
    }

    // Condition 2b: If section is visible OR has classid params, hide .course-display-2-flex
    if (hasClassId || sectionVisible) {
      if (courseDisplay2Flex) {
        courseDisplay2Flex.style.display = 'none';
      }
    } else {
      // Show it when section is hidden and no classid
      if (courseDisplay2Flex) {
        courseDisplay2Flex.style.display = '';
      }
    }

    // Condition 3: If section is visible OR has classid params, make .course-display-l-flex full width
    if (hasClassId || sectionVisible) {
      if (courseDisplayLFlex) {
        courseDisplayLFlex.style.width = '100%';
      }
    } else {
      // Reset to original width when section is hidden and no classid
      if (courseDisplayLFlex) {
        courseDisplayLFlex.style.width = '';
      }
    }
  }

  const urlParams = getUrlParams();
  const hasRequiredParams = !!(urlParams.classidusd || urlParams.classidcad);

  // Hide mobile-tablet-session-section when classid is present
  const mobileSessionSection = document.getElementById('mobileSessionSection');
  if (mobileSessionSection && hasRequiredParams) {
    mobileSessionSection.style.display = 'none';
  }

  // Hide floating section if no classid params
  const floatingSectionWrapper = document.querySelector('.widget-ffc-floating-section-1-main-wrapper');
  if (floatingSectionWrapper && !hasRequiredParams) {
    floatingSectionWrapper.style.display = 'none';
  }

  // Hide container if required parameters are not present
  if (!hasRequiredParams) {
    container.style.display = 'none';
    // Apply layout changes when section is hidden
    handleLayoutChanges();
    return;
  }

  // Show container if parameters are present
  container.style.display = 'block';
  // Apply layout changes when section is visible
  handleLayoutChanges();

  const slug = 'safe-practice-consultant-certification-training';
  const paramTimeZone = null; // Can be set from URL or config
  const maxItems = 10;

  async function initDateComponent() {
    try {
      // Fetch timezone and messages
      const [timeZoneResponse, messagesResponse, cityData, coursesData] = await Promise.all([
        fetch("https://geo.skillbookacademy.com/api/my-location"),
        fetch(`https://cms-new.skillbookacademy.com/api/schedule-message?publicationState=preview&pLevel=5`),
        getCourseByCity(slug),
        getCourseBySlug(slug),
      ]);

      const [timeZoneData, messagesData] = await Promise.all([
        timeZoneResponse.json(),
        messagesResponse.json(),
      ]);

      // Determine which data to use
      let fetchedData = cityData?.length > 0 ? cityData : coursesData;
      if (!fetchedData || fetchedData.length === 0) {
        console.error('No course data found');
        return;
      }

      // Get schedule ID
      const scheduleId = fetchedData[0]?.data?.attributes?.course_schedule?.data?.attributes?.get_schedule_id || null;
      if (!scheduleId) {
        console.error('Schedule ID not found');
        return;
      }

      // Fetch schedules
      const schedulesResponse = await fetchExtended(
        `https://cms-new.skillbookacademy.com/api/get-schedules?course_id=${scheduleId}&prod=true`
      );
      const schedulesData = await schedulesResponse.json();

      if (!schedulesData?.data || schedulesData.data.length === 0) {
        console.error('No schedule data available');
        return;
      }

      // Filter and process schedules
      const filteredCategory = fetchedData[0]?.data?.attributes?.course_schedule?.data?.attributes?.filter_category?.data?.attributes?.category || null;
      
      let original_data = schedulesData.data
        .filter(item => item.is_upcoming !== "No" && item.show_hide !== "Hide")
        .filter((item) => {
          if (timeZoneData?.currency?.currency_code === "CAD") {
            return item?.currency === "CAD";
          } else if (timeZoneData?.currency?.currency_code === "AUD") {
            return item?.currency === "AUD";
          } else {
            return item.currency === "USD";
          }
        });

      // Location based filtering
      let filtered_data = filteredCategory?.trim()?.toLowerCase() === "safe"
        ? original_data.filter((item) => {
            const tzAbbr = timeZoneData?.timezone?.abbreviation;
            if (["EST", "EDT", "CST", "CDT"].includes(tzAbbr)) {
              return item?.timezone_name === "Eastern Time" || item?.timezone_name === "Pacific Time";
            } else if (["MST", "MDT", "PST", "PDT"].includes(tzAbbr)) {
              return item?.timezone_name === "Pacific Time";
            } else if (["AWST", "ACWST", "ACST", "AEST", "LHST", "ACDT", "AEDT", "LHDT"].includes(tzAbbr)) {
              return item?.timezone_name === "Australian Eastern Time";
            } else {
              return true;
            }
          })
        : original_data;

      // Filter by paramTimeZone if provided
      if (paramTimeZone) {
        const timeZones = paramTimeZone.split(',').map(tz => tz.trim());
        filtered_data = filtered_data.filter(item => timeZones.includes(item.timezone_name));
      }

      // Sort by start date
      filtered_data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

      // Find active schedule from URL params (classidusd or classidcad)
      let firstSchedule = null;
      
      if (urlParams.classidusd || urlParams.classidcad) {
        const classid = urlParams.classidusd || urlParams.classidcad;
        firstSchedule = original_data.find((item) => {
          const itemId = item.id?.toString();
          const itemSlug = item.slug?.toString();
          return (itemId === classid) || (itemSlug === classid);
        });
      }
      
      // Fallback to first schedule from filtered data or lowest price
      if (!firstSchedule) {
        const dataCopy = [...original_data];
        const lowPriceCourse = dataCopy.sort((a, b) => (a.discount_price || a.price || 0) - (b.discount_price || b.price || 0));
        firstSchedule = filtered_data[0] || lowPriceCourse[0];
      }

      if (!firstSchedule || !firstSchedule.start_date) {
        console.error('No valid schedule found with start_date');
        container.style.display = 'none';
        // Apply layout changes when section is hidden
        handleLayoutChanges();
        return;
      }

      // Get schedule attributes
      const scheduleAttributes = fetchedData[0]?.data?.attributes?.course_schedule?.data?.attributes || null;
      const learnMoreCoach = scheduleAttributes?.learn_more_coach || null;
      const readMoreCoach = scheduleAttributes?.read_more_coach || null;
      const infoListCard = scheduleAttributes?.infoListCard || null;

      // Render DateBox component
      renderDateBox(firstSchedule, timeZoneData, learnMoreCoach, readMoreCoach, infoListCard);
      
      // Apply layout changes after rendering
      setTimeout(() => {
        handleLayoutChanges();
      }, 100);
    } catch (error) {
      console.error('Error initializing date component:', error);
      // Apply layout changes even on error
      handleLayoutChanges();
    }
  }

  function renderDateBox(event, timeZoneData, learnMoreCoach, readMoreCoach, infoListCard) {
    if (!event) return;

    // Only render if we have required date data
    if (!event.start_date) {
      console.error('No start_date found in event data');
      return;
    }

    // Debug: Log learnMoreCoach data to help troubleshoot
    console.log('learnMoreCoach data:', learnMoreCoach);
    console.log('event.instructor_name:', event.instructor_name);

    // Format dates using moment - parse as date-only to avoid timezone issues
    // Extract date part only (YYYY-MM-DD) to prevent timezone conversion
    const startDateStr = event.start_date ? event.start_date.split('T')[0].split(' ')[0] : null;
    const endDateStr = event.end_date ? event.end_date.split('T')[0].split(' ')[0] : null;
    
    // Parse as local date (same as SessionsRow.jsx behavior)
    const startDate = startDateStr ? moment(startDateStr, 'YYYY-MM-DD') : null;
    const endDate = endDateStr ? moment(endDateStr, 'YYYY-MM-DD') : null;
    
    if (!startDate) {
      console.error('Invalid start_date:', event.start_date);
      return;
    }
    
    const monthLabel = startDate.format('MMM').toUpperCase();
    const startDay = startDate.format('DD');
    const endDay = endDate ? endDate.format('DD') : startDay;
    const startDayName = startDate.format('ddd');
    const endDayName = endDate ? endDate.format('ddd') : startDayName;
    
    const duration = endDate ? endDate.diff(startDate, 'day') + 1 : 1;

    // Format time
    const localTz = moment.tz.guess(true);
    const timezoneOffset = new Date().getTimezoneOffset();
    moment.tz.setDefault("America/New_York");
    
    const zone = timeZoneData?.timezone?.name || localTz;
    const code = timeZoneData?.timezone?.abbreviation || moment.tz.zone(localTz)?.abbr(timezoneOffset) || '';
    
    const Moment = (value, format, timezone) => {
      return timezone && moment(value, "hh:mm a").tz(timezone).format(format);
    };

    // Only show time if both start_time and end_time exist
    let timeText = '';
    if (event.start_time && event.end_time) {
      const startAMPM = Moment(event.start_time, "A", zone);
      const endAMPM = Moment(event.end_time, "A", zone);
      const sameAMPM = startAMPM === endAMPM;
      
      const startFormatted = sameAMPM 
        ? (zone ? Moment(event.start_time, "hh:mm", zone) : Moment(event.start_time, "hh:mm A", localTz))
        : (zone ? Moment(event.start_time, "hh:mm A", zone) : Moment(event.start_time, "hh:mm A", localTz));
      
      const endFormatted = zone 
        ? Moment(event.end_time, "hh:mm A", zone)
        : Moment(event.end_time, "hh:mm A", localTz);
      
      if (startFormatted && endFormatted) {
        timeText = `${startFormatted} - ${endFormatted} ${code || ''}`.trim();
      }
    }

    // Get instructor data
    const instructors = [];
    if (learnMoreCoach?.coaches && event?.instructor_name) {
      const fullInstructorName = event.instructor_name.trim();
      const normalizedFullName = fullInstructorName.toLowerCase().replace(/ /g, "");
      
      const foundCoach = learnMoreCoach.coaches.find(
        (coach) => coach?.get_coach_name?.toLowerCase().replace(/ /g, "") === normalizedFullName
      );

      if (foundCoach && foundCoach.coachDetails && foundCoach.coachDetails.length > 0) {
        foundCoach.coachDetails.forEach((coachDetail) => {
          const imageUrl = coachDetail.imageInstructor?.desktop_image?.url || event.instructor_image || "";
          instructors.push({
            name: coachDetail.name,
            image: imageUrl
          });
        });
      }
    }

    const instructorNames = instructors.map(inst => inst.name).join(", ");

    // Check if learn more is available
    const hasLearnMoreData = () => {
      if (!learnMoreCoach?.coaches) {
        console.log('hasLearnMoreData: No learnMoreCoach.coaches');
        return false;
      }
      if (!event?.instructor_name) {
        console.log('hasLearnMoreData: No event.instructor_name');
        return false;
      }
      
      const fullInstructorName = event.instructor_name.trim();
      const normalizedFullName = fullInstructorName.toLowerCase().replace(/ /g, "");
      
      console.log('hasLearnMoreData: Looking for instructor:', normalizedFullName);
      console.log('hasLearnMoreData: Available coaches:', learnMoreCoach.coaches.map(c => c?.get_coach_name));
      
      const foundCoach = learnMoreCoach.coaches.find(
        (coach) => {
          const coachName = coach?.get_coach_name?.toLowerCase().replace(/ /g, "");
          return coachName === normalizedFullName;
        }
      );
      
      if (foundCoach) {
        console.log('hasLearnMoreData: Found coach:', foundCoach);
        console.log('hasLearnMoreData: coachDetails length:', foundCoach.coachDetails?.length);
      } else {
        console.log('hasLearnMoreData: No matching coach found');
      }
      
      const result = foundCoach && foundCoach.coachDetails && foundCoach.coachDetails.length > 0;
      console.log('hasLearnMoreData: Result:', result);
      return result;
    };

    const learnMoreEnabled = hasLearnMoreData();
    console.log('learnMoreEnabled:', learnMoreEnabled);

    // Create HTML
    const dateBoxHTML = `
      <div class="dateBox">
        <div class="selectedDateSection">
          <span class="selectedDateLabel">SELECTED DATE</span>
          <div class="dateContainer">
            <div class="monthLabel">${monthLabel}</div>
            <div class="dateNumbersContainer">
              <span class="dateNumbers">${startDay}${endDay !== startDay ? `-${endDay}` : ''}</span>
              <span class="daysLabel">${startDayName} - ${endDayName}</span>
            </div>
          </div>

          <div class="timeSection">
            <div class="durationContainer">
              <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Clock_2_39941c5334.svg" alt="Time" width="20" height="20" />
              <span class="durationText">${duration} ${duration === 1 ? 'Day' : 'Days'}</span>
            </div>

            ${timeText ? `
              <div class="timeContainer">
                <span class="timeText">${timeText}</span>
              </div>
            ` : ''}
          </div>
        </div>

        ${(instructors.length > 0 || learnMoreEnabled) ? `
          <div class="instructorSection">
            <div class="instructorRow">
              ${instructors.length > 0 ? `
                <div class="instructorContainer">
                  ${instructors.some(inst => inst.image) ? `
                    <div class="instructorAvatars" style="min-width: ${40 + (instructors.filter(inst => inst.image).length - 1) * 18}px; position: relative; height: 40px;">
                      ${instructors.filter(inst => inst.image).map((instructor, idx) => `
                        <img src="${instructor.image}" alt="${instructor.name}" class="instructorAvatar" style="position: absolute; top: 0; left: ${idx * 18}px; width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; object-fit: cover; z-index: ${10 - idx};" />
                      `).join('')}
                    </div>
                  ` : ''}
                  
                  <div class="instructorNameContainer">
                    <span class="instructorLabel">Instructor${instructors.length > 1 ? 's' : ''}:</span>
                    <span class="instructorName">${instructorNames}</span>
                  </div>
                </div>
              ` : ''}
              
              ${learnMoreEnabled ? `
                <button class="showMoreButton" id="showMoreBtn">
                  <span id="showMoreText">Show more</span>
                  <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_03689db857.svg" alt="Show more" width="18" height="18" class="showMoreIcon" id="showMoreIcon" />
                </button>
              ` : ''}
            </div>
            
            <div class="expandedContent" id="expandedContent" style="display: none;">
              <!-- Highlights will be rendered here -->
            </div>
          </div>
        ` : ''}

        ${(event?.discount_price || event?.price) ? `
          <div class="pricingSection">
            ${event?.discount_price && event?.retail_price && event.discount_price < event.retail_price && event?.sale_status_description ? `
              <span class="saleBadge">${event.sale_status_description}</span>
            ` : ''}
            <div class="priceContainer">
              <div class="priceTextWrap">
                ${event?.currency && (event?.discount_price || event?.price) ? `
                  <span class="currentPrice">${event.currency} ${event?.discount_price || event?.price}</span>
                ` : ''}
                ${event?.retail_price && event.discount_price && event.retail_price > event.discount_price && event?.currency ? `
                  <span class="originalPrice">${event.currency} ${event.retail_price}</span>
                ` : ''}
              </div>
              ${event?.register_url ? `
                <a href="${event.register_url}" class="registerButtonMobile">
                  <button class="registerButtonMobileBtn">
                    ${event?.is_sold_out === "Yes" ? "JOIN WAITLIST" : "Register"}
                  </button>
                </a>
            ` : ''}
            </div>
            <p class="priceDescription">Includes - All exam, certification and membership fees</p>
          </div>
        ` : ''}

        ${infoListCard && infoListCard.length > 0 ? `
          <div class="featuresSection" id="featuresSection">
            ${infoListCard.map((feature) => {
              if (!feature.text) return '';
              const imageUrl = feature.image?.desktop_image?.url;
              return `
                <div class="featureItem">
                  ${imageUrl ? `<img src="${imageUrl}" alt="${feature.image?.desktop_image?.alternativeText || feature.text}" width="20" height="20" />` : ''}
                  <span class="featureText">${feature.text}</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        ${event?.register_url ? `
          <div class="registerButtonContainer">
            <a href="${event.register_url}">
              <button class="registerButton">
                ${event?.is_sold_out === "Yes" ? "JOIN WAITLIST" : "Register"}
              </button>
            </a>
          </div>
        ` : ''}
      </div>
    `;

    container.innerHTML = dateBoxHTML;

    // Create mobile version of dateBoxHTML (without SELECTED DATE label and register button)
    const dateBoxHTMLMobile = `
      <div class="dateBox">
        <div class="selectedDateSection">
          <div class="dateContainer">
            <div class="monthLabel">${monthLabel}</div>
            <div class="dateNumbersContainer">
              <span class="dateNumbers">${startDay}${endDay !== startDay ? `-${endDay}` : ''}</span>
              <span class="daysLabel">${startDayName} - ${endDayName}</span>
            </div>
          </div>

          <div class="timeSection">
            <div class="durationContainer">
              <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Clock_2_39941c5334.svg" alt="Time" width="20" height="20" />
              <span class="durationText">${duration} ${duration === 1 ? 'Day' : 'Days'}</span>
            </div>

            ${timeText ? `
              <div class="timeContainer">
                <span class="timeText">${timeText}</span>
              </div>
            ` : ''}
          </div>
        </div>

        ${(instructors.length > 0 || learnMoreEnabled) ? `
          <div class="instructorSection">
            <div class="instructorRow">
              ${instructors.length > 0 ? `
                <div class="instructorContainer">
                  ${instructors.some(inst => inst.image) ? `
                    <div class="instructorAvatars" style="min-width: ${40 + (instructors.filter(inst => inst.image).length - 1) * 18}px; position: relative; height: 40px;">
                      ${instructors.filter(inst => inst.image).map((instructor, idx) => `
                        <img src="${instructor.image}" alt="${instructor.name}" class="instructorAvatar" style="position: absolute; top: 0; left: ${idx * 18}px; width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; object-fit: cover; z-index: ${10 - idx};" />
                      `).join('')}
                    </div>
                  ` : ''}
                  
                  <div class="instructorNameContainer">
                    <span class="instructorLabel">Instructor${instructors.length > 1 ? 's' : ''}:</span>
                    <span class="instructorName">${instructorNames}</span>
                  </div>
                </div>
              ` : ''}
              
              ${learnMoreEnabled ? `
                <button class="showMoreButton" id="showMoreBtnMobile">
                  <span id="showMoreTextMobile">Show more</span>
                  <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_03689db857.svg" alt="Show more" width="18" height="18" class="showMoreIcon" id="showMoreIconMobile" />
                </button>
              ` : ''}
            </div>
            
            <div class="expandedContent" id="expandedContentMobile" style="display: none;">
              <!-- Highlights will be rendered here -->
            </div>
          </div>
        ` : ''}

        ${(event?.discount_price || event?.price) ? `
          <div class="pricingSection">
            ${event?.discount_price && event?.retail_price && event.discount_price < event.retail_price && event?.sale_status_description ? `
              <span class="saleBadge">${event.sale_status_description}</span>
            ` : ''}
            <div class="priceContainer">
              <div class="priceTextWrap">
                ${event?.currency && (event?.discount_price || event?.price) ? `
                  <span class="currentPrice">${event.currency} ${event?.discount_price || event?.price}</span>
                ` : ''}
                ${event?.retail_price && event.discount_price && event.retail_price > event.discount_price && event?.currency ? `
                  <span class="originalPrice">${event.currency} ${event.retail_price}</span>
                ` : ''}
              </div>
            </div>
            <p class="priceDescription">Includes - All exam, certification and membership fees</p>
          </div>
        ` : ''}

        ${infoListCard && infoListCard.length > 0 ? `
          <div class="featuresSection" id="featuresSectionMobile">
            ${infoListCard.map((feature) => {
              if (!feature.text) return '';
              const imageUrl = feature.image?.desktop_image?.url;
              return `
                <div class="featureItem">
                  ${imageUrl ? `<img src="${imageUrl}" alt="${feature.image?.desktop_image?.alternativeText || feature.text}" width="20" height="20" />` : ''}
                  <span class="featureText">${feature.text}</span>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Create floating container for when section goes out of view
    createFloatingDateContainer(event, timeZoneData, learnMoreCoach, readMoreCoach, infoListCard, instructors, monthLabel, startDay, endDay, startDayName, endDayName, duration, timeText, code);

    // Populate mobile/tablet floating section (pass the dateBoxHTMLMobile for expanded view)
    populateMobileFloatingSection(event, monthLabel, startDay, endDay, startDayName, endDayName, duration, timeText, code, dateBoxHTMLMobile, learnMoreCoach, readMoreCoach, infoListCard);

    // Add IntersectionObserver to show/hide floating container
    setupFloatingContainerObserver(container);

    // Add event listeners
    if (learnMoreEnabled) {
      const showMoreBtn = document.getElementById('showMoreBtn');
      const expandedContent = document.getElementById('expandedContent');
      const showMoreText = document.getElementById('showMoreText');
      const showMoreIcon = document.getElementById('showMoreIcon');
      const featuresSection = document.getElementById('featuresSection');
      
      if (!showMoreBtn || !expandedContent || !showMoreText || !showMoreIcon) {
        console.error('Show more button elements not found');
        return;
      }
      
      let isExpanded = false;
      
      showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        expandedContent.style.display = isExpanded ? 'block' : 'none';
        
        // Only hide features section if it exists
        if (featuresSection) {
          // Check if screen is tablet or phone (max-width: 800px)
          const isTabletOrPhone = window.matchMedia('(max-width: 800px)').matches;
          if (isTabletOrPhone) {
            // Always hide featuresSection on tablet/phone
            featuresSection.style.display = 'none';
          } else {
            // On desktop, show/hide based on expanded state
          featuresSection.style.display = isExpanded ? 'none' : 'block';
          }
        }
        
        showMoreText.textContent = isExpanded ? 'Show less' : 'Show more';
        showMoreIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        
        if (isExpanded) {
          // Render Highlights component if not already rendered
          if (!expandedContent.querySelector('.highlights')) {
            console.log('Rendering Highlights for desktop:', {
              hasEvent: !!event,
              hasInstructorName: !!event?.instructor_name,
              instructorName: event?.instructor_name,
              hasLearnMoreCoach: !!learnMoreCoach,
              hasCoaches: !!learnMoreCoach?.coaches,
              coachesCount: learnMoreCoach?.coaches?.length || 0
            });
            renderHighlights(event, learnMoreCoach, expandedContent);
          } else {
            console.log('Highlights already rendered');
          }
        } else {
          // When collapsing (show less), pause all videos in the highlights section
          const highlightsSection = expandedContent.querySelector('.highlights');
          if (highlightsSection) {
            const videos = highlightsSection.querySelectorAll('video');
            videos.forEach(video => {
              if (video && !video.paused) {
                video.pause();
                video.currentTime = 0; // Reset to beginning
              }
            });
          }
        }
      });
    }

    // Create floating date container that appears when main section is out of view
    function createFloatingDateContainer(event, timeZoneData, learnMoreCoach, readMoreCoach, infoListCard, instructors, monthLabel, startDay, endDay, startDayName, endDayName, duration, timeText, code) {
      // Check if classid exists - getUrlParams is available in parent scope
      const urlParams = getUrlParams();
      const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
      
      if (!hasClassId) {
        return; // Don't create floating container if no classid
      }

      const floatingContainer = document.querySelector('.spc-date-widget-main-course-floating-container-sec');
      if (!floatingContainer) {
        return;
      }

      // Populate existing HTML elements instead of generating HTML
      const fscMonth = floatingContainer.querySelector('.fsc-month');
      const fscDays = floatingContainer.querySelector('.fsc-days');
      const fscWeek = floatingContainer.querySelector('.fsc-week');
      const fscTime = floatingContainer.querySelector('.fsc-time');
      const fscDuration = floatingContainer.querySelector('.fsc-duration');
      const fscTrainers = floatingContainer.querySelector('.fsc-trainers');
      const fscBtnPrimary = floatingContainer.querySelector('.fsc-btn-primary');
      const fscBtnPrimaryLink = floatingContainer.querySelector('.fsc-btn-primary')?.closest('.fsc-btn-link');

      // Populate date
      if (fscMonth) fscMonth.textContent = monthLabel;
      if (fscDays) fscDays.textContent = `${startDay}${endDay !== startDay ? `-${endDay}` : ''}`;
      if (fscWeek) fscWeek.textContent = `${startDayName} - ${endDayName}`;

      // Populate time
      if (fscTime && timeText) {
        fscTime.textContent = timeText;
      } else if (fscTime) {
        fscTime.textContent = '';
      }

      // Populate duration
      if (fscDuration && duration) {
        fscDuration.textContent = `${duration} ${duration === 1 ? 'Day' : 'Days'}`;
      }

      // Populate instructors
      if (fscTrainers && instructors.length > 0) {
        fscTrainers.innerHTML = '';
        instructors.forEach(instructor => {
          const trainerDiv = document.createElement('div');
          trainerDiv.className = 'fsc-trainer';
          if (instructor.image) {
            trainerDiv.innerHTML = `
              <img src="${instructor.image}" alt="${instructor.name}" />
              <span>${instructor.name}</span>
            `;
          } else {
            trainerDiv.innerHTML = `<span>${instructor.name}</span>`;
          }
          fscTrainers.appendChild(trainerDiv);
        });
      }

      // Populate register button
      if (fscBtnPrimaryLink && event?.register_url) {
        fscBtnPrimaryLink.href = event.register_url;
        if (fscBtnPrimary) {
          const buttonText = event?.is_sold_out === "Yes" ? "JOIN WAITLIST" : "Register";
          // Find and update text node (preserve image)
          const childNodes = Array.from(fscBtnPrimary.childNodes);
          const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
          if (textNode) {
            textNode.textContent = buttonText;
          } else {
            // If no text node found, update the button content
            const img = fscBtnPrimary.querySelector('img');
            fscBtnPrimary.textContent = buttonText;
            if (img) {
              fscBtnPrimary.appendChild(img);
            } else {
              const newImg = document.createElement('img');
              newImg.src = "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/fi_507257_2_1aec358d9a.svg";
              newImg.alt = "";
              fscBtnPrimary.appendChild(newImg);
            }
          }
        }
      }

      // Setup "View all dates" button to scroll to #courseShow
      const fscViewAllDatesLink = floatingContainer.querySelector('.fsc-btn-ghost')?.closest('.fsc-btn-link');
      if (fscViewAllDatesLink) {
        fscViewAllDatesLink.href = '#courseShow';
        fscViewAllDatesLink.addEventListener('click', (e) => {
          e.preventDefault();
          const courseShowElement = document.getElementById('courseShow');
          if (courseShowElement) {
            const elementPosition = courseShowElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 60; // 60px offset for sticky navbar
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      }
    }

    // Setup IntersectionObserver to show/hide floating container
    function setupFloatingContainerObserver(mainContainer) {
      // getUrlParams is available in parent scope
      const urlParams = getUrlParams();
      const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
      
      if (!hasClassId) {
        return; // Don't setup observer if no classid
      }

      const floatingContainer = document.querySelector('.spc-date-widget-main-course-floating-container-sec');
      if (!floatingContainer) {
        return;
      }

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Main section is in view - hide floating container
              floatingContainer.style.display = 'none';
            } else {
              // Main section is out of view - show floating container
              floatingContainer.style.display = 'block';
            }
          });
        }, {
          threshold: 0.1, // Trigger when 10% of the section is visible
          rootMargin: '0px'
        });
        
        observer.observe(mainContainer);
      }
    }

    // Store data for Highlights component
    if (learnMoreEnabled) {
      window.dateComponentData = {
        event,
        learnMoreCoach,
        readMoreCoach,
        timeZoneData
      };
    }
  }

  // Populate mobile/tablet floating section with date data
  function populateMobileFloatingSection(event, monthLabel, startDay, endDay, startDayName, endDayName, duration, timeText, code, dateBoxHTMLMobile, learnMoreCoach, readMoreCoach, infoListCard) {
    const urlParams = getUrlParams();
    const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
    
    if (!hasClassId) {
      return; // Don't show if no classid
    }

    const floatingWrapper = document.querySelector('.widget-ffc-floating-section-1-main-wrapper');
    if (!floatingWrapper) {
      return;
    }

    // Format date for header (e.g., "23 AUG - 25 AUG")
    const dateElement = floatingWrapper.querySelector('.widget-ffc-floating-section-1-date');
    if (dateElement) {
      if (endDay !== startDay) {
        dateElement.textContent = `${startDay} ${monthLabel} - ${endDay} ${monthLabel}`;
      } else {
        dateElement.textContent = `${startDay} ${monthLabel}`;
      }
    }

    // Update register button
    const registerBtn = floatingWrapper.querySelector('.widget-ffc-floating-section-1-register-btn');
    if (registerBtn && event?.register_url) {
      registerBtn.onclick = () => {
        window.open(event.register_url, '_blank');
      };
      registerBtn.style.cursor = 'pointer';
    }

    // Setup toggle button functionality
    const toggleBtn = floatingWrapper.querySelector('.widget-ffc-floating-section-1-toggle-btn');
    const toggleIcon = floatingWrapper.querySelector('.widget-ffc-floating-section-1-toggle-icon');
    const expandedContainer = floatingWrapper.querySelector('#widgetFfcExpanded');
    const topSection = floatingWrapper.querySelector('.widget-ffc-floating-section-1-top');
    const middleSection = floatingWrapper.querySelector('.widget-ffc-floating-section-1-middle');
    let isExpanded = false;

    if (toggleBtn && expandedContainer && toggleIcon) {
      toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
          // Show expanded content
          expandedContainer.style.display = 'block';
          toggleIcon.style.transform = 'rotate(180deg)';
          floatingWrapper.classList.add('expanded');
          
          // Hide middle section (purple header with SELECTED DATE)
          if (middleSection) {
            middleSection.style.display = 'none';
          }
          
          // If content not already rendered, render it from dateBoxHTMLMobile
          if (!expandedContainer.querySelector('.dateBox') && dateBoxHTMLMobile) {
            expandedContainer.innerHTML = dateBoxHTMLMobile;
            
            // Ensure featuresSectionMobile and priceDescription are visible by default
            const featuresSectionMobile = expandedContainer.querySelector('#featuresSectionMobile');
            const priceDescription = expandedContainer.querySelector('.priceDescription');
            if (featuresSectionMobile) {
              featuresSectionMobile.style.display = 'block';
              featuresSectionMobile.style.setProperty('display', 'block', 'important');
            }
            if (priceDescription) {
              priceDescription.style.display = 'block';
              priceDescription.style.setProperty('display', 'block', 'important');
            }
            
            // Initialize "Show more" functionality for mobile expanded view
            initializeShowMoreMobile(event, learnMoreCoach, expandedContainer);
          } else if (!expandedContainer.querySelector('.dateBox')) {
            // Fallback: try to clone from main container
            const mainContainer = document.querySelector('.showing-spc-highlights-widget-main-courses');
            if (mainContainer) {
              const dateBox = mainContainer.querySelector('.dateBox');
              if (dateBox) {
                expandedContainer.innerHTML = dateBox.outerHTML;
                // Remove SELECTED DATE label and register button from cloned content
                const selectedDateLabel = expandedContainer.querySelector('.selectedDateLabel');
                if (selectedDateLabel) selectedDateLabel.remove();
                const registerButtonContainer = expandedContainer.querySelector('.registerButtonContainer');
                if (registerButtonContainer) registerButtonContainer.remove();
                
                // Ensure featuresSectionMobile and priceDescription are visible by default
                const featuresSectionMobile = expandedContainer.querySelector('#featuresSectionMobile');
                const priceDescription = expandedContainer.querySelector('.priceDescription');
                if (featuresSectionMobile) {
                  featuresSectionMobile.style.display = 'block';
                  featuresSectionMobile.style.setProperty('display', 'block', 'important');
                }
                if (priceDescription) {
                  priceDescription.style.display = 'block';
                  priceDescription.style.setProperty('display', 'block', 'important');
                }
                
                // Initialize "Show more" functionality
                initializeShowMoreMobile(event, learnMoreCoach, expandedContainer);
              }
            }
          }
        } else {
          // Hide expanded content
          expandedContainer.style.display = 'none';
          toggleIcon.style.transform = 'rotate(0deg)';
          floatingWrapper.classList.remove('expanded');
          
          // Show middle section again
          if (middleSection) {
            middleSection.style.display = 'flex';
          }
        }
      });
    }

    // Show the floating section only if classid is present
    if (hasClassId) {
      // Only show on mobile/tablet (max-width: 1024px)
      if (window.innerWidth <= 1024) {
        // Initially show the floating widget (observer will hide it if main section is in view)
        floatingWrapper.style.display = 'block';
        // Setup Intersection Observer to show/hide floating widget based on scroll
        setupMobileFloatingObserver();
      } else {
        // Hide on desktop
        floatingWrapper.style.display = 'none';
      }
    } else {
      floatingWrapper.style.display = 'none';
    }
  }

  // Setup Intersection Observer for mobile floating widget
  function setupMobileFloatingObserver() {
    // Only setup on mobile/tablet (max-width: 1024px)
    if (window.innerWidth > 1024) {
      return;
    }

    const mainSection = document.querySelector('.showing-spc-highlights-widget-main-courses');
    const floatingWrapper = document.querySelector('.widget-ffc-floating-section-1-main-wrapper');
    
    if (!mainSection || !floatingWrapper) {
      return;
    }

    if ('IntersectionObserver' in window) {
      // Check initial state
      const checkInitialState = () => {
        const rect = mainSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          // Main section is initially in view - hide floating widget
          floatingWrapper.style.display = 'none';
        } else {
          // Main section is initially out of view - show floating widget
          floatingWrapper.style.display = 'block';
        }
      };
      
      // Check initial state immediately
      checkInitialState();
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Main section is in view - hide floating widget
            floatingWrapper.style.display = 'none';
          } else {
            // Main section is out of view - show floating widget
            floatingWrapper.style.display = 'block';
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px'
      });
      
      observer.observe(mainSection);
      
      // Handle window resize to reinitialize observer
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          observer.disconnect();
          if (window.innerWidth <= 1024) {
            setupMobileFloatingObserver();
          } else {
            floatingWrapper.style.display = 'none';
          }
        }, 250);
      });
    }
  }

  // Initialize "Show more" functionality for mobile expanded view
  function initializeShowMoreMobile(event, learnMoreCoach, container) {
    const showMoreBtn = container.querySelector('#showMoreBtnMobile');
    const expandedContent = container.querySelector('#expandedContentMobile');
    const showMoreText = container.querySelector('#showMoreTextMobile');
    const showMoreIcon = container.querySelector('#showMoreIconMobile');
    const featuresSection = container.querySelector('#featuresSectionMobile');
    const priceDescription = container.querySelector('.priceDescription');
    
    if (!showMoreBtn || !expandedContent || !showMoreText || !showMoreIcon) {
      return;
    }
    
    // Check if learn more is enabled
    const hasLearnMoreData = () => {
      if (!learnMoreCoach?.coaches || !event?.instructor_name) return false;
      const fullInstructorName = event.instructor_name.trim();
      const normalizedFullName = fullInstructorName.toLowerCase().replace(/ /g, "");
      const foundCoach = learnMoreCoach.coaches.find(
        (coach) => coach?.get_coach_name?.toLowerCase().replace(/ /g, "") === normalizedFullName
      );
      return foundCoach && foundCoach.coachDetails && foundCoach.coachDetails.length > 0;
    };

    const learnMoreEnabled = hasLearnMoreData();
    if (!learnMoreEnabled) {
      return;
    }
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      expandedContent.style.display = isExpanded ? 'block' : 'none';
      
      // Handle features section (infoListCard) visibility - hide when expanded, show when collapsed
      if (featuresSection) {
        if (isExpanded) {
          // Hide infoListCard when "Show more" is opened
          featuresSection.style.display = 'none';
          featuresSection.style.setProperty('display', 'none', 'important');
        } else {
          // Show infoListCard when "Show less" is clicked (closed)
          featuresSection.style.display = 'block';
          featuresSection.style.setProperty('display', 'block', 'important');
        }
      }
      
      // Handle priceDescription visibility - hide when expanded, show when collapsed
      if (priceDescription) {
        if (isExpanded) {
          // Hide priceDescription when "Show more" is opened
          priceDescription.style.display = 'none';
          priceDescription.style.setProperty('display', 'none', 'important');
        } else {
          // Show priceDescription when "Show less" is clicked (closed)
          priceDescription.style.display = 'block';
          priceDescription.style.setProperty('display', 'block', 'important');
        }
      }
      
      showMoreText.textContent = isExpanded ? 'Show less' : 'Show more';
      showMoreIcon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      
      if (isExpanded) {
        // Render Highlights component if not already rendered
        if (!expandedContent.querySelector('.highlights')) {
          console.log('Rendering Highlights for mobile:', {
            hasEvent: !!event,
            hasInstructorName: !!event?.instructor_name,
            hasLearnMoreCoach: !!learnMoreCoach,
            hasCoaches: !!learnMoreCoach?.coaches
          });
          renderHighlights(event, learnMoreCoach, expandedContent);
        }
      } else {
        // When collapsing, pause all videos
        const highlightsSection = expandedContent.querySelector('.highlights');
        if (highlightsSection) {
          const videos = highlightsSection.querySelectorAll('video');
          videos.forEach(video => {
            if (video && !video.paused) {
              video.pause();
              video.currentTime = 0;
            }
          });
        }
      }
    });
  }

  function renderHighlights(event, learnMoreCoach, container) {
    if (!container) {
      console.error('renderHighlights: Container is null');
      return;
    }
    
    if (!event?.instructor_name || !learnMoreCoach?.coaches) {
      console.log('renderHighlights: Missing required data', { 
        hasInstructorName: !!event?.instructor_name, 
        hasCoaches: !!learnMoreCoach?.coaches 
      });
      return;
    }

    const fullInstructorName = event.instructor_name.trim();
    const normalizedFullName = fullInstructorName.toLowerCase().replace(/ /g, "");
    
    const foundCoach = learnMoreCoach.coaches.find(
      (coach) => coach?.get_coach_name?.toLowerCase().replace(/ /g, "") === normalizedFullName
    );

    if (!foundCoach || !foundCoach.coachDetails || foundCoach.coachDetails.length === 0) {
      console.log('renderHighlights: No matching coach or coachDetails found', {
        foundCoach: !!foundCoach,
        coachDetailsLength: foundCoach?.coachDetails?.length
      });
      return;
    }

    console.log('renderHighlights: Rendering highlights for', fullInstructorName);
    console.log('renderHighlights: Coach details found', {
      coachDetailsLength: foundCoach.coachDetails?.length,
      firstInstructor: foundCoach.coachDetails?.[0] ? {
        name: foundCoach.coachDetails[0].name,
        hasAbout: !!foundCoach.coachDetails[0].about,
        hasVideo: !!(foundCoach.coachDetails[0].video?.url || foundCoach.coachDetails[0].videoUrl),
        testimonialsCount: foundCoach.coachDetails[0].testimonials?.length || 0,
        imagesCount: foundCoach.coachDetails[0].images?.length || 0,
        credentialsCount: foundCoach.coachDetails[0].credentials?.length || 0
      } : null
    });

    const coachDetails = foundCoach.coachDetails;
    let currentIndex = 0;

    function getInstructorData(index) {
      const instructor = coachDetails[index];
      if (!instructor) {
        console.log('getInstructorData: No instructor at index', index);
        return null;
      }

      // Get video from various possible sources
      const video = instructor.video?.url || 
                   instructor.video?.desktop_video?.url ||
                   instructor.videoUrl || 
                   instructor.youtubeUrl || 
                   instructor.video_url ||
                   "";

      // Safely extract testimonials - handle both array and object with data property
      let testimonials = [];
      if (instructor.testimonials) {
        if (Array.isArray(instructor.testimonials)) {
          testimonials = instructor.testimonials;
        } else if (instructor.testimonials.data && Array.isArray(instructor.testimonials.data)) {
          testimonials = instructor.testimonials.data;
        }
      }

      // Safely extract images - handle both array and object with data property
      let images = [];
      if (instructor.images) {
        if (Array.isArray(instructor.images)) {
          images = instructor.images;
        } else if (instructor.images.data && Array.isArray(instructor.images.data)) {
          images = instructor.images.data;
        }
      }

      // Safely extract credentials - handle both array and object with data property
      let credentials = [];
      if (instructor.credentials) {
        if (Array.isArray(instructor.credentials)) {
          credentials = instructor.credentials;
        } else if (instructor.credentials.data && Array.isArray(instructor.credentials.data)) {
          credentials = instructor.credentials.data;
        }
      }

      const instructorData = {
        name: instructor.name || "",
        position: instructor.position || "",
        image: instructor.imageInstructor?.desktop_image?.url || "",
        about: instructor.about || "",
        testimonials: testimonials,
        credentials: credentials,
        images: images,
        video: video
      };

      // Log data for debugging in production
      console.log('getInstructorData: Extracted data for', instructorData.name, {
        hasAbout: !!instructorData.about,
        aboutLength: instructorData.about?.length || 0,
        testimonialsCount: instructorData.testimonials.length,
        imagesCount: instructorData.images.length,
        credentialsCount: instructorData.credentials.length,
        hasVideo: !!instructorData.video,
        rawTestimonials: instructor.testimonials,
        rawImages: instructor.images,
        rawCredentials: instructor.credentials
      });

      return instructorData;
    }

    // Tab navigation state - needs to be accessible to navigation functions
      let activeTab = 'Video';
    const tabs = ['Video', 'About', 'Testimonials', 'Images', 'Credentials'];

    // Function to navigate to next tab
    function navigateTabRight() {
      const currentTabIndex = tabs.indexOf(activeTab);
      const nextIndex = (currentTabIndex + 1) % tabs.length;
      const nextTab = tabs[nextIndex];
      switchToTab(nextTab);
    }

    // Function to navigate to previous tab
    function navigateTabLeft() {
      const currentTabIndex = tabs.indexOf(activeTab);
      const prevIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
      const prevTab = tabs[prevIndex];
      switchToTab(prevTab);
    }

    // Function to switch to a specific tab
    function switchToTab(tab) {
      activeTab = tab;
      const currentData = getInstructorData(currentIndex);
      if (currentData) {
        // Update active tab button
        container.querySelectorAll('.tabButton').forEach(btn => {
          btn.classList.toggle('activeTab', btn.dataset.tab === activeTab);
        });
        
        // Hide/show tab navigation buttons based on current tab
        // Hide tab nav buttons for Testimonials and Images (they have their own carousel buttons)
        const tabNavLeft = container.querySelector('#tabNavLeft');
        const tabNavRight = container.querySelector('#tabNavRight');
        if (tabNavLeft && tabNavRight) {
          if (tab === 'Testimonials' || tab === 'Images') {
            tabNavLeft.style.display = 'none';
            tabNavRight.style.display = 'none';
          } else {
            tabNavLeft.style.display = 'flex';
            tabNavRight.style.display = 'flex';
          }
        }
        
        // Reset indices when switching tabs
        currentTestimonialIndex = 0;
        currentImageIndex = 0;
        
        // Update content
        document.getElementById('tabContentInner').innerHTML = renderTabContent(activeTab, currentData);
        
        // Initialize carousels after tab change
        setTimeout(() => {
          initializeCarousels(activeTab, currentData);
        }, 50);
      }
    }

    function renderTabs(instructorData) {
      activeTab = 'Video';

      // Only show instructor profiles if there's more than one instructor
      const showInstructorProfiles = coachDetails.length > 1;

      const highlightsHTML = `
        <div class="highlights">
          ${showInstructorProfiles ? `
          <div class="instructorHeader">
            <div class="instructorProfiles">
              ${coachDetails.map((coach, idx) => `
                <div class="instructorProfile ${idx === currentIndex ? 'activeInstructor' : ''}" data-index="${idx}">
                  <img src="${coach.imageInstructor?.desktop_image?.url || ''}" alt="${coach.name}" class="instructorImage" />
                  <span class="instructorName">${coach.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          <div class="tabNavigation">
            ${tabs.map(tab => `
              <button class="tabButton ${activeTab === tab ? 'activeTab' : ''}" data-tab="${tab}">${tab}</button>
            `).join('')}
          </div>

          <div class="tabContent">
            <button class="tabNavLeft" id="tabNavLeft" aria-label="Previous tab">
              <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_1_4fe63293e3.svg" alt="Previous" width="28" height="28" />
            </button>
            <div class="tabContentInner" id="tabContentInner">
              ${renderTabContent(activeTab, instructorData)}
            </div>
            <button class="tabNavRight" id="tabNavRight" aria-label="Next tab">
              <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_2_6bba30e6c6.svg" alt="Next" width="28" height="28" />
            </button>
          </div>
        </div>
      `;

      container.innerHTML = highlightsHTML;

      // Add event listeners only if instructor profiles are shown
      if (showInstructorProfiles) {
          container.querySelectorAll('.instructorProfile').forEach(profile => {
        profile.addEventListener('click', () => {
          currentIndex = parseInt(profile.dataset.index);
          const newData = getInstructorData(currentIndex);
          if (newData) {
            container.querySelectorAll('.instructorProfile').forEach(p => p.classList.remove('activeInstructor'));
            profile.classList.add('activeInstructor');
              switchToTab('Video');
          }
        });
      });
      }

      container.querySelectorAll('.tabButton').forEach(btn => {
        btn.addEventListener('click', () => {
          switchToTab(btn.dataset.tab);
        });
      });

      // Add event listeners for left/right navigation buttons
      const tabNavLeft = container.querySelector('#tabNavLeft');
      const tabNavRight = container.querySelector('#tabNavRight');
      
      if (tabNavLeft) {
        tabNavLeft.addEventListener('click', navigateTabLeft);
        // Initially hide if starting on Testimonials or Images
        if (activeTab === 'Testimonials' || activeTab === 'Images') {
          tabNavLeft.style.display = 'none';
        }
      }
      
      if (tabNavRight) {
        tabNavRight.addEventListener('click', navigateTabRight);
        // Initially hide if starting on Testimonials or Images
        if (activeTab === 'Testimonials' || activeTab === 'Images') {
          tabNavRight.style.display = 'none';
        }
      }

      // Initialize carousels for initial render
      setTimeout(() => {
        initializeCarousels(activeTab, instructorData);
      }, 50);
    }

    let currentTestimonialIndex = 0;
    let currentImageIndex = 0;
    let isScrolling = false;
    let isImageScrolling = false;

    function scrollToTestimonial(index) {
      const testimonialCarousel = container.querySelector('#testimonialCarousel');
      if (!testimonialCarousel || isScrolling) return;
      
      isScrolling = true;
      // For 400px container, always show 1 slide
      const slideWidth = testimonialCarousel.offsetWidth - 32;
      const gap = 16;
      const scrollPosition = index * (slideWidth + gap);
      testimonialCarousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }

    function handleTestimonialNavigateLeft() {
      if (currentTestimonialIndex > 0) {
        currentTestimonialIndex--;
        scrollToTestimonial(currentTestimonialIndex);
      } else {
        // At first testimonial, navigate to previous tab (About)
        switchToTab('About');
      }
    }

    function handleTestimonialNavigateRight() {
      const currentData = getInstructorData(currentIndex);
      if (!currentData || !currentData.testimonials) return;
      
      // For 400px container, always show 1 slide
      const maxIndex = Math.max(0, currentData.testimonials.length - 1);
      
      if (currentTestimonialIndex < maxIndex) {
        currentTestimonialIndex++;
        scrollToTestimonial(currentTestimonialIndex);
      } else {
        // At last testimonial, navigate to next tab (Images)
        switchToTab('Images');
      }
    }

    function scrollToImage(index) {
      const imageCarousel = container.querySelector('#imageCarousel');
      if (!imageCarousel || isImageScrolling) return;
      
      isImageScrolling = true;
      // For 400px container, always show 1 slide
      const slideWidth = imageCarousel.offsetWidth - 32;
      const gap = 16;
      const scrollPosition = index * (slideWidth + gap);
      imageCarousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        isImageScrolling = false;
      }, 500);
    }

    function handleImageNavigateLeft() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        scrollToImage(currentImageIndex);
      } else {
        // At first image, navigate to previous tab (Testimonials)
        switchToTab('Testimonials');
      }
    }

    function handleImageNavigateRight() {
      const currentData = getInstructorData(currentIndex);
      if (!currentData || !currentData.images) return;
      
      // For 400px container, always show 1 slide
      const maxIndex = Math.max(0, currentData.images.length - 1);
      
      if (currentImageIndex < maxIndex) {
        currentImageIndex++;
        scrollToImage(currentImageIndex);
      } else {
        // At last image, navigate to next tab (Credentials)
        switchToTab('Credentials');
      }
    }

    function initializeCarousels(tab, instructorData) {
      const highlightsContainer = container.querySelector('.highlights');
      if (!highlightsContainer) return;
      
      if (tab === 'Testimonials' && instructorData.testimonials && instructorData.testimonials.length > 0) {
        const testimonialCarousel = highlightsContainer.querySelector('#testimonialCarousel');
        if (testimonialCarousel) {
          currentTestimonialIndex = 0;
          testimonialCarousel.scrollLeft = 0;
          
          // Add scroll event listener
          testimonialCarousel.addEventListener('scroll', (e) => {
            if (isScrolling) return;
            
            const scrollContainer = e.target;
            // For 400px container, always show 1 slide
            const slideWidth = scrollContainer.offsetWidth - 32;
            const gap = 16;
            
            const scrollLeft = scrollContainer.scrollLeft;
            const newIndex = Math.floor(scrollLeft / (slideWidth + gap));
            
            if (newIndex !== currentTestimonialIndex && newIndex >= 0 && newIndex < instructorData.testimonials.length) {
              currentTestimonialIndex = newIndex;
            }
          });
          
          // Add navigation arrow listeners
          const leftArrow = highlightsContainer.querySelector('#testimonialLeftArrow');
          const rightArrow = highlightsContainer.querySelector('#testimonialRightArrow');
          
          if (leftArrow) {
            leftArrow.onclick = handleTestimonialNavigateLeft;
          }
          
          if (rightArrow) {
            rightArrow.onclick = handleTestimonialNavigateRight;
          }
        }
      }

      if (tab === 'Images' && instructorData.images && instructorData.images.length > 0) {
        const imageCarousel = highlightsContainer.querySelector('#imageCarousel');
        if (imageCarousel) {
          currentImageIndex = 0;
          imageCarousel.scrollLeft = 0;
          
          // Add scroll event listener
          imageCarousel.addEventListener('scroll', (e) => {
            if (isImageScrolling) return;
            
            const scrollContainer = e.target;
            // For 400px container, always show 1 slide
            const slideWidth = scrollContainer.offsetWidth - 32;
            const gap = 16;
            
            const scrollLeft = scrollContainer.scrollLeft;
            const newIndex = Math.floor(scrollLeft / (slideWidth + gap));
            
            if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < instructorData.images.length) {
              currentImageIndex = newIndex;
            }
          });
          
          // Add navigation arrow listeners
          const leftArrow = highlightsContainer.querySelector('#imageLeftArrow');
          const rightArrow = highlightsContainer.querySelector('#imageRightArrow');
          
          if (leftArrow) {
            leftArrow.onclick = handleImageNavigateLeft;
          }
          
          if (rightArrow) {
            rightArrow.onclick = handleImageNavigateRight;
          }
        }
      }

      if (tab === 'Credentials') {
        const clientCarousel = highlightsContainer.querySelector('#clientCarousel');
        if (clientCarousel) {
          clientCarousel.scrollLeft = 0;
        }
        
        const trainerCarousel = highlightsContainer.querySelector('#trainerCarousel');
        if (trainerCarousel) {
          trainerCarousel.scrollLeft = 0;
        }
      }
    }

    function renderTabContent(tab, instructorData) {
      if (!instructorData) return '';

      switch(tab) {
        case 'Video':
          return instructorData.video ? `
            <div class="videoContent">
              <div class="videoWrapper">
                <video src="${instructorData.video}" controls class="videoPlayer" autoplay playsinline preload="auto"></video>
              </div>
            </div>
          ` : '<div class="noData">No video available for this instructor.</div>';

        case 'About':
          return `
            <div class="aboutContent">
              <p class="aboutText">${instructorData.about || 'Professional instructor with extensive experience.'}</p>
            </div>
          `;

        case 'Testimonials':
          if (!instructorData.testimonials || instructorData.testimonials.length === 0) {
            return '<div class="noData">No testimonials available for this instructor.</div>';
          }
          return `
            <div class="testimonialsContent">
              <div class="customArrowLeft" id="testimonialLeftArrow">
                <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_1_4fe63293e3.svg" alt="Previous" width="32" height="32" />
              </div>
              <div class="customArrowRight" id="testimonialRightArrow">
                <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_2_6bba30e6c6.svg" alt="Next" width="32" height="32" />
              </div>
              <div class="testimonialCarouselWrapper spc-about-testi-wrapper">
                <div class="spc-about-testi-container" id="testimonialCarousel">
                  ${instructorData.testimonials.map((testimonial, idx) => `
                    <div class="testimonialSlideWrapper spc-about-testi-slide">
                      <div class="testimonialCard">
                        <img src="${testimonial.image?.desktop_image?.url || ''}" alt="${testimonial.name}" class="reviewerImage" />
                        <div class="testimonialDetails">
                          <div class="testimonialHeader">
                            <h4 class="testimonialName">${testimonial.name}</h4>
                            <span class="dot">•</span>
                            <p class="testimonialTime">${testimonial.time}</p>
                          </div>
                          <div class="testimonialRating">
                            ${'★'.repeat(testimonial.rating || 0)}
                          </div>
                          <p class="testimonialText">${testimonial.text}</p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;

        case 'Images':
          if (!instructorData.images || instructorData.images.length === 0) {
            return '<div class="noData">No images available for this instructor.</div>';
          }
          return `
            <div class="imagesContent">
              <div class="customArrowLeft" id="imageLeftArrow">
                <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_1_4fe63293e3.svg" alt="Previous" width="32" height="32" />
              </div>
              <div class="customArrowRight" id="imageRightArrow">
                <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Button_2_6bba30e6c6.svg" alt="Next" width="32" height="32" />
              </div>
              <div class="imageCarouselWrapper spc-about-image-wrapper">
                <div class="spc-about-image-container" id="imageCarousel">
                  ${instructorData.images.map((image, idx) => `
                    <div class="imageSlideWrapper spc-about-image-slide">
                      <div class="imageCard">
                        <img src="${image.desktop_image?.url || ''}" alt="${image.desktop_image?.alternativeText || 'Image ' + (idx + 1)}" class="galleryImage" />
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;

        case 'Credentials':
          const clientCreds = (instructorData.credentials || []).filter(c => {
            const name = (c.name || '').toLowerCase();
            return ['deloitte', 'cognizant', 'microsoft', 'google', 'client', 'company'].some(p => name.includes(p));
          });
          const certCreds = (instructorData.credentials || []).filter(c => {
            const name = (c.name || '').toLowerCase();
            return !['deloitte', 'cognizant', 'microsoft', 'google', 'client', 'company'].some(p => name.includes(p));
          });

          return `
            <div class="credentialsContent">
              <div class="credentialsLayout">
                <div class="credentialSection trustedSection">
                  <h3 class="sectionTitle">TRUSTED CLIENTELE</h3>
                  <div class="credentialScrollContainer">
                    <div class="credentialCarousel" id="clientCarousel">
                      ${clientCreds.flatMap(c => (c.cred_images || []).map((img, idx) => `
                        <div class="credentialItem">
                          <img src="${img.desktop_image?.url || ''}" alt="${c.name}" class="credentialLogo" />
                        </div>
                      `)).join('')}
                    </div>
                  </div>
                </div>
                <div class="credentialSection trainerSection">
                  <h3 class="sectionTitle">TRAINER CREDENTIALS</h3>
                  <div class="credentialScrollContainer">
                    <div class="credentialCarousel" id="trainerCarousel">
                      ${certCreds.flatMap(c => (c.cred_images || []).map((img, idx) => `
                        <div class="credentialItem">
                          <img src="${img.desktop_image?.url || ''}" alt="${c.name}" class="credentialBadge" />
                        </div>
                      `)).join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;

        default:
          return '';
      }
    }

    const initialData = getInstructorData(0);
    if (initialData) {
      renderTabs(initialData);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDateComponent);
  } else {
    initDateComponent();
  }

  // Add MutationObserver to watch for changes in container display
  const observer = new MutationObserver(() => {
    handleLayoutChanges();
  });

  // Observe changes to the container's style attribute
  if (container) {
    observer.observe(container, {
      attributes: true,
      attributeFilter: ['style']
    });
  }

  // Also observe computed style changes by checking periodically
  let lastDisplayState = null;
  setInterval(() => {
    if (container) {
      const currentDisplay = window.getComputedStyle(container).display;
      if (currentDisplay !== lastDisplayState) {
        lastDisplayState = currentDisplay;
        handleLayoutChanges();
      }
    }
    // Also ensure floating CTA stays hidden if conditions are met
    const urlParams = getUrlParams();
    const hasClassId = !!(urlParams.classidusd || urlParams.classidcad);
    const sectionVisible = container && 
      container.style.display !== 'none' && 
      window.getComputedStyle(container).display !== 'none';
    if (hasClassId || sectionVisible) {
      const floatingCta = document.querySelector('#floating-cta');
      if (floatingCta) {
        floatingCta.style.setProperty('display', 'none', 'important');
      }
    }
  }, 500);

  // Initial layout check after a short delay to handle CSS-based hiding
  setTimeout(() => {
    handleLayoutChanges();
  }, 200);
})();


