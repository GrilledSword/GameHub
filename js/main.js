/* ============================================
   OverBitCore – Main JavaScript
   Theme, Renderers, Interactions
   (3D scene lives in parallax.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (window.OverBitParallax) {
    window.OverBitParallax.init();
  }

  if (window.OverBitI18n) {
    window.OverBitI18n.initI18n();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderAbout();
  renderProjects();
  renderSkills();
  renderLinks();

  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      const lang = document.documentElement.lang || 'hu';
      const t = window.OverBitI18n?.translations?.[lang] || {};

      if (!name || !email || !message) {
        formStatus.hidden = false;
        formStatus.className = 'form-status error';
        formStatus.textContent = t['contact.error'] || 'Please fill in all fields.';
        return;
      }

      formStatus.hidden = false;
      formStatus.className = 'form-status success';
      formStatus.textContent = t['contact.success'] || 'Thank you! Message sent (demo).';
      contactForm.reset();
      setTimeout(() => { formStatus.hidden = true; }, 5000);
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.about-card, .project-card, .skill-card, .contact-form, .info-card')
        .forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(24px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(el);
        });
    }, 50);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        renderAbout();
        renderProjects();
        renderSkills();
      }, 30);
    });
  });
});

/* ========== Theme ========== */
function initTheme() {
  const saved = localStorage.getItem('overbitcore-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved || (prefersDark ? 'dark' : 'light'));

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('overbitcore-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#0a0a1a' : '#eef1f8';
}

/* ========== About renderer (rolam.js) ========== */
function renderAbout() {
  const grid = document.getElementById('aboutGrid');
  if (!grid || !window.ABOUT) return;

  const lang = document.documentElement.lang || 'hu';

  grid.innerHTML = window.ABOUT.map(item => {
    const title = typeof item.title === 'object'
      ? (item.title[lang] || item.title.en)
      : item.title;
    const desc = typeof item.description === 'object'
      ? (item.description[lang] || item.description.en)
      : item.description;

    return `
      <div class="about-card glass liquid-glass">
        <div class="about-icon">${item.icon || ''}</div>
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    `;
  }).join('');
}

/* ========== Skills renderer (keszsegek.js) ========== */
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !window.SKILLS) return;

  const lang = document.documentElement.lang || 'hu';

  grid.innerHTML = window.SKILLS.map(skill => {
    const title = typeof skill.title === 'object'
      ? (skill.title[lang] || skill.title.en)
      : skill.title;
    const desc = typeof skill.description === 'object'
      ? (skill.description[lang] || skill.description.en)
      : skill.description;

    return `
      <div class="skill-card glass liquid-glass">
        <div class="skill-icon">${skill.icon || ''}</div>
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    `;
  }).join('');
}

/* ========== Projects renderer ========== */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !window.PROJECTS) return;

  const lang = document.documentElement.lang || 'hu';

  grid.innerHTML = window.PROJECTS.map((p, index) => {
    const title = p.title?.[lang] || p.title?.en || 'Untitled';
    const desc = p.description?.[lang] || p.description?.en || '';
    const statusText = p.statusText?.[lang] || p.statusText?.en || p.status;
    const statusClass = p.status || 'dev';
    const placeholderClass = index % 3 === 1 ? 'alt' : (index % 3 === 2 ? 'alt2' : '');
    const tagsHtml = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const imageHtml = p.image
      ? `<img src="${p.image}" alt="${title}" loading="lazy">`
      : `<span class="placeholder-text">${p.status === 'released' ? 'Released' : 'Coming Soon'}</span>`;
    const linkHtml = p.link
      ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener">→ ${lang === 'hu' ? 'Megnyitás' : 'Open'}</a>`
      : '';

    return `
      <article class="project-card glass liquid-glass">
        <div class="project-image placeholder-img ${placeholderClass}">
          ${imageHtml}
        </div>
        <div class="project-content">
          <div class="project-tags">${tagsHtml}</div>
          <h3 class="project-title">${title}</h3>
          <p class="project-desc">${desc}</p>
          <div class="project-status">
            <span class="status-dot ${statusClass}"></span>
            <span>${statusText}</span>
          </div>
          ${linkHtml}
        </div>
      </article>
    `;
  }).join('');
}

/* ========== Links renderer ========== */
function renderLinks() {
  if (!window.LINKS) return;

  const emailEl = document.getElementById('contactEmail');
  if (emailEl && window.LINKS.email) {
    emailEl.href = `mailto:${window.LINKS.email}`;
    emailEl.textContent = window.LINKS.email;
  }

  const socialContainer = document.getElementById('socialLinks');
  if (socialContainer && Array.isArray(window.LINKS.social)) {
    socialContainer.innerHTML = window.LINKS.social
      .filter(s => s.enabled && s.url)
      .map(s => `
        <a href="${s.url}" 
           class="social-link glass-sm" 
           aria-label="${s.label}" 
           title="${s.label}"
           target="_blank" 
           rel="noopener noreferrer">
          ${s.icon}
        </a>
      `).join('');
  }
}
