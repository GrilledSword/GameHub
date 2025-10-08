let isDarkMode = false;

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
    
    initThemeSwitcher();
    initLanguageSwitcher();
    initMobileMenu();
    initScrollObserver();
    initScrollDependents();
    initContactForm();
    initHeadlineAnimation();
    initProjectVideos();
}

// === MODULOK ==


function initThemeSwitcher() {
    const themeCheckboxes = [document.getElementById('theme-checkbox'), document.getElementById('theme-checkbox-mobile')];
    
    const applyTheme = (isDark, shouldUpdateCheckboxes = false) => {
        isDarkMode = isDark; // Globális változó frissítése
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateAllLabels();

        if(shouldUpdateCheckboxes) {
            themeCheckboxes.forEach(cb => { if(cb) cb.checked = isDarkMode; });
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
function onYouTubeIframeAPIReady() {
    initYouTubeMusicPlayer();
}
function initYouTubeMusicPlayer() {
    const API_KEY = 'AIzaSyBlT9YiS55OWLZRqOthROVVNGPnahGpe0U';
    const PLAYLIST_URL = 'https://www.youtube.com/watch?v=fSrwcaXLS5M&list=PLU3cs__9MK8Y4PHoHRH2eEdSKqSIpMsBn';
    
    const albumArt = document.getElementById('player-album-art');
    const title = document.getElementById('player-title');
    const progress = document.getElementById('player-progress');
    const progressContainer = document.getElementById('player-progress-container');
    const playBtn = document.getElementById('player-play');
    const prevBtn = document.getElementById('player-prev');
    const nextBtn = document.getElementById('player-next');

    if (!playBtn) return;
    
    let ytPlayer, playlist = [], progressInterval = null;

    ytPlayer = new YT.Player('youtube-player', {
        height: '1', width: '1', playerVars: { 'playsinline': 1 },
        events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
    });

    function onPlayerReady() {
        if (API_KEY && API_KEY !== 'jjjj') {
            loadYouTubePlaylist();
        } else {
            title.textContent = "API kulcs hiányzik!";
        }
    }
    function onPlayerStateChange(event) {
        updatePlayPauseIcon(event.data);
        if (event.data === YT.PlayerState.ENDED) {
            let nextIndex = (ytPlayer.getPlaylistIndex() + 1) % playlist.length;
            ytPlayer.playVideoAt(nextIndex);
            updatePlayerUI(nextIndex);
        }
    }
    async function loadYouTubePlaylist() {
        const playlistId = extractPlaylistId(PLAYLIST_URL);
        if (!playlistId) { title.textContent = "Érvénytelen lista URL"; return; }
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            playlist = data.items.map(item => ({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.default.url
            }));
            ytPlayer.cuePlaylist(playlist.map(t => t.videoId));
            updatePlayerUI(0);
        } catch (error) {
            title.textContent = "Hiba a lista betöltésekor";
        }
    }
    function playTrack() { if(playlist.length > 0) ytPlayer.playVideo(); }
    function pauseTrack() { ytPlayer.pauseVideo(); }
    function nextTrack() { if(playlist.length > 0) ytPlayer.nextVideo(); }
    function prevTrack() { if(playlist.length > 0) ytPlayer.previousVideo(); }
    function seek(event) {
        const rect = progressContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const duration = ytPlayer.getDuration();
        if (duration) ytPlayer.seekTo((clickX / rect.width) * duration, true);
    }
    function updatePlayerUI(trackIndex) {
        if (!playlist[trackIndex]) return;
        const track = playlist[trackIndex];
        title.textContent = track.title;
        albumArt.src = track.thumbnail;
    }
    function updatePlayPauseIcon(playerState) {
        if (playerState === YT.PlayerState.PLAYING) {
            playBtn.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i>';
            startProgressUpdater();
            albumArt.classList.add('is-playing');
        } else {
            playBtn.innerHTML = '<i data-lucide="play" class="w-6 h-6"></i>';
            stopProgressUpdater();
            albumArt.classList.remove('is-playing');
        }
        lucide.createIcons();
    }
    function startProgressUpdater() {
        if (progressInterval) clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            const currentTime = ytPlayer.getCurrentTime();
            const duration = ytPlayer.getDuration();
            progress.style.width = `${(duration > 0) ? (currentTime / duration) * 100 : 0}%`;
        }, 500);
    }
    function stopProgressUpdater() { clearInterval(progressInterval); }
    function extractPlaylistId(url) {
        const match = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
        return (match && match[2]) ? match[2] : null;
    }

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) ? pauseTrack() : playTrack();
    });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextTrack(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevTrack(); });
    progressContainer.addEventListener('click', seek);
}
function updateAllLabels() {
    const isEn = document.documentElement.lang === 'en';
    const themeText = isDarkMode ? (isEn ? 'Dark' : 'Sötét') : (isEn ? 'Light' : 'Világos');
    if(document.getElementById('lang-label')) document.getElementById('lang-label').textContent = isEn ? 'Lang' : 'Nyelv';
    if(document.getElementById('lang-label-mobile')) document.getElementById('lang-label-mobile').textContent = isEn ? 'Lang' : 'Nyelv';
    if(document.getElementById('theme-label')) document.getElementById('theme-label').textContent = themeText;
    if(document.getElementById('theme-label-mobile')) document.getElementById('theme-label-mobile').textContent = themeText;
}
