const revealElements = document.querySelectorAll('.reveal');
const parallaxElements = document.querySelectorAll('.parallax');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((item) => revealObserver.observe(item));

const setParallax = () => {
  const scrollY = window.scrollY;
  parallaxElements.forEach((el) => {
    const speed = Number(el.dataset.speed || 0.1);
    el.style.transform = `translate3d(0, ${scrollY * speed}px, 0) scale(1.06)`;
  });
};

setParallax();
window.addEventListener('scroll', setParallax, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
}

const targetDate = new Date('2026-08-21T17:00:00+03:00').getTime();
const units = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

const format = (value) => String(value).padStart(2, '0');

const updateCountdown = () => {
  const now = Date.now();
  const diff = Math.max(0, targetDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  units.days.textContent = format(days);
  units.hours.textContent = format(hours);
  units.minutes.textContent = format(minutes);
  units.seconds.textContent = format(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);
