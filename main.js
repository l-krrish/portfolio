// ── CURSOR ──
const cur = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let mx = 0, my = 0, dx = 0, dy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = (mx - 7) + 'px';
  cur.style.top  = (my - 7) + 'px';
});

setInterval(() => {
  dx += (mx - dx) * 0.18;
  dy += (my - dy) * 0.18;
  dot.style.left = (dx - 2) + 'px';
  dot.style.top  = (dy - 2) + 'px';
}, 16);

// ── CLOCK ──
function tick() {
  const t = new Date();
  document.getElementById('ps-time').textContent = t.toTimeString().slice(0, 8);
}
setInterval(tick, 1000);
tick();

// ── ARC REACTOR POWER FLUCTUATION ──
setInterval(() => {
  const p = (99.1 + Math.random() * 0.8).toFixed(1);
  document.getElementById('pwr').textContent = p + '%';
}, 3000);

// ── F1 GEAR & SPEED ──
const gears = ['3', '4', '5', '6', '7', '8'];
const spds  = [178, 201, 224, 251, 271, 287, 299, 312];

setInterval(() => {
  document.getElementById('gear').textContent = gears[Math.floor(Math.random() * gears.length)];
  const s = spds[Math.floor(Math.random() * spds.length)];
  document.getElementById('spd').innerHTML = s + '<br>KM/H';
}, 2600);

// ── SCROLL REVEAL ──
const revs = document.querySelectorAll('.reveal');
const revObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revs.forEach(r => revObserver.observe(r));

// ── SKILL BARS ──
const bars = document.querySelectorAll('.sk-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.w + '%';
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => { b.style.width = '0%'; barObserver.observe(b); });

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section, [id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 220) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ── JARVIS GREETING ROTATION ──
const greet = document.getElementById('jgreet');
const msgs = [
  '◈ GOOD MORNING. INITIALIZING INTERFACE...',
  '◈ WELCOME BACK, KRRISH.',
  '◈ ALL SYSTEMS NOMINAL. ARC REACTOR AT 99.7%.',
  '◈ SUIT INTEGRITY: 100%. READY FOR DEPLOYMENT.',
  '◈ ANALYZING INCOMING RECRUITER. THREAT LEVEL: OPPORTUNITY.',
  '◈ MARK L ONLINE. REPULSORS CHARGED.',
];
let msgIndex = 0;

setInterval(() => {
  msgIndex = (msgIndex + 1) % msgs.length;
  greet.style.opacity = '0';
  setTimeout(() => {
    greet.textContent = msgs[msgIndex];
    greet.style.opacity = '1';
  }, 400);
}, 4500);
