// Project 6: open a project's detail pop-up from its card
(function () {
    function openModal(modal) {
        modal.style.display = 'block';
        modal.scrollTop = 0;
        const content = modal.querySelector('.modal-content');
        if (content) content.scrollTop = 0;
        document.body.style.overflow = 'hidden'; // stop the page scrolling behind the pop-up
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const modal = document.getElementById(card.getAttribute('data-modal'));
        if (!modal) return;

        card.addEventListener('click', () => openModal(modal));

        // Keyboard: Enter or Space opens the card
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(modal);
            }
        });
    });

    document.querySelectorAll('.modal .close').forEach(button => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });

    // Close when clicking the dark backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal(modal);
        });
    });

    // Close with Escape (the image viewer handles Escape first when it is open)
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') closeModal(modal);
        });
    });
})();
