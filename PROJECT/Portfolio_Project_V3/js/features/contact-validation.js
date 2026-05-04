// js/features/contact-validation.js
// Validates the contact form before submission

(function () {

    const form      = document.getElementById("contact-form");
    const nameInput = document.getElementById("contact-name");
    const emailInput= document.getElementById("contact-email");
    const msgEl     = document.getElementById("form-message");

    if (!form) return;

    function showMessage(text, isError = true) {
        msgEl.textContent = text;
        msgEl.style.color = isError ? "#dc2626" : "#16a34a";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name  = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            showMessage("Please enter your name.");
            nameInput.focus();
            return;
        }

        if (!email) {
            showMessage("Please enter your email.");
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // All good
        showMessage(`Thanks ${name}! I'll get back to you soon.`, false);
        form.reset();

        // Auto-clear success message after 4 seconds
        setTimeout(() => { msgEl.textContent = ""; }, 4000);
    });

    // Clear error on input
    [nameInput, emailInput].forEach(input => {
        input.addEventListener("input", () => { msgEl.textContent = ""; });
    });

})();
