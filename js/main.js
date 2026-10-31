// ===== THEME TOGGLE (light by default, remembered in localStorage) =====
(function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const themeLabel = document.querySelector('#themeToggleMobile .theme-label');

  function getSaved() {
    try { return localStorage.getItem('theme') || 'light'; }
    catch (e) { return 'light'; }
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    if (themeToggle) themeToggle.setAttribute('aria-label', label);
    if (themeToggleMobile) themeToggleMobile.setAttribute('aria-label', label);
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  }

  apply(getSaved());
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
})();

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
  mobileMenuBtn.innerHTML = menuOpen
    ? '<span class="iconify" data-icon="lucide:x" data-width="24"></span>'
    : '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    if (link.id === 'themeToggleMobile') return; // keep menu open for theme toggle
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.innerHTML = '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar-fill').forEach(bar => skillObserver.observe(bar));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message, isError, duration) {
  toastMessage.textContent = message;
  toast.classList.toggle('error', isError);
  toast.querySelector('.iconify').setAttribute(
    'data-icon', isError ? 'lucide:alert-circle' : 'lucide:check-circle-2'
  );
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields.', true, 3000);
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="iconify animate-spin" data-icon="lucide:loader-2" data-width="14"></span> Sending...';
    btn.disabled = true;

    // Simulate send (replace with actual Formspree submission)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      contactForm.reset();
      showToast('Message sent successfully! I\'ll get back to you soon.', false, 4000);
    }, 1200);
  });
}

// ===== ACTIVE NAV LINK (desktop links only) =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar div.gap-6 > a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + current;
    link.classList.toggle('text-lime-accent', active);
    link.classList.toggle('text-gray-400', !active);
  });
});
