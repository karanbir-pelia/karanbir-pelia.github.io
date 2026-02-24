// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn    = contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ── Inline error display ──────────────────────────────────────────────────
    function setError(input, message) {
        input.style.borderColor = '#f87171';
        input.style.boxShadow   = '0 0 0 3px rgba(248,113,113,0.15)';
        let feedback = input.parentElement.querySelector('.field-feedback');
        if (!feedback) {
            feedback = document.createElement('p');
            feedback.className = 'field-feedback';
            feedback.style.cssText = 'font-size:0.78rem;color:#f87171;margin-top:0.3rem;';
            input.insertAdjacentElement('afterend', feedback);
        }
        feedback.textContent = message;
    }

    function clearError(input) {
        input.style.borderColor = '';
        input.style.boxShadow   = '';
        const feedback = input.parentElement.querySelector('.field-feedback');
        if (feedback) feedback.textContent = '';
    }

    function clearAllErrors() {
        [nameInput, emailInput, messageInput].forEach(clearError);
    }

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    // ── Validate form ─────────────────────────────────────────────────────────
    function validateForm() {
        let valid = true;

        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            setError(nameInput, 'Please enter your name (at least 2 characters).');
            valid = false;
        }

        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }

        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            setError(messageInput, 'Message must be at least 10 characters.');
            valid = false;
        }

        return valid;
    }

    // ── Form submission ───────────────────────────────────────────────────────
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearAllErrors();

        if (!validateForm()) return;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);

        fetch(contactForm.action + '?_format=json', {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
        })
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.json();
            })
            .then(() => {
                if (window.toast) {
                    window.toast.success({ title: 'Message Sent!', message: 'Thanks! I\'ll get back to you soon.' }, 5000);
                }
                contactForm.reset();
                clearAllErrors();
            })
            .catch(() => {
                if (window.toast) {
                    window.toast.error({ title: 'Error', message: 'Could not send message. Please try again or email directly.' }, 5000);
                }
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            });
    });
});
