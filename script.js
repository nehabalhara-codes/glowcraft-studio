/* ═══════════════════════════════════════════════════════════════
   GlowCraft Studio — Elite JS v3.0
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── SCROLL PROGRESS ── */
function initProgress() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;
  const update = () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── CURSOR ── */
function initCursor() {
  const dot  = document.querySelector('.c-dot');
  const ring = document.querySelector('.c-ring');
  if (!dot || !ring || window.matchMedia('(hover:none)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

  const hovTargets = 'a, button, .ed-card, .val-item, .faq-card, .tm-card, .p-step, .m-card';
  document.querySelectorAll(hovTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hov'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hov'));
  });

  (function raf() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(raf);
  })();
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('solid', window.scrollY > 80);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── MOBILE DRAWER ── */
function initDrawer() {
  const burger  = document.querySelector('.burger');
  const drawer  = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.drawer-bg');
  if (!burger || !drawer) return;

  const open  = () => { drawer.classList.add('open'); overlay?.classList.add('open'); burger.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { drawer.classList.remove('open'); overlay?.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = ''; };

  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  overlay?.addEventListener('click', close);
  drawer.querySelectorAll('.d-link, .btn').forEach(l => l.addEventListener('click', close));
}

/* ── HERO BG LOAD ANIMATION ── */
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (bg) requestAnimationFrame(() => bg.classList.add('rdy'));
}

/* ── HERO PARALLAX ── */
function initHeroParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      bg.style.transform = `scale(1) translateY(${y * 0.22}px)`;
    }
  }, { passive: true });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('[data-r]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -44px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ── TICKER CLONE ── */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (track) track.innerHTML += track.innerHTML;
}

/* ── COUNTER ANIMATION ── */
function countUp(el, target, dur = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUp(e.target, +e.target.dataset.count); obs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  els.forEach(el => obs.observe(el));
}

/* ── WISHLIST ── */
function initWishlist() {
  document.querySelectorAll('.ed-wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const on = btn.classList.toggle('on');
      btn.innerHTML = on
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    });
  });
}

/* ── NEWSLETTER ── */
function initNewsletter() {
  const form = document.querySelector('.nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('.nl-input');
    const btn = form.querySelector('.nl-btn');
    if (!inp.value.includes('@')) {
      inp.style.borderColor = '#c0392b';
      setTimeout(() => inp.style.borderColor = '', 2000);
      return;
    }
    btn.textContent = 'You\'re In ✓';
    btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';
    inp.value = ''; inp.placeholder = 'Thank you for joining us!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.disabled = false;
      inp.placeholder = 'Enter your email address';
    }, 6000);
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.f-submit');
    const orig = btn.textContent;
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';
      form.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 5500);
    }, 1500);
  });
}

/* ── ACTIVE NAV ── */
function initActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.n-link, .d-link').forEach(a => {
    if ((a.getAttribute('href') || '') === page) a.classList.add('cur');
  });
}

/* ── PAGE TRANSITION ── */
function initPageFade() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .42s ease';
  window.addEventListener('load', () => { document.body.style.opacity = '1'; });
  document.querySelectorAll('a[href]').forEach(a => {
    const h = a.getAttribute('href');
    if (!h || h.startsWith('#') || h.startsWith('http') || h.startsWith('mailto') || h.startsWith('tel')) return;
    a.addEventListener('click', ev => {
      ev.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => location.href = h, 360);
    });
  });
}

/* ── LIGHT NAV TOGGLE (for about/contact pages) ── */
function initLightNav() {
  const nav = document.querySelector('.navbar.light');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) { nav.classList.add('solid'); nav.classList.remove('light'); }
    else { nav.classList.remove('solid'); nav.classList.add('light'); }
  }, { passive: true });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initProgress();
  initCursor();
  initNavbar();
  initDrawer();
  initHeroBg();
  initHeroParallax();
  initReveal();
  initTicker();
  initCounters();
  initWishlist();
  initNewsletter();
  initContactForm();
  initActiveNav();
  initPageFade();
  initLightNav();
});
