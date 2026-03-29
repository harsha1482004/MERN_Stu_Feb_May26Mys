// js/features/theme-persist.js
// Saves and restores dark/light theme across page reloads
// Uses: localStorage, classList.add(), click event, check stored value on load

(function () {

    const STORAGE_KEY  = "hv_theme";
    const DARK_CLASS   = "dark-mode";
    const toggleBtn    = document.getElementById("theme-toggle");

    if (!toggleBtn) return;

    // --- Inject dark mode CSS variables into the page ---
    const style = document.createElement("style");
    style.textContent = `
        /* Light mode defaults */
        body {
            background-color: #ffffff;
            color: #1e293b;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Dark mode overrides */
        body.dark-mode {
            background-color: #0f172a;
            color: #e2e8f0;
        }

        body.dark-mode nav {
            background-color: rgba(15, 23, 42, 0.95) !important;
            border-color: #334155;
        }

        body.dark-mode .bg-white,
        body.dark-mode .bg-blue-100 {
            background-color: #1e293b !important;
        }

        body.dark-mode section {
            background-color: #0f172a;
        }

        body.dark-mode .project-card,
        body.dark-mode #modal-content,
        body.dark-mode #recently-viewed > div > div {
            background-color: #1e293b !important;
            border-color: #334155 !important;
            color: #e2e8f0 !important;
        }

        body.dark-mode input,
        body.dark-mode select {
            background-color: #1e293b;
            color: #e2e8f0;
            border-color: #475569;
        }

        body.dark-mode input::placeholder {
            color: #64748b;
        }

        body.dark-mode .text-slate-500,
        body.dark-mode .text-slate-600,
        body.dark-mode .text-gray-700 {
            color: #94a3b8 !important;
        }

        body.dark-mode h1,
        body.dark-mode h2,
        body.dark-mode h3 {
            color: #f1f5f9;
        }

        /* Toggle button label */
        #theme-toggle::before {
            content: attr(data-label);
        }
    `;
    document.head.appendChild(style);

    // --- Apply a theme by class ---
    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add(DARK_CLASS);      // classList.add()
            toggleBtn.dataset.label = "☀️ Light";
            toggleBtn.title = "Switch to Light Mode";
        } else {
            document.body.classList.remove(DARK_CLASS);   // classList.remove()
            toggleBtn.dataset.label = "🌙 Dark";
            toggleBtn.title = "Switch to Dark Mode";
        }
    }

    // --- On page load: check stored value in localStorage ---
    const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
    applyTheme(savedTheme);

    // --- Toggle using click event ---
    toggleBtn.addEventListener("click", () => {
        // Read current state from classList
        const isDark   = document.body.classList.contains(DARK_CLASS);
        const newTheme = isDark ? "light" : "dark";

        // Store selected theme in localStorage
        localStorage.setItem(STORAGE_KEY, newTheme);

        // Apply the new theme
        applyTheme(newTheme);
    });

})();
