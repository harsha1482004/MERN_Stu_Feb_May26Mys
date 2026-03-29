// js/features/project-expand.js
// Expand / collapse project descriptions with a "View More" toggle
// Uses: boolean flag, slice(), click event, textContent toggle

(function () {

    const container = document.getElementById("projects-container");
    if (!container) return;

    const PREVIEW_LENGTH = 60; // characters shown when collapsed

    // --- Projects array — each gets a boolean expanded flag ---
    const projects = [
         {
            title: "Movie Time",
            description:
                "Full stack movie ticket booking application with AI-powered smart movie suggestions.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            status: "Live",
            expanded:false,
            liveDemo: "#",
            link: "#"
        },
        {
            title: "Gola",
            description:
                "Cab booking platform that helps users quickly book rides for daily travel.",
            tags: ["ReactJS", "ExpressJS", "MongoDB"],
            status: "Progress",
            expanded: false,
            link: "#"
        },
        {
            title: "E-Commerce Platform",
            description: "Full-stack shopping app with cart, authentication, payment gateway integration, product management, and an admin dashboard for order tracking.",
            tags: ["React", "Node.js", "MongoDB", "Express"],
            category: "Fullstack",
            status: "Completed",
            expanded: true,       // boolean flag
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "Personal portfolio built with Tailwind CSS and vanilla JavaScript, featuring dark mode, smooth scroll animations, and dynamic project rendering.",
            tags: ["HTML", "CSS", "JavaScript", "Tailwind"],
            category: "Frontend",
            status: "Completed",
            expanded: false,       // boolean flag
            link: "#"
        },
        {
            title: "Chat Application",
            description: "Real-time chat app using WebSockets and Node.js with support for multiple chat rooms, user presence indicators, and message history persistence.",
            tags: ["Socket.io", "Node.js", "React", "MongoDB"],
            category: "Fullstack",
            status: "In Progress",
            expanded: false,       // boolean flag
            link: "#"
        },
        {
            title: "LeetCode Tracker",
            description: "Dashboard to track daily competitive programming progress with charts, streak counters, difficulty breakdowns, and weekly goal-setting features.",
            tags: ["React", "Chart.js", "REST API"],
            category: "Frontend",
            status: "Completed",
            expanded: false,       // boolean flag
            link: "#"
        },
        {
            title: "REST API Server",
            description: "Scalable Express REST API with JWT authentication, role-based access control, rate limiting, MongoDB integration, and full Swagger documentation.",
            tags: ["Node.js", "Express", "MongoDB", "JWT"],
            category: "Backend",
            status: "In Progress",
            expanded: false,       // boolean flag
            link: "#"
        },
        {
            title: "Weather App",
            description: "Fetches live weather data using OpenWeather API with a 7-day forecast, location search, unit switching, and animated weather condition icons.",
            tags: ["JavaScript", "REST API", "CSS"],
            category: "Frontend",
            status: "Planned",
            expanded: false,       // boolean flag
            link: "#"
        },
    ];

    const statusColors = {
        "Completed":   { bg: "bg-green-100",  text: "text-green-700"  },
        "In Progress": { bg: "bg-yellow-100", text: "text-yellow-700" },
        "Planned":     { bg: "bg-slate-100",  text: "text-slate-500"  },
    };

    // --- Build description text using slice() ---
    function getDescriptionText(project) {
        const full    = project.description;
        const preview = full.slice(0, PREVIEW_LENGTH);   // slice()

        // No toggle needed if description is short
        if (full.length <= PREVIEW_LENGTH) return { preview: full, needsToggle: false };

        return {
            preview: project.expanded ? full : preview + "...",
            needsToggle: true
        };
    }

    // --- Render all project cards ---
    function renderProjects() {
        container.innerHTML = projects.map((project, index) => {
            const color   = statusColors[project.status] || { bg: "bg-slate-100", text: "text-slate-500" };
            const { preview, needsToggle } = getDescriptionText(project);

            return `
            <div class="project-card bg-white rounded-xl shadow-md p-6 flex flex-col gap-4
                        hover:shadow-xl transition-all duration-300">

                <div class="flex items-start justify-between gap-2">
                    <h3 class="text-xl font-bold text-slate-800">${project.title}</h3>
                    <span class="shrink-0 text-xs font-bold px-3 py-1 rounded-full
                                 ${color.bg} ${color.text}">
                        ${project.status}
                    </span>
                </div>

                <!-- Description toggled via textContent on re-render -->
                <p class="text-slate-500 text-sm leading-relaxed description-text">
                    ${preview}
                </p>

                ${needsToggle ? `
                <button
                    class="toggle-btn self-start text-blue-500 hover:text-blue-700
                           text-sm font-bold transition-colors duration-200"
                    data-index="${index}">
                    ${project.expanded ? "View Less ▲" : "View More ▼"}
                </button>` : ""}

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

    // --- Click event on toggle buttons (delegated to container) ---
    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".toggle-btn");
        if (!btn) return;

        const index = parseInt(btn.dataset.index);
        const project = projects[index];

        // Toggle the boolean flag
        project.expanded = !project.expanded;

        // Update only the description text and button label
        // using textContent — no full re-render needed
        const card         = btn.closest(".project-card");
        const descEl       = card.querySelector(".description-text");
        const full         = project.description;
        const preview      = full.slice(0, PREVIEW_LENGTH);   // slice()

        // Toggle text using textContent
        descEl.textContent = project.expanded ? full : preview + "...";
        btn.textContent    = project.expanded ? "View Less ▲" : "View More ▼";
    });

    // --- Initial render ---
    renderProjects();

})();
