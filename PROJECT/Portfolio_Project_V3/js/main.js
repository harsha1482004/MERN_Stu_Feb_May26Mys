// js/main.js
// Portfolio entry point — runs after all feature scripts are loaded

(function () {

    // ── Highlight active nav on load ──────────────
    const currentHash = window.location.hash;
    if (currentHash) {
        const activeLink = document.querySelector(`nav ul a[href="${currentHash}"]`);
        if (activeLink) activeLink.classList.add("active-nav");
    }

    // ── Smooth scroll for all anchor links ────────
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", this.getAttribute("href"));
            }
        });
    });

    // ── Log load confirmation ──────────────────────
    console.log("✅ Portfolio initialised successfully");

})();
