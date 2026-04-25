/* ============================================
   GlowCraft Studio — Premium JavaScript
   ============================================ */

'use strict';

// ─── Navbar ───
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      mobileNavOverlay.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('open');
      mobileNavOverlay.classList.add('open');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  mobileNavOverlay?.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ─── Scroll Reveal ───
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ─── Hero Background Parallax ───
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  heroBg.classList.add('loaded');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.3;
    heroBg.style.transform = `scale(1) translateY(${rate}px)`;
  }, { passive: true });
}

// ─── Active Nav Link ───
function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Wishlist Toggle ───
function initWishlist() {
  const wishBtns = document.querySelectorAll('.product-wishlist');
  wishBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const svg = btn.querySelector('svg path, svg');

      if (btn.classList.contains('active')) {
        btn.style.borderColor = '#C9A84C';
        btn.style.color = '#C9A84C';
        btn.style.background = 'rgba(201,168,76,0.12)';
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C" stroke="#C9A84C" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>`;
      } else {
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.style.background = '';
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>`;
      }
    });
  });
}

// ─── Newsletter Form ───
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn = form.querySelector('.newsletter-btn');
    const email = input.value.trim();

    if (!email || !email.includes('@')) {
      input.style.borderColor = '#e08080';
      setTimeout(() => input.style.borderColor = '', 2000);
      return;
    }

    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#5a9e6f';
    input.value = '';
    input.placeholder = 'Thank you for joining us!';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.disabled = false;
      input.placeholder = 'Enter your email address';
    }, 5000);
  });
}

// ─── Contact Form ───
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit span');
    if (!btn) return;

    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.textContent = 'Message Sent ✓';
      form.querySelector('.form-submit').style.background = '#5a9e6f';

      setTimeout(() => {
        btn.textContent = 'Send Message';
        form.querySelector('.form-submit').style.background = '';
        form.reset();
      }, 4000);
    }, 1200);
  });
}

// ─── Marquee Clone (seamless loop) ───
function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track) return;
  const clone = track.innerHTML;
  track.innerHTML += clone;
}

// ─── Smooth Product Card Stagger ───
function initProductStagger() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
  });
}

// ─── Cursor Glow Effect (desktop) ───
function initCursorGlow() {
  if (window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; 
    width: 300px; 
    height: 300px; 
    border-radius: 50%; 
    pointer-events: none; 
    z-index: 9999;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
}

// ─── Page Load Transition ───
function initPageTransition() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = href;
        }, 350);
      });
    }
  });
}

// ─── Number Counter Animation ───
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCount(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ─── Initialize All ───
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeroParallax();
  setActiveNav();
  initWishlist();
  initNewsletter();
  initContactForm();
  initMarquee();
  initProductStagger();
  initCursorGlow();
  initPageTransition();
  initCounters();
});