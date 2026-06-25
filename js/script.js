document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll state
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('is-open'));
mainNav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => mainNav.classList.remove('is-open'))
);

// Hero slider
const slides = Array.from(document.querySelectorAll('.hero-slide'));
const dotsContainer = document.getElementById('hero-dots');
let current = 0;
let sliderTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
  dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = Array.from(dotsContainer.children);

function goToSlide(index) {
  slides[current].classList.remove('is-active');
  dots[current].classList.remove('is-active');
  current = index;
  slides[current].classList.add('is-active');
  dots[current].classList.add('is-active');
  restartTimer();
}

function nextSlide() {
  goToSlide((current + 1) % slides.length);
}

function restartTimer() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(nextSlide, 5500);
}

restartTimer();

// Contact form (Formspree AJAX submit)
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formNote.textContent = 'Enviando...';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (response.ok) {
      formNote.textContent = '¡Gracias! Te vamos a contactar a la brevedad.';
      form.reset();
    } else {
      formNote.textContent = 'Hubo un problema al enviar. Probá de nuevo o escribinos por WhatsApp.';
    }
  } catch (err) {
    formNote.textContent = 'Hubo un problema al enviar. Probá de nuevo o escribinos por WhatsApp.';
  }
});
