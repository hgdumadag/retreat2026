const revealItems = document.querySelectorAll(".reveal");
const daySections = document.querySelectorAll("[data-day]");
const dayLinks = document.querySelectorAll(".day-link");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const activeId = entry.target.id;

      dayLinks.forEach((link) => {
        if (link.getAttribute("href") !== `#${activeId}`) return;

        if (entry.isIntersecting) {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-20% 0px -45% 0px",
  }
);

daySections.forEach((section) => sectionObserver.observe(section));
