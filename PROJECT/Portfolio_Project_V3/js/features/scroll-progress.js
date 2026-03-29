// js/features/scroll-progress.js
// Shows a thin progress bar at the top of the page as the user scrolls

(function () {

    // --- Create the bar element ---
    const bar = document.createElement("div");
    bar.id = "scroll-progress-bar";

    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(to right, #f87171, #60a5fa);
        z-index: 9999;
        transition: width 0.1s linear;
        border-radius: 0 2px 2px 0;
    `;

    document.body.prepend(bar);

    // --- Update bar width on scroll ---
    function updateProgress() {
        const scrollY            = window.scrollY;
        const totalScrollHeight  = document.documentElement.scrollHeight - window.innerHeight;

        const percentage = totalScrollHeight > 0
            ? (scrollY / totalScrollHeight) * 100
            : 0;

        bar.style.width = percentage + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });

    // Run once on load in case the page is already scrolled
    updateProgress();

})();
