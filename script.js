
        // === ALKALMAZÁS INICIALIZÁLÁSA ===
        document.addEventListener('DOMContentLoaded', () => {
            // Fő inicializáló függvény, ami lefut, miután a DOM betöltődött.
            initializeApp();
        });
        
        /**
         * A betöltő képernyő elrejtése.
         * A 'load' és 'pageshow' eseményekre is be van kötve, hogy biztosan
         * lefusson, még akkor is, ha az oldal a böngésző gyorsítótárából (bfcache) töltődik be,
         * ami gyakori probléma iOS eszközökön.
         */
        const hideLoader = () => {
            // --- MODIFICATION: Check if already loaded to prevent re-running ---
            if (!document.body.classList.contains('loaded')) {
                document.body.classList.add('loaded');
            }
        };

        // Eseményfigyelők a betöltő képernyő elrejtéséhez
        window.addEventListener('load', hideLoader);
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) hideLoader(); // Run only if loaded from bfcache
        });

        /**
         * Az alkalmazás fő inicializáló függvénye. Meghívja az összes többi
         * inicializáló modult a megfelelő sorrendben.
         */
        function initializeApp() {
            lucide.createIcons(); // Lucide ikonok inicializálása
            
            // Komponensek és funkciók inicializálása
            initThemeSwitcher();
            initLanguageSwitcher(); // ADDED: Language switcher initialization
            initMobileMenu(); // ADDED: Mobile menu initialization
            initScrollObserver();
            initScrollDependents();
            initParallaxEffect();
            initContactForm();
            initHeadlineAnimation();
            initProjectVideos();
            generateForeground();
            initShootingStars(); // ADDED: Initialize shooting stars
            initBirds(); // ADDED: Initialize birds
            initFireflies(); // ADDED: Initialize fireflies
        }

        // === MODULOK ===

        /**
         * ADDED: Nyelvváltó funkcionalitás.
         * Kezeli a gombok állapotát, frissíti a tartalmat és menti a választást.
         */
        function initLanguageSwitcher() {
            // --- Data ---
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
                    hero_contact_btn: "Contact", hero_projects_btn: "My Projects",
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

            // --- DOM Elements ---
            const langCheckbox = document.getElementById('lang-checkbox');
            const huFlagContainer = document.querySelector('.lang-bg-hu');
            const enFlagContainer = document.querySelector('.lang-bg-en');
            const setLanguage = (lang) => {
                if (!translations[lang]) return;

                // 1. Update state and translations
                document.documentElement.lang = lang;
                localStorage.setItem('language', lang);

                document.querySelectorAll('[data-lang-key]').forEach(el => {
                    const key = el.getAttribute('data-lang-key');
                    if (translations[lang][key]) {
                        // Handle nested elements like in the privacy policy link
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

                // 2. Update the toggle state
                langCheckbox.checked = (lang === 'en');
                const langCheckboxMobile = document.getElementById('lang-checkbox-mobile');
                if (langCheckboxMobile) langCheckboxMobile.checked = (lang === 'en');

                // 3. Update labels
                updateAllLabels();
            };

            // --- Event Listeners ---
            // Use event delegation on the body to handle clicks on toggles that might not exist on page load
            document.body.addEventListener('change', (event) => {
                const target = event.target;
                if (target.id === 'lang-checkbox' || target.id === 'lang-checkbox-mobile') {
                    const newLang = target.checked ? 'en' : 'hu';
                    setLanguage(newLang);

                    // Sync the other toggle if it exists
                    const otherId = target.id === 'lang-checkbox' ? 'lang-checkbox-mobile' : 'lang-checkbox';
                    const otherCheckbox = document.getElementById(otherId);
                    if (otherCheckbox) otherCheckbox.checked = target.checked;
                }
            });

            // --- Initialization ---
            // Inject SVGs into the background containers
            document.querySelectorAll('.lang-bg-hu').forEach(container => {
                container.innerHTML = flagSVGs.hu.replace('<svg', '<svg preserveAspectRatio="xMidYMid slice"');
            });
            document.querySelectorAll('.lang-bg-en').forEach(container => {
                container.innerHTML = flagSVGs.en;
            });

            // Set initial language
            const initialLang = localStorage.getItem('language') || (navigator.language.startsWith('hu') ? 'hu' : 'en');
            setLanguage(initialLang);
        }

        /**
         * Téma váltó (sötét/világos mód) funkcionalitás.
         * Kezeli a checkbox állapotát és menti a választást a localStorage-be.
         */
        function initThemeSwitcher() {

            // --- MODIFICATION: Enhanced theme change with animation ---
            let isAnimating = false;
            let rotation = -25; // Initial rotation offset

            const animateColor = (from, to, duration, onUpdate) => {
            };

            const themeCheckbox = document.getElementById('theme-checkbox');
            const htmlElement = document.documentElement;

            const hexToRgb = (hex) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
            };

            // --- ADDED: Animate all theme colors ---
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
                        
                        // Handle colors with alpha channel
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

                // --- MODIFICATION: Define full color palettes ---
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

                // --- MODIFICATION: Counter-rotate crescent, not the wrapper ---
                sun.style.transition = 'opacity 0.75s ease';
                moonWrapper.style.transition = 'opacity 0.75s ease';
                
                sun.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
                moonWrapper.style.transform = `translate(-50%, 50%)`; // Wrapper position is static relative to container
                moonCrescent.style.transform = `rotate(${-rotation}deg)`; // Only crescent is counter-rotated

                if (isDarkMode) { // Dark to Light
                    rotation += 180;
                    htmlElement.classList.remove('dark'); // Change class immediately for non-animated properties
                    localStorage.setItem('theme', 'light');
                    themeCheckbox.checked = false;
                    const themeCheckboxMobile = document.getElementById('theme-checkbox-mobile');
                    if (themeCheckboxMobile) themeCheckboxMobile.checked = false;
                    
                    celestialContainer.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                    sun.style.opacity = 1;
                    moonWrapper.style.opacity = 0;

                    animateThemeColors(darkThemeColors, lightThemeColors, animationDuration);
                } else { // Light to Dark
                    rotation += 180;
                    htmlElement.classList.add('dark'); // Change class immediately
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
                    // Reset rotation to its base equivalent to loop seamlessly
                    if (rotation >= 335) { // -25 + 360
                        rotation -= 360;
                        celestialContainer.classList.add('is-transitioning');
                        celestialContainer.style.transform = `translate(-50%, -50%) rotate(-25deg)`;
                        celestialContainer.offsetHeight; // Force reflow
                        celestialContainer.classList.remove('is-transitioning');
                    }
                    // Clear inline styles from parallax container to revert to CSS classes
                    Object.keys(lightThemeColors).forEach(key => parallaxContainer.style.removeProperty(key));
                    isAnimating = false;
                }, animationDuration);
            };
            // A témaváltó eseménykezelője most már a fő alkalmazáslogikában van.
            // A feliratok frissítését az `updateAllLabels` függvény végzi,
            // amit a `setLanguage` és a `toggleTheme` függvények hívnak meg.

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
                // --- ADDED: Toggle fireflies on theme change ---
                const firefliesContainer = document.getElementById('p-fireflies');
                if (firefliesContainer) firefliesContainer.innerHTML = ''; // Clear existing
                if (isDark) generateFireflies(); // Generate new ones if dark
            };

            const savedTheme = localStorage.getItem('theme');
            themeCheckbox.checked = (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
            
            applyInitialTheme();

            document.body.addEventListener('change', (event) => {
                const target = event.target;
                if (target.id === 'theme-checkbox' || target.id === 'theme-checkbox-mobile') {
                    event.preventDefault();
                    target.checked = !target.checked; // Revert visual state for animation
                    toggleTheme();
                    setTimeout(updateAllLabels, 50); // Frissítjük a címkéket egy kis késleltetéssel
                }
            });
        }
        
        /**
         * ADDED: Mobile menu toggle functionality.
         */
        function initMobileMenu() {
            const menuToggle = document.getElementById('menu-toggle');
            const mainNav = document.getElementById('main-nav');
            const navLinks = mainNav.querySelectorAll('a');
            
            const playerContainer = document.getElementById('music-player-container');
            const desktopParent = playerContainer.parentElement; 
            const mobileTarget = mainNav.querySelector('.md\\:hidden');

            if (menuToggle && mainNav && playerContainer && desktopParent && mobileTarget) {
                const toggleMenu = () => {
                    const isOpen = mainNav.classList.toggle('is-open');
                    menuToggle.classList.toggle('is-active', isOpen);
                    document.getElementById('main-header').classList.toggle('menu-open', isOpen);

                    // TAG: MODIFIED - A lejátszót mostantól a menü (`mainNav`) végére helyezzük, nem a gombok mellé
                    if (isOpen) {
                        // Ha a menü nyitva, a lejátszó a mobil menü végére kerül
                        mainNav.appendChild(playerContainer);
                    } else {
                        // Ha a menü zárva, a lejátszó visszakerül az eredeti helyére
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

                const handleResize = () => {
                    if (window.innerWidth >= 1700) {
                        if (mainNav.classList.contains('is-open')) {
                            mainNav.classList.remove('is-open');
                            menuToggle.classList.remove('is-active');
                            document.getElementById('main-header').classList.remove('menu-open');
                            
                            if (!desktopParent.contains(playerContainer)) {
                                desktopParent.appendChild(playerContainer);
                            }
                        }
                    }
                };

                window.addEventListener('resize', handleResize);
            }
        }

        /**
         * Intersection Observer beállítása a görgetésre feltűnő elemekhez.
         * Hozzáadja a 'visible' class-t, amikor egy elem a nézetbe ér.
         */
        function initScrollObserver() {
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
        function initScrollDependents() {
            const header = document.getElementById('main-header');
            const progressBar = document.getElementById('progress-bar');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');
            const musicPlayerContainer = document.getElementById('music-player-container');
            const backToTopButton = document.getElementById('back-to-top'); // TAG: ADDED - Hiányzó változó deklarálása
            if (!header) return;

            const handleScroll = () => {
                const scrollY = window.scrollY;

                // Header stílusának váltása görgetéskor
                header?.classList.toggle('scrolled', scrollY > 50);

                // TAG: DELETED - A zenelejátszó dokkolásának logikája törölve
                
                // Progress bar frissítése
                if (progressBar) {
                    const scrollPercent = (scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
                    progressBar.style.width = `${scrollPercent}%`;
                }
                
                // Aktív navigációs link kiemelése
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

                // "Vissza a tetejére" gomb megjelenítése/elrejtése
                backToTopButton?.classList.toggle('visible', scrollY > window.innerHeight * 0.8);
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Kezdeti állapot beállítása
        }
        
        /**
         * Parallax effektus inicializálása és kezelése görgetéskor.
         */
        function initParallaxEffect() {
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
         * Kapcsolati űrlap kezelése.
         */
        function initContactForm() {
            const form = document.getElementById('contact-form');
            const privacyCheckbox = document.getElementById('privacy-checkbox');
            const submitButton = document.getElementById('submit-button');
            const formStatus = document.getElementById('form-status');
            if (!form || !privacyCheckbox || !submitButton) return;

            // Enable/disable submit button based on checkbox state
            const toggleSubmitButton = () => {
                submitButton.disabled = !privacyCheckbox.checked;
            };

            privacyCheckbox.addEventListener('change', toggleSubmitButton);
            toggleSubmitButton(); // Initial check

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (submitButton.disabled) return;
                if (formStatus) { // MODIFIED: Use translation key
                    formStatus.textContent = 'Küldés...';
                    formStatus.style.color = '';
                }

                // TODO: Cseréld ki a "YOUR_ACCESS_KEY_HERE" részt a saját Web3Forms Access Key-edre!
                const ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
                const formData = new FormData(form);
                formData.append("access_key", ACCESS_KEY);

                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.json();

                    if (result.success) {
                        formStatus.textContent = document.querySelector('[data-lang-key="form_status_success"]').textContent;
                        formStatus.style.color = '#10B981'; // zöld
                        form.reset();
                        toggleSubmitButton(); // Disable button after successful submission
                    } else {
                        throw new Error(result.message || 'Ismeretlen hiba történt.');
                    }
                } catch (error) { // MODIFIED: Use translation key
                    formStatus.textContent = `${document.querySelector('[data-lang-key="form_status_error"]').textContent} ${error.message}`;
                    formStatus.style.color = '#EF4444'; // piros
                } finally {
                    setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000);
                }
            });
        }

        /**
         * Hero szekció címsorának karakterenkénti animálása.
         */
        function initHeadlineAnimation() {
            const headline = document.getElementById('main-headline');
            if (headline) {
                const text = headline.getAttribute('data-lang-key') ? headline.textContent.trim() : "Kiss Norbert"; // Use default if key not yet processed
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
         * ADDED: Randomizes shooting star properties for a more realistic effect.
         */
        function initShootingStars() {
            const shootingStars = document.querySelectorAll('.shooting-star');
            shootingStars.forEach(star => {
                star.style.setProperty('--top', `${Math.random() * 60}%`);
                star.style.setProperty('--duration', `${2 + Math.random() * 4}s`); // Duration between 2s and 6s
                star.style.setProperty('--delay', `${Math.random() * 10}s`); // Delay up to 10s
                star.style.setProperty('--scale', `${0.5 + Math.random() * 0.8}`); // Scale between 0.5 and 1.3
            });
        }

        /**
         * ADDED: Generates and animates birds with random properties.
         */
        function initBirds() {
            const birdContainer = document.getElementById('p-birds');
            if (!birdContainer) return;

            const birdPaths = [
                "M0,5 C5,0 15,0 20,5 L10,2 Z", // Original bird
                "M0,4 C5,2 15,2 20,4 L10,3 Z", // Slimmer bird
                "M0,6 C5,-2 15,-2 20,6 L10,1 Z", // Deep wing flap
                "M0,5 C8,8 12,8 20,5 L10,6 Z", // Gull-like
                "M0,5 C3,2 17,2 20,5 L10,4 Z"  // Swift-like
            ];

            const birdCount = 5; // Let's add more birds
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
         * ADDED: Initializes and generates fireflies for dark mode.
         */
        function initFireflies() {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                generateFireflies();
            }
        }

        function generateFireflies() {
            const container = document.getElementById('p-fireflies');
            if (!container) return;
            
            container.innerHTML = ''; // Clear previous fireflies
            const fireflyCount = 15;

            for (let i = 0; i < fireflyCount; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                
                firefly.style.left = `${Math.random() * 100}%`;
                firefly.style.top = `${60 + Math.random() * 35}%`; // Position them in the lower part of the screen
                firefly.style.animationDelay = `-${Math.random() * 4}s, -${Math.random() * 10}s`;

                container.appendChild(firefly);
            }
        }
        
        /**
         * Projekt videók automatikus lejátszása egérmutató fölé helyezésekor.
         */
        function initProjectVideos() {
            document.querySelectorAll('.project-video').forEach(video => {
                const container = video.closest('.group');
                if (container) {
                    container.addEventListener('mouseenter', () => video.play().catch(e => {}));
                    container.addEventListener('mouseleave', () => video.pause());
                }
            });
        }
        
        /**
         * A zenelejátszó logikájának implementálása az initMusicPlayer függvényben. Ez magában foglalja a lejátszási lista kezelését, a vezérlőgombok (lejátszás, szünet, előző, következő) eseményfigyelőit, a lejátszási folyamatjelző sáv frissítését, valamint az egérráhúzásra aktiválódó animációt a mini és a teljes nézet között.
         */
        function onYouTubeIframeAPIReady() {
    initYouTubeMusicPlayer();
        }

        function initYouTubeMusicPlayer() {
    // === BEÁLLÍTÁSOK (Ezeket módosítsd!) ===
    // 1. Illeszd be ide a Google Cloud Console-ból kimásolt API kulcsodat!
    const API_KEY = 'AIzaSyBlT9YiS55OWLZRqOthROVVNGPnahGpe0U';
    
    // 2. Add meg a lejátszási lista URL-jét!
    const PLAYLIST_URL = 'https://www.youtube.com/watch?v=fSrwcaXLS5M&list=PLU3cs__9MK8Y4PHoHRH2eEdSKqSIpMsBn'; // Példa: Lofi Girl playlist

    // === DOM ELEMEK ===
    const playerContainer = document.getElementById('music-player-container');
    const playerElement = document.getElementById('music-player');
    const albumArt = document.getElementById('player-album-art');
    const title = document.getElementById('player-title');
    const progress = document.getElementById('player-progress');
    const progressContainer = document.getElementById('player-progress-container');
    const playBtn = document.getElementById('player-play');
    const prevBtn = document.getElementById('player-prev');
    const nextBtn = document.getElementById('player-next');

    if (!playerElement) return;
    
    // === VÁLTOZÓK ===
    let ytPlayer; // Ebben tároljuk a YouTube lejátszó objektumot
    let playlist = []; // Ide töltjük be a YouTube-ról lekért videó adatokat
    let currentTrackIndex = 0;
    let isReady = false;
    let progressInterval = null; // Időzítő a progress bar frissítéséhez

    // === API INICIALIZÁLÁS ===
    ytPlayer = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        playerVars: {
            'playsinline': 1 // iOS eszközökön fontos
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    // === ESEMÉNYKEZELŐ FÜGGVÉNYEK ===

    /**
     * Akkor hívódik meg, ha a YouTube lejátszó betöltődött és készen áll.
     */
    function onPlayerReady(event) {
        isReady = true;
        // Ha van API kulcs, betöltjük a lejátszási listát
        if (API_KEY && API_KEY !== 'IDE_ILLESZD_BE_A_YOUTUBE_API_KULCSODAT') {
            loadYouTubePlaylist();
        } else {
            title.textContent = "API kulcs hiányzik!";
            console.error("Kérlek, add meg a YouTube Data API v3 kulcsodat a script.js fájlban!");
        }
    }

    /**
     * Akkor hívódik meg, ha a lejátszó állapota megváltozik (pl. elindul, megáll, véget ér).
     */
function onPlayerStateChange(event) {
        updatePlayPauseIcon(event.data);
        
        // TAG: MODIFIED - A lejátszás végének kezelése a végtelenítéshez
        if (event.data === YT.PlayerState.ENDED) {
            // Manuálisan ugrunk a következőre és elindítjuk
            let nextIndex = (ytPlayer.getPlaylistIndex() + 1) % playlist.length;
            ytPlayer.playVideoAt(nextIndex);
            updatePlayerUI(nextIndex); // UI frissítése is fontos
        }
    }

    // === ADATBETÖLTÉS ===

    /**
     * Lekéri a lejátszási lista adatait a YouTube Data API segítségével.
     */
    async function loadYouTubePlaylist() {
        const playlistId = extractPlaylistId(PLAYLIST_URL);
        if (!playlistId) {
            title.textContent = "Érvénytelen lista URL";
            return;
        }

        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }
            
            // Feldolgozzuk a kapott videókat és elmentjük a saját 'playlist' tömbünkbe
            playlist = data.items.map(item => ({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.default.url
            }));

            // Betöltjük a videó ID-kat a YouTube lejátszóba
            const videoIds = playlist.map(track => track.videoId);
            ytPlayer.cuePlaylist(videoIds);
            
            // Frissítjük a UI-t az első dal adataival
            updatePlayerUI(0);
        } catch (error) {
            title.textContent = "Hiba a lista betöltésekor";
            console.error("YouTube API hiba:", error);
        }
    }
    
    // === VEZÉRLŐ FUNKCIÓK ===

    function playTrack() {
        if (!isReady || playlist.length === 0) return;
        ytPlayer.playVideo();
        startProgressUpdater();
    }

    function pauseTrack() {
        if (!isReady) return;
        ytPlayer.pauseVideo();
        stopProgressUpdater();
    }

function nextTrack() {
        if (!isReady || playlist.length === 0) return;
        // TAG: MODIFIED - A megbízhatóbb playVideoAt használata
        let nextIndex = (ytPlayer.getPlaylistIndex() + 1) % playlist.length;
        ytPlayer.playVideoAt(nextIndex);
        updatePlayerUI(nextIndex);
    }

    function prevTrack() {
        if (!isReady || playlist.length === 0) return;
        // TAG: MODIFIED - A megbízhatóbb playVideoAt használata
        let prevIndex = ytPlayer.getPlaylistIndex() - 1;
        if (prevIndex < 0) {
            prevIndex = playlist.length - 1; // Ugrás a lista végére
        }
        ytPlayer.playVideoAt(prevIndex);
        updatePlayerUI(prevIndex);
    }

    function seek(event) {
        if(!isReady || !ytPlayer.getDuration) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = rect.width;
        const duration = ytPlayer.getDuration();
        if (duration) {
            const seekTime = (clickX / width) * duration;
            ytPlayer.seekTo(seekTime, true);
            
            // TAG: ADDED - A folyamatjelző sáv azonnali vizuális frissítése tekeréskor
            const percent = (seekTime / duration) * 100;
            progress.style.width = `${percent}%`;
        }
    }

    // === UI FRISSÍTŐ FUNKCIÓK ===

    /**
     * Frissíti a borítóképet és a címet a lejátszóban.
     */
    function updatePlayerUI(trackIndex) {
        if (!playlist[trackIndex]) return;
        const track = playlist[trackIndex];
        title.textContent = track.title;
        albumArt.src = track.thumbnail;
    }

    /**
     * Frissíti a play/pause ikont a lejátszó állapota szerint.
     */
function updatePlayPauseIcon(playerState) {
        // TAG: ADDED - A lemezborító forgatásának vezérlése
        const albumArt = document.getElementById('player-album-art');

        if (playerState === YT.PlayerState.PLAYING) {
            playBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
            startProgressUpdater();
            albumArt.classList.add('is-playing'); // Elindítjuk a forgást
        } else {
            playBtn.innerHTML = '<i data-lucide="play" class="w-6 h-6"></i>';
            stopProgressUpdater();
            albumArt.classList.remove('is-playing'); // Leállítjuk a forgást
        }
        lucide.createIcons();
    }
    
    /**
     * Elindítja az időzítőt, ami másodpercenként frissíti a progress bar-t.
     */
    function startProgressUpdater() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const currentTime = ytPlayer.getCurrentTime();
            const duration = ytPlayer.getDuration();
            const percent = (duration > 0) ? (currentTime / duration) * 100 : 0;
            progress.style.width = `${percent}%`;
        }, 500); // Fél másodpercenként frissítünk
    }

    function stopProgressUpdater() {
        clearInterval(progressInterval);
    }


    // === SEGÉDFÜGGVÉNYEK ===

    /**
     * Kinyeri a lejátszási lista azonosítóját egy YouTube URL-ből.
     */
    function extractPlaylistId(url) {
        const regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2]) ? match[2] : null;
    }


    // === ESEMÉNYFIGYELŐK A GOMBOKHOZ ===

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const playerState = ytPlayer.getPlayerState();
        if (playerState === YT.PlayerState.PLAYING) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextTrack(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevTrack(); });
    progressContainer.addEventListener('click', seek);
        }
        
        /**
         * Az előtér (fák, fű, virágok) dinamikus generálása és rétegezése.
         * VISSZAÁLLÍTVA A BACKUP VERZIÓRA A MEGFELELŐ MEGJELENÉS ÉRDEKÉBEN.
         */
        function generateForeground() {
            const container = document.getElementById('foreground-elements');
            if (!container) return;

            // Talaj vonalának pontjai a koordináta-rendszerben
            const groundPoints = [
                [-10, 780], [100, 740], [250, 790], [400, 770], [600, 730],
                [800, 760], [1000, 790], [1200, 740], [1410, 790]
            ];

            // Függvény, ami megadja a talaj Y koordinátáját egy adott X ponton
            const getGroundY = (x) => {
                for (let i = 0; i < groundPoints.length - 1; i++) {
                    const p1 = groundPoints[i];
                    const p2 = groundPoints[i + 1];
                    if (x >= p1[0] && x <= p2[0]) {
                        return p1[1] + ((x - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]);
                    }
                }
                return 800;
            };

            let allObjects = [];
            const svgWidth = 1400;

            // Tereptárgyak definíciói
            const objectDefinitions = [
                { type: 'bush', d: 'M300 780 C 280 750, 340 750, 320 780 Z', y: getGroundY(300) },
                { type: 'bush', d: 'M900 790 C 880 760, 940 760, 920 790 Z', y: getGroundY(900) },
                { type: 'bush', d: 'M1300 780 C 1280 750, 1340 750, 1320 780 Z', y: getGroundY(1300) },
                { type: 'rock', d: 'M850,740 L820,790 h60 Z', y: getGroundY(835) + 30 },
                { type: 'rock', d: 'M50,800v-10 c0,-10 10,-10 20,-5 s15,10 25,10 s15,-10 25,-10 v15z', y: getGroundY(80) + 10 },
                { type: 'tree', class: 'tree-sway', d: 'M180,650 L150,770 h60 Z M180,620 L160,740 h40 Z', y: getGroundY(180) + 20 },
                { type: 'tree', class: 'tree-sway', d: 'M230,670 L200,790 h60 Z M230,650 L210,760 h40 Z', y: getGroundY(230) + 40 },
                { type: 'tree', class: 'tree-sway', d: 'M1130,640 L1100,760 h60 Z M1130,610 L1110,730 h40 Z', y: getGroundY(1130) + 10 },
                { type: 'tree', class: 'tree-sway', d: 'M1180,680 L1160,770 h40 Z M1180,660 L1170,740 h20 Z', y: getGroundY(1180) + 25 },
                { type: 'tree', class: 'tree-sway', style: 'animation-delay: -1.5s;', d: 'M730,690 L700,800 h60 Z M730,670 L710,780 h40 Z', y: getGroundY(730) + 50 },
            ];

            objectDefinitions.forEach(obj => {
                const fill = obj.type === 'rock' ? 'url(#rockGradient)' : obj.type === 'bush' ? 'url(#bushGradient)' : 'url(#treesNearGradient)';
                const shadowRx = obj.type === 'tree' ? 30 : 25;
                const shadowRy = obj.type === 'tree' ? 8 : 7;
                const cxMatch = obj.d.match(/M(\d+(\.\d+)?)/);
                const cx = cxMatch ? parseFloat(cxMatch[1]) : 0;
                const cy = obj.y;

                let html = `<g>`;
                html += `<ellipse cx="${cx}" cy="${cy}" rx="${shadowRx}" ry="${shadowRy}" fill="url(#softShadow)" />`;
                html += obj.class 
                    ? `<g class="${obj.class}" style="${obj.style || ''}"><path d="${obj.d}" fill="${fill}"/></g>`
                    : `<path d="${obj.d}" fill="${fill}"/>`;
                html += `</g>`;
                allObjects.push({ y: cy, html: html });
            });

            // Fű generálása
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * svgWidth;
                const topY = getGroundY(x);
                const y = topY + Math.random() * (800 - topY);
                if (y > 802) continue;

                const height = 20 + Math.random() * 30;
                const bend = (Math.random() - 0.5) * 15;
                const d = `M ${x.toFixed(2)} ${y.toFixed(2)} q ${bend} -${height / 2} 0 -${height}`;
                const strokeWidth = (1.5 + Math.random()).toFixed(2);
                const animationDuration = (3 + Math.random() * 4).toFixed(2);
                const animationDelay = `-${(Math.random() * 5).toFixed(2)}s`;
                const style = `animation-duration: ${animationDuration}s; animation-delay: ${animationDelay};`;
                const html = `<path d="${d}" class="grass-blade" style="${style}" stroke="url(#grassGradient)" stroke-width="${strokeWidth}" fill="none"/>`;
                allObjects.push({ y: y, html: html });
            }

            // Virágok generálása
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * svgWidth;
                const groundY = getGroundY(x);
                if (groundY > 802) continue;

                const stemHeight = 10 + Math.random() * 20;
                const y = groundY - 2;
                const flowerSize = 3 + Math.random() * 3;
                const colors = ['#f87171', '#fbbf24', '#a78bfa', '#f0f9ff'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const style = `transform-origin: ${x.toFixed(2)}px ${y.toFixed(2)}px; animation-duration: ${(6 + Math.random() * 5).toFixed(2)}s; animation-delay: -${(Math.random() * 8).toFixed(2)}s;`;

                const html = `
                    <g>
                        <ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="4" ry="2" fill="url(#softShadow)" />
                        <g class="flower-sway" style="${style}">
                            <line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x.toFixed(2)}" y2="${(y - stemHeight).toFixed(2)}" stroke="#65a30d" stroke-width="1.5" />
                            <circle cx="${x.toFixed(2)}" cy="${(y - stemHeight).toFixed(2)}" r="${flowerSize.toFixed(2)}" fill="${color}" stroke="#000" stroke-opacity="0.2" stroke-width="0.5" />
                            <circle cx="${x.toFixed(2)}" cy="${(y - stemHeight).toFixed(2)}" r="${(flowerSize / 2.5).toFixed(2)}" fill="#fde047" />
                        </g>
                    </g>
                `;
                allObjects.push({ y: y, html: html });
            }

            // Elemek rétegezése Y koordináta alapján és beillesztése a DOM-ba
            allObjects.sort((a, b) => a.y - b.y);
            container.innerHTML = allObjects.map(obj => obj.html).join('');
        }
    
        function updateAllLabels() {
        const isEn = document.documentElement.lang === 'en';
        const isDark = document.documentElement.classList.contains('dark');

        // Nyelv feliratok
        if(document.getElementById('lang-label')) document.getElementById('lang-label').textContent = isEn ? 'Lang' : 'Nyelv';
        if(document.getElementById('lang-label-mobile')) document.getElementById('lang-label-mobile').textContent = isEn ? 'Lang' : 'Nyelv';

        // Téma feliratok
        const themeText = isDark ? (isEn ? 'Dark' : 'Sötét') : (isEn ? 'Light' : 'Világos');
        if(document.getElementById('theme-label')) document.getElementById('theme-label').textContent = themeText;
        if(document.getElementById('theme-label-mobile')) document.getElementById('theme-label-mobile').textContent = themeText;
        }
