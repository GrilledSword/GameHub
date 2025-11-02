let isDarkMode = false;

// Projekt adatok (képek, technológiák)
const projectsData = {
    project_1: {
        images: ['IMG/pekka.gif', 'https://placehold.co/600x400/38bdf8/ffffff?text=Pekka-2', 'https://placehold.co/600x400/fbbf24/ffffff?text=Pekka-3'],
        tech: [
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', title: 'Unity' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', title: 'C#' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg', title: 'Blender' }
        ]
    },
    project_2: {
        images: ['IMG/mindscape.jpg', 'https://placehold.co/600x400/020617/ffffff?text=Mindscape-2', 'https://placehold.co/600x400/38bdf8/ffffff?text=Mindscape-3'],
        tech: [
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', title: 'Unity' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', title: 'C#' },
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg', title: 'Blender' }
        ]
    },
    project_3: {
        images: ['IMG/3d.jpg', 'IMG/Gallery/3d/1.jpg', 'IMG/Gallery/3d/2.jpg', 'IMG/Gallery/3d/3.jpg', 'IMG/Gallery/3d/4.jpg', 'IMG/Gallery/3d/5.jpg', 'IMG/Gallery/3d/6.jpg', 'IMG/Gallery/3d/7.jpg'],
        tech: [
            { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg', title: 'Blender' }
        ]
    },
    project_4: {
        images: ['https://wallpapers.com/images/high/dj-background-xuknuzdbw76k9r2n.webp', 'https://placehold.co/600x400/f8df38/ffffff?text=Music-2'],
        tech: [
            { src: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Audacity_Logo.svg', title: 'Audacity' }
        ]
    }
};

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
    lucide.createIcons();
    
    initInteractiveBackground();
    initThemeSwitcher();
    initLanguageSwitcher();
    initMobileMenu();
    initScrollObserver();
    initScrollDependents();
    initContactForm();
    initHeadlineAnimation();
    initProjectVideos();
    initProjectModals(); // Új funkció hozzáadása
}

// === MODULOK ==

function initInteractiveBackground() {
    const canvas = document.getElementById('interactive-background');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particlesArray;
    let celestialBody;
    let godRayAngle = 0;

    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    const themeConfig = {
        light: {
            bgGradient: ['#ffffff', '#e0f7fa'],
            particleColor: 'rgba(0, 119, 190, ALPHA)', // Alpha értéket dinamikusan cseréljük
            lineColor: 'rgba(0, 119, 190, 0.2)',
            celestial: {
                color: '#FFD700',
                glow1: 'rgba(255, 220, 100, 0.4)',
                glow2: 'rgba(255, 220, 100, 0.1)',
                rayColor: 'rgba(255, 215, 0, 0.15)'
            }
        },
        dark: {
            bgGradient: ['#020617', '#0f172a'],
            particleColor: 'rgba(56, 189, 248, ALPHA)', // Alpha értéket dinamikusan cseréljük
            lineColor: 'rgba(56, 189, 248, 0.15)',
            celestial: {
                color: '#f8fafc',
                glow1: 'rgba(160, 210, 255, 0.2)',
                glow2: 'rgba(160, 210, 255, 0.05)',
                rayColor: 'rgba(173, 216, 230, 0.1)'
            }
        }
    };
    let currentTheme = themeConfig.dark;

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Z-tengely szimuláció: 1 (közeli) és 4 (távoli) között.
            this.z = Math.random() * 3 + 1; 
            this.directionX = (Math.random() * .4) - .2;
            this.directionY = (Math.random() * .4) - .2;
            this.baseSize = 1.5;
            this.size = this.baseSize / this.z;
        }

        draw() {
            // A részecskék átlátszósága a mélységtől függ
            const alpha = (1 - (this.z -1) / 3) * 0.9;
            const color = currentTheme.particleColor.replace('ALPHA', alpha);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
        }

        update() {
            // A sebesség a mélységtől függ (a távolabbiak lassabbak)
            this.x += this.directionX / this.z;
            this.y += this.directionY / this.z;
            
            if (this.x > canvas.width + this.size || this.x < -this.size) this.directionX = -this.directionX;
            if (this.y > canvas.height + this.size || this.y < -this.size) this.directionY = -this.directionY;
            
            // Parallax egér interakció
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                // A közelebbi részecskéket jobban taszítja az egér
                const force = (mouse.radius - distance) / mouse.radius;
                const moveX = (dx / distance) * force * 5 / this.z;
                const moveY = (dy / distance) * force * 5 / this.z;
                this.x -= moveX;
                this.y -= moveY;
            }

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        // Mélység szerint rendezzük, hogy a távolabbiak legyenek hátul
        particlesArray.sort((a, b) => a.z - b.z); 
    }
    
    function connectParticles() {
        let maxDistance = (canvas.width / 8) > 120 ? 120 : (canvas.width/8);
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                 // Csak a hasonló mélységűeket kötjük össze
                if (Math.abs(particlesArray[a].z - particlesArray[b].z) > 0.8) continue;

                let distance = Math.sqrt(
                    Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + 
                    Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
                );

                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    const avgZ = (particlesArray[a].z + particlesArray[b].z) / 2;
                    const lineOpacity = (1 - (avgZ - 1) / 3) * 0.5; // Halványabb vonalak hátul
                    ctx.strokeStyle = currentTheme.lineColor.replace(/,\s*\d*\.?\d*\)/, `, ${opacity * lineOpacity})`);
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function drawCelestialBody() {
        celestialBody = {
            x: canvas.width - 120,
            y: 120,
            radius: 50
        };
        let glow = ctx.createRadialGradient(celestialBody.x, celestialBody.y, celestialBody.radius * 0.5, celestialBody.x, celestialBody.y, celestialBody.radius * 3);
        glow.addColorStop(0, currentTheme.celestial.glow1);
        glow.addColorStop(1, currentTheme.celestial.glow2);
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.arc(celestialBody.x, celestialBody.y, celestialBody.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentTheme.celestial.color;
        ctx.shadowColor = currentTheme.celestial.glow1;
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;
        
        if (document.documentElement.classList.contains('dark')) {
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath(); ctx.arc(celestialBody.x + 20, celestialBody.y - 15, 10, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(celestialBody.x - 15, celestialBody.y + 10, 7, 0, Math.PI * 2); ctx.fill();
        }
    }

    function drawGodRays() {
        const rays = 20;
        const rayLength = canvas.width * 1.5;
        const rayWidth = 0.08; // Sugár szélessége radiánban
        
        ctx.save();
        ctx.translate(celestialBody.x, celestialBody.y);
        ctx.rotate(godRayAngle);

        for (let i = 0; i < rays; i++) {
            let rotation = (i / rays) * Math.PI * 2;
            
            ctx.save();
            ctx.rotate(rotation);

            const gradient = ctx.createLinearGradient(0, 0, rayLength, 0);
            const rayColorFade = currentTheme.celestial.rayColor.replace(/,\s*\d*\.?\d*\)/, ', 0)');
            gradient.addColorStop(0, currentTheme.celestial.rayColor);
            gradient.addColorStop(0.3, rayColorFade);

            ctx.fillStyle = gradient;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, rayLength, -rayWidth, rayWidth, false);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
        
        ctx.restore();
        godRayAngle += 0.0003;
    }
    
    function animate() {
        requestAnimationFrame(animate);

        // Allow pausing when a modal animation is active to reduce jank
        if (window.__backgroundPaused) return;

        let bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, currentTheme.bgGradient[0]);
        bgGradient.addColorStop(1, currentTheme.bgGradient[1]);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawCelestialBody();
        drawGodRays();

        connectParticles();
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.updateBackgroundTheme = (isDark) => {
        currentTheme = isDark ? themeConfig.dark : themeConfig.light;
        // Nem kell külön frissíteni a részecskék színét, mert az a draw() függvényben történik minden képkockán
    };

    setCanvasSize();
    initParticles();
    window.updateBackgroundTheme(document.documentElement.classList.contains('dark'));
    animate();

    // Expose helpers to pause/resume the background animation (used during modal animations)
    window.pauseBackgroundAnimation = function() {
        window.__backgroundPaused = true;
    };
    window.resumeBackgroundAnimation = function() {
        window.__backgroundPaused = false;
    };
}

function initThemeSwitcher() {
    const themeCheckboxes = [document.getElementById('theme-checkbox'), document.getElementById('theme-checkbox-mobile')];
    
    const applyTheme = (isDark, shouldUpdateCheckboxes = false) => {
        isDarkMode = isDark;
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateAllLabels();

        if(shouldUpdateCheckboxes) {
            themeCheckboxes.forEach(cb => { if(cb) cb.checked = isDarkMode; });
        }
        
        // TAG: MODIFIED - Meghívja a háttér témafrissítő funkcióját.
        if (window.updateBackgroundTheme) {
            window.updateBackgroundTheme(isDarkMode);
        }
    };
    
    themeCheckboxes.forEach(checkbox => {
        if(checkbox) {
            checkbox.addEventListener('change', () => {
                applyTheme(checkbox.checked, true);
            });
        }
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(initialIsDark, true);
}

function initLanguageSwitcher() {
    const translations = {
        hu: {
            loader_text: "Töltés...",
            nav_home: "Kezdőlap", nav_about: "Rólam", nav_experience: "Tapasztalat", nav_skills: "Képességek", nav_projects: "Projektek", nav_contact: "Kapcsolat",
            theme_text: "Téma",
            hero_name: "Kiss Norbert",
            hero_roles: "Game Developer • Technical Artist • Workflow Innovator",
            hero_intro: "Szenvedélyem a problémamegoldás és az alkotás, legyen szó építőipari tervekről vagy egyedi szoftveres megoldásokról. Folyamatosan keresem az új kihívásokat és a fejlődési lehetőségeket.",
            hero_contact_btn: "Kapcsolat", hero_projects_btn: "Projektjeim",
            about_title: "Rólam",
            about_p1: "Mélyépítő és magasépítő technikusként precíz és strukturált gondolkodásmódot sajátítottam el, amit a programozás világában is kamatoztatok. A két terület ötvözése egyedi perspektívát ad: egyszerre látom a nagy képet és a legapróbb részleteket is. Szabadidőmben szeretek új technológiákat felfedezni (mint a C# és .NET), adat-analitikával foglalkozni, és kreatív projekteken dolgozni, mint például a Pekka Kana 2 játék remake-je Unity-ben.",
            about_p2: "Hiszek az élethosszig tartó tanulásban és abban, hogy a legjobb eredményeket csapatmunkával lehet elérni. Célom, hogy olyan megoldásokat hozzak létre, amik nem csak funkcionálisak, de felhasználói élményt is nyújtanak.",
            about_philosophy_title: "Filozófiám", about_philosophy_text: "Tiszta kód, átgondolt dizájn, hatékony megoldások.",
            about_goal_title: "Célom", about_goal_text: "Folyamatos fejlődés és maradandó érték teremtése.",
            experience_title: "Szakmai Tapasztalat", experience_subtitle: "Az építőipartól a szoftverfejlesztésig szerteágazó területeken szereztem tapasztalatot.",
            exp_1_role: "Összeszerelő operátor", exp_2_role: "Tetőtervező és rajzoló", exp_3_role: "Grafikus, Webshop kezelés", exp_4_role: "Épület-karbantartó (Gyakorlat)", exp_5_role: "Segédmunkás (Gyakorlat)",
            education_title: "Tanulmányok", education_subtitle: "Ahol a tudásomat szereztem.",
            edu_1_date: "2024 - Jelenleg", edu_1_degree: "Ács", edu_2_degree: "Tetőfedő", edu_3_degree: "C# programozás és .NET", edu_4_degree: "Data Analyst képzés", edu_5_degree: "Magasépítő Technikus", edu_6_degree: "Mélyépítő Technikus",
            skills_title: "Képességek", skills_subtitle: "Folyamatosan fejlesztem magam a legújabb technológiák terén.",
            skills_tech_stack_title: "Tech Stack Highlights", skills_tech_stack_tools: "Kiemelt Eszközeim:",
            skills_technical_title: "Technikai Képességek",
            skills_soft_title: "Soft Skillek", skill_soft_1: "Problémamegoldás", skill_soft_2: "Csapatmunka", skill_soft_3: "Fejlődési vágy", skill_soft_4: "Kommunikáció",
            projects_title: "Kiemelt Projektjeim", projects_subtitle: "Néhány munka, amire büszke vagyok.",
            project_1_title: "Pekka Kana 3D", project_1_desc: "A klasszikus játék modern köntösben, Unity motorral és Blenderben készített modellekkel.",
            project_2_title: "Mindscape", project_2_desc: "Egy interaktív horror anomália kereső játék.",
            project_3_title: "3D Modell Galéria", project_3_desc: "Blenderben készült 3D modellek bemutatása, a koncepciótól a végső renderelésig.",
            project_4_title: "Zenéim", project_4_desc: "Audacityben készült zenéim bemutatása.",
            project_gallery_link: "Galéria", project_demo_link: "Demó",
            contact_title: "Lépjünk kapcsolatba!", contact_subtitle: "Nyitott vagyok új lehetőségekre és együttműködésekre. Keress bizalommal!",
            form_name: "Név", form_name_placeholder: "A te neved",
            form_email: "Email", form_email_placeholder: "email@cim.hu",
            form_message: "Üzenet", form_message_placeholder: "Ide írd az üzeneted...",
            form_privacy: 'Elolvastam és elfogadom az <a href="#" class="underline hover:text-accent" data-lang-key="form_privacy_link">Adatvédelmi Tájékoztatót</a>.',
            form_privacy_link: "Adatvédelmi Tájékoztatót",
            form_submit_btn: "Üzenet Küldése",
            form_status_sending: "Küldés...", form_status_success: "Köszönöm az üzenetet! Hamarosan válaszolok.", form_status_error: "Hoppá! Hiba történt: ",
            contact_info_title: "Elérhetőségek", contact_location: "Nyíregyháza, Magyarország",
            contact_social_prompt: "Vagy keress meg itt:",
            footer_copyright: "© 2025 Kiss Norbert. Minden jog fenntartva.",
            lang_hu: "Magyar",
            lang_en: "English"
        },
        en: {
            loader_text: "Loading...",
            nav_home: "Home", nav_about: "About", nav_experience: "Experience", nav_skills: "Skills", nav_projects: "Projects", nav_contact: "Contact",
            theme_text: "Theme",
            hero_name: "Norbert Kiss",
            hero_roles: "Game Developer • Technical Artist • Workflow Innovator",
            hero_intro: "My passion is problem-solving and creation, whether it's construction plans or custom software solutions. I am constantly seeking new challenges and opportunities for growth.",
            about_title: "About Me",
            about_p1: "As a civil and structural engineering technician, I have acquired a precise and structured way of thinking, which I also leverage in the world of programming. The combination of these two fields gives me a unique perspective: I see both the big picture and the smallest details. In my free time, I enjoy exploring new technologies (like C# and .NET), working with data analytics, and developing creative projects, such as the remake of the Pekka Kana 2 game in Unity.",
            about_p2: "I believe in lifelong learning and that the best results are achieved through teamwork. My goal is to create solutions that are not only functional but also provide a great user experience.",
            about_philosophy_title: "My Philosophy", about_philosophy_text: "Clean code, thoughtful design, effective solutions.",
            about_goal_title: "My Goal", about_goal_text: "Continuous improvement and creating lasting value.",
            experience_title: "Professional Experience", experience_subtitle: "From the construction industry to software development, I have gained experience in diverse fields.",
            exp_1_role: "Assembly Operator", exp_2_role: "Roof Designer and Draftsman", exp_3_role: "Graphic Designer, E-commerce Management", exp_4_role: "Building Maintenance (Internship)", exp_5_role: "Laborer (Internship)",
            education_title: "Education", education_subtitle: "Where I gained my knowledge.",
            edu_1_date: "2024 - Present", edu_1_degree: "Carpenter", edu_2_degree: "Roofer", edu_3_degree: "C# Programming and .NET", edu_4_degree: "Data Analyst Training", edu_5_degree: "Structural Engineering Technician", edu_6_degree: "Civil Engineering Technician",
            skills_title: "Skills", skills_subtitle: "I am constantly developing myself in the latest technologies.",
            skills_tech_stack_title: "Tech Stack Highlights", skills_tech_stack_tools: "My Go-To Tools:",
            skills_technical_title: "Technical Skills",
            skills_soft_title: "Soft Skills", skill_soft_1: "Problem Solving", skill_soft_2: "Teamwork", skill_soft_3: "Eagerness to Learn", skill_soft_4: "Communication",
            projects_title: "Featured Projects", projects_subtitle: "A few works I'm proud of.",
            project_1_title: "Pekka Kana 3D", project_1_desc: "The classic game in a modern look, with the Unity engine and models created in Blender.",
            project_2_title: "Mindscape", project_2_desc: "An interactive horror anomaly hunting game.",
            project_3_title: "3D Model Gallery", project_3_desc: "Showcasing 3D models made in Blender, from concept to final render.",
            project_4_title: "My Music", project_4_desc: "Presenting my music tracks created in Audacity.",
            project_gallery_link: "Gallery", project_demo_link: "Demo",
            contact_title: "Let's Get in Touch!", contact_subtitle: "I am open to new opportunities and collaborations. Feel free to reach out!",
            form_name: "Name", form_name_placeholder: "Your name",
            form_email: "Email", form_email_placeholder: "you@example.com",
            form_message: "Message", form_message_placeholder: "Your message here...",
            form_privacy: 'I have read and agree to the <a href="#" class="underline hover:text-accent" data-lang-key="form_privacy_link">Privacy Policy</a>.',
            form_privacy_link: "Privacy Policy",
            form_submit_btn: "Send Message",
            form_status_sending: "Sending...", form_status_success: "Thank you for your message! I will get back to you soon.", form_status_error: "Oops! There was an error: ",
            contact_info_title: "Contact Information", contact_location: "Nyíregyháza, Hungary",
            contact_social_prompt: "Or find me here:",
            footer_copyright: "© 2025 Norbert Kiss. All rights reserved.",
            lang_hu: "Hungarian",
            lang_en: "English"
        }
    };
    const flagSVGs = {
        hu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><path fill="#D52B1E" d="M0 0h900v200H0z"/><path fill="#fff" d="M0 200h900v200H0z"/><path fill="#436F4D" d="M0 400h900v200H0z"/></svg>`,
        en: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6" clip-path="url(#a)"/><path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="4" clip-path="url(#a)"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" clip-path="url(#a)"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6" clip-path="url(#a)"/></svg>`
    };
    const langCheckboxes = [document.getElementById('lang-checkbox'), document.getElementById('lang-checkbox-mobile')];
    
    const setLanguage = (lang, shouldUpdateCheckboxes = false) => {
        if (!translations[lang]) return;
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang][key]) {
                if (el.children.length > 0 && el.innerHTML.includes('<a')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        document.querySelectorAll('[data-lang-placeholder-key]').forEach(el => {
            const key = el.getAttribute('data-lang-placeholder-key');
            if (translations[lang][key]) el.placeholder = translations[lang][key];
        });
        document.querySelectorAll('[data-lang-title-key]').forEach(el => {
            const key = el.getAttribute('data-lang-title-key');
            if (translations[lang][key]) el.title = translations[lang][key];
        });
        if(shouldUpdateCheckboxes) {
            langCheckboxes.forEach(cb => { if(cb) cb.checked = (lang === 'en'); });
        }
        updateAllLabels();
    };
    
    langCheckboxes.forEach(checkbox => {
        if(checkbox) {
            checkbox.addEventListener('change', () => {
                const newLang = checkbox.checked ? 'en' : 'hu';
                setLanguage(newLang, true);
            });
        }
    });

    document.querySelectorAll('.lang-bg-hu').forEach(c => { c.innerHTML = flagSVGs.hu.replace('<svg', '<svg preserveAspectRatio="xMidYMid slice"'); });
    document.querySelectorAll('.lang-bg-en').forEach(c => { c.innerHTML = flagSVGs.en; });

    const initialLang = localStorage.getItem('language') || (navigator.language.startsWith('hu') ? 'hu' : 'en');
    setLanguage(initialLang, true);
}
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');
    const playerContainer = document.getElementById('music-player-container');
    const desktopParent = playerContainer.parentElement;

    if (!menuToggle || !mainNav) return;

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
            if (mainNav.classList.contains('is-open')) toggleMenu();
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1700 && mainNav.classList.contains('is-open')) {
            toggleMenu();
        }
    });
}
function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}
function initScrollDependents() {
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('progress-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!header) return;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);
        if (progressBar) {
            const scrollPercent = (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }
        let currentSectionId = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - header.offsetHeight - 20) {
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
function initContactForm() {
    const form = document.getElementById('contact-form');
    const privacyCheckbox = document.getElementById('privacy-checkbox');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    if (!form || !privacyCheckbox || !submitButton) return;

    const toggleSubmitButton = () => {
        submitButton.disabled = !privacyCheckbox.checked;
    };
    privacyCheckbox.addEventListener('change', toggleSubmitButton);
    toggleSubmitButton();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitButton.disabled) return;
        
        formStatus.textContent = 'Küldés...';
        formStatus.style.color = '';
        const ACCESS_KEY = "ea3ee64e-18cf-474f-a346-4de5d181a546";
        const formData = new FormData(form);
        formData.append("access_key", ACCESS_KEY);

        try {
            const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
            const result = await response.json();
            if (result.success) {
                formStatus.textContent = document.querySelector('[data-lang-key="form_status_success"]').textContent;
                formStatus.style.color = '#10B981';
                form.reset();
                toggleSubmitButton();
            } else {
                throw new Error(result.message || 'Ismeretlen hiba.');
            }
        } catch (error) {
            formStatus.textContent = `${document.querySelector('[data-lang-key="form_status_error"]').textContent} ${error.message}`;
            formStatus.style.color = '#EF4444';
        } finally {
            setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000);
        }
    });
}
function initHeadlineAnimation() {
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.textContent.trim();
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
function initProjectVideos() {
    document.querySelectorAll('.project-video').forEach(video => {
        const container = video.closest('.group');
        if (container) {
            container.addEventListener('mouseenter', () => video.play().catch(e => {}));
            container.addEventListener('mouseleave', () => video.pause());
        }
    });
}

// Projekt Modal kezelése
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const closeButton = document.getElementById('modal-close');
    const zoomBtn = document.getElementById('modal-zoom-btn');

    // Lightbox létrehozása, ha még nincs
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.inset = '0';
        lightbox.style.background = 'rgba(0,0,0,0.95)';
        lightbox.style.zIndex = '99999';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        lightbox.style.transition = 'opacity 0.3s';
        lightbox.innerHTML = `<img id="lightbox-img" src="" style="max-width:90vw; max-height:85vh; border-radius:1rem; box-shadow:0 0 40px #000;" alt="Nagyított kép"><button id="lightbox-close" style="position:absolute;top:2rem;right:2rem;background:#fff;padding:0.5rem 1rem;border-radius:2rem;font-size:1.5rem;z-index:2;">&times;</button>`;
        document.body.appendChild(lightbox);
    }
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function showLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'auto';
        lightbox.classList.add('visible');
        document.body.classList.add('modal-open');
    }
    function hideLightbox() {
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        lightbox.classList.remove('visible');
        document.body.classList.remove('modal-open');
    }
    // Lightbox / zoom handlers (single set)
    zoomBtn.addEventListener('click', () => showLightbox(modalMainImage.src));
    lightboxClose.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) hideLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideLightbox(); });

    // Keep track of last launch info so we can animate back on close
    let lastLaunchInfo = null;
    // Lock to prevent overlapping animations
    let animationLock = false;

    // Galéria megnyitása gombra kattintás
    document.querySelectorAll('[data-gallery-btn]').forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = btn.closest('.group');
            if (!projectCard) return;

            const projectKey = `project_${idx + 1}`;
            const projectData = projectsData[projectKey];
            const title = projectCard.querySelector('h3').textContent;
            const description = projectCard.querySelector('p').textContent;
            const mainImage = projectData.images[0];
            const techStack = projectData.tech;

            // Capture button rect and keep reference to the button
            const targetBtn = e.currentTarget || btn;
            const btnRect = targetBtn.getBoundingClientRect();

            lastLaunchInfo = { btnRect, btn: targetBtn };
            // Accessibility: mark modal dialog attributes
            modal.setAttribute('aria-hidden', 'false');
            modalContent.setAttribute('role', 'dialog');
            modalContent.setAttribute('aria-modal', 'true');
            modalContent.setAttribute('aria-labelledby', 'modal-title');

            // Prepare modal overlay and position modalContent over the button (fixed to viewport)
            modal.classList.add('visible');
            modal.style.pointerEvents = 'auto';
            modal.style.opacity = '1';

            modalContent.style.transition = 'none';
            modalContent.style.position = 'fixed';
            modalContent.style.transformOrigin = 'top left';
            modalContent.style.left = `${btnRect.left}px`;
            modalContent.style.top = `${btnRect.top}px`;
            modalContent.style.width = `${btnRect.width}px`;
            modalContent.style.height = `${btnRect.height}px`;
            modalContent.style.opacity = '0.9';
            modalContent.style.filter = 'blur(12px)';

            // Populate and animate
            openModal(title, description, mainImage, techStack, projectData.images, lastLaunchInfo);
        });
    });

    // --- Animációs beállítások (egységesített, nem pattogós easing) ---
    // Use a smooth ease-out transform (GPU-accelerated) and matching timings for open/close.
    modalContent.style.transition = 'transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease-out, filter 320ms ease-out';
    modalContent.style.transform = 'scale(0.85)';
    modalContent.style.opacity = '0';
    modalContent.style.filter = 'blur(16px)';
    modal.style.transition = 'opacity 420ms ease-out';
    modal.style.opacity = '0';

    // Modal bezárása (transform-based reverse animation)
    function closeModal() {
        if (lastLaunchInfo && lastLaunchInfo.btn) {
            const targetBtn = lastLaunchInfo.btn;
            // Prefer the original captured rect (launch time) for symmetry; fallback to current rect
            const btnRect = (lastLaunchInfo && lastLaunchInfo.btnRect) ? lastLaunchInfo.btnRect : targetBtn.getBoundingClientRect();

            // Compute final modal rect (same logic as open)
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Tuned final modal size (92% width, 86% height) with reasonable caps
            const finalWidth = Math.min(vw * 0.92, 1100);
            const finalHeight = Math.min(vh * 0.86, 820);
            let finalLeft = Math.round((vw - finalWidth) / 2);
            let finalTop = Math.round((vh - finalHeight) / 2);
            if (finalLeft < 0) finalLeft = 0;
            if (finalTop < 0) finalTop = 0;

            // Ensure modalContent is fixed at final rect
            modalContent.style.position = 'fixed';
        modalContent.style.boxSizing = 'border-box';
        modalContent.style.left = `${finalLeft}px`;
        modalContent.style.top = `${finalTop}px`;
        modalContent.style.width = `${finalWidth}px`;
        modalContent.style.height = `${finalHeight}px`;
        modalContent.style.maxHeight = '90vh';
        modalContent.style.maxWidth = '95vw';
        modalContent.style.transformOrigin = 'top left';

        // Force layout to get the actual size after CSS constraints (max-height/max-width)
        const actualRect = modalContent.getBoundingClientRect();
        const actualWidth = Math.round(actualRect.width);
        const actualHeight = Math.round(actualRect.height);
        // Recenter according to the actual rendered size so the modal is truly centered
        finalLeft = Math.round((vw - actualWidth) / 2);
        finalTop = Math.round((vh - actualHeight) / 2);
        modalContent.style.left = `${finalLeft}px`;
        modalContent.style.top = `${finalTop}px`;
            // Use top-left origin so translate deltas map directly to left/top math
            modalContent.style.transformOrigin = 'top left';

            // Compute delta from final to button (viewport coords)
            const deltaX = Math.round(btnRect.left - finalLeft);
            const deltaY = Math.round(btnRect.top - finalTop);
            const startScale = btnRect.width / actualWidth;

            // Animate using transform for smooth GPU-accelerated motion
            // add animating class to reduce paint cost during transition and pause heavy background
            document.body.classList.add('animating-modal');
            if (window.pauseBackgroundAnimation) window.pauseBackgroundAnimation();
            modalContent.style.willChange = 'transform, opacity';
            modalContent.style.boxShadow = '0 20px 60px rgba(2,6,23,0.35)';
            requestAnimationFrame(() => {
                modalContent.style.transition = 'transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease-out, filter 320ms ease-out';
                requestAnimationFrame(() => {
                    modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${startScale})`;
                    modalContent.style.opacity = '0.85';
                    modal.style.opacity = '0';
                    modal.style.pointerEvents = 'none';

                    setTimeout(() => {
                        modal.classList.remove('visible');
                        document.body.classList.remove('modal-open');
                        // reset styles
                        modalContent.style.position = '';
                        modalContent.style.left = '';
                        modalContent.style.top = '';
                        modalContent.style.width = '';
                        modalContent.style.height = '';
                        modalContent.style.transform = '';
                        modalContent.style.opacity = '';
                        modalContent.style.transition = 'transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease-out, filter 320ms ease-out';
                        modalContent.style.willChange = '';
                        modalContent.style.boxShadow = '';
                        document.body.classList.remove('animating-modal');
                        if (window.resumeBackgroundAnimation) window.resumeBackgroundAnimation();
                        animationLock = false;
                        // restore focus to the originating button
                        try { if (lastLaunchInfo && lastLaunchInfo.btn) lastLaunchInfo.btn.focus(); } catch (e) {}
                        // hide from assistive tech
                        modal.setAttribute('aria-hidden', 'true');
                    }, 460);
                });
            });
        } else {
            // fallback
            // fallback close: animate shrink, then cleanup and resume
            if (animationLock) return; animationLock = true;
            modalContent.style.transform = 'scale(0.85)';
            modalContent.style.opacity = '0';
            modalContent.style.filter = 'blur(16px)';
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            setTimeout(() => {
                modal.classList.remove('visible');
                document.body.classList.remove('modal-open');
                if (window.resumeBackgroundAnimation) window.resumeBackgroundAnimation();
                animationLock = false;
                try { if (lastLaunchInfo && lastLaunchInfo.btn) lastLaunchInfo.btn.focus(); } catch (e) {}
                modal.setAttribute('aria-hidden', 'true');
            }, 500);
        }
        lastLaunchInfo = null;
    }

    // Modal megnyitása
    function openModal(title, description, mainImage, techStack, images, launchInfo) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalMainImage.src = mainImage;
        
        modalTechStack.innerHTML = techStack.map(tech => `
            <div class="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <img src="${tech.src}" alt="${tech.title}" title="${tech.title}" class="w-6 h-6">
                <span class="text-sm font-medium">${tech.title}</span>
            </div>
        `).join('');

        // Galéria képek betöltése
        modalThumbnails.innerHTML = '';
        images.forEach((imgSrc, i) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${title} - Kép ${i+1}`;
            // Use the .thumb-img class so the thumbnail slider CSS rules apply
            img.className = 'thumb-img object-cover rounded-lg transition-transform hover:scale-105';
            if(i === 0) img.classList.add('selected');
            img.addEventListener('click', () => {
                modalMainImage.src = img.src;
                document.querySelectorAll('#modal-thumbnails img').forEach(thumb => {
                    thumb.classList.remove('selected');
                });
                img.classList.add('selected');
            });
            modalThumbnails.appendChild(img);
        });

        document.body.classList.add('modal-open');

        // If we have launch info, animate from that rect to centered modal using transforms
        if (launchInfo && launchInfo.btnRect && launchInfo.btn) {
            const btnRect = launchInfo.btnRect;

            // measure viewport and compute final size/position
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const finalWidth = Math.min(vw * 0.92, 1100);
            const finalHeight = Math.min(vh * 0.86, 820);
            let finalLeft = Math.round((vw - finalWidth) / 2);
            let finalTop = Math.round((vh - finalHeight) / 2);
            if (finalLeft < 0) finalLeft = 0;
            if (finalTop < 0) finalTop = 0;

            // Ensure modalContent is fixed at final rect (we animate transform from button to this final rect)
            modalContent.style.position = 'fixed';
            modalContent.style.left = `${finalLeft}px`;
            modalContent.style.top = `${finalTop}px`;
            modalContent.style.width = `${finalWidth}px`;
            modalContent.style.height = `${finalHeight}px`;
            modalContent.style.maxHeight = '90vh';
            modalContent.style.maxWidth = '95vw';
            modalContent.style.boxSizing = 'border-box';
            modalContent.style.transformOrigin = 'top left';

            // Force layout to compute actual rendered size (respecting max-width/max-height)
            const actualRectOpen = modalContent.getBoundingClientRect();
            const actualWidthOpen = Math.round(actualRectOpen.width);
            const actualHeightOpen = Math.round(actualRectOpen.height);
            // Recenter using the actual size so the modal is truly centered
            finalLeft = Math.round((vw - actualWidthOpen) / 2);
            finalTop = Math.round((vh - actualHeightOpen) / 2);
            modalContent.style.left = `${finalLeft}px`;
            modalContent.style.top = `${finalTop}px`;

            // compute transform that moves/scales final rect to match button rect visually
            const deltaX = Math.round(btnRect.left - finalLeft);
            const deltaY = Math.round(btnRect.top - finalTop);
            const startScale = btnRect.width / actualWidthOpen;

            // Save final rect for close animation (use actual rendered size)
            lastLaunchInfo.final = { finalLeft, finalTop, finalWidth: actualWidthOpen, finalHeight: actualHeightOpen };

            // Start state: place modal at final rect but transformed so it looks like the button
            modalContent.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${startScale})`;
            modalContent.style.opacity = '0.9';
            modalContent.style.filter = 'blur(12px)';

            modal.classList.add('visible');
            modal.style.pointerEvents = 'auto';

            // animate to identity transform - add animating flag to reduce paint cost
            if (animationLock) return;
            animationLock = true;
            document.body.classList.add('animating-modal');
            if (window.pauseBackgroundAnimation) window.pauseBackgroundAnimation();
            modalContent.style.willChange = 'transform, opacity';
            // subtle box-shadow during animation for polish
            modalContent.style.boxShadow = '0 20px 60px rgba(2,6,23,0.35)';
            requestAnimationFrame(() => {
                // ensure transition matches the unified timing used elsewhere
                modalContent.style.transition = 'transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 320ms ease-out, filter 320ms ease-out';
                requestAnimationFrame(() => {
                    modalContent.style.transform = 'translate(0px, 0px) scale(1)';
                    modalContent.style.opacity = '1';
                    modalContent.style.filter = 'blur(0)';
                    modal.style.opacity = '1';

                    // After animation, clear will-change and animating flag
                    setTimeout(() => {
                        modalContent.style.willChange = '';
                        modalContent.style.boxShadow = '';
                        document.body.classList.remove('animating-modal');
                        if (window.resumeBackgroundAnimation) window.resumeBackgroundAnimation();
                        animationLock = false;
                        try { closeButton.focus(); } catch (e) {}
                    }, 460);
                });
            });
        } else {
            // simple fade/scale for cases without launch info
            modal.classList.add('visible');
            modal.style.pointerEvents = 'auto';
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
                modalContent.style.filter = 'blur(0)';
                modal.style.opacity = '1';
            }, 10);
        }
    }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}
function updateAllLabels() {
    const isEn = document.documentElement.lang === 'en';
    const themeText = isDarkMode ? (isEn ? 'Dark' : 'Sötét') : (isEn ? 'Light' : 'Világos');
    if(document.getElementById('lang-label')) document.getElementById('lang-label').textContent = isEn ? 'Lang' : 'Nyelv';
    if(document.getElementById('lang-label-mobile')) document.getElementById('lang-label-mobile').textContent = isEn ? 'Lang' : 'Nyelv';
    if(document.getElementById('theme-label')) document.getElementById('theme-label').textContent = themeText;
    if(document.getElementById('theme-label-mobile')) document.getElementById('theme-label-mobile').textContent = themeText;
}

