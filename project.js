
/* =========================================
   NITIN.DEV - PROJECT PAGE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    const backgroundParticles =
        document.getElementById("backgroundParticles");

    const mouseParticles = document.getElementById("particles");

    const cursorDot = document.getElementById("cursorDot");
    const cursorOutline = document.getElementById("cursorOutline");


    // PRELOADER
    const preloader = document.querySelector(".preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.display = "none";
            }, 1700);
        });
    }


    // HEADER SCROLL EFFECT
    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);


    // MOBILE MENU
    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("show");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }

            });

        });

    }


    // PROJECT FILTER
    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            projectCards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || category === filter) {

                    card.classList.remove("hide");
                    card.classList.add("show");

                } else {

                    card.classList.remove("show");
                    card.classList.add("hide");

                }

            });

        });

    });


    // PROJECT REVEAL ANIMATION
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        projectCards.forEach(card => {
            observer.observe(card);
        });

    } else {

        projectCards.forEach(card => {
            card.classList.add("show");
        });

    }


    // BACKGROUND FLOATING PARTICLES
    if (backgroundParticles) {

        for (let i = 0; i < 35; i++) {

            const particle = document.createElement("span");

            particle.classList.add("particle");

            particle.style.left = Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                (5 + Math.random() * 8) + "s";

            backgroundParticles.appendChild(particle);

        }

    }


    // CUSTOM CURSOR
    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;

    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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


        // Smooth outer circle
        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // Cursor hover effect
        document.querySelectorAll(
            "a, button, .project-card"
        ).forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });

    }


    // MOUSE TRAIL PARTICLES
    if (!isTouchDevice && !reduceMotion && mouseParticles) {

        let lastParticleTime = 0;

        document.addEventListener("mousemove", event => {

            const now = Date.now();

            if (now - lastParticleTime < 35) return;

            lastParticleTime = now;

            const particle = document.createElement("span");

            particle.className = "mouse-particle";

            particle.style.left = event.clientX + "px";
            particle.style.top = event.clientY + "px";

            const size = Math.random() * 3 + 2;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            mouseParticles.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 850);

        });

    }


    // FOOTER YEAR
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
