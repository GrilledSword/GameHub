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

//async function setupBackground() {
    initParallaxEffect();
    initShootingStars();
    initBirds();
    initFireflies();
    generateForeground();
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

//function initializeApp() {
    // Initialize components that do not depend on the fetched SVG content.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initThemeSwitcher();
    initLanguageSwitcher();
    initMobileMenu();
    initScrollObserver();
    initScrollDependents();
    initContactForm();
    initHeadlineAnimation();
    initProjectVideos();

    // Fetch and set up the background, which will then initialize its own components.
    setupBackground();
