// Fade-in animations on scroll
const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-up, .fade-in-left, .fade-in-right"
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
