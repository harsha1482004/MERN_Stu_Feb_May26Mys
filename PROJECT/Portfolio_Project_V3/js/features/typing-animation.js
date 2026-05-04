// js/features/typing-animation.js
// Cycles through roles with a typewriter effect in the hero subtitle
// Uses: setTimeout(), slice(0, index), array of roles, reset logic

(function () {

    // --- Array of roles ---
    const roles = [
        "Full-Stack Developer",
        "MERN Enthusiast",
        "Competitive Programmer",
        "React Developer",
        "Problem Solver",
    ];

    const target = document.querySelector("p.text-xl.lg\\:text-2xl");
    if (!target) return;

    // Preserve original styling — replace inner content with typing spans
    target.innerHTML = `
        <span id="typed-text"></span><span id="typed-cursor" style="
            display: inline-block;
            width: 2px;
            height: 1.1em;
            background: #475569;
            margin-left: 3px;
            vertical-align: middle;
            animation: blink 0.8s step-end infinite;
        "></span>
    `;

    // Inject cursor blink keyframe
    const style = document.createElement("style");
    style.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const typedEl = document.getElementById("typed-text");

    let roleIndex  = 0;   // current role in array
    let charIndex  = 0;   // current character position
    let isDeleting = false;

    // Speed constants
    const TYPE_SPEED         = 80;    // ms per character while typing
    const DELETE_SPEED       = 40;    // ms per character while deleting
    const PAUSE_AFTER_TYPE   = 1800;  // ms pause after fully typed
    const PAUSE_AFTER_DELETE = 400;   // ms pause before next role starts

    // --- Core tick using setTimeout() ---
    function tick() {
        const currentRole = roles[roleIndex];   // pick from array of roles

        if (!isDeleting) {
            // Type one character — slice(0, index)
            charIndex++;
            typedEl.textContent = currentRole.slice(0, charIndex);  // slice()

            if (charIndex === currentRole.length) {
                // Fully typed — pause, then start deleting (reset logic)
                setTimeout(() => {
                    isDeleting = true;
                    tick();
                }, PAUSE_AFTER_TYPE);
                return;
            }

            setTimeout(tick, TYPE_SPEED);       // setTimeout()

        } else {
            // Delete one character — slice(0, index) shrinking
            charIndex--;
            typedEl.textContent = currentRole.slice(0, charIndex);  // slice()

            if (charIndex === 0) {
                // Fully deleted — reset logic: move to next role
                isDeleting = false;
                roleIndex  = (roleIndex + 1) % roles.length;       // reset/cycle

                setTimeout(tick, PAUSE_AFTER_DELETE);               // setTimeout()
                return;
            }

            setTimeout(tick, DELETE_SPEED);     // setTimeout()
        }
    }

    // Kick off after short initial delay
    setTimeout(tick, 600);                      // setTimeout()

})();
