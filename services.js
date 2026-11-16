
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const cursorDot = document.getElementById("cursorDot");
    const cursorOutline = document.getElementById("cursorOutline");
    const particles = document.getElementById("particles");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice = window.matchMedia(
        "(pointer: coarse)"
    ).matches;


    // =====================================
    // HEADER SCROLL
    // =====================================

    function updateHeader() {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // =====================================
    // MOBILE MENU
    // =====================================

    function closeMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.remove("show");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("show");

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }


    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealItems = document.querySelectorAll(
        ".section-title, .service-card, .process-card, .services-cta"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {

        const observer = new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        obs.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => {

            item.classList.add("reveal");

            observer.observe(item);

        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("visible");
        });

    }


    // =====================================
    // CUSTOM CURSOR
    // =====================================

    if (
        cursorDot &&
        cursorOutline &&
        !isTouchDevice &&
        !reduceMotion
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;

        let mouseMoved = false;
        let particleTimer = 0;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!mouseMoved) {

                outlineX = mouseX;
                outlineY = mouseY;

                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";

                mouseMoved = true;

            }

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";


            // PARTICLE EFFECT

            if (particles && Date.now() - particleTimer > 35) {

                particleTimer = Date.now();

                const particle = document.createElement("span");

                particle.className = "mouse-particle";

                const randomX = (Math.random() - 0.5) * 15;
                const randomY = (Math.random() - 0.5) * 15;

                particle.style.left =
                    mouseX + randomX + "px";

                particle.style.top =
                    mouseY + randomY + "px";

                particles.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 900);

            }

        });


        // SMOOTH FOLLOWING CIRCLE

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // HOVER EFFECT

        const hoverElements = document.querySelectorAll(
            "a, button, .service-card, .process-card, .tech-logo"
        );

        hoverElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });


        // HIDE CURSOR WHEN LEAVING PAGE

        document.addEventListener("mouseleave", () => {

            cursorDot.style.opacity = "0";
            cursorOutline.style.opacity = "0";

        });

        document.addEventListener("mouseenter", () => {

            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";

        });

    }


    // =====================================
    // FOOTER YEAR
    // =====================================

    const footerText = document.querySelector(".footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} NITIN.DEV | ALL RIGHTS RESERVED.`;

    }


    // =====================================
    // PAGE LOADED
    // =====================================

    console.log(
        "NITIN.DEV Services Page Loaded Successfully!"
    );

});
