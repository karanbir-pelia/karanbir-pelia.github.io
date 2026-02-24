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
// Scroll-triggered animations
// IMPORTANT: content is always visible.
// Adding .animate class starts a CSS @keyframes animation.
// Never sets opacity:0 or otherwise hides content.
// ===========================
const animTargets = document.querySelectorAll(
    '.highlight-card, .edu-card, .exp-item, .project-card, .contact-card, .contact-form-panel, .section-header'
);

const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
});

animTargets.forEach((el, i) => {
    el.style.animationDelay = `${(i % 5) * 60}ms`;
    animObserver.observe(el);
});
