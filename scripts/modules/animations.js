/**
 * Hero szekció címsorának karakterenkénti animálása.
 */
export function initHeadlineAnimation() {
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.getAttribute('data-lang-key') ? headline.textContent.trim() : "Kiss Norbert";
        headline.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'headline-char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 50}ms`;
            headline.appendChild(span);
        });
    }
}

/**
 * Projekt videók automatikus lejátszása egérmutató fölé helyezésekor.
 */
export function initProjectVideos() {
    document.querySelectorAll('.project-video').forEach(video => {
        const container = video.closest('.group');
        if (container) {
            container.addEventListener('mouseenter', () => video.play().catch(e => {}));
            container.addEventListener('mouseleave', () => video.pause());
        }
    });
}
