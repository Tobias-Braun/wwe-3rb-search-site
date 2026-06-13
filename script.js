// Fehlende Fotos erkennen und die Karte auf den beschrifteten
// Platzhalter umschalten (Text steckt im data-platzhalter-Attribut).
document.querySelectorAll('.photo-card img').forEach((img) => {
  const markMissing = () => img.closest('.photo-card').classList.add('missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener('error', markMissing);
});

// Karten gleiten beim Scrollen sanft in den Feed hinein.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.card').forEach((card) => observer.observe(card));

// Like-Herz: füllt sich beim Klick und lässt kleine Herzen aufsteigen.
document.querySelectorAll('.like-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
    if (btn.classList.contains('liked')) burstHearts(btn.parentElement);
  });
});

function burstHearts(card) {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = '💜';
    // Jedes Herz driftet zufällig zur Seite und startet leicht versetzt.
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 80}px`);
    heart.style.animationDelay = `${i * 60}ms`;
    card.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
  }
}
