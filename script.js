(function() {
  // Add event listener to back to top button
  document.querySelector('.back-to-top').addEventListener('click', scrollToTop);

  // Add event listener to nav links
  document.querySelectorAll('.top-nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('href').replace('#', '');
      const section = document.querySelector(`#${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Update: added block: 'center' for better mobile scrolling
    });
  });

  // Add event listener to view resume button
  document.getElementById('view-resume-btn').onclick = function() {
    window.open('Miljot_Singh_Gambhir.pdf', '_blank');
  };

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

  // Add media query to adjust layout for mobile devices
  const mobileQuery = window.matchMedia("(max-width: 768px)");
  mobileQuery.addListener(handleMobileLayout);
  handleMobileLayout(mobileQuery);

  function handleMobileLayout(mq) {
    if (mq.matches) {
      // Adjust layout for mobile devices
      homeSection.style.paddingTop = '50px';
      title.style.fontSize = '24px';
      text.style.fontSize = '18px';
      profilePicture.style.width = '100px';
    } else {
      // Reset layout for desktop devices
      homeSection.style.paddingTop = '100px';
      title.style.fontSize = '36px';
      text.style.fontSize = '24px';
      profilePicture.style.width = '200px';
    }
  }
})();
document.getElementById('learn-more-btn-about').addEventListener('click', () => {
  const modal = document.getElementById('about-modal');
  modal.style.display = 'block';
});

document.getElementById('close-about').addEventListener('click', () => {
  const modal = document.getElementById('about-modal');
  modal.style.display = 'none';
});
document.getElementById('learn-more-btn-bachelor').addEventListener('click', () => {
  const modal = document.getElementById('education-modal');
  modal.style.display = 'block';
});

document.getElementById('close-bachelor').addEventListener('click', () => {
  const modal = document.getElementById('education-modal');
  modal.style.display = 'none';
});

document.getElementById('learn-more-btn-master').addEventListener('click', () => {
  const modal = document.getElementById('education-modal-2');
  modal.style.display = 'block';
});

document.getElementById('close-master').addEventListener('click', () => {
  const modal = document.getElementById('education-modal-2');
  modal.style.display = 'none';
});
function goBack() {
  window.history.back();
}
// Add these new functions to your existing JavaScript

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
      duration: 1000,
      once: true
  });

  const nav = document.querySelector('.top-nav');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
          nav.classList.add('scrolled');
      } else {
          nav.classList.remove('scrolled');
      }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Add a typing effect to the home section title
  const titleElement = document.querySelector('#home h1');
  const titleText = titleElement.textContent;
  titleElement.textContent = '';
  let i = 0;
  function typeWriter() {
      if (i < titleText.length) {
          titleElement.textContent += titleText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
      }
  }
  typeWriter();

  // Add more JavaScript functionality as needed
});