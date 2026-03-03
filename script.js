(function () {
  const root = document.documentElement;

  // ====== Year ======
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ====== Theme (Light/Dark) ======
  const modeToggle = document.getElementById("modeToggle");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (modeToggle) {
      const isDark = theme === "dark";
      modeToggle.setAttribute("aria-pressed", String(isDark));
      modeToggle.querySelector(".mode-text").textContent = isDark ? "Dark" : "Light";
      modeToggle.querySelector(".mode-icon").textContent = isDark ? "☾" : "◐";
    }
  }

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    setTheme(saved);
  } else {
    // Default: follow system preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // ====== Mobile menu ======
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ====== Dropdown open on mobile (tap) ======
  const dropdown = document.querySelector(".dropdown");
  const trigger = document.querySelector(".dropdown-trigger");

  if (dropdown && trigger) {
    trigger.addEventListener("click", (e) => {
      // On small screens, we toggle the dropdown
      if (window.matchMedia("(max-width: 760px)").matches) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  }

  // Close menus when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const isClickInsideNav = e.target.closest(".nav");
    if (!isClickInsideNav) {
      if (navMenu) navMenu.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      if (dropdown) dropdown.classList.remove("open");
    }
  });
})();
