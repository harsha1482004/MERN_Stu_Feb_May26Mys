// js/features/modal.js
// Opens and closes the contact modal with animation

(function () {

    const modal       = document.getElementById("contact-modal");
    const modalContent= document.getElementById("modal-content");
    const openBtn     = document.getElementById("modal-trigger");
    const closeBtn    = document.getElementById("modal-close");
    const cancelBtn   = document.getElementById("form-cancel");

    if (!modal || !openBtn) return;

    function openModal() {
        modal.classList.remove("hidden");
        requestAnimationFrame(() => {
            modalContent.classList.remove("scale-95", "opacity-0");
            modalContent.classList.add("scale-100", "opacity-100");
        });
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modalContent.classList.remove("scale-100", "opacity-100");
        modalContent.classList.add("scale-95", "opacity-0");
        setTimeout(() => {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
        }, 300);
    }

    openBtn.addEventListener("click", openModal);
    if (closeBtn)  closeBtn.addEventListener("click",  closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    // Also close when clicking the backdrop
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });

    // "Let's talk" link in navbar also opens modal
    const navContact = document.querySelector("nav a[href='#contact']");
    if (navContact) {
        navContact.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }

})();
