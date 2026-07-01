/**
 * Portfolio — main.js
 * Nav active-state · smooth scroll · back-to-top · metric count-up ·
 * scroll-reveal · project-card click-through · contact textarea niceties
 *
 * Deliberately scroll-position based (not IntersectionObserver) — simple,
 * dependency-free, and behaves identically across browsers/embedded webviews.
 */

const hasMotion = document.documentElement.classList.contains('has-motion');
const backToTop = document.getElementById('backToTop');
const navLinkEls = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('main section[id]');

// ===========================
// Active nav link (rail + tab bar)
// ===========================
function updateActiveNav() {
    let current = sections.length ? sections[0].id : '';
    sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - window.innerHeight * 0.45) {
            current = sec.id;
        }
    });
    navLinkEls.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// ===========================
// Smooth scroll for in-page anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: hasMotion ? 'smooth' : 'auto', block: 'start' });
        history.pushState(null, null, `#${id}`);
    });
});

// ===========================
// Back to Top
// ===========================
window.addEventListener(
    'scroll',
    () => {
        backToTop?.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true }
);

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: hasMotion ? 'smooth' : 'auto' });
});

// ===========================
// Metric count-up (hero credibility tiles) — runs once, shortly after load
// ===========================
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target;
        }
    }
    requestAnimationFrame(tick);
}

const metricEls = document.querySelectorAll('.metric__value[data-count]');
if (metricEls.length) {
    if (hasMotion) {
        metricEls.forEach((el) => animateCount(el));
    } else {
        metricEls.forEach((el) => {
            el.textContent = el.dataset.count;
        });
    }
}

// ===========================
// Scroll-reveal (progressive enhancement — see styles.css .has-motion)
// ===========================
if (hasMotion) {
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    let throttled = false;

    function revealCheck() {
        for (let i = revealEls.length - 1; i >= 0; i--) {
            const el = revealEls[i];
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                el.classList.add('is-visible');
                revealEls.splice(i, 1);
            }
        }
    }

    function onScroll() {
        if (throttled) return;
        throttled = true;
        setTimeout(() => {
            throttled = false;
            revealCheck();
        }, 100);
    }

    revealCheck();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', revealCheck);
}

// ===========================
// Project card — click anywhere to follow primary link
// ===========================
document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        const primaryLink = card.querySelector('.project-card__links .icon-btn[href]');
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
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach((field) => {
    function toggleFilled() {
        field.classList.toggle('has-value', field.value.trim().length > 0);
    }
    field.addEventListener('input', toggleFilled);
    toggleFilled();
});
