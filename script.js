document.addEventListener('DOMContentLoaded', function () {
    // DOM elements (some only exist on index.html, so every use is guarded)
    const nav = document.querySelector('.top-nav');
    const backToTopButton = document.querySelector('.back-to-top');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');

    let lastScrollTop = 0;
    let hideTimeout;

    function showNav() {
        if (nav) nav.classList.remove('nav-hidden');
    }

    function hideNav() {
        // Never hide the nav at the top of the page or while the mobile menu is open
        if (!nav || window.pageYOffset <= 50) return;
        if (navList && navList.classList.contains('active')) return;
        nav.classList.add('nav-hidden');
    }

    // Hide the nav when scrolling down, show it when scrolling up,
    // and hide it again a moment after scrolling stops.
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop <= 50) {
            showNav();
        } else if (currentScrollTop > lastScrollTop) {
            hideNav();
        } else {
            showNav();
        }

        lastScrollTop = Math.max(currentScrollTop, 0);

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(hideNav, 1500);
    }

    // Reveal the nav when the mouse is near the top of the window
    function handleMouseMove(e) {
        if (e.clientY <= 60) {
            showNav();
            clearTimeout(hideTimeout);
        } else if (e.clientY > 150 && nav && !nav.matches(':hover')) {
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideNav, 1500);
        }
    }

    // Smooth scroll for in-page links
    function smoothScroll(e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = targetId && document.getElementById(targetId);
        if (!targetElement) return;

        e.preventDefault();
        openModals.forEach(closeModal); // e.g. "Get in touch" inside the About pop-up
        showNav();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close the mobile menu after picking a link
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Modals
    const openModals = new Set();

    function closeModal(modal) {
        modal.style.display = 'none';
        openModals.delete(modal);
        if (openModals.size === 0) document.body.style.overflow = '';
    }

    function setupModal(buttonId, modalId, closeId) {
        const button = document.getElementById(buttonId);
        const modal = document.getElementById(modalId);
        const close = document.getElementById(closeId);
        if (!button || !modal || !close) return;

        button.addEventListener('click', function () {
            modal.style.display = 'block';
            openModals.add(modal);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        close.addEventListener('click', function () {
            closeModal(modal);
        });

        // Keyboard: Enter or Space on the × closes the pop-up
        close.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                closeModal(modal);
            }
        });

        // Close when clicking the dark backdrop around the modal
        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal(modal);
        });
    }

    // Close any open modal with the Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            openModals.forEach(closeModal);
        }
    });

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', handleMouseMove);

    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded));
            navList.classList.toggle('active');
            showNav();
        });
    }

    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function () {
            // Resolved relative to the current page, works locally and when hosted
            window.open('Miljot_Singh_Gambhir.pdf', '_blank', 'noopener');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }

    // Modals on index.html
    setupModal('learn-more-btn-about', 'about-modal', 'close-about');
    setupModal('learn-more-btn-bachelor', 'education-modal', 'close-bachelor');
    setupModal('learn-more-btn-master', 'education-modal-2', 'close-master');

    // Background videos: only download them on larger screens (saves ~8 MB on phones)
    const bgVideos = document.querySelectorAll('video.bg-video');
    const wideScreen = window.matchMedia('(min-width: 769px)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (bgVideos.length && wideScreen && !saveData && !reduceMotion) {
        bgVideos.forEach(video => {
            if (video.dataset.src) video.src = video.dataset.src;
            video.querySelectorAll('source[data-src]').forEach(source => {
                source.src = source.dataset.src;
            });
            video.load();
            const playing = video.play();
            if (playing && playing.catch) playing.catch(() => {});
        });
    }

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
});

// Global helpers used by onclick attributes in the sub-pages
function goBack() {
    window.history.back();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nav = document.querySelector('.top-nav');
    if (nav) nav.classList.remove('nav-hidden');
}
