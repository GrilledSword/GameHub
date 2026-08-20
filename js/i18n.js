/* ============================================
   OverBitCore – Internationalization
   Modular translation system
   ============================================ */

const translations = {
hu: {
    // MÓDOSÍTVA: Rövid, letisztult nav elemek. A 'Készségek' helyett jöhet a profibb tech megnevezés.
    "nav.about": "Rólam",
    "nav.projects": "Projektek",
    "nav.skills": "Tech Stack", 
    "nav.contact": "Kapcsolat",

    // MÓDOSÍTVA: Személyre szabott szövegek, fókuszban a Unity, Blender és a konkrét folytatások.
    "hero.badge": "Indie Játékfejlesztő & 3D Artist",
    "hero.tagline": "Klasszikusok öröksége, modern motorokban újraálmodva.",
    "hero.desc": "Szóló fejlesztőként a kód és a dizájn határán egyensúlyozom. Jelenleg olyan projekteken pörgök Unity-ben és Blenderben, mint a Pekka Kana 2 és a Heavy Metal F.A.K.K. 2 folytatása.",
    "hero.ctaProjects": "Munkáim",
    "hero.ctaContact": "Dobj egy üzit",

    "about.label": "Rólam",
    "about.title": "A kódok és modellek mögött", 

    "projects.label": "Portfólió",
    "projects.title": "Aktuális & közelgő megjelenések",
    "projects.desc": "Unity projektek, amiken épp a lelkemet is kihajtom. A kódolás és a Blender sosem áll meg!",

    "skills.label": "Eszköztár",
    "skills.title": "Amiket napi szinten nyúzok",

    // MÓDOSÍTVA: Lazább, őszintébb kapcsolatfelvételi blokk.
    "contact.label": "Kapcsolat",
    "contact.title": "Lépjünk kapcsolatba",
    "contact.desc": "Van egy jó ötleted, vagy csak elmondanád, hogy szar a kódom? Ne tartsd magadban!",
    "contact.name": "Név",
    "contact.namePlaceholder": "Hogy hívnak?",
    "contact.email": "Email",
    "contact.emailPlaceholder": "te@pelda.hu",
    "contact.message": "Üzenet",
    "contact.messagePlaceholder": "Ide lőheted az üzenetet...",
    "contact.send": "Küldés",
    "contact.infoTitle": "Elérhetőség",
    "contact.infoText": "Emailen érsz el a leggyorsabban. Ha nem egy nigériai herceg vagy, válaszolok is.",
    "contact.success": "Köszi! Az üzenet landolt a szerveren.",
    "contact.error": "Hé, töltsd ki az összes kibaszott mezőt!", 

    "footer.rights": "Minden jog fenntartva.",
    "footer.made": "Készült kávéból, Unity-ből és rengeteg kitartásból."
  },

 en: {
    // MÓDOSÍTVA: Angol verzió, teljes mértékben igazítva a magyar lazaságához.
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Tech Stack",
    "nav.contact": "Contact",

    "hero.badge": "Indie Game Developer & 3D Artist",
    "hero.tagline": "Reviving classics and forging new worlds.",
    "hero.desc": "I'm a solo dev bringing old-school vibes to modern engines. Currently knee-deep in Blender and C#, working on sequels to classics like Pekka Kana 2 and Heavy Metal F.A.K.K. 2.",
    "hero.ctaProjects": "See My Work",
    "hero.ctaContact": "Ping Me",

    "about.label": "About",
    "about.title": "The dev behind the screen",

    "projects.label": "Portfolio",
    "projects.title": "Current & upcoming releases",
    "projects.desc": "My current Unity projects. The daily grind between Visual Studio and Blender never stops!",

    "skills.label": "Toolkit",
    "skills.title": "My daily drivers",

    "contact.label": "Contact",
    "contact.title": "Let's connect",
    "contact.desc": "Got an idea, a job offer, or just want to tell me my code sucks? Drop a line!",
    "contact.name": "Name",
    "contact.namePlaceholder": "Who are you?",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Shoot your message...",
    "contact.send": "Send It",
    "contact.infoTitle": "Get in touch",
    "contact.infoText": "Email is the fastest way to reach me. Unless you're trying to sell me SEO services, I'll definitely reply.",
    "contact.success": "Thanks! Your message hit the server.",
    "contact.error": "Hey, fill in all the damn fields!",

    "footer.rights": "All rights reserved.",
    "footer.made": "Powered by coffee, Unity, and sheer fucking will."
  }
};

function setLanguage(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  localStorage.setItem('overbitcore-lang', lang);
}

function initI18n() {
  const saved = localStorage.getItem('overbitcore-lang');
  const browserLang = navigator.language?.startsWith('hu') ? 'hu' : 'en';
  const initialLang = saved || browserLang || 'hu';

  setLanguage(initialLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
}

window.OverBitI18n = { setLanguage, initI18n, translations };
