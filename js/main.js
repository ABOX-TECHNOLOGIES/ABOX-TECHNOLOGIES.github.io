/* ABOX Technologies — progressive enhancement, no application framework. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var I18N = window.ABOX_I18N || {};
  var toggle = document.querySelector('.lang-toggle');
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var copyButton = document.querySelector('.copy-email');
  var copyStatus = document.querySelector('.copy-status');
  var emailLink = document.querySelector('.cta-actions a[href^="mailto:"]');
  var current = 'en';
  var copyTimer;
  try {
    var saved = localStorage.getItem('abox-lang');
    current = I18N[saved] ? saved : (/^zh/i.test(navigator.language || '') ? 'zh' : 'en');
  } catch (_) {
    current = /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  function dict() { return I18N[current] || I18N.en || {}; }
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  }
  function navLabel() {
    if (navToggle) navToggle.setAttribute('aria-label', dict()[navToggle.getAttribute('aria-expanded') === 'true' ? 'nav.close' : 'nav.open']);
  }
  function applyLang() {
    var words = dict();
    document.documentElement.lang = words._lang || 'en';
    document.title = words._title || document.title;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      // All dictionary values are trusted local copy; no user input is inserted.
      if (words[key] !== undefined) el.innerHTML = words[key];
    });
    if (toggle) {
      toggle.textContent = words._toggleLabel;
      toggle.setAttribute('aria-label', words['lang.label']);
      toggle.lang = current === 'en' ? 'zh-CN' : 'en';
    }
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = words._description;
    document.querySelector('meta[property="og:title"]').content = words._title;
    document.querySelector('meta[property="og:description"]').content = words._description;
    if (nav) nav.setAttribute('aria-label', words['nav.label']);
    document.querySelector('.hero-tags').setAttribute('aria-label', words['tag.label']);
    document.querySelectorAll('.brand').forEach(function (el) { el.setAttribute('aria-label', words['brand.home']); });
    if (emailLink) emailLink.href = 'mailto:hello@aboxtechs.com?subject=' + encodeURIComponent(words['contact.subject']) + '&body=' + encodeURIComponent(words['contact.body']);
    if (copyStatus) copyStatus.textContent = '';
    navLabel();
    try { localStorage.setItem('abox-lang', current); } catch (_) { /* optional storage */ }
  }
  applyLang();
  if (toggle) toggle.addEventListener('click', function () {
    current = current === 'en' ? 'zh' : 'en';
    applyLang();
    track('language_switch', { language: current });
  });

  function closeNav(restoreFocus) {
    if (!nav || !navToggle) return;
    var wasOpen = nav.classList.contains('is-open');
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navLabel();
    if (restoreFocus && wasOpen) navToggle.focus();
  }
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navLabel();
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav(false);
        var target = document.querySelector(link.hash);
        // Make the selected section the next keyboard focus destination.
        if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeNav(true);
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeNav(false);
    });
    document.addEventListener('focusin', function (event) {
      if (!nav.contains(event.target) && event.target !== navToggle) closeNav(false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function () { closeNav(false); });
  }

  if (copyButton) copyButton.addEventListener('click', async function () {
    clearTimeout(copyTimer);
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('hello@aboxtechs.com');
      copyStatus.textContent = dict()['contact.copied'];
      track('contact_email_copy', { language: current });
    } catch (_) {
      copyStatus.textContent = dict()['contact.copyFailed'];
    }
    copyTimer = setTimeout(function () { copyStatus.textContent = ''; }, 6000);
  });
  if (emailLink) emailLink.addEventListener('click', function () {
    track('contact_email_click', { language: current, location: 'contact' });
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      revealEls.forEach(function (el) {
        // Elements already on screen never wait for the observer to render.
        if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('reveal-pending');
        observer.observe(el);
      });
      document.documentElement.classList.add('reveal-ready');
    } catch (_) {
      revealEls.forEach(function (el) { el.classList.remove('reveal-pending'); });
    }
  }
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
