/* ================================================================
   GlowCraft Studio — Premium JS v2.0
   ================================================================ */
'use strict';

/* ─── SCROLL PROGRESS ─── */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  if (window.innerWidth <= 768) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

  const hovEls = document.querySelectorAll('a, button, .product-card, .value-card, .faq-card, .team-card');
  hovEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  function tick() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  }
  tick();
}

/* ─── NAVBAR ─── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  function update() {
    if (window.scrollY > 70) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── MOBILE DRAWER ─── */
function initDrawer() {
  const burger  = document.querySelector('.hamburger');
  const drawer  = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  if (!burger || !drawer) return;

  function open() {
    drawer.classList.add('open');
    overlay?.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
  }
  function close() {
    drawer.classList.remove('open');
    overlay?.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  overlay?.addEventListener('click', close);
  drawer.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', close));
}

/* ─── HERO BG KEN BURNS ─── */
function initHeroBg() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  bg.classList.add('loaded');
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ─── MARQUEE CLONE ─── */
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

/* ─── COUNTER ANIMATION ─── */
function animCount(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animCount(entry.target, +entry.target.dataset.count);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

/* ─── WISHLIST TOGGLE ─── */
function initWishlist() {
  document.querySelectorAll('.product-wish').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const on = btn.classList.toggle('wished');
      btn.innerHTML = on
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="#D4AF37" stroke="#D4AF37" stroke-width="1.5" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    });
  });
}

/* ─── NEWSLETTER FORM ─── */
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inp = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    if (!inp.value.includes('@')) {
      inp.style.borderColor = '#c0392b';
      inp.focus();
      setTimeout(() => inp.style.borderColor = '', 2000);
      return;
    }
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#27ae60';
    inp.value = '';
    inp.placeholder = 'Thank you for joining us!';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.disabled = false;
      inp.placeholder = 'Enter your email address';
    }, 5000);
  });
}

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#27ae60';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    }, 1400);
  });
}

/* ─── ACTIVE NAV LINK ─── */
function initActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── PAGE TRANSITION ─── */
function initPageTransition() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  window.addEventListener('load', () => { document.body.style.opacity = '1'; });

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });
}

/* ─── HERO PARALLAX ─── */
function initHeroParallax() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      bg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}

/* ─── PRODUCT STAGGER ─── */
function initProductStagger() {
  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.setAttribute('data-reveal', '');
    card.setAttribute('data-delay', String(Math.min(i % 3 + 1, 6)));
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCursor();
  initNavbar();
  initDrawer();
  initHeroBg();
  initReveal();
  initMarquee();
  initCounters();
  initWishlist();
  initNewsletter();
  initContactForm();
  initActiveNav();
  initPageTransition();
  initHeroParallax();
  initProductStagger();

  // Re-run reveal after stagger attrs set
  setTimeout(initReveal, 50);
});
