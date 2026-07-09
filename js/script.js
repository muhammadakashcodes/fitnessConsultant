lucide.createIcons();

// ---------- Navbar scroll transition ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    mobileMenu.classList.remove('invisible', 'opacity-0');
    mobileMenu.classList.add('opacity-100');
    setTimeout(() => mobileMenu.classList.add('open'), 20);
    menuToggle.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.classList.add('opacity-0');
    setTimeout(() => mobileMenu.classList.add('invisible'), 400);
    menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-close').forEach(el => el.addEventListener('click', closeMenu));

// ---------- Scroll-driven reveal via IntersectionObserver ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 60 % 300);
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Transformation Matrix interactivity ----------
const matrixData = {
    strength: {
        label: 'Relative Strength Index',
        value: '+61%',
        desc: 'Measured as load moved relative to bodyweight across primary compound lifts, averaged across the current cohort at week 12.',
        before: [35, 42, 38],
        after: [78, 88, 95]
    },
    recovery: {
        label: 'HRV Recovery Score',
        value: '+44%',
        desc: 'Heart-rate variability trend on waking, averaged over a rolling 7-day window and benchmarked against week zero.',
        before: [40, 45, 36],
        after: [70, 82, 68]
    },
    composition: {
        label: 'Lean Mass / Fat Ratio Shift',
        value: '+29%',
        desc: 'DEXA-scanned change in lean mass to fat mass ratio, tracked quarterly against the client\'s own baseline.',
        before: [50, 48, 55],
        after: [76, 74, 84]
    },
    vo2: {
        label: 'VO2 Max',
        value: '+18%',
        desc: 'Laboratory-tested aerobic capacity, re-measured at week 12 under identical protocol conditions.',
        before: [45, 50, 48],
        after: [64, 68, 66]
    }
};

const tabs = document.querySelectorAll('.matrix-tab');
const bars = document.querySelectorAll('#matrix-bars .matrix-bar');
const labelEl = document.getElementById('matrix-label');
const valueEl = document.getElementById('matrix-value');
const descEl = document.getElementById('matrix-desc');

function setMatrix(key) {
    const d = matrixData[key];
    labelEl.textContent = d.label;
    valueEl.textContent = d.value;
    descEl.textContent = d.desc;
    const heights = [...d.before, ...d.after];
    bars.forEach((bar, i) => { bar.style.height = heights[i] + '%'; });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('text-white'); t.classList.add('text-zinc-500'); t.style.borderColor = ''; });
        tab.classList.add('text-white');
        tab.classList.remove('text-zinc-500');
        tab.style.borderColor = 'rgba(204,255,0,0.4)';
        setMatrix(tab.dataset.metric);
    });
});
tabs[0].style.borderColor = 'rgba(204,255,0,0.4)';

// ---------- Application form submit ----------
const form = document.getElementById('apply-form');
const successMsg = document.getElementById('success-message');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ---------- Play button (placeholder interaction) ----------
document.getElementById('play-btn').addEventListener('click', () => {
    alert('Video content coming soon.');
});