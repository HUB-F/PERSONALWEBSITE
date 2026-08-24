/* =========================================================
   FOLLYHUB
   INTERACTION SYSTEM
   ========================================================= */


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1300);

});



/* =========================
   CURRENT YEAR
========================= */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =========================
   THEME SYSTEM
========================= */

const themeButton =
    document.getElementById("themeButton");

const themePanel =
    document.getElementById("themePanel");

const themeColors =
    document.querySelectorAll(".theme-color");


themeButton.addEventListener("click", () => {

    themePanel.classList.toggle("show");

});


/* Load saved theme */

const savedTheme =
    localStorage.getItem("follyhub-theme");


if (savedTheme) {

    document.body.className = "";

    if (savedTheme !== "mint") {

        document.body.classList.add(
            `theme-${savedTheme}`
        );

    }


    themeColors.forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.theme === savedTheme
        ) {

            button.classList.add("active");

        }

    });

}


/* Change theme */

themeColors.forEach(button => {

    button.addEventListener("click", () => {

        const theme =
            button.dataset.theme;


        document.body.className = "";


        if (theme !== "mint") {

            document.body.classList.add(
                `theme-${theme}`
            );

        }


        localStorage.setItem(
            "follyhub-theme",
            theme
        );


        themeColors.forEach(color => {

            color.classList.remove("active");

        });


        button.classList.add("active");


        setTimeout(() => {

            themePanel.classList.remove("show");

        }, 300);

    });

});


/* Close theme panel outside click */

document.addEventListener("click", event => {

    if (
        !themePanel.contains(event.target) &&
        !themeButton.contains(event.target)
    ) {

        themePanel.classList.remove("show");

    }

});



/* =========================
   MOBILE MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("show");

        });

    });



/* =========================
   SMOOTH SCROLL
========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });



/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

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



/* =========================
   SCROLL PROGRESS
========================= */

const progressBar =
    document.createElement("div");

progressBar.className =
    "scroll-progress";

document.body.appendChild(progressBar);


window.addEventListener(
    "scroll",

    () => {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progressBar.style.width =
            `${progress}%`;

    },

    { passive: true }

);



/* =========================
   NAVBAR SHOW / HIDE
========================= */

const navbar =
    document.querySelector(".navbar");

let lastScroll =
    window.scrollY;


window.addEventListener(
    "scroll",

    () => {

        const currentScroll =
            window.scrollY;


        if (

            currentScroll > lastScroll &&
            currentScroll > 150

        ) {

            navbar.classList.add("hide");

        }

        else {

            navbar.classList.remove("hide");

        }


        lastScroll =
            currentScroll;

    },

    { passive: true }

);



/* =========================
   PARTICLE SYSTEM
========================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.reset();

    }


    reset() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 2 + .5;

        this.speedX =
            (Math.random() - .5) * .25;

        this.speedY =
            (Math.random() - .5) * .25;

        this.alpha =
            Math.random() * .5 + .1;

    }


    update() {

        this.x += this.speedX;

        this.y += this.speedY;


        if (

            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height

        ) {

            this.reset();

        }

    }


    draw() {

        const styles =
            getComputedStyle(document.body);

        const accent =
            styles.getPropertyValue(
                "--accent"
            ).trim();


        ctx.beginPath();

        ctx.arc(

            this.x,
            this.y,
            this.size,

            0,
            Math.PI * 2

        );


        ctx.fillStyle =
            accent;


        ctx.globalAlpha =
            this.alpha;


        ctx.fill();

        ctx.globalAlpha = 1;

    }

}


function createParticles() {

    particles = [];


    const count =
        window.innerWidth < 700
            ? 35
            : 70;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function connectParticles() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 100) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );


                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );


                ctx.strokeStyle =
                    getComputedStyle(
                        document.body
                    )
                    .getPropertyValue(
                        "--accent"
                    );


                ctx.globalAlpha =
                    .06;


                ctx.stroke();

                ctx.globalAlpha =
                    1;

            }

        }

    }

}


function animateParticles() {

    ctx.clearRect(

        0,
        0,

        canvas.width,
        canvas.height

    );


    particles.forEach(particle => {

        particle.update();

        particle.draw();

    });


    connectParticles();


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =========================
   HERO TOUCH PARALLAX
========================= */

const hero =
    document.querySelector(".hero");

const heroVisual =
    document.querySelector(".hero-visual");


let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


hero.addEventListener(
    "touchmove",

    event => {

        const touch =
            event.touches[0];


        targetX =
            touch.clientX /
            window.innerWidth -
            .5;


        targetY =
            touch.clientY /
            window.innerHeight -
            .5;

    },

    { passive: true }

);


hero.addEventListener(
    "mousemove",

    event => {

        if (
            window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {

            targetX =
                event.clientX /
                window.innerWidth -
                .5;


            targetY =
                event.clientY /
                window.innerHeight -
                .5;

        }

    }

);


function animateHeroParallax() {

    currentX +=
        (targetX - currentX) * .05;

    currentY +=
        (targetY - currentY) * .05;


    if (heroVisual) {

        heroVisual.style.transform =
            `translate(
                ${currentX * 12}px,
                ${currentY * 12}px
            )`;

    }


    requestAnimationFrame(
        animateHeroParallax
    );

}


animateHeroParallax();



/* =========================
   FLOATING CARD TOUCH EFFECT
========================= */

const interactiveCards =
    document.querySelectorAll(

        ".skill-card, " +
        ".timeline-card, " +
        ".stat-card, " +
        ".project-card"

    );


interactiveCards.forEach(card => {

    card.addEventListener(
        "touchstart",

        () => {

            card.style.transform =
                "scale(.98)";

        },

        { passive: true }

    );


    card.addEventListener(
        "touchend",

        () => {

            setTimeout(() => {

                card.style.transform =
                    "";

            }, 150);

        },

        { passive: true }

    );

});


/* =========================
   DESKTOP CARD TILT
========================= */

if (

    window.matchMedia(
        "(pointer: fine)"
    ).matches

) {

    document
        .querySelectorAll(
            ".skill-card, .stat-card"
        )

        .forEach(card => {

            card.addEventListener(
                "mousemove",

                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        ((x / rect.width) - .5) * 6;


                    const rotateX =
                        ((y / rect.height) - .5) * -6;


                    card.style.transform =
                        `perspective(700px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)`;

                }

            );


            card.addEventListener(
                "mouseleave",

                () => {

                    card.style.transform =
                        "";

                }

            );

        });

}



/* =========================
   SCROLL DEPTH EFFECT
========================= */

window.addEventListener(
    "scroll",

    () => {

        const scroll =
            window.scrollY;


        const grid =
            document.querySelector(".grid");


        if (grid) {

            grid.style.transform =
                `perspective(700px)
                rotateX(62deg)
                translateY(${scroll * .03}px)`;

        }


        const glows =
            document.querySelectorAll(".glow");


        glows.forEach(

            (glow, index) => {

                const movement =
                    scroll *
                    (0.02 + index * 0.01);


                glow.style.marginTop =
                    `${movement}px`;

            }

        );

    },

    { passive: true }

);



/* =========================
   HERO TITLE ENTRANCE
========================= */

const heroElements = [

    ".eyebrow",

    ".hero-title h1",

    ".identity-row",

    ".hero-description",

    ".hero-buttons",

    ".scroll-hint",

    ".hero-visual"

];


heroElements.forEach(

    (selector, index) => {

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.style.opacity =
                    "0";


                element.style.transform =
                    "translateY(30px)";


                setTimeout(() => {

                    element.style.transition =
                        "opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1)";


                    element.style.opacity =
                        "1";


                    element.style.transform =
                        "translateY(0)";

                },

                300 + index * 130

                );

            });

    }

);



/* =========================
   CONSOLE
========================= */

console.log(
    "FOLLYHUB"
);

console.log(
    "Student • Builder • Technology & AI • Healthcare • Entrepreneurship"
);
