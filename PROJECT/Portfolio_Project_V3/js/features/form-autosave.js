// js/features/form-autosave.js
// Auto-saves contact form inputs to localStorage and restores on page load
// Uses: input event, localStorage.setItem, JSON.stringify, getItem, JSON.parse, assign values back

(function () {

    const nameInput  = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");

    if (!nameInput || !emailInput) return;

    const STORAGE_KEY = "hv_contact_form";

    // --- Status indicator (shows "Saved ✓" feedback) ---
    const statusEl = document.createElement("p");
    statusEl.style.cssText = `
        font-size: 0.75rem;
        font-weight: 600;
        color: #16a34a;
        min-height: 16px;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    emailInput.insertAdjacentElement("afterend", statusEl);

    let saveTimer;

    function showSaved() {
        statusEl.textContent = "✓ Draft saved";
        statusEl.style.opacity = "1";
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => { statusEl.style.opacity = "0"; }, 2000);
    }

    // --- Save to localStorage using JSON.stringify ---
    function saveForm() {
        const formData = {
            name:  nameInput.value,
            email: emailInput.value,
        };

        // JSON.stringify() — storing multiple values as one JSON string
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        showSaved();
    }

    // --- input event on form fields ---
    nameInput.addEventListener("input",  saveForm);
    emailInput.addEventListener("input", saveForm);

    // --- On page load: getItem() + JSON.parse() ---
    const saved = localStorage.getItem(STORAGE_KEY);   // getItem()

    if (saved) {
        try {
            const formData = JSON.parse(saved);         // JSON.parse()

            // Assign values back to inputs
            if (formData.name)  nameInput.value  = formData.name;
            if (formData.email) emailInput.value = formData.email;

            // Let user know their draft was restored
            statusEl.textContent = "📋 Draft restored";
            statusEl.style.opacity = "1";
            saveTimer = setTimeout(() => { statusEl.style.opacity = "0"; }, 3000);

        } catch (e) {
            // Corrupted data — clear it
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // --- Clear saved data after successful form submit ---
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", () => {
            localStorage.removeItem(STORAGE_KEY);
            nameInput.value  = "";
            emailInput.value = "";
            statusEl.textContent = "✅ Submitted! Draft cleared.";
            statusEl.style.opacity = "1";
            saveTimer = setTimeout(() => { statusEl.style.opacity = "0"; }, 3000);
        });
    }

    // --- Also clear when cancel button is clicked ---
    const cancelBtn = document.getElementById("form-cancel");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            localStorage.removeItem(STORAGE_KEY);
            nameInput.value  = "";
            emailInput.value = "";
            statusEl.style.opacity = "0";
        });
    }

})();
