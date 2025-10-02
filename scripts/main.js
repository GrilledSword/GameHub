import { initThemeSwitcher } from './modules/theme.js';
import { initLanguageSwitcher } from './modules/language.js';
import { initMobileMenu, initScrollObserver, initScrollDependents } from './modules/ui.js';
import { initParallaxEffect, initShootingStars, initBirds, initFireflies } from './modules/parallax.js';
import { initContactForm } from './modules/contact_form.js';
import { initHeadlineAnimation, initProjectVideos } from './modules/animations.js';
import { generateForeground } from './modules/foreground.js';
import { onYouTubeIframeAPIReady } from './modules/music_player.js';

// A YouTube IFrame API visszahívásának globálissá tétele
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

const hideLoader = () => {
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
    }
};

window.addEventListener('load', hideLoader);
window.addEventListener('pageshow', (event) => {
    if (event.persisted) hideLoader();
});

function initializeApp() {
    // A lucide.createIcons() hívást helyezzük át ide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initThemeSwitcher();
    initLanguageSwitcher();
    initMobileMenu();
    initScrollObserver();
    initScrollDependents();
    initParallaxEffect();
    initContactForm();
    initHeadlineAnimation();
    initProjectVideos();
    generateForeground();
    initShootingStars();
    initBirds();
    initFireflies();
}
