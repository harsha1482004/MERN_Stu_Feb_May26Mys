// js/features/project-render.js
// Reads projectsData from js/data/projects.js and renders cards into #projects-container

(function () {

    const container = document.getElementById("projects-container");
    if (!container) return;

    // projectsData is defined in js/data/projects.js (loaded before this script)
    if (typeof projectsData === "undefined" || projectsData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20 text-slate-400">
                <p class="text-4xl mb-4">📂</p>
                <p class="text-xl font-bold">No projects yet</p>
                <p class="text-sm mt-2">Add your projects to <code>js/data/projects.js</code></p>
            </div>
        `;
        return;
    }

    const statusColors = {
        "Completed":   { bg: "bg-green-100",  text: "text-green-700"  },
        "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
        "Planned":     { bg: "bg-slate-100",  text: "text-slate-500"  },
    };

    const PREVIEW_LENGTH = 80;

    function renderAll(list) {
        container.innerHTML = list.map((project, index) => {
            const color   = statusColors[project.status] || { bg: "bg-slate-100", text: "text-slate-500" };
            const full    = project.description || "";
            const preview = full.length > PREVIEW_LENGTH
                ? full.slice(0, PREVIEW_LENGTH) + "..."
                : full;
            const needsToggle = full.length > PREVIEW_LENGTH;

            return `
            <div class="project-card bg-white rounded-xl shadow-md p-6 flex flex-col gap-4
                        hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                 data-title="${project.title || ""}"
                 data-tags="${(project.tags || []).join(" ")}"
                 data-description="${full}"
                 data-category="${project.category || ""}"
                 data-status="${project.status || ""}">

                <div class="flex items-start justify-between gap-2">
                    <h3 class="text-xl font-bold text-slate-800">${project.title || "Untitled"}</h3>
                    <span class="shrink-0 text-xs font-bold px-3 py-1 rounded-full ${color.bg} ${color.text}">
                        ${project.status || ""}
                    </span>
                </div>

                <p class="description-text text-slate-500 text-sm leading-relaxed flex-1">${preview}</p>

                ${needsToggle ? `
                <button class="toggle-btn self-start text-blue-500 hover:text-blue-700 text-sm font-bold transition-colors duration-200"
                        data-index="${index}" data-expanded="false">
                    View More ▼
                </button>` : ""}

                <div class="flex flex-wrap gap-2">
                    ${(project.tags || []).map(tag => `
                        <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">${tag}</span>
                    `).join("")}
                </div>

                <a href="${project.link || "#"}" target="_blank" rel="noopener"
                   class="mt-auto text-center bg-red-400 hover:bg-green-500 text-white
                          font-bold py-2 px-4 rounded transition-all duration-300">
                    View Project
                </a>

            </div>`;
        }).join("");
    }

    // Initial render
    renderAll(projectsData);

    // Expand / collapse description
    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".toggle-btn");
        if (!btn) return;

        const index    = parseInt(btn.dataset.index);
        const project  = projectsData[index];
        const expanded = btn.dataset.expanded === "true";
        const card     = btn.closest(".project-card");
        const descEl   = card.querySelector(".description-text");
        const full     = project.description || "";

        if (!expanded) {
            descEl.textContent    = full;
            btn.textContent       = "View Less ▲";
            btn.dataset.expanded  = "true";
        } else {
            descEl.textContent    = full.slice(0, PREVIEW_LENGTH) + "...";
            btn.textContent       = "View More ▼";
            btn.dataset.expanded  = "false";
        }
    });

})();
