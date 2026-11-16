
/* =========================================
   NITIN.DEV - SKILLS PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const header = document.getElementById("header");
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

        // Close after clicking a link

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close with Escape key

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close when clicking outside menu

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

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
        let lastParticleTime = 0;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!mouseMoved) {

                outlineX = mouseX;
                outlineY = mouseY;

                mouseMoved = true;

                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";

            }

            // RED DOT

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";


            // PARTICLE TRAIL

            if (
                particles &&
                Date.now() - lastParticleTime > 35
            ) {

                lastParticleTime = Date.now();

                const particle = document.createElement("span");

                particle.className = "particle";

                const randomX = (Math.random() - 0.5) * 15;
                const randomY = (Math.random() - 0.5) * 15;

                particle.style.left =
                    mouseX + randomX + "px";

                particle.style.top =
                    mouseY + randomY + "px";

                particles.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 800);

            }

        });


        // SMOOTH CIRCLE FOLLOW

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left =
                outlineX + "px";

            cursorOutline.style.top =
                outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // CURSOR HOVER EFFECT

        const hoverElements = document.querySelectorAll(
            "a, button, .skill-card, .learning-tags span"
        );

        hoverElements.forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursorOutline.classList.add("hover");

            });

            element.addEventListener("mouseleave", () => {

                cursorOutline.classList.remove("hover");

            });

        });


        // HIDE CURSOR OUTSIDE PAGE

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
    // SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    // =====================================
    // SKILL BAR ANIMATION
    // =====================================

    const skillBars = document.querySelectorAll(".skill-progress");

    if (
        "IntersectionObserver" in window &&
        !reduceMotion
    ) {

        const skillObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const bar = entry.target;

                        const width =
                            bar.getAttribute("data-width");

                        bar.style.width = width;

                        observer.unobserve(bar);

                    }

                });

            },
            {
                threshold: 0.4
            }
        );

        skillBars.forEach(bar => {

            skillObserver.observe(bar);

        });

    } else {

        skillBars.forEach(bar => {

            bar.style.width =
                bar.getAttribute("data-width");

        });

    }


    // =====================================
    // SMOOTH ANCHOR SCROLL
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth"
                });

            }

        });

    });


    // =====================================
    // FOOTER YEAR
    // =====================================

    const footerYear = document.querySelector(".footer > span");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} ALL RIGHTS RESERVED.`;

    }


    // =====================================
    // PAGE LOADED
    // =====================================

    console.log(
        "NITIN.DEV Skills Page Loaded Successfully!"
    );

});
