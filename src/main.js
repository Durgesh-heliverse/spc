// Global slug variable
const globalSlug = "safe-practice-consultant-certification-training";
const paramTimeZone = "Eastern Time";

// Populate first course schedule when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded - calling populateFirstCourseSchedule");
    if (typeof populateFirstCourseSchedule === 'function') {
      populateFirstCourseSchedule(globalSlug, paramTimeZone);
    } else {
      console.error("populateFirstCourseSchedule function not found");
    }
  });
} else {
  // DOM already loaded
  console.log("DOM already loaded - calling populateFirstCourseSchedule");
  if (typeof populateFirstCourseSchedule === 'function') {
    populateFirstCourseSchedule(globalSlug, paramTimeZone);
  } else {
    console.error("populateFirstCourseSchedule function not found");
  }
}

ReactDOM.render(
  React.createElement(Schedule.default, { 
    slug: globalSlug,
    paramTimeZone: paramTimeZone
  }),
  document.getElementById("courseShow")
);
  
  
  // What Participants Say About You Carousel Functionality
  const whatParticipantsSayAboutYouTrack = document.querySelector('.what-participants-say-about-you-track');
  const whatParticipantsSayAboutYouCards = document.querySelectorAll('.what-participants-say-about-you-card');
  const whatParticipantsSayAboutYouPrevBtn = document.querySelector('.what-participants-say-about-you-prev');
  const whatParticipantsSayAboutYouNextBtn = document.querySelector('.what-participants-say-about-you-next');
  
  let whatParticipantsSayAboutYouCurrentSlide = 0;
  const whatParticipantsSayAboutYouTotalSlides = whatParticipantsSayAboutYouCards.length;
  
  // Responsive items per view
  function getWhatParticipantsSayAboutYouItemsPerView() {
    if (window.innerWidth <= 768) {
      return 1.2; // Phone: Show 1.2 items
    } else if (window.innerWidth <= 1024) {
      return 2.2; // Tablet: Show 2.2 items
    }
    return 3; // Desktop: Show 3 items
  }
  
  function updateWhatParticipantsSayAboutYouCarousel() {
    const itemsPerView = getWhatParticipantsSayAboutYouItemsPerView();
    const itemWidth = 100 / itemsPerView;
    const translateX = -(whatParticipantsSayAboutYouCurrentSlide * itemWidth);
    whatParticipantsSayAboutYouTrack.style.transform = `translateX(${translateX}%)`;
  }
  
  function nextWhatParticipantsSayAboutYouSlide() {
    const itemsPerView = getWhatParticipantsSayAboutYouItemsPerView();
    const maxSlide = Math.ceil(whatParticipantsSayAboutYouTotalSlides - itemsPerView);
    
    if (whatParticipantsSayAboutYouCurrentSlide < maxSlide) {
      whatParticipantsSayAboutYouCurrentSlide++;
    } else {
      whatParticipantsSayAboutYouCurrentSlide = 0; // Loop back to start
    }
    updateWhatParticipantsSayAboutYouCarousel();
  }
  
  function prevWhatParticipantsSayAboutYouSlide() {
    const itemsPerView = getWhatParticipantsSayAboutYouItemsPerView();
    const maxSlide = Math.ceil(whatParticipantsSayAboutYouTotalSlides - itemsPerView);
    
    if (whatParticipantsSayAboutYouCurrentSlide > 0) {
      whatParticipantsSayAboutYouCurrentSlide--;
    } else {
      whatParticipantsSayAboutYouCurrentSlide = maxSlide; // Loop to end
    }
    updateWhatParticipantsSayAboutYouCarousel();
  }
  
  if (whatParticipantsSayAboutYouPrevBtn && whatParticipantsSayAboutYouNextBtn) {
    whatParticipantsSayAboutYouPrevBtn.addEventListener('click', prevWhatParticipantsSayAboutYouSlide);
    whatParticipantsSayAboutYouNextBtn.addEventListener('click', nextWhatParticipantsSayAboutYouSlide);
  }
  
  // Swipe functionality for mobile/tablet
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let startPosition = 0;
  let currentPosition = 0;
  
  if (whatParticipantsSayAboutYouTrack) {
    // Touch events
    whatParticipantsSayAboutYouTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
      startPosition = whatParticipantsSayAboutYouCurrentSlide;
      whatParticipantsSayAboutYouTrack.style.transition = 'none';
    }, { passive: true });
    
    whatParticipantsSayAboutYouTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      const itemsPerView = getWhatParticipantsSayAboutYouItemsPerView();
      const itemWidth = 100 / itemsPerView;
      currentPosition = -(startPosition * itemWidth) - (diff / whatParticipantsSayAboutYouTrack.offsetWidth * 100);
      whatParticipantsSayAboutYouTrack.style.transform = `translateX(${currentPosition}%)`;
    }, { passive: true });
    
    whatParticipantsSayAboutYouTrack.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      whatParticipantsSayAboutYouTrack.style.transition = 'transform 0.5s ease-in-out';
      
      const swipeThreshold = 50; // Minimum distance for swipe
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          nextWhatParticipantsSayAboutYouSlide();
        } else {
          // Swipe right - previous
          prevWhatParticipantsSayAboutYouSlide();
        }
      } else {
        // Not enough swipe, snap back
        updateWhatParticipantsSayAboutYouCarousel();
      }
    }, { passive: true });
    
    // Mouse drag events for all screen sizes (including desktop)
    let mouseDown = false;
    
    whatParticipantsSayAboutYouTrack.addEventListener('mousedown', (e) => {
      mouseDown = true;
      touchStartX = e.clientX;
      isDragging = true;
      startPosition = whatParticipantsSayAboutYouCurrentSlide;
      whatParticipantsSayAboutYouTrack.style.transition = 'none';
      whatParticipantsSayAboutYouTrack.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    whatParticipantsSayAboutYouTrack.addEventListener('mousemove', (e) => {
      if (!isDragging || !mouseDown) return;
      e.preventDefault();
      touchEndX = e.clientX;
      const diff = touchStartX - touchEndX;
      const itemsPerView = getWhatParticipantsSayAboutYouItemsPerView();
      const itemWidth = 100 / itemsPerView;
      currentPosition = -(startPosition * itemWidth) - (diff / whatParticipantsSayAboutYouTrack.offsetWidth * 100);
      whatParticipantsSayAboutYouTrack.style.transform = `translateX(${currentPosition}%)`;
    });
    
    whatParticipantsSayAboutYouTrack.addEventListener('mouseup', () => {
      if (!isDragging) return;
      mouseDown = false;
      isDragging = false;
      whatParticipantsSayAboutYouTrack.style.transition = 'transform 0.5s ease-in-out';
      whatParticipantsSayAboutYouTrack.style.cursor = 'grab';
      
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextWhatParticipantsSayAboutYouSlide();
        } else {
          prevWhatParticipantsSayAboutYouSlide();
        }
      } else {
        updateWhatParticipantsSayAboutYouCarousel();
      }
    });
    
    whatParticipantsSayAboutYouTrack.addEventListener('mouseleave', () => {
      if (isDragging) {
        mouseDown = false;
        isDragging = false;
        whatParticipantsSayAboutYouTrack.style.transition = 'transform 0.5s ease-in-out';
        whatParticipantsSayAboutYouTrack.style.cursor = 'grab';
        updateWhatParticipantsSayAboutYouCarousel();
      }
    });
    
    // Prevent text selection while dragging
    whatParticipantsSayAboutYouTrack.addEventListener('selectstart', (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });
  }
  
  // Auto-play what participants say about you carousel (desktop only)
  let whatParticipantsSayAboutYouAutoPlay;
  
  function startAutoPlay() {
    if (window.innerWidth > 1024) {
      whatParticipantsSayAboutYouAutoPlay = setInterval(nextWhatParticipantsSayAboutYouSlide, 5000);
    }
  }
  
  function stopAutoPlay() {
    if (whatParticipantsSayAboutYouAutoPlay) {
      clearInterval(whatParticipantsSayAboutYouAutoPlay);
      whatParticipantsSayAboutYouAutoPlay = null;
    }
  }
  
  startAutoPlay();
  
  // Pause auto-play on hover (desktop only)
  const whatParticipantsSayAboutYouSection = document.querySelector('.what-participants-say-about-you-section');
  if (whatParticipantsSayAboutYouSection) {
    whatParticipantsSayAboutYouSection.addEventListener('mouseenter', () => {
      stopAutoPlay();
    });
    
    whatParticipantsSayAboutYouSection.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      stopAutoPlay();
      updateWhatParticipantsSayAboutYouCarousel();
      startAutoPlay();
    }, 100);
  });

  // Overview Section Carousel Functionality (for tablet and phone)
  const overviewCarouselWrapper = document.querySelector('.overview-sec-skill-carousel-wrapper');
  const overviewCarouselTrack = document.querySelector('.overview-sec-skill-carousel-track');
  const overviewCarouselCards = document.querySelectorAll('.overview-sec-skill-carousel-track .overview-sec-skill-card');
  const overviewCarouselDotsContainer = document.querySelector('.overview-sec-skill-carousel-dots');
  const overviewCarouselPrevBtn = document.querySelector('.overview-carousel-prev');
  const overviewCarouselNextBtn = document.querySelector('.overview-carousel-next');
  
  if (overviewCarouselTrack && overviewCarouselCards.length > 0 && overviewCarouselDotsContainer) {
    let overviewCurrentSlide = 0;
    const overviewTotalSlides = overviewCarouselCards.length;
    
    // Create dots
    function createOverviewDots() {
      overviewCarouselDotsContainer.innerHTML = '';
      for (let i = 0; i < overviewTotalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'overview-sec-skill-carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToOverviewSlide(i));
        overviewCarouselDotsContainer.appendChild(dot);
      }
    }
    
    function updateOverviewCarousel() {
      const translateX = -(overviewCurrentSlide * 100);
      overviewCarouselTrack.style.transform = `translateX(${translateX}%)`;
      
      // Update dots
      const dots = overviewCarouselDotsContainer.querySelectorAll('.overview-sec-skill-carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === overviewCurrentSlide);
      });
      
      // Re-initialize Read More after slide change
      setTimeout(() => {
        initCarouselTestimonialReadMore();
      }, 50);
    }
    
    function goToOverviewSlide(slideIndex) {
      if (slideIndex < 0) slideIndex = overviewTotalSlides - 1;
      if (slideIndex >= overviewTotalSlides) slideIndex = 0;
      overviewCurrentSlide = slideIndex;
      updateOverviewCarousel();
    }
    
    function nextOverviewSlide() {
      overviewCurrentSlide = (overviewCurrentSlide + 1) % overviewTotalSlides;
      updateOverviewCarousel();
    }
    
    function prevOverviewSlide() {
      overviewCurrentSlide = (overviewCurrentSlide - 1 + overviewTotalSlides) % overviewTotalSlides;
      updateOverviewCarousel();
    }
    
    // Initialize dots
    createOverviewDots();
    
    // Add navigation button event listeners
    if (overviewCarouselPrevBtn) {
      overviewCarouselPrevBtn.addEventListener('click', () => {
        prevOverviewSlide();
      });
    }
    
    if (overviewCarouselNextBtn) {
      overviewCarouselNextBtn.addEventListener('click', () => {
        nextOverviewSlide();
      });
    }
    
    // Initialize Read More functionality for carousel testimonial cards
    function initCarouselTestimonialReadMore() {
      const testimonialCards = overviewCarouselTrack.querySelectorAll('.oss-testimonial');
      testimonialCards.forEach((testimonial) => {
        const btn = testimonial.querySelector('.oss-read-more');
        if (!btn) return;
        
        // Remove any existing listeners by cloning and replacing
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Add click event listener with proper event handling
        newBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          // Prevent carousel navigation
          if (overviewIsDragging) {
            overviewIsDragging = false;
            overviewMouseDown = false;
          }
          
          // Toggle expanded class
          const isExpanded = testimonial.classList.toggle('expanded');
          
          // Update button text
          newBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
          
          // Force reflow to ensure CSS changes apply
          testimonial.offsetHeight;
          
          return false;
        }, true); // Use capture phase to catch event early
      });
      
      // Also prevent clicks on testimonial content from triggering carousel
      testimonialCards.forEach((testimonial) => {
        testimonial.addEventListener('click', (e) => {
          // If click is on Read More button or its parent, don't navigate
          if (e.target.closest('.oss-read-more') || e.target.classList.contains('oss-read-more')) {
            e.stopPropagation();
          }
        });
      });
    }
    
    // Initialize Read More for carousel cards
    initCarouselTestimonialReadMore();
    
    // Swipe functionality for mobile/tablet
    let overviewTouchStartX = 0;
    let overviewTouchEndX = 0;
    let overviewIsDragging = false;
    let overviewStartPosition = 0;
    
    // Touch events
    overviewCarouselTrack.addEventListener('touchstart', (e) => {
      // Don't start dragging if touching Read More button or testimonial content
      const target = e.target;
      if (target.closest('.oss-read-more') || target.closest('.oss-testimonial p') || target.closest('.oss-author')) {
        return;
      }
      
      overviewTouchStartX = e.touches[0].clientX;
      overviewIsDragging = true;
      overviewStartPosition = overviewCurrentSlide;
      overviewCarouselTrack.style.transition = 'none';
    }, { passive: true });
    
    overviewCarouselTrack.addEventListener('touchmove', (e) => {
      if (!overviewIsDragging) return;
      overviewTouchEndX = e.touches[0].clientX;
      const diff = overviewTouchStartX - overviewTouchEndX;
      const cardWidth = overviewCarouselTrack.offsetWidth;
      const dragOffset = (diff / cardWidth) * 100;
      const translateX = -(overviewStartPosition * 100) - dragOffset;
      overviewCarouselTrack.style.transform = `translateX(${translateX}%)`;
    }, { passive: true });
    
    overviewCarouselTrack.addEventListener('touchend', () => {
      if (!overviewIsDragging) return;
      overviewIsDragging = false;
      overviewCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
      
      const swipeThreshold = 50;
      const diff = overviewTouchStartX - overviewTouchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextOverviewSlide();
        } else {
          prevOverviewSlide();
        }
      } else {
        updateOverviewCarousel();
      }
    }, { passive: true });
    
    // Mouse drag events for desktop (when carousel is visible)
    let overviewMouseDown = false;
    
    overviewCarouselTrack.addEventListener('mousedown', (e) => {
      // Don't start dragging if clicking on Read More button or testimonial content
      if (e.target.closest('.oss-read-more') || e.target.closest('.oss-testimonial p') || e.target.closest('.oss-author')) {
        return;
      }
      
      if (window.innerWidth <= 1024) {
        overviewMouseDown = true;
        overviewTouchStartX = e.clientX;
        overviewIsDragging = true;
        overviewStartPosition = overviewCurrentSlide;
        overviewCarouselTrack.style.transition = 'none';
        overviewCarouselTrack.style.cursor = 'grabbing';
        e.preventDefault();
      }
    });
    
    overviewCarouselTrack.addEventListener('mousemove', (e) => {
      if (!overviewIsDragging || !overviewMouseDown || window.innerWidth > 1024) return;
      e.preventDefault();
      overviewTouchEndX = e.clientX;
      const diff = overviewTouchStartX - overviewTouchEndX;
      const cardWidth = overviewCarouselTrack.offsetWidth;
      const dragOffset = (diff / cardWidth) * 100;
      const translateX = -(overviewStartPosition * 100) - dragOffset;
      overviewCarouselTrack.style.transform = `translateX(${translateX}%)`;
    });
    
    overviewCarouselTrack.addEventListener('mouseup', () => {
      if (!overviewIsDragging) return;
      overviewMouseDown = false;
      overviewIsDragging = false;
      overviewCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
      overviewCarouselTrack.style.cursor = 'grab';
      
      const swipeThreshold = 50;
      const diff = overviewTouchStartX - overviewTouchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextOverviewSlide();
        } else {
          prevOverviewSlide();
        }
      } else {
        updateOverviewCarousel();
      }
    });
    
    overviewCarouselTrack.addEventListener('mouseleave', () => {
      if (overviewIsDragging) {
        overviewMouseDown = false;
        overviewIsDragging = false;
        overviewCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
        overviewCarouselTrack.style.cursor = 'grab';
        updateOverviewCarousel();
      }
    });
    
    // Handle window resize
    let overviewResizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(overviewResizeTimeout);
      overviewResizeTimeout = setTimeout(() => {
        updateOverviewCarousel();
      }, 100);
    });
  }

  // FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Instructor data array
  const instructorsData = [
    {
      id: 0,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'John Hammond',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '35 yrs',
      students: '5,000 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1450_6aada04ac2.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'Regarded as one of the world\'s most experienced SAFe® Practitioners and Trainers, Harry has led <strong>30+ SAFe enterprise</strong> transformations in both public and private sectors, training <strong>30,000+ professionals</strong> and coaching <strong>300+ teams</strong> to higher levels of agility. He aims to help...',
      descriptionFull: '<p>Regarded as one of the world\'s most experienced SAFe® Practitioners and Trainers, Harry has led <strong>30+ SAFe enterprise</strong> transformations in both public and private sectors, training <strong>30,000+ professionals</strong> and coaching <strong>300+ teams</strong> to higher levels of agility.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1492_b856053051.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1493_d2b4507870.svg' }
      ]
    },
    {
      id: 1,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'Michael Chen',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '25 yrs',
      students: '8,400 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/popm-badge.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'A renowned Agile transformation expert with extensive experience in enterprise-level implementations. Michael has trained <strong>20+ enterprises</strong> and worked with <strong>25,000+ professionals</strong> across various industries. He focuses on...',
      descriptionFull: '<p>A renowned Agile transformation expert with extensive experience in enterprise-level implementations. Michael has trained <strong>20+ enterprises</strong> and worked with <strong>25,000+ professionals</strong> across various industries.</p><p>He specializes in helping organizations scale Agile practices and has successfully guided numerous Fortune 500 companies through their transformation journeys.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/capital-one-logo.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/applied-frameworks-logo.svg' }
      ]
    },
    {
      id: 2,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'David Rodriguez',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '30 yrs',
      students: '9,000 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/popm-badge.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'An industry leader in Agile methodologies with over three decades of experience. David has facilitated <strong>35+ enterprise transformations</strong>, trained <strong>35,000+ professionals</strong>, and coached <strong>350+ teams</strong> to achieve exceptional agility. He is dedicated to...',
      descriptionFull: '<p>An industry leader in Agile methodologies with over three decades of experience. David has facilitated <strong>35+ enterprise transformations</strong>, trained <strong>35,000+ professionals</strong>, and coached <strong>350+ teams</strong> to achieve exceptional agility.</p><p>His expertise spans multiple industries, and he has been instrumental in transforming organizations to achieve business agility at scale.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/capital-one-logo.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/applied-frameworks-logo.svg' }
      ]
    },
    {
      id: 3,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'James Wilson',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '28 yrs',
      students: '7,500 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/popm-badge.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'A seasoned Agile coach specializing in large-scale transformations. James has led <strong>28+ SAFe implementations</strong>, trained <strong>28,000+ professionals</strong>, and mentored <strong>280+ teams</strong> to success. His approach emphasizes...',
      descriptionFull: '<p>A seasoned Agile coach specializing in large-scale transformations. James has led <strong>28+ SAFe implementations</strong>, trained <strong>28,000+ professionals</strong>, and mentored <strong>280+ teams</strong> to success.</p><p>His approach emphasizes practical implementation and sustainable change, making him a sought-after consultant for organizations undergoing digital transformation.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/capital-one-logo.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/applied-frameworks-logo.svg' }
      ]
    },
    {
      id: 4,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'Robert Taylor',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '32 yrs',
      students: '10,000 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/popm-badge.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'A visionary in Agile transformation with a proven track record. Robert has executed <strong>32+ enterprise transformations</strong>, educated <strong>32,000+ professionals</strong>, and empowered <strong>320+ teams</strong> to reach new heights. He is committed to...',
      descriptionFull: '<p>A visionary in Agile transformation with a proven track record. Robert has executed <strong>32+ enterprise transformations</strong>, educated <strong>32,000+ professionals</strong>, and empowered <strong>320+ teams</strong> to reach new heights.</p><p>His innovative approaches and deep industry knowledge have made him a trusted advisor for leading organizations worldwide.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/capital-one-logo.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/applied-frameworks-logo.svg' }
      ]
    },
    {
      id: 5,
      image: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1442_2150cdb87a.png',
      name: 'William Anderson',
      title: 'SAFe® Practice Consultant (SPC®), Agile Coach',
      experience: '27 yrs',
      students: '6,800 +',
      certificationImage: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/popm-badge.svg',
      moreCertifications: '+1 more',
      descriptionShort: 'An accomplished Agile leader with expertise in enterprise transformations. William has managed <strong>27+ large-scale implementations</strong>, trained <strong>27,000+ professionals</strong>, and guided <strong>270+ teams</strong> to excellence. He strives to...',
      descriptionFull: '<p>An accomplished Agile leader with expertise in enterprise transformations. William has managed <strong>27+ large-scale implementations</strong>, trained <strong>27,000+ professionals</strong>, and guided <strong>270+ teams</strong> to excellence.</p><p>His practical experience and strategic insights help organizations achieve sustainable Agile transformations that deliver real business value.</p>',
      companies: [
        { name: 'Capital One', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/capital-one-logo.svg' },
        { name: 'Applied Frameworks', logo: 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/applied-frameworks-logo.svg' }
      ]
    }
  ];

  // Carousel Functionality
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.meet-the-agile-leaders-instructors-carousel-item');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.carousel-dot');
  
  let currentSlide = 0;
  let selectedItem = 0; // Track which item is selected
  const totalSlides = carouselItems.length; // Original number of unique items
  const itemsPerView = 5; // Show 5 items at once
  const itemWidth = 132; // Width of each item including gap (100px + 32px gap)
  let isTransitioning = false;
  
  // Create infinite loop by cloning items
  function createInfiniteLoop() {
    // Clone all items and append to track
    const clonedItems = [];
    carouselItems.forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-clone', 'true');
      clonedItems.push(clone);
    });
    
    // Append clones to track
    clonedItems.forEach(clone => {
      carouselTrack.appendChild(clone);
    });
  }
  
  function updateCarousel() {
    // Get current item width based on screen size
    const isMobile = window.innerWidth <= 768;
    const mobileItemWidth = 96; // 80px item + 16px gap on mobile
    const currentItemWidth = isMobile ? mobileItemWidth : itemWidth;
    
    // Calculate translateX to show items
    const translateX = -currentSlide * currentItemWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    // Update active states - selected item moves with navigation
    const allItems = document.querySelectorAll('.meet-the-agile-leaders-instructors-carousel-item');
    allItems.forEach((item, index) => {
      const slideIndex = index % totalSlides;
      item.classList.toggle('active', slideIndex === selectedItem);
    });
    
    // Update dots - show current slide position
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === selectedItem);
    });
  }
  
  function goToSlide(slideIndex) {
    if (isTransitioning) return;
    selectedItem = slideIndex;
    currentSlide = slideIndex;
    updateCarousel();
    // Update instructor profile when navigating via dots
    updateInstructorProfile(slideIndex);
  }
  
  function selectItem(itemIndex) {
    if (isTransitioning) return;
    selectedItem = itemIndex;
    currentSlide = itemIndex;
    updateCarousel();
    // Update instructor profile when selecting item
    updateInstructorProfile(itemIndex);
  }
  
  // Function to update instructor profile based on selected index
  function updateInstructorProfile(instructorIndex) {
    const instructor = instructorsData[instructorIndex];
    if (!instructor) return;
    
    // Get all profile elements
    const profileImage = document.querySelector('.profile-image');
    const profileName = document.querySelector('.profile-name');
    const profileTitle = document.querySelector('.profile-title');
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    const certificationBadgesContainer = document.getElementById('certificationBadges');
    const descriptionFull = document.querySelector('.description-full');
    const companyLogos = document.querySelectorAll('.company-logo img');
    
    // Update profile image
    if (profileImage) {
      profileImage.src = instructor.image;
      profileImage.alt = instructor.name;
    }
    
    // Update name
    if (profileName) {
      profileName.textContent = instructor.name;
    }
    
    // Update title
    if (profileTitle) {
      profileTitle.textContent = instructor.title;
    }
    
    // Update stats (Experience and Students)
    if (statNumbers.length >= 2) {
      statNumbers[0].textContent = instructor.experience; // Experience
      statNumbers[1].textContent = instructor.students; // Students
    }
    
    // Update certification badges array
    if (certificationBadgesContainer) {
      // Clear existing badges
      certificationBadgesContainer.innerHTML = '';
      
      // Create array of certification badges (can be extended to use instructor.certifications array)
      const certifications = instructor.certifications || [];
      
      // If no certifications array, use single certificationImage as fallback
      if (certifications.length === 0 && instructor.certificationImage) {
        certifications.push({ image: instructor.certificationImage, alt: 'Certification Badge' });
    }
    
      // Render all certification badges
      certifications.forEach((cert, index) => {
        const badgeDiv = document.createElement('div');
        badgeDiv.className = 'certification-badge';
        const img = document.createElement('img');
        img.src = cert.image || cert;
        img.alt = cert.alt || `Certification ${index + 1}`;
        badgeDiv.appendChild(img);
        certificationBadgesContainer.appendChild(badgeDiv);
      });
    }
    
    // Update description
    if (descriptionFull) {
      descriptionFull.innerHTML = instructor.descriptionFull || instructor.descriptionShort;
    }
    
    // Update company logos
    if (companyLogos && instructor.companies) {
      companyLogos.forEach((logo, index) => {
        if (instructor.companies[index]) {
          logo.src = instructor.companies[index].logo;
          logo.alt = instructor.companies[index].name;
        }
      });
    }
    
    // Don't scroll - just update the content
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const isMobile = window.innerWidth <= 768;
    const mobileItemWidth = 96;
    const currentItemWidth = isMobile ? mobileItemWidth : itemWidth;
    
    currentSlide++;
    selectedItem = (selectedItem + 1) % totalSlides;
    updateCarousel();
    // Update instructor profile when navigating
    updateInstructorProfile(selectedItem);
    
    // Reset position when reaching the cloned section
    if (currentSlide >= totalSlides) {
      setTimeout(() => {
        carouselTrack.style.transition = 'none';
        currentSlide = 0;
        carouselTrack.style.transform = `translateX(0px)`;
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 0.3s ease';
          isTransitioning = false;
        }, 50);
      }, 300);
    } else {
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const isMobile = window.innerWidth <= 768;
    const mobileItemWidth = 96;
    const currentItemWidth = isMobile ? mobileItemWidth : itemWidth;
    
    if (currentSlide <= 0) {
      // Jump to the end of the cloned section
      carouselTrack.style.transition = 'none';
      currentSlide = totalSlides;
      carouselTrack.style.transform = `translateX(${-currentSlide * currentItemWidth}px)`;
      setTimeout(() => {
        carouselTrack.style.transition = 'transform 0.3s ease';
        currentSlide--;
        selectedItem = (selectedItem - 1 + totalSlides) % totalSlides;
        updateCarousel();
        // Update instructor profile when navigating
        updateInstructorProfile(selectedItem);
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      }, 50);
    } else {
      currentSlide--;
      selectedItem = (selectedItem - 1 + totalSlides) % totalSlides;
      updateCarousel();
      // Update instructor profile when navigating
      updateInstructorProfile(selectedItem);
      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      // Update instructor profile when dot is clicked
      updateInstructorProfile(index);
    });
  });
  
  // Carousel item click functionality - for selection
  function addItemClickListeners() {
    const allItems = document.querySelectorAll('.meet-the-agile-leaders-instructors-carousel-item');
    allItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const slideIndex = index % totalSlides;
        selectItem(slideIndex);
        // Update instructor profile when clicked
        updateInstructorProfile(slideIndex);
      });
    });
  }
  
  // Function to populate carousel from instructor data
  function populateCarouselFromData() {
    const carouselTrack = document.querySelector('.carousel-track');
    if (!carouselTrack || instructorsData.length === 0) return;
    
    // Get all carousel items
    const carouselItems = carouselTrack.querySelectorAll('.meet-the-agile-leaders-instructors-carousel-item');
    
    carouselItems.forEach((item, index) => {
      const instructorIndex = index % instructorsData.length;
      const instructor = instructorsData[instructorIndex];
      
      if (instructor) {
        // Update image
        const image = item.querySelector('.meet-the-agile-leaders-instructors-carousel-item-image');
        if (image) {
          image.src = instructor.image;
          image.alt = instructor.name;
        }
        
        // Update name
        const title = item.querySelector('.meet-the-agile-leaders-instructors-carousel-item-title');
        if (title) {
          title.textContent = instructor.name;
        }
      }
    });
  }
  
  // Initialize carousel
  createInfiniteLoop(); // Create clones first
  populateCarouselFromData(); // Then populate both original and cloned items
  addItemClickListeners();
  updateCarousel();
  
  // Initialize with first instructor profile
  updateInstructorProfile(0);

  // Handle window resize to recalculate carousel
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 100);
  });
  
  // Initialize Perfect Tools Menu
  initPerfectToolsMenu();
  
  // Initialize What You Learn Random Animation
  initWhatYouLearnAnimation();
  
  // Initialize Video Player
  initVideoPlayer();
  initOverviewTestimonialReadMore();
  initTopRolesCycle();
  initFloatingCTA();
  initCertificationStepsCycle();
  initTopNavbarTestimonialRotation();

  // Start overview animations only when in view
  try {
    const observeTargets = document.querySelectorAll('.oss-growth-canvas, .oss-logos-marquee');
    if ('IntersectionObserver' in window && observeTargets.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      }, { threshold: 0.4 });
      observeTargets.forEach((el) => io.observe(el));
    }
  } catch (e) { /* no-op */ }

  // Mobile Google Video Player Functionality
  const mobileGoogleVideo = document.getElementById('mobileGoogleVideo');
  const mobileGoogleVideoPlayBtn = document.getElementById('mobileGoogleVideoPlay');
  const mobileGoogleVideoPlayText = document.querySelector('.mobile-google-video-play-text');
  const mobileGoogleVideoSection = document.querySelector('.mobile-google-video-section');
  
  if (mobileGoogleVideo && mobileGoogleVideoPlayBtn && mobileGoogleVideoSection) {
    mobileGoogleVideoPlayBtn.addEventListener('click', function() {
      // Add playing class to section to hide instructor and ratings
      mobileGoogleVideoSection.classList.add('playing');
      
      // Hide play button and text immediately
      mobileGoogleVideoPlayBtn.classList.add('hidden');
      if (mobileGoogleVideoPlayText) {
        mobileGoogleVideoPlayText.style.display = 'none';
      }
      
      // Show video and enable controls
      mobileGoogleVideo.style.display = 'block';
      mobileGoogleVideo.controls = true;
      
      // Set video to fill the entire section
      mobileGoogleVideo.style.position = 'absolute';
      mobileGoogleVideo.style.top = '0';
      mobileGoogleVideo.style.left = '0';
      mobileGoogleVideo.style.width = '100%';
      mobileGoogleVideo.style.height = '100%';
      mobileGoogleVideo.style.objectFit = 'cover';
      mobileGoogleVideo.style.zIndex = '20';
      mobileGoogleVideo.style.borderRadius = '8px';
      
      // Set container height to ensure video has space
      const container = mobileGoogleVideoSection.querySelector('.mobile-google-video-container');
      if (container) {
        const sectionHeight = mobileGoogleVideoSection.offsetHeight;
        container.style.minHeight = sectionHeight + 'px';
        container.style.position = 'relative';
      }
      
      // Play the video
      mobileGoogleVideo.play().catch(function(error) {
        console.log('Video play error:', error);
      });
    });
    
    // Handle video pause/end to optionally show play button again
    mobileGoogleVideo.addEventListener('pause', function() {
      // Optionally show play button when paused
      // Uncomment if you want play button to reappear when paused
      // mobileGoogleVideoSection.classList.remove('playing');
      // mobileGoogleVideoPlayBtn.classList.remove('hidden');
      // if (mobileGoogleVideoPlayText) {
      //   mobileGoogleVideoPlayText.style.display = 'block';
      // }
    });
    
    mobileGoogleVideo.addEventListener('ended', function() {
      // Show play button when video ends
      mobileGoogleVideoSection.classList.remove('playing');
      mobileGoogleVideo.style.display = 'none';
      mobileGoogleVideo.controls = false;
      
      // Reset video styles
      mobileGoogleVideo.style.position = '';
      mobileGoogleVideo.style.top = '';
      mobileGoogleVideo.style.left = '';
      mobileGoogleVideo.style.width = '';
      mobileGoogleVideo.style.height = '';
      mobileGoogleVideo.style.objectFit = '';
      mobileGoogleVideo.style.zIndex = '';
      mobileGoogleVideo.style.borderRadius = '';
      
      mobileGoogleVideoPlayBtn.classList.remove('hidden');
      if (mobileGoogleVideoPlayText) {
        mobileGoogleVideoPlayText.style.display = 'block';
      }
      
      // Reset container height
      const container = mobileGoogleVideoSection.querySelector('.mobile-google-video-container');
      if (container) {
        container.style.minHeight = '';
        container.style.position = '';
      }
    });
  }
});
// Overview Testimonial Read More (fixed height with scroll)
function initOverviewTestimonialReadMore(){
  const cards = document.querySelectorAll('.oss-testimonial');
  cards.forEach((card)=>{
    const btn = card.querySelector('.oss-read-more');
    const para = card.querySelector('p');
    if(!btn || !para) return;
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const isExpanded = card.classList.toggle('expanded');
      btn.textContent = isExpanded ? 'Read Less' : 'Read More';
    });
  });
}
// Floating CTA toggle
function initFloatingCTA(){
  const root = document.getElementById('floating-cta');
  if(!root) return;
  const closeBtn = root.querySelector('.floating-cta-close');
  const expandBtn = root.querySelector('.floating-cta-collapsed');
  const expandIcon = root.querySelector('.floating-cta-expand');
  closeBtn.addEventListener('click', ()=>{
    root.classList.remove('expanded');
  });
  expandBtn.addEventListener('click', ()=>{
    root.classList.add('expanded');
  });
  if (expandIcon) {
    expandIcon.addEventListener('click', ()=> root.classList.add('expanded'));
  }

  // Scroll-based visibility: hide floating section when next-session-card is in view
  const nextSessionCard = document.querySelector('.next-session-card');
  if (nextSessionCard && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is in view - hide floating section
          root.style.display = 'none';
        } else {
          // Section is out of view - show floating section
          root.style.display = '';
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the section is visible
    });
    
    observer.observe(nextSessionCard);
  }
}

// Top Job Roles chip cycling animation
function initTopRolesCycle(){
  const container = document.querySelector('.oss-roles-v2');
  if(!container) return;
  const tick = () => {
    const main = container.querySelector('.oss-chip.main');
    const one = container.querySelector('.oss-chip.sub.one');
    const two = container.querySelector('.oss-chip.sub.two');
    const three = container.querySelector('.oss-chip.sub.three');
    if(!main || !one || !two || !three) return;
    // rotate classes: one->main, two->one, three->two, main->three
    main.classList.remove('main');
    main.classList.add('sub','three');

    three.classList.remove('three');
    three.classList.add('two');

    two.classList.remove('two');
    two.classList.add('one');

    one.classList.remove('sub','one');
    one.classList.add('main');
  };
  setInterval(tick, 3000);
}

// Read More functionality for instructor profile
function toggleDescription(event) {
  event.preventDefault();
  
  const shortDescription = document.querySelector('.description-short');
  const fullDescription = document.querySelector('.description-full');
  const readMoreLink = document.querySelector('.read-more-link');
  
  if (fullDescription.classList.contains('expanded')) {
    // Collapse description - set overflow hidden immediately to prevent content flash
    fullDescription.style.overflow = 'hidden';
    fullDescription.classList.remove('expanded');
    shortDescription.style.display = 'block';
    readMoreLink.textContent = 'Read More';
    
    // Reset overflow style after transition completes
    setTimeout(() => {
      fullDescription.style.overflow = '';
    }, 500);
  } else {
    // Expand description
    shortDescription.style.display = 'none';
    fullDescription.classList.add('expanded');
    readMoreLink.textContent = 'Read Less';
  }
}

// Perfect Tools Menu functionality
function initPerfectToolsMenu() {
  const menuItems = document.querySelectorAll('.tools-menu .menu-item');
  const section = document.querySelector('.perfect-tool-for-your-excetional-learning');
  
  let scrollTimeout = null;
  let scrollHandlerAttached = false;
  let lastActiveIndex = -1;
  let isUpdating = false;
  
  // Get menu items as array in order
  const menuItemsArray = Array.from(menuItems);
  
  // Click functionality
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      menuItems.forEach(menuItem => menuItem.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Get the content type
      const contentType = item.getAttribute('data-content');
      
      // Update content based on selection
      updateToolsContent(contentType);
      
      // Update last active index
      lastActiveIndex = menuItemsArray.indexOf(item);
    });
  });
  
  // Scroll-based content switching (desktop only)
  function handleScroll() {
    // Only work on desktop (width > 768px)
    if (window.innerWidth <= 768) {
      return;
    }
    
    if (!section || menuItemsArray.length === 0 || isUpdating) {
      return;
    }
    
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    const currentScrollY = window.scrollY;
    
    // Check if section is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) {
      return;
    }
    
    // Get section position in document
    const sectionTop = rect.top + currentScrollY;
    
    // Viewport center position in document
    const viewportCenter = currentScrollY + (windowHeight / 2);
    
    // Calculate progress: 0 when viewport center is at section top, 1 when at section bottom
    let scrollProgress = (viewportCenter - sectionTop) / sectionHeight;
    
    // Clamp between 0 and 1
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));
    
    // Determine which menu item should be active
    // Divide section into equal segments for each menu item
    const segmentSize = 1 / menuItemsArray.length;
    
    // Add hysteresis: use different thresholds for scrolling up vs down
    // This prevents rapid toggling at boundaries
    let targetIndex;
    if (lastActiveIndex === -1) {
      // First calculation - use normal threshold
      targetIndex = Math.floor(scrollProgress / segmentSize);
    } else {
      // Use hysteresis: add 15% buffer to prevent flickering
      const hysteresis = 0.15;
      const currentSegment = scrollProgress / segmentSize;
      
      if (currentSegment < lastActiveIndex + hysteresis) {
        // Scrolling up - use lower threshold
        targetIndex = Math.floor((scrollProgress + (hysteresis * segmentSize)) / segmentSize);
      } else if (currentSegment > lastActiveIndex + 1 - hysteresis) {
        // Scrolling down - use higher threshold
        targetIndex = Math.floor((scrollProgress - (hysteresis * segmentSize)) / segmentSize);
      } else {
        // In the hysteresis zone - keep current index
        targetIndex = lastActiveIndex;
      }
    }
    
    // Ensure we don't exceed array bounds
    targetIndex = Math.max(0, Math.min(menuItemsArray.length - 1, targetIndex));
    
    // Only update if index changed
    if (targetIndex !== lastActiveIndex) {
      const targetMenuItem = menuItemsArray[targetIndex];
      if (!targetMenuItem) {
        return;
      }
      
      isUpdating = true;
      
      // Remove active class from all items
      menuItems.forEach(menuItem => menuItem.classList.remove('active'));
      
      // Add active class to target item
      targetMenuItem.classList.add('active');
      
      // Get the content type and update
      const targetContentType = targetMenuItem.getAttribute('data-content');
      updateToolsContent(targetContentType);
      
      // Update last active index
      lastActiveIndex = targetIndex;
      
      // Reset updating flag after a short delay
      setTimeout(() => {
        isUpdating = false;
      }, 100);
    }
  }
  
  // Debounced scroll handler with requestAnimationFrame
  function debouncedScroll() {
    // Clear any pending timeout
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    
    // Use requestAnimationFrame for smooth updates
    scrollTimeout = requestAnimationFrame(() => {
      handleScroll();
      scrollTimeout = null;
    });
  }
  
  // Add scroll listener for desktop only
  function attachScrollListener() {
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
      if (!scrollHandlerAttached) {
        window.addEventListener('scroll', debouncedScroll, { passive: true });
        scrollHandlerAttached = true;
      }
    } else {
      if (scrollHandlerAttached) {
        window.removeEventListener('scroll', debouncedScroll);
        scrollHandlerAttached = false;
      }
    }
  }
  
  // Initial setup
  attachScrollListener();
  
  // Handle resize to enable/disable scroll functionality
  window.addEventListener('resize', () => {
    attachScrollListener();
    if (window.innerWidth > 768) {
      // Reset last active index on resize to recalculate
      lastActiveIndex = -1;
      handleScroll();
    }
  });
  
  // Initial check on load
  setTimeout(() => {
    handleScroll();
  }, 100);
}

function updateToolsContent(contentType) {
  const titleElement = document.querySelector('.perfect-tool-for-your-excetional-learning-title-red');
  const imageElement = document.querySelector('.perfect-tool-for-your-excetional-learning-image-red');
  const listContainer = document.querySelector('.perfect-tool-for-your-excetional-learning-content-red-list-points');
  
  if (contentType === 'video-conferencing') {
    // Video Conferencing content
    titleElement.textContent = 'We decided to ZOOM IN on an impactful learning experience for you with ZOOM.';
    imageElement.src = 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1502_3e60db65dd.svg';
    
    listContainer.innerHTML = `
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/video_8650267efc.svg" alt="">
        Seamless and Real-time collaboration with high-quality audio and video.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_17_f6458fa466.svg" alt="">
        Breakout feature for highly engaging group activities.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_18_22b01710b9.svg" alt="">
        Gesture Features to communicate your learning concern.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Vector_46_478354cc28.svg" alt="">
        White Board Annotation for real-time creative activities.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_19_67e201a63f.svg" alt="">
        Screen Sharing for visual interactive learning through interesting content.
      </p>
    `;
  } else if (contentType === 'group-collaboration') {
    // Group Collaboration content
    titleElement.textContent = 'Enhanced group collaboration features for effective team learning.';
    imageElement.src = 'https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/group-collaboration-icon.svg';
    
    listContainer.innerHTML = `
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/video_8650267efc.svg" alt="">
        Advanced breakout rooms for focused group discussions and activities.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_17_f6458fa466.svg" alt="">
        Real-time document collaboration with multiple participants.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_18_22b01710b9.svg" alt="">
        Team management tools for organizing and tracking group progress.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Vector_46_478354cc28.svg" alt="">
        Integrated chat and messaging for seamless communication.
      </p>
      <p class="perfect-tool-for-your-excetional-learning-content-red-list-points-item">
        <img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_19_67e201a63f.svg" alt="">
        Analytics and reporting for tracking group engagement and outcomes.
      </p>
    `;
  }
}

// What You Learn Bubbly Animation
function initWhatYouLearnAnimation() {
  const labels = document.querySelectorAll('.what-you-learn-sec-left-label');
  const rightItems = document.querySelectorAll('.what-you-learn-sec-right-item-title');
  const leftPanel = document.querySelector('.what-you-learn-sec-left-panel');
  
  // Get all the headings from right panel
  const headings = Array.from(rightItems).map(item => item.textContent.trim());
  
  // Animation states
  let animationInterval;
  let isAnimating = false;
  
  // Function to get random headings
  function getRandomHeadings() {
    const numLabels = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 labels
    const shuffled = [...headings].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numLabels);
  }
  
  // Function to get random position within left panel
  function getRandomPosition(existingPositions = []) {
    const panelRect = leftPanel.getBoundingClientRect();
    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;
    
    // Leave top 150px space and 10px from bottom
    const minTop = 150;
    const maxTop = panelHeight - 110; // 10px up from bottom + label height
    const minLeft = 20;
    const maxLeft = panelWidth - 200; // Leave space for label width
    
    let attempts = 0;
    let position;
    
    do {
      position = {
        top: Math.random() * (maxTop - minTop) + minTop,
        left: Math.random() * (maxLeft - minLeft) + minLeft
      };
      attempts++;
    } while (attempts < 50 && isOverlapping(position, existingPositions));
    
    return position;
  }
  
  // Function to check if position overlaps with existing positions
  function isOverlapping(newPos, existingPositions) {
    const minDistance = 120; // Minimum distance between labels
    
    return existingPositions.some(existingPos => {
      const distance = Math.sqrt(
        Math.pow(newPos.top - existingPos.top, 2) + 
        Math.pow(newPos.left - existingPos.left, 2)
      );
      return distance < minDistance;
    });
  }
  
  // Function to hide all labels with subtle exit animation
  function hideAllLabels() {
    labels.forEach((label, index) => {
      label.style.opacity = '0';
      label.style.transform = 'scale(0.3)';
      label.style.transition = 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  }
  
  // Function to show labels with subtle bubble entrance animation
  function showLabelsSequentially(randomHeadings) {
    // Hide all labels first
    hideAllLabels();
    
    const existingPositions = [];
    
    // Show labels one by one with subtle bubble animation
    randomHeadings.forEach((heading, index) => {
      setTimeout(() => {
        const label = labels[index];
        const textElement = label.querySelector('.what-you-learn-sec-left-label-text');
        const position = getRandomPosition(existingPositions);
        
        // Add position to existing positions to prevent overlap
        existingPositions.push(position);
        
        // Update content
        textElement.textContent = heading;
        
        // Set random position
        label.style.position = 'absolute';
        label.style.top = position.top + 'px';
        label.style.left = position.left + 'px';
        label.style.zIndex = '10';
        
        // Reset transform for entrance
        label.style.transform = 'scale(0)';
        label.style.opacity = '0';
        
        // Trigger subtle bubble entrance animation
        setTimeout(() => {
          label.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          label.style.opacity = '1';
          label.style.transform = 'scale(1)';
        }, 50);
        
      }, index * 250); // 250ms delay between each label
    });
  }
  
  // Function to update labels with new headings
  function updateLabels() {
    if (isAnimating) return;
    isAnimating = true;
    
    const randomHeadings = getRandomHeadings();
    showLabelsSequentially(randomHeadings);
    
    // Reset animation state after all animations complete
    setTimeout(() => {
      isAnimating = false;
    }, randomHeadings.length * 250 + 600);
  }
  
  // Start animation
  function startAnimation() {
    updateLabels(); // Initial update
    
    animationInterval = setInterval(() => {
      updateLabels();
    }, 4000); // Change every 4 seconds to allow for sequential animation
  }
  
  // Stop animation
  function stopAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
  }
  
  // Initialize animation
  startAnimation();
  
  // Pause animation on hover
  if (leftPanel) {
    leftPanel.addEventListener('mouseenter', stopAnimation);
    leftPanel.addEventListener('mouseleave', startAnimation);
  }
}

// Curriculum Module Accordion
document.addEventListener('DOMContentLoaded', function() {
  const moduleToggles = document.querySelectorAll('.module-toggle');
  const allModules = document.querySelectorAll('.curriculum-module');
  
  // Set initial state (expanded by default - first module only)
  if (allModules.length > 0) {
    const firstModuleContent = allModules[0].querySelector('.module-content');
    if (firstModuleContent) {
      firstModuleContent.classList.add('expanded');
      const firstToggleText = allModules[0].querySelector('.toggle-text');
      const firstToggleIcon = allModules[0].querySelector('.module-toggle svg');
      if (firstToggleText) firstToggleText.textContent = 'Less details';
      if (firstToggleIcon) firstToggleIcon.style.transform = 'rotate(0deg)';
    }
  }
  
  // Function to toggle module
  function toggleModule(module) {
    const moduleContent = module.querySelector('.module-content');
    const toggleText = module.querySelector('.toggle-text');
    const toggleIcon = module.querySelector('.module-toggle svg');
    const isExpanded = moduleContent.classList.contains('expanded');
    
    // Close all other modules first
    allModules.forEach(otherModule => {
      if (otherModule !== module) {
        const otherContent = otherModule.querySelector('.module-content');
        const otherToggleText = otherModule.querySelector('.toggle-text');
        const otherToggleIcon = otherModule.querySelector('.module-toggle svg');
        
        if (otherContent && otherContent.classList.contains('expanded')) {
          otherContent.classList.remove('expanded');
          if (otherToggleText) otherToggleText.textContent = 'More details';
          if (otherToggleIcon) otherToggleIcon.style.transform = 'rotate(180deg)';
        }
      }
    });
    
    if (isExpanded) {
      // Collapse
      moduleContent.classList.remove('expanded');
      toggleText.textContent = 'More details';
      toggleIcon.style.transform = 'rotate(180deg)';
    } else {
      // Expand
      moduleContent.classList.add('expanded');
      toggleText.textContent = 'Less details';
      toggleIcon.style.transform = 'rotate(0deg)';
    }
  }

  // Add click listener to module headers
  allModules.forEach(module => {
    const moduleHeader = module.querySelector('.module-header');
    if (moduleHeader) {
      moduleHeader.addEventListener('click', function(e) {
        // Don't trigger if clicking directly on the toggle button
        if (!e.target.closest('.module-toggle')) {
          toggleModule(module);
        }
      });
    }
  });

  // Add click listener to toggle buttons
  moduleToggles.forEach(toggle => { 
    const module = toggle.closest('.curriculum-module');
    
    toggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent header click from also firing
      toggleModule(module);
    });
  });
});

// Video Player Functionality
function initVideoPlayer() {
  const video = document.getElementById('heroVideo');
  const playButton = document.getElementById('heroVideoPlay');
  const pauseButton = document.getElementById('heroVideoPause');
  const videoPlaceholder = document.querySelector('.video-placeholder');
  
  if (!video || !playButton || !pauseButton || !videoPlaceholder) return;
  
  // Play button click handler
  playButton.addEventListener('click', function() {
    // Enable controls and play the video
    video.controls = true;
    video.play();
    videoPlaceholder.classList.add('playing');
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
  });
  
  // Pause button click handler
  pauseButton.addEventListener('click', function() {
    video.pause();
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
  });
  
  // Video event handlers
  video.addEventListener('play', function() {
    video.controls = true;
    videoPlaceholder.classList.add('playing');
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
  });
  
  video.addEventListener('pause', function() {
    videoPlaceholder.classList.remove('playing');
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
  });
  
  video.addEventListener('ended', function() {
    videoPlaceholder.classList.remove('playing');
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
  });
  
  // Click on video to play/pause
  video.addEventListener('click', function() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
  
  // Click on video container to pause when playing
  videoPlaceholder.addEventListener('click', function(e) {
    // Only pause if clicking on the container, not the video itself
    if (e.target === videoPlaceholder && !video.paused) {
      video.pause();
    }
  });
  
  // Keyboard accessibility
  playButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playButton.click();
    }
  });
}

// Sequential highlight animation for learning access points
function initSequentialHighlight() {
  const highlightElements = document.querySelectorAll('.why-third-cc-content-highlight > p');
  let currentIndex = 0;
  
  function highlightNext() {
    // Remove highlight from all elements
    highlightElements.forEach(element => {
      element.classList.remove('why-third-cc-content-p-color');
    });
    
    // Add highlight to current element
    if (highlightElements[currentIndex]) {
      highlightElements[currentIndex].classList.add('why-third-cc-content-p-color');
    }
    
    // Move to next element
    currentIndex = (currentIndex + 1) % highlightElements.length;
  }
  
  // Start the animation immediately
  highlightNext();
  
  // Set interval to highlight next element every 2 seconds
  setInterval(highlightNext, 2000);
}

// Initialize the sequential highlight when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSequentialHighlight();
  initStackedCardsCarousel();
});

// Stacked Cards Carousel Animation
function initStackedCardsCarousel() {
  const cards = document.querySelectorAll('.stacked-card');
  let currentIndex = 0;
  
  function updateCardImages() {
    // Remove image from all cards first
    cards.forEach(card => {
      const h3 = card.querySelector('h3');
      const existingImg = h3.querySelector('img');
      if (existingImg) {
        existingImg.remove();
      }
    });
    
    // Add image only to the top card (data-index="0")
    const topCard = document.querySelector('.stacked-card[data-index="0"]');
    if (topCard) {
      const h3 = topCard.querySelector('h3');
      const nameText = h3.textContent.trim();
      h3.innerHTML = `<img src="https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/x39_2_1_96b704ef36.svg" alt="">${nameText}`;
    }
  }
  
  function rotateCards() {
    // Update data-index attributes for proper stacking
    cards.forEach((card, index) => {
      const newIndex = (index - currentIndex + cards.length) % cards.length;
      card.setAttribute('data-index', newIndex);
    });
    
    // Update images after rotation
    updateCardImages();
    
    // Move to next card
    currentIndex = (currentIndex + 1) % cards.length;
  }
  
  // Initialize all cards with proper data-index
  cards.forEach((card, index) => {
    card.setAttribute('data-index', index);
  });
  
  // Start the carousel immediately
  rotateCards();
  
  // Set interval to rotate cards every 3 seconds
  setInterval(rotateCards, 3000);
}


// indiviadual and org benifits section

const individualCard = document.getElementById('individualCard');
const organizationalCard = document.getElementById('organizationalCard');

// Ensure both cards show expanded state on mobile/tablet on load
function ensureMobileCardsDisplay() {
  if (window.innerWidth <= 1100) {
    // Remove any inline display styles that might interfere
    const allExpandedStates = document.querySelectorAll('.individual-org-benefits-expanded-state');
    allExpandedStates.forEach(state => {
      // Clear any inline display styles so CSS !important can take effect
      if (state.style.display === 'none' || state.style.display === '') {
        state.style.removeProperty('display');
      }
    });
  }
}

// Initialize on load and resize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureMobileCardsDisplay);
} else {
  ensureMobileCardsDisplay();
}

window.addEventListener('resize', ensureMobileCardsDisplay);

individualCard.addEventListener('click', function() {
    // Only allow click behavior on desktop
    if (window.innerWidth <= 1100) return;
    
    if (this.classList.contains('individual-org-benefits-collapsed')) {
        const isDesktop = window.innerWidth > 1100;
        const expandedState = this.querySelector('.individual-org-benefits-expanded-state');
        
        // Only hide text on desktop (not mobile/tablet)
        if (isDesktop && expandedState) {
            expandedState.style.display = 'none';
        }
        
        // Expand left, collapse right
        this.classList.remove('individual-org-benefits-collapsed');
        this.classList.add('individual-org-benefits-expanded');
        organizationalCard.classList.remove('individual-org-benefits-expanded');
        organizationalCard.classList.add('individual-org-benefits-collapsed');
        
        // Hide the other card's expanded state immediately (desktop only)
        if (isDesktop) {
            const otherExpandedState = organizationalCard.querySelector('.individual-org-benefits-expanded-state');
            if (otherExpandedState) {
                otherExpandedState.style.display = 'none';
            }
        }
        
        // Show text instantly after flex-basis animation completes (0.4s) - desktop only
        if (isDesktop && expandedState) {
            setTimeout(() => {
                expandedState.style.display = '';
            }, 400);
        }
    }
});

organizationalCard.addEventListener('click', function() {
    // Only allow click behavior on desktop
    if (window.innerWidth <= 1100) return;
    
    if (this.classList.contains('individual-org-benefits-collapsed')) {
        const isDesktop = window.innerWidth > 1100;
        const expandedState = this.querySelector('.individual-org-benefits-expanded-state');
        
        // Only hide text on desktop (not mobile/tablet)
        if (isDesktop && expandedState) {
            expandedState.style.display = 'none';
        }
        
        // Expand right, collapse left
        this.classList.remove('individual-org-benefits-collapsed');
        this.classList.add('individual-org-benefits-expanded');
        individualCard.classList.remove('individual-org-benefits-expanded');
        individualCard.classList.add('individual-org-benefits-collapsed');
        
        // Hide the other card's expanded state immediately (desktop only)
        if (isDesktop) {
            const otherExpandedState = individualCard.querySelector('.individual-org-benefits-expanded-state');
            if (otherExpandedState) {
                otherExpandedState.style.display = 'none';
            }
        }
        
        // Show text instantly after flex-basis animation completes (0.4s) - desktop only
        if (isDesktop && expandedState) {
            setTimeout(() => {
                expandedState.style.display = '';
            }, 400);
        }
    }
});


// Independent testimonials array for top navbar section
const topNavbarTestimonials = [
  {
    name: "Shannon Hodous",
    text: "The class and instructor were wonderful. The context was thorough and the layout of the course was engaging! Looking forward to my next class on SAFe.",
    image: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1438_b4ac44c9db.svg",
    icon: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/fi_300221_cbfa763804.svg"
  },
  {
    name: "Arnaud Moinard",
    text: "This training was amazing. The appropriate information was sent before the training and the session itself was very interesting with lots of practice, the right amount of theory and very skillful trainer.",
    image: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1438_1_3de4552e39.svg",
    icon: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_29_d7e93f04ba.svg"
  },
  {
    name: "Craig Hicks",
    text: "Information-packed and relevant to my work. The two-day session was packed with information and included opportunities for small group discussion and collaborative problem-solving. The Program Increment Planning simulation was especially helpful and has deepened my understanding of how Agile methods scale from teams to release train.",
    image: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1438_2_9969980637.svg",
    icon: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/Group_29_d7e93f04ba.svg"
  },
  {
    name: "Katie Miller",
    text: "High praise for Skillbook. The course was fantastic. I feel much more equipped to engage in conversations around Agile but also have a deep appreciation for the philosophy behind the methodology.",
    image: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/image_1438_b4ac44c9db.svg",
    icon: "https://skillbook-cms-prod-latest.s3.us-east-1.amazonaws.com/fi_300221_cbfa763804.svg"
  }
];

// Extract testimonials from lower section and auto-rotate in upper section
function initTopNavbarTestimonialRotation() {
  // Get elements
  const section = document.querySelector('.top-navbar-section-second');
  const testimonialText = document.getElementById('testimonialText');
  const readMoreBtn = document.getElementById('readMoreBtn');
  const readMoreText = document.getElementById('readMoreText');
  const avatarImg = document.querySelector('.top-navbar-second-avatar img');
  const avatarContainer = document.querySelector('.top-navbar-second-avatar');
  const platformIcon = document.querySelector('.top-navbar-second-readmore-icon img');
  const platformIconContainer = document.querySelector('.top-navbar-second-readmore-icon');
  
  if (!section || !testimonialText || !readMoreBtn) return;
  
  // Hide section initially if no testimonials
  if (topNavbarTestimonials.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  // Use independent testimonials array
  const testimonials = topNavbarTestimonials;
  
  if (testimonials.length === 0) return;
  
  let currentTestimonialIndex = 0;
  let isExpanded = false;
  let autoRotateTimeout;
  let rotationInterval;
  
  // Initialize collapsed state
  section.classList.add('collapsed');
  
  // Function to truncate text
  function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  // Function to update testimonial display
  function updateTestimonial(index) {
    const testimonial = testimonials[index];
    if (!testimonial) return;
    
    // Clear any existing timeouts/intervals
    clearTimeout(autoRotateTimeout);
    clearInterval(rotationInterval);
    
    // Reset to collapsed state
    isExpanded = false;
    section.classList.remove('expanded');
    section.classList.add('collapsed');
    testimonialText.classList.remove('expanded');
    testimonialText.classList.add('collapsed');
    
    // Update avatar - only if image is provided
    if (avatarImg && avatarContainer) {
      if (testimonial.image) {
        avatarImg.src = testimonial.image;
        avatarImg.alt = testimonial.name;
        avatarContainer.style.display = '';
      } else {
        // Hide avatar if no image
        avatarContainer.style.display = 'none';
      }
    }
    
    // Update platform icon - only if icon is provided
    if (platformIcon && platformIconContainer) {
      if (testimonial.icon) {
        platformIcon.src = testimonial.icon;
        platformIcon.alt = 'Platform';
        platformIconContainer.style.display = '';
      } else {
        // Hide icon if not provided
        platformIconContainer.style.display = 'none';
      }
    }
    
    // Create full text with name (no rating)
    const fullText = `<span>${testimonial.name}</span> "${testimonial.text}"`;
    const shortText = `<span>${testimonial.name}</span> "${truncateText(testimonial.text)}...`;
    
    // Store full and short text as data attributes
    testimonialText.setAttribute('data-full-text', fullText);
    testimonialText.setAttribute('data-short-text', shortText);
    
    // Set initial collapsed text
    testimonialText.innerHTML = shortText;
    readMoreText.textContent = 'Read More';
  }
  
  // Toggle read more/less
  readMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clearTimeout(autoRotateTimeout);
    clearInterval(rotationInterval);
    
    const fullText = testimonialText.getAttribute('data-full-text');
    const shortText = testimonialText.getAttribute('data-short-text');
    
    if (isExpanded) {
      // Collapse
      testimonialText.classList.remove('expanded');
      testimonialText.classList.add('collapsed');
      section.classList.remove('expanded');
      section.classList.add('collapsed');
      
      setTimeout(() => {
        testimonialText.innerHTML = shortText;
        readMoreText.textContent = 'Read More';
      }, 100);
      
      isExpanded = false;
      
      // Auto rotate to next testimonial after collapse
      autoRotateTimeout = setTimeout(() => {
        nextTestimonial();
      }, 2000);
    } else {
      // Expand
      testimonialText.innerHTML = fullText;
      testimonialText.classList.remove('collapsed');
      testimonialText.classList.add('expanded');
      section.classList.remove('collapsed');
      section.classList.add('expanded');
      readMoreText.textContent = 'Read Less';
      
      isExpanded = true;
      
      // Auto rotate to next testimonial after 5 seconds when expanded
      autoRotateTimeout = setTimeout(() => {
        nextTestimonial();
      }, 5000);
    }
  });
  
  // Function to move to next testimonial
  function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial(currentTestimonialIndex);
    
    // Restart auto rotation interval
    startAutoRotation();
  }
  
  // Function to start auto rotation
  function startAutoRotation() {
    clearInterval(rotationInterval);
    if (!isExpanded) {
      rotationInterval = setInterval(() => {
        if (!isExpanded) {
          nextTestimonial();
        }
      }, 8000);
    }
  }
  
  // Initialize with first testimonial
  updateTestimonial(currentTestimonialIndex);
  
  // Start auto rotation
  startAutoRotation();
}

// Certification Steps Cycling Animation
function initCertificationStepsCycle() {
  const steps = document.querySelectorAll('.certification-learning-goals-step');
  if (!steps.length) return;

  let currentStep = 0;
  const totalSteps = steps.length;

  function activateStep(stepIndex) {
    // Remove active class and border-radius classes from all steps
    steps.forEach((step, index) => {
      const label = step.querySelector('.certification-learning-goals-step-label');
      if (label) {
        label.classList.remove('certification-learning-goals-step-active', 'act-1', 'act-4');
      }
    });

    // Add active class to current step
    const currentLabel = steps[stepIndex].querySelector('.certification-learning-goals-step-label');
    if (currentLabel) {
      currentLabel.classList.add('certification-learning-goals-step-active');
      
      // Add border-radius classes for first and last steps
      if (stepIndex === 0) {
        currentLabel.classList.add('act-1');
      } else if (stepIndex === totalSteps - 1) {
        currentLabel.classList.add('act-4');
      }
    }
  }

  // Initialize: activate step 1 (index 0)
  activateStep(0);

  // Cycle through steps: 1 → 2 → 3 → 4 → 1
  function cycleSteps() {
    currentStep = (currentStep + 1) % totalSteps;
    activateStep(currentStep);
  }

  // Cycle every 3 seconds (3000ms)
  setInterval(cycleSteps, 3000);
}

// ===========================================
// Mobile & Tablet Session Section Toggle & Sticky
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
  const mobileSessionSection = document.getElementById('mobileSessionSection');
  const mobileSessionSentinel = document.getElementById('mobileSessionSentinel');
  const toggleBtn = document.getElementById('toggleBtn');

  if (!mobileSessionSection || !toggleBtn) {
    return; // Elements don't exist, exit early
  }

  // Default state: Show collapsed view (details hidden)
  // This is handled by CSS, but we ensure it on load
  mobileSessionSection.classList.remove('show-extended');

  // Toggle button: Show/hide details section
  toggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileSessionSection.classList.toggle('show-extended');
  });

  // Sticky behavior: Stick to bottom when section goes out of view
  function initStickyBehavior() {
    if (window.innerWidth > 768) {
      mobileSessionSection.classList.remove('stuck-to-bottom');
      return;
    }

    if (!mobileSessionSentinel) return;

    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          // When sentinel goes out of view from top (scrolled past), stick to bottom
          // When sentinel comes back into view (scrolled back up), remove sticky
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            // Scrolled past the section, stick to bottom
            mobileSessionSection.classList.add('stuck-to-bottom');
          } else if (entry.isIntersecting) {
            // Section is back in view, return to normal position
            mobileSessionSection.classList.remove('stuck-to-bottom');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    observer.observe(mobileSessionSentinel);

    // Store observer for cleanup on resize
    window.mobileSessionObserver = observer;
  }

  // Initialize sticky behavior
  initStickyBehavior();

  // Handle window resize to reinitialize observer
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (window.mobileSessionObserver) {
        window.mobileSessionObserver.disconnect();
        window.mobileSessionObserver = null;
      }
      initStickyBehavior();
    }, 250);
  });

  // Sticky navbar behavior: fixed on scroll down, normal on scroll up
  function initStickyNavbar() {
    const navbar = document.querySelector('.overview-section-navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
      const currentScrollY = window.scrollY;
      
      // Only apply behavior after scrolling past the navbar's initial position
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - make it fixed
          navbar.classList.remove('navbar-normal');
          navbar.classList.add('navbar-fixed');
        } else {
          // Scrolling up - return to normal (sticky)
          navbar.classList.remove('navbar-fixed');
          navbar.classList.add('navbar-normal');
        }
      } else {
        // At top of page - normal position
        navbar.classList.remove('navbar-fixed');
        navbar.classList.remove('navbar-normal');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Smooth scroll navigation for overview section navbar
  function initOverviewSectionNavigation() {
    const navLinks = document.querySelectorAll('.overview-sec-skill-nav-list a[href^="#"]');
    const stickyNavHeight = 30; // Offset for sticky navigation
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const sectionPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = sectionPosition - stickyNavHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update active state
          navLinks.forEach(navLink => {
            navLink.parentElement.classList.remove('is-active');
          });
          this.parentElement.classList.add('is-active');
        }
      });
    });
  }
  
  // Also handle scrollToCourseShow function if it exists elsewhere
  function scrollToCourseShow() {
    const courseShowSection = document.getElementById('courseShow');
    if (courseShowSection) {
      const stickyNavHeight = 30;
      const sectionPosition = courseShowSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionPosition - stickyNavHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Make scrollToCourseShow available globally
  window.scrollToCourseShow = scrollToCourseShow;
  
  // Initialize navigation and sticky navbar on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initOverviewSectionNavigation();
      initStickyNavbar();
    });
  } else {
    initOverviewSectionNavigation();
    initStickyNavbar();
  }
});

