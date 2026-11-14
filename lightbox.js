/*
 * Image lightbox for the project pages.
 * Click a project image to open it large. Inside the viewer:
 *   - click the image to zoom to full resolution (click again to fit)
 *   - arrows / ← → keys move between images in the same gallery
 *   - Esc, the × button, or clicking the dark background closes it
 */
(function () {
    // Images that open in the lightbox
    const IMAGE_SELECTOR = [
        '.project-section .project1-grid img',
        '.project-section .project2-grid img',
        '.project-section .project-images img',
        '.modal-content img' // project 6 pop-ups
    ].join(', ');

    // Images inside the same container are browsed together with the arrows
    const GROUP_SELECTOR = '.project1-grid, .project2-grid, .project-images, .modal-content';

    let box, stage, img, caption, counter;
    let group = [];
    let index = 0;
    let lastFocus = null;

    function build() {
        box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', 'Image viewer');
        box.innerHTML =
            '<div class="lightbox-stage"><img class="lightbox-img" alt=""></div>' +
            '<div class="lightbox-caption"><span class="lightbox-text"></span>' +
            '<span class="lightbox-counter"></span></div>' +
            '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>' +
            '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous image">&#8249;</button>' +
            '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next image">&#8250;</button>';
        document.body.appendChild(box);

        stage = box.querySelector('.lightbox-stage');
        img = box.querySelector('.lightbox-img');
        caption = box.querySelector('.lightbox-text');
        counter = box.querySelector('.lightbox-counter');

        box.querySelector('.lightbox-close').addEventListener('click', close);
        box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
        box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));

        img.addEventListener('click', toggleZoom);

        // Clicking the dark area around the image closes the viewer
        stage.addEventListener('click', (e) => {
            if (e.target === stage) close();
        });
    }

    function show(i) {
        index = (i + group.length) % group.length;
        const source = group[index];
        box.classList.remove('zoomed');
        img.src = source.currentSrc || source.src;
        img.alt = source.alt || '';
        caption.textContent = source.alt || '';
        counter.textContent = group.length > 1 ? `(${index + 1} / ${group.length})` : '';
        stage.scrollTo(0, 0);
    }

    function open(target) {
        if (!box) build();
        const container = target.closest(GROUP_SELECTOR);
        group = container
            ? Array.from(container.querySelectorAll('img')).filter(el => el.matches(IMAGE_SELECTOR))
            : [target];
        box.classList.toggle('single', group.length < 2);
        lastFocus = document.activeElement;
        show(group.indexOf(target));
        box.classList.add('open');
        document.documentElement.style.overflow = 'hidden';
        box.querySelector('.lightbox-close').focus();
    }

    function close() {
        box.classList.remove('open', 'zoomed');
        img.removeAttribute('src');
        document.documentElement.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function toggleZoom(e) {
        // Only zoom if the original picture is bigger than what is shown
        const zooming = !box.classList.contains('zoomed');
        if (zooming && img.naturalWidth <= img.clientWidth && img.naturalHeight <= img.clientHeight) return;

        // Keep the clicked point roughly under the cursor after zooming in
        const rect = img.getBoundingClientRect();
        const fx = (e.clientX - rect.left) / rect.width;
        const fy = (e.clientY - rect.top) / rect.height;
        box.classList.toggle('zoomed', zooming);
        if (zooming) {
            stage.scrollLeft = img.offsetWidth * fx - stage.clientWidth / 2;
            stage.scrollTop = img.offsetHeight * fy - stage.clientHeight / 2;
        }
    }

    // Open the viewer when a project image is clicked (works for pop-up content too)
    document.addEventListener('click', (e) => {
        const target = e.target.closest && e.target.closest(IMAGE_SELECTOR);
        if (target && !(box && box.contains(target))) {
            e.preventDefault();
            e.stopPropagation(); // don't let the click also close a project 6 pop-up
            open(target);
        }
    }, true);

    // Keyboard controls; captured first so Esc closes only the viewer, not the pop-up behind it
    document.addEventListener('keydown', (e) => {
        if (!box || !box.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft' && group.length > 1) show(index - 1);
        else if (e.key === 'ArrowRight' && group.length > 1) show(index + 1);
        else return;
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);

    // Mark clickable images so they show a zoom cursor
    function markImages() {
        document.querySelectorAll(IMAGE_SELECTOR).forEach(el => {
            el.classList.add('lightbox-enabled');
            el.title = el.title || 'Click to enlarge';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', markImages);
    } else {
        markImages();
    }
})();
