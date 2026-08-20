/* ============================================
   OverBitCore – Main JavaScript
   Theme, Renderers, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (window.OverBitParallax) {
    window.OverBitParallax.init();
  }

  if (window.OverBitLiquidGlass) {
    window.OverBitLiquidGlass.init();
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
      ? (skill.title[lang] || skill.title.en || 'Untitled')
      : skill.title;
    const desc = typeof skill.description === 'object'
      ? (skill.description[lang] || skill.description.en || '')
      : skill.description;
    
    // A gomb logikája: ha van link, akkor kap egy menő osztályt és egy ikon helyét
    const linkHtml = skill.link 
      ? `<a href="${skill.link}" target="_blank" class="btn-download">
           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
           <span>${lang === 'hu' ? 'Letöltés' : 'Download'}</span>
         </a>` 
      : '';

    return `
      <div class="skill-card glass liquid-glass">
        <div class="skill-icon">${skill.icon || ''}</div>
        <h4>${title}</h4>
        <p>${desc}</p>
        <div class="skill-footer">
          ${linkHtml}
        </div>
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

    const downloadHtml = p.downloadLink
      ? `<a href="${p.downloadLink}" target="_blank" class="btn-action download">
           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
           <span>${lang === 'hu' ? 'Letöltés' : 'Download'}</span>
         </a>`
      : '';

    const watchHtml = p.watchHtml
      ? `<a href="${p.watchHtml}" target="_blank" class="btn-action watch">
           <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M23 12l-2.44-2.44C16.94 5.56 12.56 5.56 8.56 9.56L6.12 12l2.44 2.44c4 4 8.38 4 12.44 0L23 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
           <span>${lang === 'hu' ? 'Nézd meg' : 'Watch'}</span>
         </a>`
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
          <div class="project-actions">
            ${downloadHtml}
            ${watchHtml}
          </div>
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