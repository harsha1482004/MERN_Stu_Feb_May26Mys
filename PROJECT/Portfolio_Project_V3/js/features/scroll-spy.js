// js/features/scroll-spy.js
// Highlights the active nav link based on which section is currently in view
// Uses: querySelectorAll, loop, getBoundingClientRect, classList.add/remove

(function () {

    // --- Get all sections and nav links using querySelectorAll() ---
    const sections  = document.querySelectorAll("section[id]");
    const navLinks  = document.querySelectorAll("nav ul a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    // --- classList.remove() all active styles from every link ---
    function clearAll() {
        navLinks.forEach(link => {
            link.classList.remove("active-nav");
        });
    }

    // --- classList.add() active style to the matching link ---
    function setActive(id) {
        clearAll();
        navLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active-nav");
            }
        });
    }

    // --- Inject the active-nav style into the page ---
    const style = document.createElement("style");
    style.textContent = `
        nav ul a.active-nav {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 2px;
        }
    `;
    document.head.appendChild(style);

    // --- Core scroll spy logic ---
    function onScroll() {

        // Clear all when back at the very top
        if (window.scrollY < 100) {
            clearAll();
            return;
        }

        let activeSectionId = null;

        // Loop through sections using getBoundingClientRect()
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Section is considered "active" when its top is above
            // 40% of the viewport height and bottom is still visible
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
                activeSectionId = section.id;
            }
        });

        if (activeSectionId) {
            setActive(activeSectionId);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // Run once on load
    onScroll();

})();
