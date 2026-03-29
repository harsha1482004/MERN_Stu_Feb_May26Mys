// js/features/skills-filter.js
// Groups and filters skills by category
// Uses: object structure, forEach, filter(), createElement(), appendChild()

(function () {

    const container = document.getElementById("skills-container");
    if (!container) return;

    // --- Object structure with categorized arrays ---
    const skillsData = {
        Frontend: [
            { name: "React",       icon: "⚛️",  level: 90 },
            { name: "JavaScript",  icon: "🟨",  level: 88 },
            { name: "HTML & CSS",  icon: "🎨",  level: 95 },
            { name: "Tailwind",    icon: "💨",  level: 85 },
            { name: "TypeScript",  icon: "🔷",  level: 75 },
        ],
        Backend: [
            { name: "Node.js",     icon: "🟩",  level: 82 },
            { name: "Express",     icon: "🚂",  level: 80 },
            { name: "REST APIs",   icon: "🔗",  level: 85 },
            { name: "JWT Auth",    icon: "🔐",  level: 78 },
        ],
        Database: [
            { name: "MongoDB",     icon: "🍃",  level: 80 },
            { name: "MySQL",       icon: "🐬",  level: 72 },
            { name: "Mongoose",    icon: "🗄️",  level: 78 },
        ],
        Tools: [
            { name: "Git & GitHub",icon: "🐙",  level: 90 },
            { name: "VS Code",     icon: "💻",  level: 95 },
            { name: "Postman",     icon: "📮",  level: 85 },
            { name: "Docker",      icon: "🐳",  level: 60 },
        ],
    };

    const categoryColors = {
        Frontend: { border: "#60a5fa", badge: "#dbeafe", badgeText: "#1d4ed8" },
        Backend:  { border: "#4ade80", badge: "#dcfce7", badgeText: "#15803d" },
        Database: { border: "#f97316", badge: "#ffedd5", badgeText: "#c2410c" },
        Tools:    { border: "#a78bfa", badge: "#ede9fe", badgeText: "#7c3aed" },
    };

    const categories = Object.keys(skillsData);
    let activeCategory = "All";

    // ── FILTER BAR ──────────────────────────────────────────────────

    // Create filter bar using createElement()
    const filterBar = document.createElement("div");
    filterBar.style.cssText = `
        display: flex; flex-wrap: wrap;
        justify-content: center; gap: 12px; margin-bottom: 40px;
    `;

    // Build "All" + one button per category using forEach
    ["All", ...categories].forEach(cat => {
        const btn = document.createElement("button");   // createElement()
        btn.textContent = cat;
        btn.dataset.cat = cat;
        styleBtn(btn, cat === activeCategory);
        filterBar.appendChild(btn);                     // appendChild()
    });

    // Insert filter bar before the skills container
    container.parentElement.insertBefore(filterBar, container);

    // ── RENDER ──────────────────────────────────────────────────────

    function renderSkills(selected) {
        container.innerHTML = "";                       // clear

        // filter() — keep only selected category or all
        const filtered = selected === "All"
            ? categories
            : categories.filter(cat => cat === selected);   // filter()

        // forEach over filtered categories
        filtered.forEach(cat => {
            const color = categoryColors[cat];

            // Section wrapper — createElement()
            const section = document.createElement("div");
            section.style.cssText = `
                background: white;
                border-radius: 16px;
                border-left: 4px solid ${color.border};
                padding: 24px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.07);
            `;

            // Category heading — createElement()
            const heading = document.createElement("h3");
            heading.textContent = cat;
            heading.style.cssText = `
                font-size: 1.1rem; font-weight: 800;
                margin-bottom: 16px; color: #1e293b;
                display: flex; align-items: center; gap: 8px;
            `;

            // Coloured dot beside heading
            const dot = document.createElement("span");
            dot.style.cssText = `
                width: 10px; height: 10px; border-radius: 50%;
                background: ${color.border}; display: inline-block;
            `;
            heading.prepend(dot);

            section.appendChild(heading);             // appendChild()

            // forEach over skills in this category
            skillsData[cat].forEach(skill => {
                const skillEl = document.createElement("div");  // createElement()
                skillEl.style.cssText = "margin-bottom: 14px;";

                // Skill name row
                const nameRow = document.createElement("div");
                nameRow.style.cssText = `
                    display: flex; justify-content: space-between;
                    align-items: center; margin-bottom: 6px;
                `;

                const nameSpan = document.createElement("span"); // createElement()
                nameSpan.textContent = `${skill.icon}  ${skill.name}`;
                nameSpan.style.cssText = "font-size: 0.875rem; font-weight: 600; color: #334155;";

                // Level badge
                const badge = document.createElement("span");    // createElement()
                badge.textContent = `${skill.level}%`;
                badge.style.cssText = `
                    font-size: 0.75rem; font-weight: 700;
                    padding: 2px 10px; border-radius: 999px;
                    background: ${color.badge}; color: ${color.badgeText};
                `;

                nameRow.appendChild(nameSpan);        // appendChild()
                nameRow.appendChild(badge);           // appendChild()

                // Progress bar track
                const track = document.createElement("div");     // createElement()
                track.style.cssText = `
                    width: 100%; height: 7px; border-radius: 999px;
                    background: #f1f5f9; overflow: hidden;
                `;

                // Progress bar fill (animated)
                const fill = document.createElement("div");      // createElement()
                fill.style.cssText = `
                    height: 100%; width: 0%;
                    border-radius: 999px;
                    background: ${color.border};
                    transition: width 0.6s ease;
                `;

                track.appendChild(fill);              // appendChild()
                skillEl.appendChild(nameRow);         // appendChild()
                skillEl.appendChild(track);           // appendChild()
                section.appendChild(skillEl);         // appendChild()

                // Animate bar width after paint
                requestAnimationFrame(() => {
                    setTimeout(() => { fill.style.width = skill.level + "%"; }, 80);
                });
            });

            container.appendChild(section);          // appendChild()
        });
    }

    // ── BUTTON STYLING ──────────────────────────────────────────────

    function styleBtn(btn, isActive) {
        btn.style.cssText = `
            padding: 8px 20px; border-radius: 999px;
            font-size: 0.875rem; font-weight: 700;
            border: 2px solid #60a5fa; cursor: pointer;
            transition: all 0.2s ease;
            background: ${isActive ? "#60a5fa" : "white"};
            color:      ${isActive ? "white"   : "#60a5fa"};
        `;
    }

    // ── CLICK EVENT ON FILTER BUTTONS ───────────────────────────────

    filterBar.addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn || btn.dataset.cat === activeCategory) return;

        activeCategory = btn.dataset.cat;

        // Update all button styles using forEach
        filterBar.querySelectorAll("button").forEach(b => {
            styleBtn(b, b.dataset.cat === activeCategory);
        });

        renderSkills(activeCategory);
    });

    // ── INITIAL RENDER ──────────────────────────────────────────────
    renderSkills("All");

})();
