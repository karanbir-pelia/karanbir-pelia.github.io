/**
 * Portfolio — main.js
 * Navbar · mobile menu · smooth scroll · scroll animations (additive only)
 */

// ===========================
// DOM References
// ===========================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const overlay   = document.getElementById('mobileOverlay');
const backToTop = document.getElementById('backToTop');
const navLinkEls = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id]');

// ===========================
// Navbar scroll effect
// ===========================
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===========================
// Mobile menu
// ===========================
function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    navLinks.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

overlay.addEventListener('click', closeMobileMenu);

navLinkEls.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ===========================
// Smooth scroll with offset
// ===========================
const NAV_OFFSET = 80;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id     = this.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
        history.pushState(null, null, `#${id}`);
    });
});

// ===========================
// Active nav link on scroll
// ===========================
function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - NAV_OFFSET - 10) {
            current = sec.id;
        }
    });
    navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ===========================
// Back to Top
// ===========================
window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Project card — click anywhere to follow primary link
// ===========================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
        // Don't override direct link/button clicks
        if (e.target.closest('a, button')) return;
        const primaryLink = card.querySelector('.project-link-icon[href]');
        if (primaryLink) {
            window.open(primaryLink.href, '_blank', 'noopener,noreferrer');
        }
    });
});

// ===========================
// Contact textarea — auto-resize as user types
// ===========================
const msgTextarea = document.querySelector('#contactForm textarea[name="message"]');
if (msgTextarea) {
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 320) + 'px';
    }
    msgTextarea.addEventListener('input', autoResize);
}

// ===========================
// Contact form — track filled state for CSS
// ===========================
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
    function toggleFilled() {
        field.classList.toggle('has-value', field.value.trim().length > 0);
    }
    field.addEventListener('input', toggleFilled);
    toggleFilled(); // initial state
});
