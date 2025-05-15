// Fade-in animations on scroll
const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .timeline-date"
);

const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const fadeInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
    });
}, fadeInOptions);

fadeElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    fadeInObserver.observe(el);
});

// Function to handle experience section animations
function resetExperienceAnimations() {
    // Reset timeline date animations
    document.querySelectorAll(".timeline-date").forEach((dateCircle, index) => {
        // Reset animation
        dateCircle.style.animation = "none";
        dateCircle.offsetHeight; // Trigger reflow

        // Restore animation with appropriate delay
        const delay = 0.1 + index * 0.2; // 0.1s, 0.3s, 0.5s

        if (dateCircle.closest(".timeline-item:nth-child(odd)")) {
            dateCircle.style.animation = `fadeInCircleRight 0.8s ease ${delay}s forwards`;
        } else {
            dateCircle.style.animation = `fadeInCircleLeft 0.8s ease ${delay}s forwards`;
        }

        dateCircle.style.opacity = "0";
        dateCircle.style.animationPlayState = "paused";
        fadeInObserver.observe(dateCircle);
    });

    // Also reset content animations in the timeline
    document.querySelectorAll(".timeline-content").forEach((content, index) => {
        content.style.animation = "none";
        content.offsetHeight; // Trigger reflow

        // Restore original animation
        if (content.classList.contains("fade-in-right")) {
            content.style.animation = "fadeInRight 0.8s ease forwards";
        } else if (content.classList.contains("fade-in-left")) {
            content.style.animation = "fadeInLeft 0.8s ease forwards";
        }

        content.style.animationDelay = `${0.1 + index * 0.2}s`;
        content.style.opacity = "0";
        content.style.animationPlayState = "paused";
        fadeInObserver.observe(content);
    });
}

// Reset animations when using navigation links
document.querySelectorAll('a[href^="#"]').forEach((navLink) => {
    navLink.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        if (targetId === "experience") {
            resetExperienceAnimations();
        }
    });
});

// Check if page loaded directly on experience section
document.addEventListener("DOMContentLoaded", function () {
    // Check if hash exists and points to experience section
    if (window.location.hash === "#experience") {
        // Delay slightly to ensure elements are ready
        setTimeout(resetExperienceAnimations, 100);
    }

    // Listen for hash changes (browser back/forward buttons)
    window.addEventListener("hashchange", function () {
        if (window.location.hash === "#experience") {
            resetExperienceAnimations();
        }
    });
});
