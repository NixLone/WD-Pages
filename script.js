const weddingDate = new Date("2026-08-21T17:00:00+03:00").getTime();

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const now = Date.now();
  let diff = weddingDate - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days;
  if (hoursEl) hoursEl.textContent = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

/* ===== Mobile menu ===== */
const burger = document.getElementById("burger");
const menu = document.getElementById("mobileMenu");

function closeMenu() {
  if (!menu || !burger) return;
  menu.style.display = "none";
  menu.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false");
}

if (burger && menu) {
  burger.addEventListener("click", () => {
    const opened = menu.style.display === "flex";
    if (opened) {
      closeMenu();
    } else {
      menu.style.display = "flex";
      menu.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
    }
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });
}

/* ===== Smooth scroll ===== */
const headerOffset = 82;

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

/* ===== Reveal on scroll ===== */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}