const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -42px 0px' }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxElements = prefersReducedMotion ? [] : [...document.querySelectorAll('[data-parallax]')];

let latestScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.parallax || 0);
    const y = latestScrollY * speed;
    element.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
  });
  ticking = false;
}

function onScroll() {
  latestScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

if (parallaxElements.length) {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const targetDate = new Date('2026-08-21T17:00:00+03:00').getTime();
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateCountdown() {
  const diff = Math.max(0, targetDate - Date.now());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
