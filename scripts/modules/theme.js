import { generateFireflies } from './parallax.js';

/**
 * Téma váltó (sötét/világos mód) funkcionalitás.
 */
export function initThemeSwitcher() {
    let isAnimating = false;
    let rotation = -25;

    const themeCheckbox = document.getElementById('theme-checkbox');
    const htmlElement = document.documentElement;

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    };

    const animateThemeColors = (from, to, duration) => {
        const parallaxContainer = document.getElementById('parallax-container');
        const colorKeys = Object.keys(from);
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);

            colorKeys.forEach(key => {
                const fromColor = from[key];
                const toColor = to[key];
                if (!fromColor || !toColor) return;

                const r = fromColor[0] + (toColor[0] - fromColor[0]) * progress;
                const g = fromColor[1] + (toColor[1] - fromColor[1]) * progress;
                const b = fromColor[2] + (toColor[2] - fromColor[2]) * progress;
                
                if (fromColor.length === 4) {
                    const a = fromColor[3] + (toColor[3] - fromColor[3]) * progress;
                    parallaxContainer.style.setProperty(key, `rgba(${r}, ${g}, ${b}, ${a})`);
                } else {
                    parallaxContainer.style.setProperty(key, `rgb(${r}, ${g}, ${b})`);
                }
            });

            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    const toggleTheme = () => {
        if (isAnimating) return;
        isAnimating = true;

        const isDarkMode = htmlElement.classList.contains('dark');
        const celestialContainer = document.getElementById('celestial-container');
        const parallaxContainer = document.getElementById('parallax-container');
        const sun = document.getElementById('p-sun');
        const moonWrapper = document.getElementById('moon-wrapper');
        const moonCrescent = document.getElementById('p-moon');

        const lightThemeColors = {
            '--sky-top': hexToRgb("#BDEBFF"), '--sky-bottom': hexToRgb("#F0F9FF"),
            '--mountain-most-far': hexToRgb("#DDE8ED"), '--mountain-far': hexToRgb("#B1D4E0"),
            '--mountain-mid': hexToRgb("#75AABF"), '--mountain-near': hexToRgb("#4E8098"),
            '--trees-far': hexToRgb("#5E947A"), '--trees-near': hexToRgb("#2F6B52"),
            '--ground': hexToRgb("#739589"), '--grass-light': hexToRgb("#82a98c"),
            '--grass-dark': hexToRgb("#61896b"), '--water': hexToRgb("#a0d2eb"),
            '--rock': hexToRgb("#6B7280"), '--bush': hexToRgb("#5a8a6f"),
            '--mountain-most-far-top': hexToRgb("#EBF2F5"), '--mountain-far-top': hexToRgb("#C9DCE3"),
            '--mountain-mid-top': hexToRgb("#90B9CB"), '--mountain-near-top': hexToRgb("#6E97AB"),
            '--ground-top': hexToRgb("#8EAC9F"), '--trees-far-top': hexToRgb("#7BB09A"),
            '--trees-near-top': hexToRgb("#4F8B72"), '--rock-top': hexToRgb("#8A919C"),
            '--bush-top': hexToRgb("#7db093"), '--snow': hexToRgb("#f0f8ff"), '--snow-top': hexToRgb("#ffffff")
        };
        const darkThemeColors = {
            '--sky-top': hexToRgb("#011627"), '--sky-bottom': hexToRgb("#093A5B"),
            '--mountain-most-far': hexToRgb("#0D324D"), '--mountain-far': hexToRgb("#13425E"),
            '--mountain-mid': hexToRgb("#1A5B7D"), '--mountain-near': hexToRgb("#2776A1"),
            '--trees-far': hexToRgb("#133A2A"), '--trees-near': hexToRgb("#0B2118"),
            '--ground': hexToRgb("#214238"), '--grass-light': hexToRgb("#3a6b53"),
            '--grass-dark': hexToRgb("#2c513f"), '--water': hexToRgb("#4f8a9d"),
            '--rock': hexToRgb("#4A5568"), '--bush': hexToRgb("#2a5a44"),
            '--mountain-most-far-top': hexToRgb("#1E4966"), '--mountain-far-top': hexToRgb("#2A5F7E"),
            '--mountain-mid-top': hexToRgb("#3A7B9D"), '--mountain-near-top': hexToRgb("#4796C1"),
            '--ground-top': hexToRgb("#3C6255"), '--trees-far-top': hexToRgb("#235A3A"),
            '--trees-near-top': hexToRgb("#1B3128"), '--rock-top': hexToRgb("#6A7588"),
            '--bush-top': hexToRgb("#4a8a6f"), '--snow': hexToRgb("#b0c4de"), '--snow-top': hexToRgb("#d4e6f1")
        };

        const animationDuration = 1500;

        sun.style.transition = 'opacity 0.75s ease';
        moonWrapper.style.transition = 'opacity 0.75s ease';
        
        sun.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
        moonWrapper.style.transform = `translate(-50%, 50%)`;
        moonCrescent.style.transform = `rotate(${-rotation}deg)`;

        if (isDarkMode) {
            rotation += 180;
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeCheckbox.checked = false;
            const themeCheckboxMobile = document.getElementById('theme-checkbox-mobile');
            if (themeCheckboxMobile) themeCheckboxMobile.checked = false;
            
            celestialContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            sun.style.opacity = 1;
            moonWrapper.style.opacity = 0;

            animateThemeColors(darkThemeColors, lightThemeColors, animationDuration);
        } else {
            rotation += 180;
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeCheckbox.checked = true;
            const themeCheckboxMobile = document.getElementById('theme-checkbox-mobile');
            if (themeCheckboxMobile) themeCheckboxMobile.checked = true;

            celestialContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            sun.style.opacity = 0;
            moonWrapper.style.opacity = 1;

            animateThemeColors(lightThemeColors, darkThemeColors, animationDuration);
        }

        setTimeout(() => {
            if (rotation >= 335) {
                rotation -= 360;
                celestialContainer.classList.add('is-transitioning');
                celestialContainer.style.transform = `translate(-50%, -50%) rotate(-25deg)`;
                celestialContainer.offsetHeight;
                celestialContainer.classList.remove('is-transitioning');
            }
            Object.keys(lightThemeColors).forEach(key => parallaxContainer.style.removeProperty(key));
            isAnimating = false;
        }, animationDuration);
    };

    const applyInitialTheme = () => {
        const isDark = themeCheckbox.checked;
        htmlElement.classList.toggle('dark', isDark);
        const celestialContainer = document.getElementById('celestial-container');
        if (celestialContainer) {
            if (isDark) {
                rotation = 155;
                celestialContainer.classList.add('is-night');
            } else {
                rotation = -25;
                celestialContainer.classList.remove('is-night');
            }
        }
        const firefliesContainer = document.getElementById('p-fireflies');
        if (firefliesContainer) firefliesContainer.innerHTML = '';
        if (isDark) generateFireflies();
    };

    const savedTheme = localStorage.getItem('theme');
    themeCheckbox.checked = (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
    
    applyInitialTheme();

    document.body.addEventListener('change', (event) => {
        const target = event.target;
        if (target.id === 'theme-checkbox' || target.id === 'theme-checkbox-mobile') {
            event.preventDefault();
            target.checked = !target.checked;
            toggleTheme();
            setTimeout(updateAllLabels, 50);
        }
    });
}
