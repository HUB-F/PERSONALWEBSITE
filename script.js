/* =========================================================
   FOLLYHUB — PERSONAL WEBSITE
   Lightweight JavaScript
   ========================================================= */


/* -------------------------
   1. PAGE LOADER
   ------------------------- */

document.documentElement.classList.add("js-enabled");

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});


/* -------------------------
   2. CURRENT YEAR
   ------------------------- */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* -------------------------
   3. MOBILE MENU
   ------------------------- */

const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

  menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

    menuButton.classList.toggle("active");

  });


  // Close menu after clicking a link

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("mobile-open");

      menuButton.classList.remove("active");

    });

  });

}


/* -------------------------
   4. MOBILE MENU STYLES
   ------------------------- */

const mobileMenuStyle = document.createElement("style");

mobileMenuStyle.textContent = `

@media (max-width: 900px) {

  .nav-links.mobile-open {

    position: fixed;

    top: 88px;
    left: 11px;
    right: 11px;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 0;

    padding: 10px;

    border: 1px solid rgba(255,255,255,.10);

    border-radius: 18px;

    background: rgba(8,10,14,.94);

    backdrop-filter: blur(20px);

    -webkit-backdrop-filter: blur(20px);

    box-shadow:
      0 25px 80px rgba(0,0,0,.45);

  }

  .nav-links.mobile-open a {

    width: 100%;

    padding: 16px;

    border-bottom: 1px solid rgba(255,255,255,.07);

  }

  .nav-links.mobile-open a:last-child {

    border-bottom: none;

  }

}

`;

document.head.appendChild(mobileMenuStyle);


/* -------------------------
   5. SMOOTH SCROLL
   ------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* -------------------------
   6. SCROLL REVEAL
   ------------------------- */

const revealElements = document.querySelectorAll(
  ".section, .skill-card, .timeline-item, .project-window, .goal-item, .cv-box, .contact-content"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });

}


/* -------------------------
   7. REVEAL STYLES
   ------------------------- */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

.reveal {

  opacity: 0;

  transform:
    translateY(35px);

  transition:
    opacity .8s ease,
    transform .8s cubic-bezier(.22,1,.36,1);

}

.reveal.revealed {

  opacity: 1;

  transform:
    translateY(0);

}

`;

document.head.appendChild(revealStyle);


/* -------------------------
   8. STAGGERED CARDS
   ------------------------- */

document.querySelectorAll(
  ".skills-grid, .identity-grid, .goals-list"
).forEach(container => {

  const children = Array.from(container.children);

  children.forEach((child, index) => {

    child.style.transitionDelay =
      `${index * 70}ms`;

  });

});


/* -------------------------
   9. LIGHTWEIGHT 3D TILT
   ------------------------- */

const tiltElements = document.querySelectorAll(
  ".skill-card, .education-window, .project-window"
);


/*
   Only enable tilt when the device
   actually has a mouse.

   This keeps phones lightweight.
*/

if (window.matchMedia("(pointer: fine)").matches) {

  tiltElements.forEach(element => {

    element.addEventListener("mousemove", event => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -2.5;

      const rotateY =
        ((x - centerX) / centerX) * 2.5;


      element.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;

    });


    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });

}


/* -------------------------
   10. MOUSE LIGHT
   ------------------------- */

if (window.matchMedia("(pointer: fine)").matches) {

  const mouseLight = document.createElement("div");

  mouseLight.className = "mouse-light";

  document.body.appendChild(mouseLight);


  const mouseLightStyle =
    document.createElement("style");

  mouseLightStyle.textContent = `

    .mouse-light {

      position: fixed;

      width: 260px;
      height: 260px;

      border-radius: 50%;

      pointer-events: none;

      z-index: 9999;

      transform:
        translate(-50%, -50%);

      background:
        radial-gradient(
          circle,
          rgba(140,255,178,.055),
          transparent 65%
        );

      filter: blur(8px);

      opacity: 0;

      transition:
        opacity .4s ease;

    }

  `;

  document.head.appendChild(mouseLightStyle);


  window.addEventListener("mousemove", event => {

    mouseLight.style.left =
      `${event.clientX}px`;

    mouseLight.style.top =
      `${event.clientY}px`;

    mouseLight.style.opacity = "1";

  });

}


/* -------------------------
   11. PARALLAX BACKGROUND
   ------------------------- */

const grid = document.querySelector(".grid");

if (
  grid &&
  window.matchMedia("(pointer: fine)").matches
) {

  window.addEventListener(
    "mousemove",
    event => {

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);


      grid.style.transform =
        `perspective(700px)
         rotateX(${58 + y * 2}deg)
         rotateY(${x * 2}deg)
         translateY(8%)`;

    },
    { passive: true }
  );

}


/* -------------------------
   12. SCROLL PROGRESS
   ------------------------- */

const progressBar =
  document.createElement("div");

progressBar.className =
  "scroll-progress";

document.body.appendChild(progressBar);


const progressStyle =
  document.createElement("style");

progressStyle.textContent = `

.scroll-progress {

  position: fixed;

  top: 0;
  left: 0;

  width: 0%;
  height: 2px;

  z-index: 10000;

  background: #8cffb2;

  box-shadow:
    0 0 12px rgba(140,255,178,.5);

}

`;

document.head.appendChild(progressStyle);


window.addEventListener(
  "scroll",
  () => {

    const scrollTop =
      window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    progressBar.style.width =
      `${progress}%`;

  },
  { passive: true }
);


/* -------------------------
   13. ACTIVE NAVIGATION
   ------------------------- */

const sections =
  document.querySelectorAll("section[id]");

const navAnchors =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


if (
  sections.length &&
  navAnchors.length &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          navAnchors.forEach(link => {

            link.classList.remove("active");

          });


          const activeLink =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.classList.add("active");

          }

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });

}


/* -------------------------
   14. ACTIVE NAV STYLE
   ------------------------- */

const activeNavStyle =
  document.createElement("style");

activeNavStyle.textContent = `

.nav-links a.active {

  color: #f3f6fb;

}

.nav-links a.active::after {

  width: 100%;

}

`;

document.head.appendChild(activeNavStyle);


/* -------------------------
   15. CURSOR EFFECT
   ------------------------- */

if (window.matchMedia("(pointer: fine)").matches) {

  const cursor =
    document.createElement("div");

  cursor.className =
    "custom-cursor";

  document.body.appendChild(cursor);


  const cursorStyle =
    document.createElement("style");

  cursorStyle.textContent = `

.custom-cursor {

  position: fixed;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  pointer-events: none;

  z-index: 10001;

  background: #8cffb2;

  box-shadow:
    0 0 15px rgba(140,255,178,.7);

  transform:
    translate(-50%, -50%);

  opacity: 0;

  transition:
    width .25s ease,
    height .25s ease,
    opacity .25s ease;

}

.custom-cursor.big {

  width: 36px;
  height: 36px;

  background:
    rgba(140,255,178,.08);

  border:
    1px solid rgba(140,255,178,.5);

}

`;

  document.head.appendChild(cursorStyle);


  window.addEventListener(
    "mousemove",
    event => {

      cursor.style.left =
        `${event.clientX}px`;

      cursor.style.top =
        `${event.clientY}px`;

      cursor.style.opacity = "1";

    }
  );


  document
    .querySelectorAll("a, button, .skill-card")
    .forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          cursor.classList.add("big");
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          cursor.classList.remove("big");
        }
      );

    });

}


/* -------------------------
   16. IMAGE LAZY LOADING
   ------------------------- */

document
  .querySelectorAll("img")
  .forEach(image => {

    image.loading = "lazy";

});


/* -------------------------
   17. CONSOLE SIGNATURE
   ------------------------- */

console.log(
  "%cFollyHUB",
  "font-size:24px;font-weight:bold;"
);

console.log(
  "Student • Builder • Technology & AI • Healthcare • Entrepreneurship"
);
