/**
 * Nyelvváltó funkcionalitás.
 */
export function initLanguageSwitcher() {
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

    const langCheckbox = document.getElementById('lang-checkbox');
    const huFlagContainer = document.querySelector('.lang-bg-hu');
    const enFlagContainer = document.querySelector('.lang-bg-en');
    const setLanguage = (lang) => {
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

        langCheckbox.checked = (lang === 'en');
        const langCheckboxMobile = document.getElementById('lang-checkbox-mobile');
        if (langCheckboxMobile) langCheckboxMobile.checked = (lang === 'en');

        updateAllLabels();
    };

    document.body.addEventListener('change', (event) => {
        const target = event.target;
        if (target.id === 'lang-checkbox' || target.id === 'lang-checkbox-mobile') {
            const newLang = target.checked ? 'en' : 'hu';
            setLanguage(newLang);

            const otherId = target.id === 'lang-checkbox' ? 'lang-checkbox-mobile' : 'lang-checkbox';
            const otherCheckbox = document.getElementById(otherId);
            if (otherCheckbox) otherCheckbox.checked = target.checked;
        }
    });

    document.querySelectorAll('.lang-bg-hu').forEach(container => {
        container.innerHTML = flagSVGs.hu.replace('<svg', '<svg preserveAspectRatio="xMidYMid slice"');
    });
    document.querySelectorAll('.lang-bg-en').forEach(container => {
        container.innerHTML = flagSVGs.en;
    });

    const initialLang = localStorage.getItem('language') || (navigator.language.startsWith('hu') ? 'hu' : 'en');
    setLanguage(initialLang);
}

function updateAllLabels() {
    const isEn = document.documentElement.lang === 'en';
    const isDark = document.documentElement.classList.contains('dark');

    if(document.getElementById('lang-label')) document.getElementById('lang-label').textContent = isEn ? 'Lang' : 'Nyelv';
    if(document.getElementById('lang-label-mobile')) document.getElementById('lang-label-mobile').textContent = isEn ? 'Lang' : 'Nyelv';

    const themeText = isDark ? (isEn ? 'Dark' : 'Sötét') : (isEn ? 'Light' : 'Világos');
    if(document.getElementById('theme-label')) document.getElementById('theme-label').textContent = themeText;
    if(document.getElementById('theme-label-mobile')) document.getElementById('theme-label-mobile').textContent = themeText;
}
