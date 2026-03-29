// js/features/geolocation.js
// Asks user for location and displays a friendly browsing message
// Uses: navigator.geolocation.getCurrentPosition(), lat/lng, Fetch API, error handling

(function () {

    const heroText = document.querySelector(".order-2.lg\\:order-1");
    if (!heroText) return;

    // --- Create the location pill element ---
    const locEl = document.createElement("div");
    locEl.id = "geo-message";
    locEl.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #f0fdf4;
        border: 1.5px solid #bbf7d0;
        border-radius: 999px;
        padding: 6px 18px;
        margin-bottom: 16px;
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
        font-size: 0.85rem;
        font-weight: 700;
        color: #15803d;
        transition: opacity 0.4s ease;
        opacity: 0;
    `;

    // Insert below the dynamic greeting (or at top of hero if no greeting)
    const greeting = document.getElementById("dynamic-greeting");
    if (greeting) {
        greeting.insertAdjacentElement("afterend", locEl);
    } else {
        heroText.insertBefore(locEl, heroText.firstChild);
    }

    // --- Update DOM using textContent ---
    function showMessage(icon, text) {
        locEl.textContent = "";                 // clear first

        const iconSpan = document.createElement("span");
        iconSpan.textContent = icon;

        const textSpan = document.createElement("span");
        textSpan.textContent = text;            // textContent update

        locEl.appendChild(iconSpan);
        locEl.appendChild(textSpan);
        locEl.style.opacity = "1";
    }

    function showError(message) {
        locEl.style.background   = "#fef2f2";
        locEl.style.borderColor  = "#fecaca";
        locEl.style.color        = "#dc2626";
        showMessage("⚠️", message);
    }

    // --- Fetch city name from coordinates using Fetch API ---
    async function getCityName(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
            const response = await fetch(url, {
                headers: { "Accept-Language": "en" }
            });

            if (!response.ok) throw new Error("Fetch failed");

            const data     = await response.json();
            const address  = data.address || {};

            // Extract best available location name
            const city = address.city
                      || address.town
                      || address.village
                      || address.county
                      || "your location";

            const country = address.country || "";

            return country ? `${city}, ${country}` : city;

        } catch (e) {
            // Fetch API error handling
            return null;
        }
    }

    // --- Success callback: extract latitude and longitude ---
    async function onSuccess(position) {
        const latitude  = position.coords.latitude;    // extract latitude
        const longitude = position.coords.longitude;   // extract longitude

        // Show a placeholder while fetching city name
        showMessage("📍", "Detecting your city...");

        const cityName = await getCityName(latitude, longitude);

        if (cityName) {
            showMessage("📍", `You are browsing from ${cityName}`);
        } else {
            // Fallback: show raw coordinates if reverse geocoding fails
            showMessage("📍", `Browsing from ${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`);
        }
    }

    // --- Error callback: error handling ---
    function onError(error) {
        // Callback-based error handling
        if (error.code === error.PERMISSION_DENIED) {
            showError("Location access denied");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            showError("Location unavailable");
        } else if (error.code === error.TIMEOUT) {
            showError("Location request timed out");
        } else {
            showError("Could not get location");
        }
    }

    // --- navigator.geolocation.getCurrentPosition() ---
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            onSuccess,          // success callback
            onError,            // error callback
            {
                timeout:            8000,    // wait max 8s
                maximumAge:         60000,   // cache for 1 min
                enableHighAccuracy: false    // battery-friendly
            }
        );
    } else {
        showError("Geolocation not supported in this browser");
    }

})();
