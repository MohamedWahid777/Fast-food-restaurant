/**
 * BurgerRush – script.js
 * Handles: Dark/Light Mode | Language Toggle (EN/AR, RTL) | 
 *          Navbar | Menu Filter | Smooth Scroll | Toast | Mobile Menu
 */

(function () {
  'use strict';

  // ══════════════════════════════
  // CONSTANTS & STATE
  // ══════════════════════════════
  const html        = document.documentElement;
  const body        = document.body;
  const navbar      = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const langToggle  = document.getElementById('langToggle');
  const hamburger   = document.getElementById('hamburger');
  const navLinks    = document.getElementById('navLinks');
  const menuGrid    = document.getElementById('menuGrid');
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const toast       = document.getElementById('toast');

  let currentTheme = localStorage.getItem('brTheme') || 'dark';
  let currentLang  = localStorage.getItem('brLang')  || 'en';

  // ══════════════════════════════
  // DARK / LIGHT MODE
  // ══════════════════════════════
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('brTheme', theme);
    currentTheme = theme;
  }

  themeToggle.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // ══════════════════════════════
  // LANGUAGE TOGGLE (EN / AR)
  // ══════════════════════════════

  /** Walk through every [data-en] / [data-ar] element and swap text */
  function applyLanguage(lang) {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en]').forEach((el) => {
      // Prefer data-en-text / data-ar-text for elements that embed
      // a different language natively (e.g. the Arabic reviewer quote)
      const enText = el.getAttribute('data-en-text') || el.getAttribute('data-en');
      const arText = el.getAttribute('data-ar');
      if (!arText) return;
      el.textContent = lang === 'ar' ? arText : enText;
    });

    // Swap nav lang label active highlight (optional, purely cosmetic)
    const labelEl = document.getElementById('langLabel');
    if (labelEl) labelEl.textContent = lang === 'ar' ? 'AR' : 'EN';

    // Update font reference on body for proper AR rendering
    // (CSS handles this via [data-lang="ar"] selector)
    
    localStorage.setItem('brLang', lang);
    currentLang = lang;
  }

  langToggle.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    // Close mobile nav if open
    closeMobileMenu();
  });

  // ══════════════════════════════
  // NAVBAR – SCROLL EFFECT
  // ══════════════════════════════
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ══════════════════════════════
  // MOBILE MENU (HAMBURGER)
  // ══════════════════════════════
  function openMobileMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMobileMenu() {
    navLinks.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navbar.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  // ══════════════════════════════
  // MENU FILTER
  // ══════════════════════════════
  function filterMenu(category) {
    const cards = menuGrid.querySelectorAll('.menu-card');

    cards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      if (category === 'all' || cat === category) {
        card.classList.remove('hidden');
        // Small stagger entrance
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'fadeUp 0.35s ease both';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      // Filter
      filterMenu(btn.getAttribute('data-filter'));
    });
  });

  // ══════════════════════════════
  // ADD-TO-ORDER BUTTONS (TOAST)
  // ══════════════════════════════
  const toastMessages = {
    en: (name) => `✅ "${name}" added to your order!`,
    ar: (name) => `✅ تمت إضافة "${name}" إلى طلبك!`,
  };

  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card    = btn.closest('.menu-card');
      const nameEl  = card.querySelector('h3');
      const itemName = currentLang === 'ar'
        ? (nameEl.getAttribute('data-ar') || nameEl.textContent.trim())
        : (nameEl.getAttribute('data-en') || nameEl.textContent.trim());
      showToast(toastMessages[currentLang](itemName));
    });
  });

  // ══════════════════════════════
  // SMOOTH SCROLL (NATIVE FALLBACK POLYFILL)
  // ══════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  // ══════════════════════════════
  // INTERSECTION OBSERVER – FADE IN ON SCROLL
  // ══════════════════════════════
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.5s ease both';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and section headers
  document.querySelectorAll(
    '.menu-card, .why-card, .review-card, .contact-card, .about-grid, .section-header'
  ).forEach((el) => {
    el.style.opacity = '0'; // start hidden
    observer.observe(el);
  });

  // When fadeUp animation starts, make visible
  document.querySelectorAll(
    '.menu-card, .why-card, .review-card, .contact-card, .about-grid, .section-header'
  ).forEach((el) => {
    el.addEventListener('animationstart', () => {
      el.style.opacity = '1';
    }, { once: true });
  });

  // ══════════════════════════════
  // INIT
  // ══════════════════════════════
  function init() {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    handleNavbarScroll();
  }

  init();

})();
