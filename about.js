
/* =========================================
   NITIN.DEV - ABOUT PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const cursorDot = document.getElementById("cursorDot");
    const cursorOutline = document.getElementById("cursorOutline");
    const particles = document.getElementById("particles");

    const aboutImage = document.querySelector(".about-image");
    const aboutRight = document.querySelector(".about-right");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // HEADER SCROLL EFFECT
    function handleScroll() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });


    // MOBILE MENU
    if (menuToggle && navbar) {

        function closeMenu() {

            navbar.classList.remove("show");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute("aria-expanded", "false");

        }

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


    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(
        ".section-heading, .story-content, .what-card, .approach-content"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && !reduceMotion) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // IMAGE PARALLAX
    if (
        aboutImage &&
        aboutRight &&
        !isTouchDevice &&
        !reduceMotion
    ) {

        aboutRight.addEventListener("mousemove", event => {

            const rect = aboutRight.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            aboutImage.style.transform =
                `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;

        });

        aboutRight.addEventListener("mouseleave", () => {

            aboutImage.style.transform = "rotate(2deg)";

        });

    }


    // CUSTOM CURSOR
    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let outlineX = mouseX;
        let outlineY = mouseY;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

        });


        // Smooth moving outer circle
        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // Hover effect
        document.addEventListener("pointerover", event => {

            if (event.target.closest("a, button, .what-card")) {
                cursorOutline.classList.add("hover");
            }

        });

        document.addEventListener("pointerout", event => {

            if (
                event.target.closest("a, button, .what-card") &&
                !event.relatedTarget?.closest("a, button, .what-card")
            ) {
                cursorOutline.classList.remove("hover");
            }

        });

    }


    // MOUSE TRAIL PARTICLES
    if (!isTouchDevice && !reduceMotion && particles) {

        let lastParticleTime = 0;

        document.addEventListener("mousemove", event => {

            const now = Date.now();

            // Performance control
            if (now - lastParticleTime < 35) return;

            lastParticleTime = now;

            const particle = document.createElement("span");

            particle.className = "mouse-particle";

            particle.style.left = event.clientX + "px";
            particle.style.top = event.clientY + "px";

            const size = Math.random() * 3 + 2;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            particles.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 850);

        });

    }


    console.log("NITIN.DEV About Page Loaded!");

});
