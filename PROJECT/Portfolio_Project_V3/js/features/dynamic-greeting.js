// js/features/dynamic-greeting.js
// Displays a time-based greeting in the hero section
// Uses: new Date().getHours(), if-else, textContent

(function () {

    const heroText = document.querySelector(".order-2.lg\\:order-1");
    if (!heroText) return;

    // --- new Date().getHours() to get current hour ---
    const hour = new Date().getHours();

    // --- Conditional logic (if-else) to pick greeting + emoji ---
    let greeting, emoji, subtext;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
        emoji    = "🌅";
        subtext  = "Hope you have a productive day!";

    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
        emoji    = "☀️";
        subtext  = "Great time to explore my work!";

    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
        emoji    = "🌆";
        subtext  = "Sit back and take a look around!";

    } else {
        greeting = "Good Night";
        emoji    = "🌙";
        subtext  = "Burning the midnight oil? So am I!";
    }

    // --- Create greeting element ---
    const greetEl = document.createElement("div");
    greetEl.id = "dynamic-greeting";
    greetEl.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: #eff6ff;
        border: 1.5px solid #bfdbfe;
        border-radius: 999px;
        padding: 6px 18px;
        margin-bottom: 20px;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    `;

    // Emoji span
    const emojiSpan = document.createElement("span");
    emojiSpan.style.fontSize = "1.1rem";

    // Greeting + subtext span
    const textSpan = document.createElement("span");
    textSpan.style.cssText = `
        font-size: 0.85rem;
        font-weight: 700;
        color: #1d4ed8;
    `;

    // --- Update DOM using textContent ---
    emojiSpan.textContent = emoji;
    textSpan.textContent  = `${greeting} — ${subtext}`;

    greetEl.appendChild(emojiSpan);
    greetEl.appendChild(textSpan);

    // Insert at the very top of the hero text column
    heroText.insertBefore(greetEl, heroText.firstChild);

    // --- Also update the browser tab title with greeting ---
    document.title = `${greeting} | ${document.title}`;

})();
