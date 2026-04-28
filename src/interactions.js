export function setupLoader() {
  const loadingMount = document.querySelector("#loading-screen");
  const loadingScreen = loadingMount?.querySelector(".loading-screen");
  if (!loadingScreen) return;
  document.body.style.overflow = "hidden";

  const hideLoader = () => {
    loadingScreen.classList.add("hide");
    window.setTimeout(() => {
      loadingMount.innerHTML = "";
      document.body.style.overflow = "";
    }, 520);
  };

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 1350);
  } else {
    window.addEventListener("load", () => window.setTimeout(hideLoader, 1350), { once: true });
  }
}

export function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

export function setupNavigation() {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("main section[id]");
  const menu = document.querySelector(".menu");
  const btn = document.querySelector(".mobile-menu-btn");

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.navLink === id));
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => activeObserver.observe(section));

  btn?.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    menu?.classList.toggle("open", !expanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu?.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
    });
  });
}
