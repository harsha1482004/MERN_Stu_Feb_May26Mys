// js/features/back-to-top.js
// Shows a button after scrolling down, clicking it smoothly scrolls back to top
// Uses: scroll event, classList show/hide, window.scrollTo smooth

(function () {

    // --- Create the button ---
    const btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.title = "Back to top";
    btn.innerHTML = "↑";

    btn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #f87171;
        color: white;
        font-size: 1.4rem;
        font-weight: bold;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        z-index: 9998;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
    `;

    document.body.appendChild(btn);

    // --- Show / hide using classList ---
    const SCROLL_THRESHOLD = 300; // px before button appears

    function onScroll() {
        if (window.scrollY > SCROLL_THRESHOLD) {
            // Show button
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
            btn.style.pointerEvents = "auto";
        } else {
            // Hide button
            btn.style.opacity = "0";
            btn.style.transform = "translateY(12px)";
            btn.style.pointerEvents = "none";
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // --- Smooth scroll to top on click ---
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Run once on load
    onScroll();

})();
