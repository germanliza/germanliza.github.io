const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

function closeMenu() {
  menuButton.classList.remove("is-open");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Відкрити меню");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (isOpen) return closeMenu();
  menuButton.classList.add("is-open");
  navigation.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Закрити меню");
});

navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

// Certificate carousel — scoped to its own section.
(() => {
  const stage = document.querySelector(".certificates__stage");
  if (!stage) return;
  const slides = [...stage.querySelectorAll(".certificates__slide")];
  const counter = document.querySelector("[data-cert-current]");
  let current = 0;
  const render = () => {
    slides.forEach((slide, index) => {
      let delta = (index - current + slides.length) % slides.length;
      if (delta > Math.floor(slides.length / 2)) delta -= slides.length;
      if (Math.abs(delta) <= 2) slide.dataset.position = String(delta);
      else delete slide.dataset.position;
      slide.setAttribute("aria-hidden", delta === 0 ? "false" : "true");
    });
    counter.textContent = String(current + 1).padStart(2, "0");
  };
  const move = (step) => {
    current = (current + step + slides.length) % slides.length;
    render();
  };
  document
    .querySelector("[data-cert-prev]")
    .addEventListener("click", () => move(-1));
  document
    .querySelector("[data-cert-next]")
    .addEventListener("click", () => move(1));
  let startX = null;
  stage.addEventListener(
    "touchstart",
    (event) => {
      startX = event.changedTouches[0].screenX;
    },
    { passive: true },
  );
  stage.addEventListener(
    "touchend",
    (event) => {
      if (startX === null) return;
      const distance = event.changedTouches[0].screenX - startX;
      if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
      startX = null;
    },
    { passive: true },
  );
  render();
})();

const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
