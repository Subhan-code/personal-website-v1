document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menuToggle");
  const navButtons = document.querySelector(".navbar .nav-buttons");

  menuToggle.addEventListener("click", function() {
      navButtons.classList.toggle("show");
  });

  const text = "SUBHAN NOTION";
  const container = document.getElementById("animatedText");

  text.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "letter";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      container.appendChild(span);
  });

  const letters = document.querySelectorAll(".letter");
  const totalLetters = letters.length;
  const delayIncrement = 100;

  function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }

  function animateLetters(forward = true) {
      letters.forEach((letter, index) => {
          const normalizedIndex = Math.max(index, totalLetters - 1 - index) / (totalLetters - 1);
          const easedDelay = easeInOutQuart(normalizedIndex);
          const delay = easedDelay * (totalLetters - 1) * delayIncrement;
          
          setTimeout(() => {
              letter.style.setProperty("--wght", forward ? 700 : 100);
              letter.style.setProperty("--wdth", forward ? 300 : 150);
              letter.style.setProperty("--opacity", forward ? 1 : 0.25);
              letter.style.setProperty("--letter-spacing", forward ? '0.05em' : '0em');
          }, delay);
      });
  }

  animateLetters();

  setTimeout(() => {
      const splashScreen = document.getElementById("splashScreen");
      splashScreen.classList.add("hidden");
      setTimeout(() => {
          splashScreen.style.display = "none";
          const mainContent = document.getElementById("mainContent");
          mainContent.classList.remove("hidden");
          mainContent.classList.add("visible");
      }, 500);
  }, 3000);

  const scrollers = document.querySelectorAll(".scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
  }

  function addAnimation() {
      scrollers.forEach((scroller) => {
          scroller.setAttribute("data-animated", true);
          const scrollerInner = scroller.querySelector(".scroller__inner");
          const scrollerContent = Array.from(scrollerInner.children);

          scrollerContent.forEach((item) => {
              const duplicatedItem = item.cloneNode(true);
              duplicatedItem.setAttribute("aria-hidden", true);
              scrollerInner.appendChild(duplicatedItem);
          });
      });
  }
});
