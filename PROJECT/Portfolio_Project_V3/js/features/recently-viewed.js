// js/features/recently-viewed.js
// Sorts projects via a dropdown
// Tracks and displays recently viewed projects
// Uses: click event, array, localStorage, includes()/some(), dynamic render

(function () {

    const container = document.getElementById("projects-container");
    if (!container) return;

    const STORAGE_KEY  = "hv_recently_viewed";
    const MAX_RECENT   = 3;

    // --- Load saved data from localStorage ---
    function loadRecent() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        try {
            return JSON.parse(saved);   // JSON.parse()
        } catch {
            return [];
        }
    }

    // --- Save array to localStorage ---
    function saveRecent(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    // --- Create the "Recently Viewed" section below projects ---
    const recentSection = document.createElement("div");
    recentSection.id = "recently-viewed";
    recentSection.style.cssText = `
        margin-top: 60px;
        padding-top: 40px;
        border-top: 2px dashed #e2e8f0;
    `;
    container.insertAdjacentElement("afterend", recentSection);

    // --- Render the recently viewed section dynamically ---
    function renderRecent() {
        const list = loadRecent();

        recentSection.innerHTML = "";   // clear

        if (list.length === 0) return;  // hide section if empty

        // Heading — createElement()
        const heading = document.createElement("h3");
        heading.textContent = "🕓 Recently Viewed";
        heading.style.cssText = `
            font-size: 1.25rem; font-weight: 800;
            color: #334155; margin-bottom: 20px;
            text-align: center;
        `;
        recentSection.appendChild(heading);

        // Cards row
        const row = document.createElement("div");
        row.style.cssText = `
            display: flex; flex-wrap: wrap;
            gap: 16px; justify-content: center;
        `;

        // Loop through stored array and render each — forEach
        list.forEach(project => {
            const card = document.createElement("div");
            card.style.cssText = `
                background: white;
                border: 2px solid #e2e8f0;
                border-left: 4px solid #60a5fa;
                border-radius: 12px;
                padding: 16px 20px;
                min-width: 200px;
                max-width: 260px;
                flex: 1;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                cursor: pointer;
                transition: box-shadow 0.2s ease, transform 0.2s ease;
            `;

            card.onmouseenter = () => {
                card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
                card.style.transform = "translateY(-2px)";
            };
            card.onmouseleave = () => {
                card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                card.style.transform = "translateY(0)";
            };

            const title = document.createElement("p");
            title.textContent = project.title;
            title.style.cssText = `
                font-weight: 700; font-size: 0.9rem;
                color: #1e293b; margin-bottom: 6px;
            `;

            const tags = document.createElement("p");
            tags.textContent = project.tags.slice(0, 2).join(" · ");
            tags.style.cssText = `
                font-size: 0.75rem; color: #94a3b8; font-weight: 500;
            `;

            // Clear button per card
            const clearBtn = document.createElement("button");
            clearBtn.textContent = "✕";
            clearBtn.title = "Remove";
            clearBtn.style.cssText = `
                float: right; background: none; border: none;
                font-size: 0.85rem; color: #cbd5e1;
                cursor: pointer; padding: 0; line-height: 1;
            `;
            clearBtn.onmouseenter = () => { clearBtn.style.color = "#ef4444"; };
            clearBtn.onmouseleave = () => { clearBtn.style.color = "#cbd5e1"; };

            // Remove individual item on ✕ click
            clearBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const updated = loadRecent().filter(p => p.title !== project.title);
                saveRecent(updated);
                renderRecent();
            });

            card.appendChild(clearBtn);
            card.appendChild(title);
            card.appendChild(tags);
            row.appendChild(card);      // appendChild()
        });

        recentSection.appendChild(row);

        // Clear all button
        const clearAll = document.createElement("button");
        clearAll.textContent = "Clear All";
        clearAll.style.cssText = `
            display: block; margin: 20px auto 0;
            font-size: 0.8rem; font-weight: 600;
            color: #94a3b8; background: none; border: none;
            cursor: pointer; text-decoration: underline;
        `;
        clearAll.addEventListener("click", () => {
            localStorage.removeItem(STORAGE_KEY);
            renderRecent();
        });
        recentSection.appendChild(clearAll);
    }

    // --- Click event on project cards (delegated to container) ---
    container.addEventListener("click", (e) => {
        const card = e.target.closest(".project-card");
        if (!card) return;

        const title    = card.dataset.title       || card.querySelector("h3")?.textContent || "Untitled";
        const tagsRaw  = card.dataset.tags        || "";
        const tags     = tagsRaw.split(" ").filter(Boolean);
        const category = card.dataset.category    || "";

        const project = { title, tags, category };

        // Load current list — store project data in array
        const recent = loadRecent();

        // Avoid duplicates using some()
        const alreadyExists = recent.some(p => p.title === project.title);

        if (!alreadyExists) {
            // Add to front of array
            recent.unshift(project);

            // Keep only the last MAX_RECENT items
            if (recent.length > MAX_RECENT) recent.pop();

            // Save updated array using localStorage
            saveRecent(recent);

            // Render dynamically
            renderRecent();
        }
    });

    // --- Render on page load from localStorage ---
    renderRecent();

})();
