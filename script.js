/* === STREAM KONFIGURÁCIÓ === */
const STREAM_CONFIG = {
    channelId: 'UC7-UCwDljiZ44BFhiHXF8-d1zAw', 
    status: 'OFFLINE' 
};

const projectsData = {
    project_1: {
        images: ['IMG/pekka.gif'],
        tech: [{ title: 'Unity' }, { title: 'C#' }, { title: 'Blender' }]
    },
    project_2: {
        images: ['IMG/mindscape.jpg', 'IMG/Gallery/Mindscape/1.png', 'IMG/Gallery/Mindscape/2.png', 'IMG/Gallery/Mindscape/3.png', 'IMG/Gallery/Mindscape/4.png', 'IMG/Gallery/Mindscape/5.png',],
        tech: [{ title: 'Unity' }, { title: 'Horror AI' }, { title: 'Lighting' }]
    },
    project_3: {
        images: ['IMG/3d.jpg', 'IMG/Gallery/3d/1.jpg', 'IMG/Gallery/3d/2.jpg', 'IMG/Gallery/3d/3.jpg', 'IMG/Gallery/3d/4.jpg', 'IMG/Gallery/3d/5.jpg', 'IMG/Gallery/3d/6.jpg',],
        tech: [{ title: 'Blender' }, { title: 'Substance' }]
    }
};

const BOOT_LOGS = [
    { text: "WAKING UP THE SYSTEM DAEMON...", delay: 200 },
    { text: "PURGING INCOGNITO HISTORY... [SECURE]", delay: 400 }, // Kicsit kínos, de hasznos ;)
    { text: "COMPILING SPAGHETTI CODE (C#)...", delay: 300 }, // Minden fejlesztő rémálma
    { text: "INJECTING CAFFEINE INTRAVENOUSLY... [100%]", delay: 300 },
    { text: "LOADING WAIFU TEXTURES... [SKIPPED]", delay: 200 }, // Na jó, ezt inkább hagyjuk
    { text: "IGNITING THE SWORD... [TEMP: 1500°C]", delay: 500 },
    { text: "BYPASSING SOCIAL SKILLS PROTOCOLS...", delay: 400 }, // Mert kockák vagyunk
    { text: "ACCESS GRANTED. WELCOME, SAMURAI.", delay: 500 }
];

window.addEventListener('load', () => {
    runBootSequence();
});

async function runBootSequence() {
    const bootScreen = document.getElementById('boot-sequence');
    const logContainer = document.getElementById('boot-log');
    const progressBar = document.getElementById('boot-progress');
    const statusText = document.getElementById('boot-status');
    const header = document.getElementById('main-header');
    const mainContent = document.getElementById('main-content');

    // Ha véletlenül nincs meg valamelyik elem, fallback a régi módszerre
    if (!bootScreen || !logContainer) {
        document.body.classList.add('loaded');
        return;
    }

    let progress = 0;
    const totalSteps = BOOT_LOGS.length;

    for (let i = 0; i < BOOT_LOGS.length; i++) {
        const log = BOOT_LOGS[i];
        
        // Log hozzáadása
        const p = document.createElement('p');
        p.textContent = `> ${log.text}`;
        // Az utolsó sornál zöld szín (Siker)
        if (i === BOOT_LOGS.length - 1) {
            p.classList.add('text-green-500', 'font-bold');
            statusText.textContent = "SYSTEM_READY";
            statusText.classList.remove('text-red-500', 'animate-pulse');
            statusText.classList.add('text-green-500');
        }
        
        logContainer.appendChild(p);
        logContainer.scrollTop = logContainer.scrollHeight;

        // Progress bar update
        progress = ((i + 1) / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;

        // Wait
        await new Promise(r => setTimeout(r, log.delay));
    }

    // Boot vége effektus
    await new Promise(r => setTimeout(r, 500)); // Kis szünet a végén
    
    // Boot Screen eltüntetése (Fade out)
    bootScreen.classList.add('boot-hidden');
    
    // Rendszer "Berobbanása"
    if (header) {
        header.classList.remove('opacity-0');
        header.classList.add('system-online');
    }
    if (mainContent) {
        mainContent.classList.remove('opacity-0');
        mainContent.classList.add('system-online');
    }

    // Egyéb scriptek indítása
    setTimeout(() => {
        typeWriterEffect();
        bootScreen.style.display = 'none'; // DOM-ból is kivesszük, ne zavarjon
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        typeWriterEffect();
    }, 800);
});

function initApp() {
    lucide.createIcons();
    initCyberBackground();
    initCursor(); // Fontos: Ez most már "erőszakosabb" lesz
    initCountdown();
    initFakeChat();
    initTiltEffect();
    initMobileMenu();
    initProjectModals();
    initContactForm();
    initScrollDependents();
    initStreamPlayer(); 
}

function initStreamPlayer() {
    const offlineScreen = document.getElementById('stream-offline');
    const onlineScreen = document.getElementById('stream-online');
    const iframe = document.getElementById('stream-iframe');

    if (!offlineScreen || !onlineScreen || !iframe) return;

    if (STREAM_CONFIG.status === 'ONLINE') {
        offlineScreen.classList.add('hidden');
        onlineScreen.classList.remove('hidden');
        const streamUrl = `https://www.youtube.com/embed/live_stream?channel=${STREAM_CONFIG.channelId}&autoplay=1&mute=1`;
        iframe.src = streamUrl;
    } else {
        offlineScreen.classList.remove('hidden');
        onlineScreen.classList.add('hidden');
        iframe.src = ""; 
    }
}

function initScrollDependents() {
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    const delta = 10; // Kisebb mozgásra is reagáljon, de ne túl kicsire
    const offset = 50; // Ennyit kell görgetni fentről, hogy aktiválódjon

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Ha legfelül vagyunk, mindig mutasd (Reset)
        if (currentScroll <= offset) {
            header.classList.remove('scrolled-down');
            lastScrollTop = currentScroll;
            return;
        }

        // Ha a görgetés mértéke nem éri el a küszöböt, ne csinálj semmit
        if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

        // Logika: Ha lefelé megyünk ÉS nem vagyunk a tetején -> Összecsuk
        if (currentScroll > lastScrollTop && currentScroll > offset) {
            header.classList.add('scrolled-down');
        } 
        // Ha felfelé megyünk -> Kinyit
        else {
            header.classList.remove('scrolled-down');
        }

        lastScrollTop = currentScroll;
    }, { passive: true }); // Performance boost
}

/* === BOMBABIZTOS KURZOR LOGIKA === */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    // Ha nincsenek elemek, kilépünk (ne dobjon hibát)
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    // Mindenképp elindítjuk a követést, nem várunk "finom" eszközre
    // (Néha a böngészők tévesen touch eszköznek hiszik a PC-t)
    
    document.addEventListener('mousemove', (e) => {
        // Amint megmozdul az egér, aktiváljuk a custom kurzort
        if (!document.body.classList.contains('custom-cursor-active')) {
            document.body.classList.add('custom-cursor-active'); // Ez tünteti el a Windows egeret
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        }

        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Azonnali pozicionálás
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) rotate(45deg)`;
    });

    // TAG: MODIFIED - Kattintás effektek
    document.addEventListener('mousedown', () => {
        document.body.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        document.body.classList.remove('clicking');
    });

    function animateFollower() {
        // TAG: MODIFIED - Simább lerping (interpoláció)
        followerX += (mouseX - followerX) * 0.15; 
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effektek
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .stat-card, .cyber-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

function initCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    function update() {
        const now = new Date();
        const target = new Date();
        target.setHours(CONFIG.streamStartHour, 0, 0, 0);
        if (now > target) target.setDate(target.getDate() + 1);

        const diff = target - now;
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        if(el) el.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    setInterval(update, 1000);
    update();
}

function initFakeChat() {
    const chatContainer = document.getElementById('chat-messages');
    if (!chatContainer) return;

    // TAG: MODIFIED - Config adatokat itt pótoltam, ha hiányoznának
    const FAKE_CHAT_CONFIG = {
    // [NEW] - Bővített, sztereotipikus felhasználónevek
    users: [
        'NoobMaster69', 'AnyadHata', 'RageQuit_Roli', 'KrumpliPC_Warrior', 
        'xX_Destroyer_Xx', 'LagKing', 'SörhasPista', 'E-Girl_Hunter', 
        'PixelPunci', 'Csőgörény', 'ToxikAvenger', 'SilentBob', 
        'StreamSniper01', 'VakondTuro', 'JediVagyokGeci', 'Bela_a_Hentes',
        'ZokniBáb', 'Hardstuck_Silver', 'ClickBaiter', 'ModokReme'
    ],

    // [NEW] - 50+ valósághű chat üzenet (Hype, Hate, Troll, Random)
    msgs: [
        // --- Hype & Positive ---
        'EZ CLAP', 
        'PogChamp', 
        'Ez beteg volt báttya!', 
        'OMEGALUL', 
        'GG WP', 
        'Mekkora aim te jó ég!', 
        'Ezt klippeljétek le azonnal!', 
        'ISTEN VAGY!', 
        'Na végre valami skill...', 
        'Hype Hype Hype 🔥', 
        'Ez a skin honnan van?', 
        'Taníts mester!',
        'MonkaS',
        'KekW',

        // --- Toxikus & Troll (A sava-borsa) ---
        'Töröld le a játékot, könyörgöm.', 
        'Anyád is ezt nézi?', 
        'Mekkora bot vagy te atyaég...', 
        'Ez a gameplay rákot okoz.', 
        'Menjél vissza legózni!', 
        'Uninstall pls.', 
        'Milyen kenyérpirítón játszol?', 
        'Lag vagy csak béna vagy?', 
        'Kikérem magamnak ezt a teljesítményt.', 
        'Haver, a monitor be van kapcsolva?', 
        'Lépj ki, kevesebb a pingünk.',
        'Szerintem add el a gépet.',
        'Ezért kár volt elindítani a streamet.',
        'Boostolt fiók...',

        // --- Kérdések & Tech ---
        'Milyen egered van?', 
        'Mikor lesz facecam?', 
        'Hány FPS-ed van?', 
        'Ez most ranked?', 
        'Milyen felbontás ez? 800x600?', 
        'Zene címe???', 
        'Szia, bejöhetek játszani?', 
        'Moderátort keresel?', 
        'Specifikációt írd már ki lécci.',
        
        // --- Random & Spam ---
        'F', 
        'F', 
        'F', 
        'KEKW KEKW KEKW',
        'LAGG', 
        'Drop?', 
        'Hol a macska?', 
        'Igyál vizet!', 
        'Pisilni kell...', 
        'Ez a játék halott.', 
        'Mikor jön a kövi rész?',
        'Szia Uram! Bojler eladó?',
        'Józsi üzeni, hogy vidd le a szemetet.',
        'Kappa',
        'ResidentSleeper',
        'Valaki adjon neki egy banánt.'
    ],

    // [UPDATED] - Kibővített színpaletta a neveknek
    colors: [
        '#06b6d4', '#a855f7', '#ec4899', '#facc15', '#4ade80', 
        '#ff0000', '#00ff00', '#0000ff', '#ff5733', '#c70039'
    ]
};

    function addMessage() {
        const user = FAKE_CHAT_CONFIG.users[Math.floor(Math.random() * FAKE_CHAT_CONFIG.users.length)];
        const msg = FAKE_CHAT_CONFIG.msgs[Math.floor(Math.random() * FAKE_CHAT_CONFIG.msgs.length)];
        const color = FAKE_CHAT_CONFIG.colors[Math.floor(Math.random() * FAKE_CHAT_CONFIG.colors.length)];

        const div = document.createElement('div');
        div.className = 'flex gap-2 animate-fade-in mb-2';
        div.innerHTML = `<span style="color:${color}; font-weight:bold; min-width:80px; font-family:'Share Tech Mono'">[${user}]</span> <span class="text-slate-300 truncate font-rajdhani">${msg}</span>`;
        
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        if (chatContainer.children.length > 6) {
            chatContainer.removeChild(chatContainer.firstChild);
        }
        setTimeout(addMessage, Math.random() * 4000 + 1500);
    }
    setTimeout(addMessage, 2000);
}

function initTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card:not(#modal-content)');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

function initCyberBackground() {
    const canvas = document.getElementById('interactive-background');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 20; 
    
    // TAG: MODIFIED - Config színek pótlása
    const BG_COLORS = ['#06b6d4', '#a855f7', '#ec4899'];

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 1;
            this.color = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for(let i=0; i<particleCount; i++) particles.push(new Particle());
    
    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            p.update();
            p.draw();
            for(let j=i; j<particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x-p2.x, p.y-p2.y);
                if(dist < 100) {
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = 1 - (dist/100);
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

function typeWriterEffect() {
    const el = document.querySelector('.typing-effect');
    if(!el) return;
    const text = el.textContent;
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if(i >= text.length) clearInterval(interval);
    }, 50);
}

function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');

    // TAG: MODIFIED [2026-01-05] - Hibatűrőbb ellenőrzés és logolás
    if(btn && menu) {
        console.log("MOBILE MENU: Initialized"); // Debug log

        btn.addEventListener('click', (e) => {
            // Megakadályozzuk, hogy máshova is menjen a kattintás
            e.preventDefault();
            e.stopPropagation(); 

            // Toggle logika
            menu.classList.toggle('scale-y-0');
            
            // Debug visszajelzés
            const isOpen = !menu.classList.contains('scale-y-0');
            console.log(`MOBILE MENU: Toggled. Open? ${isOpen}`);
        });

        // UX Bonus: Ha a menüre kattintasz (pl egy linkre), záródjon be
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('scale-y-0');
            });
        });
    } else {
        console.error("MOBILE MENU: Button or Menu element missing!");
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if(!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.textContent = '> ENCRYPTING PACKET... SENDING...';
        status.style.color = '#facc15';
        setTimeout(() => {
            status.textContent = '> DATA UPLOADED. STAND BY.';
            status.style.color = '#4ade80';
            form.reset();
        }, 2000);
    });
}

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const triggers = document.querySelectorAll('[data-gallery-btn]');
    const mTitle = document.getElementById('modal-title');
    const mDesc = document.getElementById('modal-description');
    const mImg = document.getElementById('modal-main-image');
    const mTech = document.getElementById('modal-tech-stack');
    const mThumbs = document.getElementById('modal-thumbnails');
    
    if(!modal) return;

    function openModal(index) {
        const data = projectsData[`project_${index}`];
        if(!data) return;
        mTitle.textContent = `PROJECT_FILE_0${index}`; 
        mDesc.textContent = "CLASSIFIED PROJECT DATA DECRYPTED... ACCESSING VISUALS...";
        mImg.src = data.images[0];
        mTech.innerHTML = data.tech.map(t => `<span class="bg-slate-900 border border-cyan-500 px-2 py-1 text-xs text-cyan-400 font-mono tracking-widest">[${t.title.toUpperCase()}]</span>`).join('');
        mThumbs.innerHTML = data.images.map(img => `<img src="${img}" class="w-24 h-16 object-cover border border-slate-700 hover:border-cyan-400 cursor-pointer transition-colors" onclick="document.getElementById('modal-main-image').src='${img}'">`).join('');
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const modalContent = modal.querySelector('#modal-content');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
        modalContent.style.transform = "none";
    }

    triggers.forEach((btn, idx) => { btn.addEventListener('click', (e) => { e.preventDefault(); openModal(idx + 1); }); });
    
    closeBtn.addEventListener('click', () => { 
        modal.classList.add('opacity-0', 'pointer-events-none'); 
        const modalContent = modal.querySelector('#modal-content');
        modalContent.classList.add('scale-95'); 
        modalContent.classList.remove('scale-100'); 
    });
    
    const zoomBtn = document.getElementById('modal-zoom-btn');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbClose = document.getElementById('lightbox-close');
    if(zoomBtn && lightbox) {
        zoomBtn.addEventListener('click', () => { lbImg.src = mImg.src; lightbox.classList.remove('hidden'); lightbox.classList.add('flex'); });
        lbClose.addEventListener('click', () => { lightbox.classList.add('hidden'); lightbox.classList.remove('flex'); });
    }
}
document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Ez öli meg a felugró menüt
    
    // Opcionális vizuális visszajelzés (Hogy érezze a törődést)
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if(cursor && follower) {
        // Vörös riasztás effekt a kurzoron
        const originalColor = cursor.style.backgroundColor;
        cursor.style.backgroundColor = '#ef4444'; // Red
        cursor.style.boxShadow = '0 0 20px #ef4444';
        follower.style.borderColor = '#ef4444';
        
        setTimeout(() => {
            cursor.style.backgroundColor = ''; // Reset
            cursor.style.boxShadow = '';
            follower.style.borderColor = '';
        }, 300);
    }
    
    return false;
});