/**
 * Parallax effektus inicializálása és kezelése görgetéskor.
 */
export function initParallaxEffect() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const handleParallaxScroll = () => {
        const scrollY = window.scrollY;
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0;
            layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
    };

    window.addEventListener('scroll', handleParallaxScroll, { passive: true });
    handleParallaxScroll();
}

/**
 * Hullócsillagok inicializálása.
 */
export function initShootingStars() {
    const shootingStars = document.querySelectorAll('.shooting-star');
    shootingStars.forEach(star => {
        star.style.setProperty('--top', `${Math.random() * 60}%`);
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        star.style.setProperty('--delay', `${Math.random() * 10}s`);
        star.style.setProperty('--scale', `${0.5 + Math.random() * 0.8}`);
    });
}

/**
 * Madarak generálása és animálása.
 */
export function initBirds() {
    const birdContainer = document.getElementById('p-birds');
    if (!birdContainer) return;

    const birdPaths = [
        "M0,5 C5,0 15,0 20,5 L10,2 Z",
        "M0,4 C5,2 15,2 20,4 L10,3 Z",
        "M0,6 C5,-2 15,-2 20,6 L10,1 Z",
        "M0,5 C8,8 12,8 20,5 L10,6 Z",
        "M0,5 C3,2 17,2 20,5 L10,4 Z"
    ];

    const birdCount = 5;
    let birdHTML = '';

    for (let i = 0; i < birdCount; i++) {
        const isReversed = Math.random() > 0.5;
        const birdPath = birdPaths[Math.floor(Math.random() * birdPaths.length)];
        
        const bird = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        bird.setAttribute('class', `bird ${isReversed ? 'fly-reverse' : ''}`);
        bird.setAttribute('viewBox', '0 0 20 10');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', birdPath);
        bird.appendChild(path);

        bird.style.setProperty('--top', `${15 + Math.random() * 40}%`);
        bird.style.setProperty('--duration', `${25 + Math.random() * 20}s`);
        bird.style.setProperty('--delay', `-${Math.random() * 45}s`);
        bird.style.setProperty('--scale', `${0.5 + Math.random() * 0.7}`);

        birdContainer.appendChild(bird);
    }
}

/**
 * Szentjánosbogarak inicializálása és generálása sötét módban.
 */
export function initFireflies() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        generateFireflies();
    }
}

export function generateFireflies() {
    const container = document.getElementById('p-fireflies');
    if (!container) return;
    
    container.innerHTML = '';
    const fireflyCount = 15;

    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        firefly.style.left = `${Math.random() * 100}%`;
        firefly.style.top = `${60 + Math.random() * 35}%`;
        firefly.style.animationDelay = `-${Math.random() * 4}s, -${Math.random() * 10}s`;

        container.appendChild(firefly);
    }
}
