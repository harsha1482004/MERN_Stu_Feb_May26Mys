// js/features/project-count.js
// Displays how many projects are currently visible after search/filter
// Uses: length of filtered array, textContent to update UI

(function () {

    const searchInput = document.getElementById("project-search");
    const container   = document.getElementById("projects-container");

    if (!searchInput || !container) return;

    // --- Create the count display element ---
    const countEl = document.createElement("p");
    countEl.id = "project-count";
    countEl.className = "text-center text-sm font-semibold text-slate-500 mb-6 transition-all duration-200";

    // Insert it between the search bar and the filter bar / projects container
    const searchWrapper = searchInput.closest("div");
    searchWrapper.insertAdjacentElement("afterend", countEl);

    // --- Update count using textContent ---
    function updateCount(total, filtered) {
        if (searchInput.value.trim() === "") {
            // No search active — show total
            countEl.textContent = `${total} project${total !== 1 ? "s" : ""}`;
            countEl.style.color = "";
        } else {
            // Search active — show filtered length
            const count = filtered;                             // length of filtered array
            countEl.textContent = count > 0
                ? `${count} project${count !== 1 ? "s" : ""} found`
                : "No projects found";

            // Colour feedback: green for results, red for none
            countEl.style.color = count > 0 ? "#16a34a" : "#dc2626";
        }
    }

    // --- Count visible cards in the container ---
    function getVisibleCount() {
        const cards = container.querySelectorAll(".project-card");
        let visible = 0;
        cards.forEach(card => {
            if (card.style.display !== "none") visible++;
        });
        return visible;                                        // length of filtered array
    }

    function getTotalCount() {
        return container.querySelectorAll(".project-card").length;
    }

    // --- Hook into the search input event ---
    searchInput.addEventListener("input", () => {
        // Small delay so DOM has time to update after project-filter.js re-renders
        setTimeout(() => {
            const total    = getTotalCount();
            const filtered = getVisibleCount();              // length of filtered array
            updateCount(total, filtered);
        }, 50);
    });

    // --- Also reset count when Escape clears the search ---
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            setTimeout(() => {
                updateCount(getTotalCount(), getTotalCount());
            }, 50);
        }
    });

    // --- Watch for DOM changes so count stays correct
    //     when project-render.js or project-filter.js re-renders cards ---
    const observer = new MutationObserver(() => {
        const total    = getTotalCount();
        const filtered = getVisibleCount();
        updateCount(total, filtered);
    });

    observer.observe(container, { childList: true, subtree: false });

    // --- Initial count on page load ---
    // Wait for other scripts to render the project cards first
    window.addEventListener("DOMContentLoaded", () => {
        const total = getTotalCount();
        updateCount(total, total);
    });

    // Fallback for if DOMContentLoaded already fired
    setTimeout(() => {
        const total = getTotalCount();
        updateCount(total, total);
    }, 300);

})();
