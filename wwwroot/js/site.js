(function () {
    // Mobile nav toggle
    const toggle = document.querySelector(".masck-nav-toggle");
    const links = document.querySelector(".masck-nav-links");
    if (toggle && links) {
        toggle.addEventListener("click", () => {
            const open = links.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    // Account dropdown
    const acctBtn = document.querySelector(".masck-account-btn");
    const acctMenu = document.querySelector(".masck-account-menu");
    if (acctBtn && acctMenu) {
        acctBtn.addEventListener("click", (e) => {
            e.preventDefault();
            acctMenu.classList.toggle("is-open");
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".masck-account-dropdown")) {
                acctMenu.classList.remove("is-open");
            }
        });
    }

    // Back to top
    const backToTop = document.getElementById("masckBackToTop");
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
})();