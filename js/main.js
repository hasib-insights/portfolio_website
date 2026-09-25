// ===== THEME TOGGLE =====
(function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const themeLabel = document.querySelector('#themeToggleMobile .theme-label');
  
  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeUI(next);
  }
  
  function updateThemeUI(theme) {
    // Update mobile label text
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
    
    // Toggle sun/moon icons
    document.querySelectorAll('.theme-icon-dark').forEach(el => {
      el.classList.toggle('hidden', theme === 'light');
    });
    document.querySelectorAll('.theme-icon-light').forEach(el => {
      el.classList.toggle('hidden', theme === 'dark');
    });
  }
  
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
    // Don't close menu for theme toggle button
    if (link.id === 'themeToggleMobile') return;
    
    menuOpen = false;
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.innerHTML = '<span class="iconify" data-icon="lucide:menu" data-width="24"></span>';
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  
  if (window.scrollY > 50) {
    navbar.style.background = theme === 'dark' 
      ? 'rgba(10,10,10,0.95)' 
      : 'rgba(255,255,255,0.95)';
    navbar.style.borderBottom = theme === 'dark'
      ? '1px solid rgba(45,45,45,0.3)'
      : '1px solid rgba(0,0,0,0.06)';
  } else {
    navbar.style.background = theme === 'dark' 
      ? 'rgba(10,10,10,0.85)' 
      : 'rgba(255,255,255,0.85)';
    navbar.style.borderBottom = 'none';
  }
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.getAttribute('data-width');
      entry.target.style.width = targetWidth;
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
      toastMessage.textContent = 'Please fill in all fields.';
      toast.querySelector('.iconify').setAttribute('data-icon', 'lucide:alert-circle');
      toast.querySelector('.iconify').style.color = '#FF6B6B';
      toast.style.borderColor = 'rgba(255,107,107,0.2)';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
      return;
    }

    // Submit button loading state
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span class="iconify animate-spin" data-icon="lucide:loader-2" data-width="14"></span> Sending...';
    btn.disabled = true;

    // Simulate send (replace with actual Formspree submission)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      contactForm.reset();
      toastMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      toast.querySelector('.iconify').setAttribute('data-icon', 'lucide:check-circle-2');
      toast.querySelector('.iconify').style.color = '#BFFF00';
      toast.style.borderColor = 'rgba(191,255,0,0.2)';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }, 1200);
  });
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-lime-accent');
    link.classList.add('text-gray-400');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.remove('text-gray-400');
      link.classList.add('text-lime-accent');
    }
  });
});
