(function() {
    // Add event listener to back to top button
    document.querySelector('.back-to-top').addEventListener('click', scrollToTop);
  
    // Add event listener to nav links
    document.querySelectorAll('.top-nav a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').replace('#', '');
        const section = document.querySelector(`#${sectionId}`);
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Get the home section
    const homeSection = document.getElementById('home');
  
    // Get the title, text, and profile picture elements
    const title = homeSection.querySelector('h1');
    const text = homeSection.querySelector('.home-text');
    const profilePicture = homeSection.querySelector('.profile-picture');
  
    // Get the height of the home section
    const homeSectionHeight = homeSection.offsetHeight;
  
    // Add event listener to the window to trigger the hide effect when scrolling down
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const homeSectionTop = homeSection.offsetTop;
      const homeSectionMiddle = homeSectionTop + (homeSectionHeight / 2);
      if (scrollPosition > homeSectionMiddle) {
        hideHomeSectionElements();
      } else {
        showHomeSectionElements();
      }
    });
  
    // Modal window logic
    function createModalWindow(modalId, buttonId, closeButtonId) {
        const modal = document.getElementById(modalId);
        const button = document.getElementById(buttonId);
        const closeButton = document.getElementById(closeButtonId);
      
        button.addEventListener('click', () => {
          modal.style.display = 'block';
        });
      
        closeButton.addEventListener('click', () => {
          modal.style.display = 'none';
        });
      
        window.addEventListener('click', (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        });
      }
      
      createModalWindow('education-modal', 'learn-more-btn-bachelor', 'close-bachelor');
      createModalWindow('education-modal-2', 'learn-more-btn-master', 'close-master');
    createModalWindow('about-modal', 'learn-more-btn-about', 'close-about');
 
  
    // Helper functions
    function hideHomeSectionElements() {
      title.style.display = 'none';
      text.style.display = 'none';
      profilePicture.style.display = 'none';
    }
  
    function showHomeSectionElements() {
      title.style.display = 'block';
      text.style.display = 'block';
      profilePicture.style.display = 'block';
    }
  
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  })();