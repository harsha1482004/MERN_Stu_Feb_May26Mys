// js/features/project-filter.js
// Live filters project cards as the user types
// Uses: input event, array, filter(), toLowerCase(), includes(), innerHTML re-render

(function () {

    // --- Store projects in an array ---
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
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio built with Tailwind CSS and vanilla JS.",
            tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
            link: "#"
        },
        {
            title: "Chat Application",
            description: "Real-time chat app using WebSockets and Node.js.",
            tags: ["Socket.io", "Node.js", "React", "MongoDB"],
            link: "#"
        },
        {
            title: "LeetCode Tracker",
            description: "Dashboard to track daily competitive programming progress.",
            tags: ["React", "Chart.js", "REST API"],
            link: "#"
        },
        {
            title: "Blog Platform",
            description: "MERN stack blog with markdown support and user auth.",
            tags: ["MERN", "MongoDB", "Express", "React"],
            link: "#"
        },
        {
            title: "Weather App",
            description: "Fetches live weather data using OpenWeather API.",
            tags: ["JavaScript", "REST API", "CSS"],
            link: "#"
        },
    ];

    const searchInput = document.getElementById("project-search");
    const container   = document.getElementById("projects-container");

    if (!searchInput || !container) return;

    // --- Render a list of project objects into the container via innerHTML ---
    function renderProjects(list) {
        if (list.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-5xl mb-4">🔍</p>
                    <p class="text-2xl font-bold text-slate-600 mb-2">No projects found</p>
                    <p class="text-slate-400">Try a different keyword</p>
                </div>
            `;
            return;
        }

        container.innerHTML = list.map(project => `
            <div class="project-card bg-white rounded-xl shadow-md p-6 flex flex-col gap-4
                        hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                 data-title="${project.title}"
                 data-tags="${project.tags.join(" ")}"
                 data-description="${project.description}">

                <h3 class="text-xl font-bold text-slate-800">${project.title}</h3>

                <p class="text-slate-500 text-sm flex-1">${project.description}</p>

                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => `
                        <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
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

    // --- input event listener ---
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();   // toLowerCase()

        // filter() + includes() to match search text against title, tags, description
        const matched = projects.filter(project =>
            project.title.toLowerCase().includes(query)       ||
            project.description.toLowerCase().includes(query) ||
            project.tags.some(tag => tag.toLowerCase().includes(query))
        );

        // Re-render using innerHTML
        renderProjects(matched);
    });

    // --- Clear on Escape ---
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            searchInput.value = "";
            renderProjects(projects);
            searchInput.blur();
        }
    });

    // --- Initial render of all projects ---
    renderProjects(projects);

})();
