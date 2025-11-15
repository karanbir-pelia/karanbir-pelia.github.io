// Floating Action Button (FAB) functionality
document.addEventListener('DOMContentLoaded', function() {
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.getElementById('fabMenu');
    const backToTop = document.getElementById('backToTop');
    let isMenuOpen = false;

    // Toggle FAB menu
    fabMain.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            fabMain.classList.add('active');
            fabMenu.classList.add('active');
        } else {
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        }
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !e.target.closest('.fab-container')) {
            isMenuOpen = false;
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        }
    });

    // Close FAB menu when clicking on an option
    const fabOptions = document.querySelectorAll('.fab-option');
    fabOptions.forEach(option => {
        option.addEventListener('click', function() {
            isMenuOpen = false;
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        });
    });

    // Back to Top button functionality
    let scrollTimeout;

    window.addEventListener('scroll', function() {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Hide FAB during rapid scroll
        clearTimeout(scrollTimeout);
        fabMain.style.opacity = '0.5';

        scrollTimeout = setTimeout(() => {
            fabMain.style.opacity = '1';
        }, 150);
    });

    // Back to top click handler
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Press Escape to close FAB menu
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        }

        // Press Home key to scroll to top
        if (e.key === 'Home' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Add ripple effect on click
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple to FAB buttons
    fabMain.addEventListener('click', createRipple);
    backToTop.addEventListener('click', createRipple);

    // Add ripple styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fab-main, .back-to-top {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
