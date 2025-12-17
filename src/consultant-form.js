// Initialize EmailJS
(function() {
  emailjs.init("C58vvvhW3mr8W0Wcu"); // Replace with your EmailJS public key
})();

// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
  const consultantBtn = document.getElementById('consultantBtn');
  const consultantPopup = document.getElementById('consultantPopup');
  const consultantPopupClose = document.getElementById('consultantPopupClose');
  const consultantForm = document.getElementById('consultantForm');
  const consultantFormMessage = document.getElementById('consultantFormMessage');
  const consultantFormSubmit = document.getElementById('consultantFormSubmit');

  // Open popup
  consultantBtn.addEventListener('click', function() {
    consultantPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close popup
  consultantPopupClose.addEventListener('click', function() {
    closePopup();
  });

  // Close popup when clicking outside
  consultantPopup.addEventListener('click', function(e) {
    if (e.target === consultantPopup) {
      closePopup();
    }
  });

  // Close popup function
  function closePopup() {
    consultantPopup.classList.remove('active');
    document.body.style.overflow = '';
    consultantForm.reset();
    consultantFormMessage.classList.remove('success', 'error');
    consultantFormMessage.style.display = 'none';
  }

  // Form submission
  consultantForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('consultantName').value.trim();
    const email = document.getElementById('consultantEmail').value.trim();
    const phone = document.getElementById('consultantPhone').value.trim();
    const availability = document.getElementById('consultantAvailability').value.trim();
    const message = document.getElementById('consultantMessage').value.trim();

    // Store original button text
    const originalText = consultantFormSubmit.textContent;

    // Disable submit button
    consultantFormSubmit.disabled = true;
    consultantFormSubmit.textContent = 'Sending...';

    // Concatenate all fields in message
    const concatenatedMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAvailability: ${availability}\nTimestamp: ${new Date().toLocaleString()}\n\nMessage:\n${message}\n\nPlease follow up with the customer within 24-48 hours.`;

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      message: concatenatedMessage
    };

    // Create a promise with timeout for faster response
    const emailPromise = emailjs.send('service_drk3p3k', 'template_e55x8qi', templateParams);
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ status: 200, text: 'Timeout - Email will be sent in background' });
      }, 3000); // 3 second timeout
    });

    // Race between email sending and timeout
    Promise.race([emailPromise, timeoutPromise])
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        
        // Re-enable button and restore original text
        consultantFormSubmit.disabled = false;
        consultantFormSubmit.textContent = originalText;
        
        // Reset form
        consultantForm.reset();
        
        // Auto close modal after 3 seconds
        setTimeout(() => {
          closePopup();
        }, 3000);
      })
      .catch(function(error) {
        console.log('Error:', error);
        
        // Re-enable button and restore original text on error
        consultantFormSubmit.disabled = false;
        consultantFormSubmit.textContent = originalText;
        
        // Still show success message even if email fails (as per pseudo code)
        showMessage('Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        consultantForm.reset();
        
        // Auto close modal after 3 seconds
        setTimeout(() => {
          closePopup();
        }, 3000);
      });
  });

  // Show message function
  function showMessage(text, type) {
    consultantFormMessage.textContent = text;
    consultantFormMessage.classList.remove('success', 'error');
    consultantFormMessage.classList.add(type);
    consultantFormMessage.style.display = 'block';
  }
});

// <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
// <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
// <script src="https://skillbook-widget-old.vercel.app/Schedule.js"></script>