(() => {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.getElementById("siteHeader");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 16);
  };

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  if (toggle && nav && header) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      header.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        header.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll(
    ".intro-grid, .section-head, .service-card, .audience-card, .work-feature, .work-gallery, .split-section, .process-list li, .faq-item, .profile-grid, .contact-inner"
  );

  targets.forEach((target) => target.classList.add("reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 }
  );

  targets.forEach((target) => observer.observe(target));
})();
