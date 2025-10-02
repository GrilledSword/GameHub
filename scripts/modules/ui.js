/**
 * Mobil menü funkcionalitás.
 */
export function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');
    
    const playerContainer = document.getElementById('music-player-container');
    const desktopParent = playerContainer.parentElement; 
    const mobileTarget = mainNav.querySelector('.md\:hidden');

    if (menuToggle && mainNav && playerContainer && desktopParent && mobileTarget) {
        const toggleMenu = () => {
            const isOpen = mainNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active', isOpen);
            document.getElementById('main-header').classList.toggle('menu-open', isOpen);

            if (isOpen) {
                mainNav.appendChild(playerContainer);
            } else {
                desktopParent.appendChild(playerContainer);
            }
        };
        
        menuToggle.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                     toggleMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1700 && mainNav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    }
}

/**
 * Intersection Observer beállítása a görgetésre feltűnő elemekhez.
 */
export function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}

/**
 * A görgetéstől függő elemek (header, progress bar, nav linkek) kezelése.
 */
export function initScrollDependents() {
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');
    if (!header) return;

    const handleScroll = () => {
        const scrollY = window.scrollY;

        header?.classList.toggle('scrolled', scrollY > 50);

        if (progressBar) {
            const scrollPercent = (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }
        
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - header.offsetHeight - 20) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });

        backToTopButton?.classList.toggle('visible', scrollY > window.innerHeight * 0.8);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}
