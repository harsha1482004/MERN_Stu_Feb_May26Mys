// js/features/skills-render.js
// Reads skillsData from js/data/skills.js and renders grouped skill cards
// with filter buttons into #skills-container

(function () {

    // Wait for DOM ready since this script may load before the section
    function init() {

        const container = document.getElementById("skills-container");
        if (!container) return;

        // skillsData is defined in js/data/skills.js
        if (typeof skillsData === "undefined") return;

        const categories = Object.keys(skillsData).filter(cat => skillsData[cat].length > 0);

        if (categories.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-16 text-slate-400">
                    <p class="text-4xl mb-4">🛠️</p>
                    <p class="text-xl font-bold">No skills yet</p>
                    <p class="text-sm mt-2">Add your skills to <code>js/data/skills.js</code></p>
                </div>
            `;
            return;
        }

        const categoryColors = {
            Frontend: { border: "#60a5fa", badge: "#dbeafe", badgeText: "#1d4ed8" },
            Backend:  { border: "#4ade80", badge: "#dcfce7", badgeText: "#15803d" },
            Database: { border: "#f97316", badge: "#ffedd5", badgeText: "#c2410c" },
            Tools:    { border: "#a78bfa", badge: "#ede9fe", badgeText: "#7c3aed" },
        };

        // Default color for any custom category not in the map above
        function getColor(cat) {
            return categoryColors[cat] || { border: "#94a3b8", badge: "#f1f5f9", badgeText: "#475569" };
        }

        let activeCategory = "All";

        // ── Filter bar ──────────────────────────────
        const filterBar = document.createElement("div");
        filterBar.style.cssText = "display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:40px;";

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

        ["All", ...categories].forEach(cat => {
            const btn = document.createElement("button");
            btn.textContent  = cat;
            btn.dataset.cat  = cat;
            styleBtn(btn, cat === "All");
            filterBar.appendChild(btn);
        });

        container.parentElement.insertBefore(filterBar, container);

        // ── Render skills ────────────────────────────
        function renderSkills(selected) {
            container.innerHTML = "";

            const filtered = selected === "All"
                ? categories
                : categories.filter(cat => cat === selected);

            filtered.forEach(cat => {
                const color   = getColor(cat);
                const section = document.createElement("div");
                section.style.cssText = `
                    background: white; border-radius: 16px;
                    border-left: 4px solid ${color.border};
                    padding: 24px;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
                `;

                const heading = document.createElement("h3");
                heading.style.cssText = "font-size:1.1rem;font-weight:800;margin-bottom:16px;color:#1e293b;display:flex;align-items:center;gap:8px;";

                const dot = document.createElement("span");
                dot.style.cssText = `width:10px;height:10px;border-radius:50%;background:${color.border};display:inline-block;`;
                heading.prepend(dot);
                heading.append(cat);
                section.appendChild(heading);

                skillsData[cat].forEach(skill => {
                    const skillEl = document.createElement("div");
                    skillEl.style.marginBottom = "14px";

                    const nameRow = document.createElement("div");
                    nameRow.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;";

                    const nameSpan = document.createElement("span");
                    nameSpan.textContent = `${skill.icon || ""}  ${skill.name}`;
                    nameSpan.style.cssText = "font-size:0.875rem;font-weight:600;color:#334155;";

                    const badge = document.createElement("span");
                    badge.textContent = `${skill.level}%`;
                    badge.style.cssText = `font-size:0.75rem;font-weight:700;padding:2px 10px;border-radius:999px;background:${color.badge};color:${color.badgeText};`;

                    nameRow.appendChild(nameSpan);
                    nameRow.appendChild(badge);

                    const track = document.createElement("div");
                    track.style.cssText = "width:100%;height:7px;border-radius:999px;background:#f1f5f9;overflow:hidden;";

                    const fill = document.createElement("div");
                    fill.style.cssText = `height:100%;width:0%;border-radius:999px;background:${color.border};transition:width 0.6s ease;`;

                    track.appendChild(fill);
                    skillEl.appendChild(nameRow);
                    skillEl.appendChild(track);
                    section.appendChild(skillEl);

                    requestAnimationFrame(() => {
                        setTimeout(() => { fill.style.width = (skill.level || 0) + "%"; }, 80);
                    });
                });

                container.appendChild(section);
            });
        }

        // ── Button click ─────────────────────────────
        filterBar.addEventListener("click", e => {
            const btn = e.target.closest("button");
            if (!btn || btn.dataset.cat === activeCategory) return;
            activeCategory = btn.dataset.cat;
            filterBar.querySelectorAll("button").forEach(b => styleBtn(b, b.dataset.cat === activeCategory));
            renderSkills(activeCategory);
        });

        renderSkills("All");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
