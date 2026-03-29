// js/features/project-category.js
// Filters projects by category using buttons
// Uses: click event, category in objects, filter(), classList for active button

(function () {

    const container   = document.getElementById("projects-container");
    const filterBar   = document.getElementById("project-filters");

    if (!container || !filterBar) return;

    // --- Store category in project objects ---
    const projects = [
        {
            title: "Movie Time",
            description:
                "Full stack movie ticket booking application with AI-powered smart movie suggestions.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            link: "#"
        },
        {
            title: "Gola",
            description:
                "Cab booking platform that helps users quickly book rides for daily travel.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            link: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Full-stack shopping app with cart, auth, and payments.",
            tags: ["React", "Node.js", "MongoDB", "Express"],
            category: "Fullstack",
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio built with Tailwind CSS and vanilla JS.",
            tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
            category: "Frontend",
            link: "#"
        },
        {
            title: "Chat Application",
            description: "Real-time chat app using WebSockets and Node.js.",
            tags: ["Socket.io", "Node.js", "React", "MongoDB"],
            category: "Fullstack",
            link: "#"
        },
        {
            title: "LeetCode Tracker",
            description: "Dashboard to track daily competitive programming progress.",
            tags: ["React", "Chart.js", "REST API"],
            category: "Frontend",
            link: "#"
        },
        {
            title: "REST API Server",
            description: "Scalable Express REST API with JWT auth and MongoDB.",
            tags: ["Node.js", "Express", "MongoDB", "JWT"],
            category: "Backend",
            link: "#"
        },
        {
            title: "Weather App",
            description: "Fetches live weather data using OpenWeather API.",
            tags: ["JavaScript", "REST API", "CSS"],
            category: "Frontend",
            link: "#"
        },
    ];

    // Derive unique categories dynamically from projects array
    const categories = ["All", ...new Set(projects.map(p => p.category))];

    let activeCategory = "All";

    // --- Render filter buttons into #project-filters ---
    function renderButtons() {
        filterBar.innerHTML = categories.map(cat => `
            <button
                class="category-btn px-5 py-2 rounded-full text-sm font-bold border-2
                       border-red-400 transition-all duration-200
                       ${cat === activeCategory
                            ? "bg-red-400 text-white"
                            : "bg-white text-red-400 hover:bg-red-50"}"
                data-category="${cat}">
                ${cat}
            </button>
        `).join("");
    }

    // --- Render filtered project cards ---
    function renderProjects(list) {
        if (list.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-5xl mb-4">📂</p>
                    <p class="text-2xl font-bold text-slate-600 mb-2">No projects in this category</p>
                    <p class="text-slate-400">Try selecting a different category</p>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(project => `
            <div class="project-card bg-white rounded-xl shadow-md p-6 flex flex-col gap-4
                        hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                 data-title="${project.title}"
                 data-tags="${project.tags.join(" ")}"
                 data-description="${project.description}"
                 data-category="${project.category}">

                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold text-slate-800">${project.title}</h3>
                    <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        ${project.category}
                    </span>
                </div>

                <p class="text-slate-500 text-sm flex-1">${project.description}</p>

                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => `
                        <span class="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
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
        `).join("");
    }

    // --- filter() by active category ---
    function applyFilter(category) {
        const filtered = category === "All"
            ? projects                                          // show all
            : projects.filter(p => p.category === category);  // filter()

        renderProjects(filtered);
    }

    // --- Click event listeners on buttons (delegated to filterBar) ---
    filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".category-btn");
        if (!btn) return;

        const selected = btn.dataset.category;
        if (selected === activeCategory) return;

        activeCategory = selected;

        // classList.add / classList.remove to update active button style
        filterBar.querySelectorAll(".category-btn").forEach(b => {
            const isActive = b.dataset.category === activeCategory;
            b.classList.toggle("bg-red-400", isActive);
            b.classList.toggle("text-white", isActive);
            b.classList.toggle("bg-white", !isActive);
            b.classList.toggle("text-red-400", !isActive);
        });

        applyFilter(activeCategory);
    });

    // --- Initial render ---
    renderButtons();
    applyFilter("All");

})();
