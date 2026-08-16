/* ============================================
   OverBitCore – Main JavaScript
   Theme, Parallax, Renderers, Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParallax();

  if (window.OverBitI18n) {
    window.OverBitI18n.initI18n();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dynamic content
  renderAbout();
  renderProjects();
  renderSkills();
  renderLinks();

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu
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

  // Active nav on scroll
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

  // Contact form
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

  // Reveal on scroll
  const revealElements = document.querySelectorAll(
    '.about-card, .project-card, .skill-card, .contact-form, .info-card'
  );

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

    // Observe after a short delay so dynamic content is ready
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

  // Re-render on language change
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

/* ========== 3D Vertex Scene + Parallax ========== */
function initParallax() {
  const scene = document.getElementById('parallaxScene');
  const canvas = document.getElementById('vertexCanvas');
  if (!scene || !canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  let W = 0, H = 0, dpr = 1;
  let mouseX = 0, mouseY = 0;
  let smoothMX = 0, smoothMY = 0;
  let formAmount = 0;
  let time = 0;

  // ---------- Geodesic icosahedron (complex mesh) ----------
  function createGeodesic(scale, subdivisions) {
    const t = (1 + Math.sqrt(5)) / 2;
    let verts = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [x / len, y / len, z / len];
    });

    let faces = [
      [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
      [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
      [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
      [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]
    ];

    // Midpoint cache for subdivision
    function subdivide(verts, faces) {
      const midCache = new Map();
      const newVerts = verts.slice();
      function midpoint(a, b) {
        const key = a < b ? a + '_' + b : b + '_' + a;
        if (midCache.has(key)) return midCache.get(key);
        const va = newVerts[a], vb = newVerts[b];
        let x = (va[0] + vb[0]) / 2;
        let y = (va[1] + vb[1]) / 2;
        let z = (va[2] + vb[2]) / 2;
        const len = Math.hypot(x, y, z);
        const idx = newVerts.length;
        newVerts.push([x / len, y / len, z / len]);
        midCache.set(key, idx);
        return idx;
      }
      const newFaces = [];
      faces.forEach(([a, b, c]) => {
        const ab = midpoint(a, b);
        const bc = midpoint(b, c);
        const ca = midpoint(c, a);
        newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
      });
      return { verts: newVerts, faces: newFaces };
    }

    for (let i = 0; i < subdivisions; i++) {
      const r = subdivide(verts, faces);
      verts = r.verts;
      faces = r.faces;
    }

    // Scale
    const scaled = verts.map(([x, y, z]) => ({
      x: x * scale, y: y * scale, z: z * scale
    }));

    // Unique edges from faces
    const edgeSet = new Set();
    const edges = [];
    faces.forEach(([a, b, c]) => {
      [[a,b],[b,c],[c,a]].forEach(([i, j]) => {
        const key = i < j ? i + '_' + j : j + '_' + i;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
        }
      });
    });

    return { verts: scaled, faces, edges };
  }

  const mesh = createGeodesic(1.2, 2); // subdivision 2 = rich mesh
  const VERT_COUNT = mesh.verts.length;

  // Particles for each vertex
  const particles = [];
  for (let i = 0; i < VERT_COUNT; i++) {
    const target = mesh.verts[i];
    const spread = 3.8;
    particles.push({
      sx: (Math.random() - 0.5) * spread * 2.6,
      sy: (Math.random() - 0.5) * spread * 2.6,
      sz: (Math.random() - 0.5) * spread * 2.6,
      tx: target.x, ty: target.y, tz: target.z,
      x: 0, y: 0, z: 0,
      px: 0, py: 0, sc: 1, pz: 0
    });
  }

  // Ambient floating dots
  const ambients = [];
  for (let i = 0; i < 70; i++) {
    ambients.push({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.7,
      px: 0, py: 0, sc: 1
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Single shared rotation for EVERYTHING (grid, axes, mesh)
  function project(x, y, z, rotY, rotX) {
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    const fov = 400;
    const scale = fov / (fov + z2 * 95 + 130);
    return {
      x: W * 0.5 + x1 * 155 * scale + smoothMX * 36,
      y: H * 0.5 + y1 * 155 * scale + smoothMY * 24,
      scale,
      z: z2
    };
  }

  function getColors() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    if (light) {
      return {
        line: 'rgba(107,78,247,0.4)',
        lineStrong: 'rgba(107,78,247,0.65)',
        face: 'rgba(107,78,247,0.08)',
        faceStroke: 'rgba(107,78,247,0.2)',
        point: 'rgba(90,60,220,0.95)',
        glow: 'rgba(0,144,197,0.3)',
        axisX: 'rgba(224,77,128,0.75)',
        axisY: 'rgba(0,144,197,0.75)',
        axisZ: 'rgba(107,78,247,0.75)',
        grid: 'rgba(0,0,0,0.06)',
        ambient: 'rgba(107,78,247,0.25)'
      };
    }
    return {
      line: 'rgba(150,120,255,0.38)',
      lineStrong: 'rgba(190,165,255,0.7)',
      face: 'rgba(124,92,255,0.07)',
      faceStroke: 'rgba(150,120,255,0.18)',
      point: 'rgba(220,205,255,0.95)',
      glow: 'rgba(0,212,255,0.35)',
      axisX: 'rgba(255,107,157,0.8)',
      axisY: 'rgba(0,212,255,0.8)',
      axisZ: 'rgba(150,120,255,0.8)',
      grid: 'rgba(255,255,255,0.05)',
      ambient: 'rgba(150,120,255,0.22)'
    };
  }

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Progressive stages from formAmount 0→1:
  // 0.00–0.40 : vertices assemble
  // 0.30–0.70 : edges / wireframe
  // 0.55–1.00 : faces fill (mesh)
  function stageVertex(f) { return Math.min(1, f / 0.4); }
  function stageEdge(f)   { return Math.max(0, Math.min(1, (f - 0.3) / 0.4)); }
  function stageFace(f)   { return Math.max(0, Math.min(1, (f - 0.55) / 0.45)); }

  function draw() {
    time += 0.008;
    smoothMX += (mouseX - smoothMX) * 0.07;
    smoothMY += (mouseY - smoothMY) * 0.07;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const raw = Math.min(1, Math.max(0, window.scrollY / (maxScroll * 0.6)));
    formAmount += (ease(raw) - formAmount) * 0.07;

    // ONE rotation for grid + axes + model
    const rotY = time * 0.32 + smoothMX * 0.45;
    const rotX = 0.38 + smoothMY * 0.28 + Math.sin(time * 0.28) * 0.06;

    const c = getColors();
    const vStage = stageVertex(formAmount);
    const eStage = stageEdge(formAmount);
    const fStage = stageFace(formAmount);

    ctx.clearRect(0, 0, W, H);

    // --- Floor grid (same rotY/rotX) ---
    const gN = 9, gS = 0.48;
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.grid;
    for (let i = -gN; i <= gN; i++) {
      const a1 = project(-gN * gS, 1.6, i * gS, rotY, rotX);
      const b1 = project( gN * gS, 1.6, i * gS, rotY, rotX);
      const a2 = project(i * gS, 1.6, -gN * gS, rotY, rotX);
      const b2 = project(i * gS, 1.6,  gN * gS, rotY, rotX);
      ctx.beginPath();
      ctx.moveTo(a1.x, a1.y); ctx.lineTo(b1.x, b1.y);
      ctx.moveTo(a2.x, a2.y); ctx.lineTo(b2.x, b2.y);
      ctx.stroke();
    }

    // --- Coordinate axes (same rotation) ---
    const O = project(0, 0, 0, rotY, rotX);
    function drawAxis(tx, ty, tz, col, label) {
      const p = project(tx, ty, tz, rotY, rotX);
      ctx.beginPath();
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.moveTo(O.x, O.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = col;
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 11px Orbitron, sans-serif';
      ctx.fillStyle = col;
      ctx.fillText(label, p.x + 8, p.y - 4);
    }
    drawAxis(1.9, 0, 0, c.axisX, 'X');
    drawAxis(0, -1.9, 0, c.axisY, 'Y');
    drawAxis(0, 0, 1.9, c.axisZ, 'Z');

    // --- Update mesh vertices ---
    for (let i = 0; i < VERT_COUNT; i++) {
      const p = particles[i];
      p.x = p.sx + (p.tx - p.sx) * vStage;
      p.y = p.sy + (p.ty - p.sy) * vStage;
      p.z = p.sz + (p.tz - p.sz) * vStage;
      const pr = project(p.x, p.y, p.z, rotY, rotX);
      p.px = pr.x; p.py = pr.y; p.sc = pr.scale; p.pz = pr.z;
    }

    // --- Faces (painter's algorithm: back to front) ---
    if (fStage > 0.02) {
      const faceList = [];
      for (let fi = 0; fi < mesh.faces.length; fi++) {
        const [ia, ib, ic] = mesh.faces[fi];
        const a = particles[ia], b = particles[ib], d = particles[ic];
        const avgZ = (a.pz + b.pz + d.pz) / 3;
        faceList.push({ a, b, d, avgZ });
      }
      faceList.sort((u, v) => u.avgZ - v.avgZ);

      faceList.forEach(({ a, b, d }) => {
        // Simple lighting by face normal approx (z of cross product)
        const e1x = b.x - a.x, e1y = b.y - a.y, e1z = b.z - a.z;
        const e2x = d.x - a.x, e2y = d.y - a.y, e2z = d.z - a.z;
        const nx = e1y * e2z - e1z * e2y;
        const ny = e1z * e2x - e1x * e2z;
        const nz = e1x * e2y - e1y * e2x;
        const nl = Math.hypot(nx, ny, nz) || 1;
        const lit = Math.max(0.15, Math.min(1, (nz / nl) * 0.7 + 0.45));

        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.lineTo(d.px, d.py);
        ctx.closePath();
        ctx.globalAlpha = fStage * 0.85 * lit;
        ctx.fillStyle = c.face;
        ctx.fill();
        ctx.globalAlpha = fStage * 0.5;
        ctx.strokeStyle = c.faceStroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    // --- Edges / wireframe ---
    if (eStage > 0.02) {
      ctx.lineWidth = 1.1;
      mesh.edges.forEach(([ia, ib]) => {
        const a = particles[ia], b = particles[ib];
        ctx.beginPath();
        ctx.strokeStyle = c.lineStrong;
        ctx.globalAlpha = eStage * 0.7;
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    // --- Vertices ---
    if (vStage > 0.01) {
      for (let i = 0; i < VERT_COUNT; i++) {
        const p = particles[i];
        const r = 2.2 * p.sc;
        if (r < 0.4) continue;
        ctx.globalAlpha = (0.35 + vStage * 0.5) * (1 - fStage * 0.4);
        ctx.beginPath();
        ctx.fillStyle = c.glow;
        ctx.arc(p.px, p.py, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.7 + vStage * 0.3;
        ctx.beginPath();
        ctx.fillStyle = c.point;
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // --- Ambient particles ---
    ambients.forEach(p => {
      const t = time * p.speed + p.phase;
      const ax = p.x + Math.sin(t * 0.7) * 0.35;
      const ay = p.y + Math.cos(t * 0.55) * 0.3;
      const az = p.z + Math.sin(t * 0.45) * 0.35;
      const pr = project(ax, ay, az, rotY, rotX);
      const r = 1.2 * pr.scale;
      if (r < 0.3) return;
      ctx.globalAlpha = 0.4 + Math.sin(t * 2) * 0.15;
      ctx.beginPath();
      ctx.fillStyle = c.ambient;
      ctx.arc(pr.x, pr.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // HUD layer parallax
    scene.querySelectorAll('[data-depth]').forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-depth')) || 0.2;
      layer.style.transform =
        `translate3d(${(smoothMX * depth * 36).toFixed(1)}px, ${(smoothMY * depth * 24).toFixed(1)}px, 0)`;
    });

    if (!reducedMotion) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (!isTouch && !reducedMotion) {
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / Math.max(W, 1) - 0.5) * 2;
      mouseY = (e.clientY / Math.max(H, 1) - 0.5) * 2;
    }, { passive: true });
  }

  if (!reducedMotion) {
    requestAnimationFrame(draw);
  } else {
    formAmount = 0.9;
    // force one frame; draw won't reschedule because reducedMotion
    requestAnimationFrame(draw);
  }
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
