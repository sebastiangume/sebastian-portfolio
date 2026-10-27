const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Small rotating headline accent.
const words = ['aprender', 'resolver', 'mejorar', 'crear'];
const rotatingWord = document.getElementById('rotating-word');
let wordIndex = 0;
if (rotatingWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    rotatingWord.style.opacity = '0';
    window.setTimeout(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
      rotatingWord.style.opacity = '1';
    }, 220);
  }, 2300);
}
if (rotatingWord) rotatingWord.style.transition = 'opacity .22s ease';

document.getElementById('year').textContent = new Date().getFullYear();

