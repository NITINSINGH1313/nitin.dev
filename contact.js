
/* =========================================
   NITIN.DEV - CONTACT PAGE JAVASCRIPT
   COMPLETE UPDATED VERSION
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

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;


    // =====================================
    // MOBILE MENU
    // =====================================

    function closeMenu() {

        if (!menuToggle || !navbar) return;

        navbar.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }

        });

        // Close menu after clicking a navigation link

        navbar.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu with Escape key

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu when clicking outside

        document.addEventListener("click", event => {

            const clickedInsideMenu = navbar.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }

        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 50);

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // =====================================
    // CUSTOM CURSOR
    // =====================================

    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let outlineX = mouseX;
        let outlineY = mouseY;

        let cursorVisible = false;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

            if (!cursorVisible) {

                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";

                cursorVisible = true;

            }

        });

        document.addEventListener("mouseleave", () => {

            cursorDot.style.opacity = "0";
            cursorOutline.style.opacity = "0";

            cursorVisible = false;

        });

        document.addEventListener("mouseenter", () => {

            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";

        });

        function animateCursor() {

            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = outlineX + "px";
            cursorOutline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        // CURSOR HOVER EFFECT

        document.querySelectorAll(
            "a, button, input, textarea, .info-icon"
        ).forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursorOutline.style.width = "55px";
                cursorOutline.style.height = "55px";
                cursorOutline.style.borderColor = "rgba(237,23,48,1)";

            });

            element.addEventListener("mouseleave", () => {

                cursorOutline.style.width = "35px";
                cursorOutline.style.height = "35px";
                cursorOutline.style.borderColor = "rgba(237,23,48,0.75)";

            });

        });

    }


    // =====================================
    // RED CURSOR PARTICLES
    // =====================================

    let lastParticleTime = 0;

    if (!isTouchDevice && particles) {

        document.addEventListener("mousemove", event => {

            const now = Date.now();

            // Control particle creation speed

            if (now - lastParticleTime < 35) return;

            lastParticleTime = now;

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = event.clientX + "px";
            particle.style.top = event.clientY + "px";

            particles.appendChild(particle);

            // Remove particle after animation

            setTimeout(() => {

                particle.remove();

            }, 850);

        });

    }


    // =====================================
    // SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

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
    // CONTACT FORM
    // =====================================

    const CONTACT_EMAIL = "akhilbhaiji723@gmail.com";

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {

                formStatus.textContent = "Please fill in all fields.";
                formStatus.className = "form-status error";

                return;

            }

            const emailSubject = encodeURIComponent(subject);

            const emailBody = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

            const mailtoLink =
                "mailto:" + CONTACT_EMAIL +
                "?subject=" + emailSubject +
                "&body=" + emailBody;

            formStatus.textContent =
                "Your email application will open with the message prepared. Please review and send it there.";

            formStatus.className = "form-status success";

            // Open the user's default email application

            window.location.href = mailtoLink;

        });

    }


    // =====================================
    // PLACEHOLDER SOCIAL LINKS
    // =====================================

    document.querySelectorAll(".placeholder-link").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


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
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // PAGE LOADED
    // =====================================

    console.log("NITIN.DEV Contact Page Loaded Successfully!");

});
