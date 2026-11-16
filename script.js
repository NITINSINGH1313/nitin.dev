
/* =========================================
   NITIN.DEV - PROFESSIONAL PORTFOLIO JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTS
    // =====================================

    const cursorDot = document.getElementById("cursorDot");
    const cursorOutline = document.getElementById("cursorOutline");
    const particles = document.getElementById("particles");

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    const typingText = document.getElementById("typingText");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    // =====================================
    // CUSTOM CURSOR
    // =====================================

    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

        });

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.16;
            outlineY += (mouseY - outlineY) * 0.16;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);
        }

        animateCursor();


        // Cursor hover effect

        const interactiveElements = document.querySelectorAll(
            "a, button, .photo-frame, .stat-card"
        );

        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hover");
            });

        });

    }


    // =====================================
    // MOUSE PARTICLES
    // =====================================

    if (!isTouchDevice && !reduceMotion && particles) {

        let lastParticleTime = 0;

        document.addEventListener("mousemove", (e) => {

            const now = Date.now();

            // Limit particle creation

            if (now - lastParticleTime < 35) return;

            lastParticleTime = now;

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = e.clientX + "px";
            particle.style.top = e.clientY + "px";

            const randomSize = Math.random() * 3 + 2;

            particle.style.width = randomSize + "px";
            particle.style.height = randomSize + "px";

            particles.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 850);

        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });

    handleHeaderScroll();


    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("show");

            const isOpen = navbar.classList.contains("show");

            menuToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.setAttribute("aria-expanded", String(isOpen));

        });


        // Close menu after clicking a navigation link

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navbar.classList.remove("show");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });


        // Close menu with Escape key

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                navbar.classList.remove("show");

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    // =====================================
    // TYPING ANIMATION
    // =====================================

    if (typingText) {

        const words = [
            "WEB DEVELOPER",
            "UI DESIGNER",
            "FREELANCER",
            "CREATIVE THINKER"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (deleting) {

                charIndex--;

            } else {

                charIndex++;

            }

            typingText.textContent =
                currentWord.substring(0, charIndex);

            let speed = deleting ? 45 : 100;

            if (!deleting && charIndex === currentWord.length) {

                deleting = true;
                speed = 1600;

            } else if (deleting && charIndex === 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

                speed = 400;

            }

            setTimeout(typeEffect, speed);

        }

        if (reduceMotion) {
            typingText.textContent = words[0];
        } else {
            typeEffect();
        }

    }


    // =====================================
    // SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-text, .about-stats, .contact-content"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window && !reduceMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    // =====================================
    // ACTIVE NAVIGATION
    // =====================================

    const sections = document.querySelectorAll(
        "main section[id], body > section[id]"
    );

    const navLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {

        const navObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navLinks.forEach((link) => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === "#" + currentId
                            );

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach((section) => {
            navObserver.observe(section);
        });

    }


    // =====================================
    // SMOOTH ANCHOR NAVIGATION
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (e) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: reduceMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // PHOTO PARALLAX EFFECT
    // =====================================

    const photoFrame = document.querySelector(".photo-frame");

    if (photoFrame && !isTouchDevice && !reduceMotion) {

        const visual = document.querySelector(".home-visual");

        if (visual) {

            visual.addEventListener("mousemove", (e) => {

                const rect = visual.getBoundingClientRect();

                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                photoFrame.style.transform =
                    `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;

            });

            visual.addEventListener("mouseleave", () => {

                photoFrame.style.transform = "rotate(2deg)";

            });

        }

    }


    // =====================================
    // FOOTER YEAR
    // =====================================

    const footerText = document.querySelector(".footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} NITIN.DEV | ALL RIGHTS RESERVED.`;

    }


    console.log("NITIN.DEV Portfolio Loaded Successfully!");

});
