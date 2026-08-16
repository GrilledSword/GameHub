/* ============================================
   OverBitCore – Internationalization
   Modular translation system
   ============================================ */

const translations = {
  hu: {
    "nav.about": "Rólam",
    "nav.projects": "Projektek",
    "nav.skills": "Készségek",
    "nav.contact": "Kapcsolat",

    "hero.badge": "Indie játékfejlesztő",
    "hero.tagline": "Immerszív világokat építek bitről bitre.",
    "hero.desc": "Egyedül dolgozom indie játékokon – ahol a kreativitás találkozik a precíz kóddal. Hamarosan itt mutatom be a projektjeimet.",
    "hero.ctaProjects": "Projektek megtekintése",
    "hero.ctaContact": "Kapcsolatfelvétel",

    "about.label": "Rólam",
    "about.title": "Ki áll a név mögött",

    "projects.label": "Portfólió",
    "projects.title": "Aktuális & közelgő projektek",
    "projects.desc": "Jelenleg az első játékok fejlesztésén dolgozom. Ez a rész hamarosan frissül!",

    "skills.label": "Szakértelem",
    "skills.title": "Amivel dolgozom",

    "contact.label": "Kapcsolat",
    "contact.title": "Dolgozzunk együtt",
    "contact.desc": "Van egy ötleted, vagy csak beszélgetnél? Írj bátran!",
    "contact.name": "Név",
    "contact.namePlaceholder": "A neved",
    "contact.email": "Email",
    "contact.emailPlaceholder": "te@pelda.hu",
    "contact.message": "Üzenet",
    "contact.messagePlaceholder": "Az üzeneted...",
    "contact.send": "Üzenet küldése",
    "contact.infoTitle": "Elérhetőségek",
    "contact.infoText": "A leggyorsabban emailben érhetsz el. Minden komoly megkeresésre válaszolok.",
    "contact.success": "Köszönöm! Az üzeneted megérkezett (demo).",
    "contact.error": "Kérlek töltsd ki az összes mezőt.",

    "footer.rights": "Minden jog fenntartva.",
    "footer.made": "Készült szeretettel az indie játékok iránt."
  },

  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "hero.badge": "Indie Game Developer",
    "hero.tagline": "Crafting immersive worlds, one bit at a time.",
    "hero.desc": "I build indie games solo – where creativity meets precise code. My projects will appear here soon.",
    "hero.ctaProjects": "View Projects",
    "hero.ctaContact": "Get in Touch",

    "about.label": "About",
    "about.title": "Who's behind the name",

    "projects.label": "Portfolio",
    "projects.title": "Current & upcoming projects",
    "projects.desc": "I'm currently developing my first games. This section will be updated soon!",

    "skills.label": "Expertise",
    "skills.title": "What I work with",

    "contact.label": "Contact",
    "contact.title": "Let's work together",
    "contact.desc": "Have an idea, or just want to chat? Feel free to reach out!",
    "contact.name": "Name",
    "contact.namePlaceholder": "Your name",
    "contact.email": "Email",
    "contact.emailPlaceholder": "you@example.com",
    "contact.message": "Message",
    "contact.messagePlaceholder": "Your message...",
    "contact.send": "Send Message",
    "contact.infoTitle": "Get in touch",
    "contact.infoText": "Email is the fastest way to reach me. I reply to every serious inquiry.",
    "contact.success": "Thank you! Your message has been received (demo).",
    "contact.error": "Please fill in all fields.",

    "footer.rights": "All rights reserved.",
    "footer.made": "Made with love for indie games."
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
