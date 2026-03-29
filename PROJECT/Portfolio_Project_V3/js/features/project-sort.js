// js/features/project-sort.js
// Sorts projects via a dropdown
// Uses: change event, sort(), localeCompare(), re-render sorted data

(function () {

    const container = document.getElementById("projects-container");
    const searchWrapper = document.getElementById("project-search")?.closest("div");

    if (!container || !searchWrapper) return;

    // --- Projects array with status field for sorting ---
    const projects = [
         {
            title: "Movie Time",
            description:
                "Full stack movie ticket booking application with AI-powered smart movie suggestions.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            status: "Live",
            link: "#"
        },
        {
            title: "Gola",
            description:
                "Cab booking platform that helps users quickly book rides for daily travel.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            status: "Progress",
            link: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Full-stack shopping app with cart, auth, and payments.",
            tags: ["React", "Node.js", "MongoDB", "Express"],
            category: "Fullstack",
            status: "Completed",
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio built with Tailwind CSS and vanilla JS.",
            tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
            category: "Frontend",
            status: "Completed",
            link: "#"
        },
        {
            title: "Chat Application",
            description: "Real-time chat using WebSockets and Node.js.",
            tags: ["Socket.io", "Node.js", "React", "MongoDB"],
            category: "Fullstack",
            status: "In Progress",
            link: "#"
        },
        {
            title: "LeetCode Tracker",
            description: "Dashboard to track daily competitive programming progress.",
            tags: ["React", "Chart.js", "REST API"],
            category: "Frontend",
            status: "Completed",
            link: "#"
        },
        {
            title: "REST API Server",
            description: "Scalable Express REST API with JWT auth and MongoDB.",
            tags: ["Node.js", "Express", "MongoDB", "JWT"],
            category: "Backend",
            status: "In Progress",
            link: "#"
        },
        {
            title: "Weather App",
            description: "Fetches live weather data using OpenWeather API.",
            tags: ["JavaScript", "REST API", "CSS"],
            category: "Frontend",
            status: "Planned",
            link: "#"
        },
    ];

    // Keep a working copy so sort doesn't mutate original
    let currentProjects = [...projects];

    // --- Status priority for status-based sort ---
    const statusOrder = { "Completed": 1, "In Progress": 2, "Planned": 3 };

    const statusColors = {
        "Completed":   { bg: "bg-green-100",  text: "text-green-700"  },
        "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
        "Planned":     { bg: "bg-slate-100",  text: "text-slate-500"  },
    };

    // --- Inject the sort dropdown beside the search bar ---
    const sortWrapper = document.createElement("div");
    sortWrapper.className = "flex justify-center mb-6";
    sortWrapper.innerHTML = `
        <div class="flex items-center gap-3">
            <label for="sort-select" class="text-sm font-semibold text-slate-500">
                Sort by:
            </label>
            <select id="sort-select"
                class="border-2 border-blue-400 rounded-lg px-4 py-2 text-sm font-semibold
                       text-slate-700 bg-white focus:outline-none focus:ring-2
                       focus:ring-blue-300 cursor-pointer transition-all duration-200">
                <option value="default">Default</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
                <option value="status">Status</option>
            </select>
        </div>
    `;

    searchWrapper.insertAdjacentElement("afterend", sortWrapper);

    // --- Render project cards ---
    function renderProjects(list) {
        if (list.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-5xl mb-4">📂</p>
                    <p class="text-2xl font-bold text-slate-600 mb-2">No projects to display</p>
                </div>
            `;
            return;
        }

        const { bg, text } = statusColors;

        container.innerHTML = list.map(project => {
            const color = statusColors[project.status] || { bg: "bg-slate-100", text: "text-slate-500" };
            return `
            <div class="project-card bg-white rounded-xl shadow-md p-6 flex flex-col gap-4
                        hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                 data-title="${project.title}"
                 data-category="${project.category}"
                 data-status="${project.status}">

                <div class="flex items-start justify-between gap-2">
                    <h3 class="text-xl font-bold text-slate-800">${project.title}</h3>
                    <span class="shrink-0 text-xs font-bold px-3 py-1 rounded-full
                                 ${color.bg} ${color.text}">
                        ${project.status}
                    </span>
                </div>

                <p class="text-slate-500 text-sm flex-1">${project.description}</p>

                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => `
                        <span class="bg-blue-100 text-blue-700 text-xs font-semibold
                                     px-3 py-1 rounded-full">
                            ${tag}
                        </span>
                    `).join("")}
                </div>

                <a href="${project.link}"
                   class="mt-auto text-center bg-red-400 hover:bg-green-500 text-white
                          font-bold py-2 px-4 rounded transition-all duration-300">
                    View Project
                </a>

            </div>
        `}).join("");
    }

    // --- sort() with localeCompare() for strings ---
    function sortProjects(order) {
        const sorted = [...projects];  // always sort from original array

        if (order === "az") {
            // localeCompare() for alphabetical A → Z
            sorted.sort((a, b) => a.title.localeCompare(b.title));

        } else if (order === "za") {
            // localeCompare() for alphabetical Z → A
            sorted.sort((a, b) => b.title.localeCompare(a.title));

        } else if (order === "status") {
            // Sort by status priority: Completed → In Progress → Planned
            sorted.sort((a, b) =>
                (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)
            );

        }
        // "default" → no sort, original order

        currentProjects = sorted;
        renderProjects(currentProjects);   // re-render sorted data
    }

    // --- change event on <select> ---
    document.getElementById("sort-select").addEventListener("change", function () {
        sortProjects(this.value);          // this.value from the change event
    });

    // --- Initial render ---
    renderProjects(projects);

})();
