(function () {
  "use strict";

  // --- Mobile Navigation ---
  const toggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const overlay = document.querySelector(".nav__overlay");

  function openNav() {
    navList.classList.add("open");
    overlay.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    navList.classList.remove("open");
    overlay.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var isOpen = navList.classList.contains("open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeNav);
  }

  // Close nav on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navList && navList.classList.contains("open")) {
      closeNav();
    }
  });

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId && targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector(".site-header")
            ? document.querySelector(".site-header").offsetHeight
            : 0;
          var targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });

          // Close mobile nav if open
          if (navList && navList.classList.contains("open")) {
            closeNav();
          }
        }
      }
    });
  });

  // --- Lazy Loading Images ---
  if ("IntersectionObserver" in window) {
    var lazyImages = document.querySelectorAll("img[data-src]");
    var imageObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            img.removeAttribute("data-src");
            img.removeAttribute("data-srcset");
            imageObserver.unobserve(img);
          }
        });
      },
      { rootMargin: "100px 0px" }
    );

    lazyImages.forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  // --- Scroll animations ---
  if ("IntersectionObserver" in window) {
    var animatedElements = document.querySelectorAll(".animate-on-scroll");
    var animObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(function (el) {
      animObserver.observe(el);
    });
  }

  // --- Header scroll shadow ---
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.pageYOffset > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      },
      { passive: true }
    );
  }

  // --- Hero slider (homepage) ---
  var slides = document.querySelectorAll(".hero--slider .hero__slide");
  if (slides.length > 0) {
    // Usa hero.webp se il browser lo supporta (dopo npm run optimize-images)
    (function checkHeroWebP() {
      var webp = new Image();
      webp.onload = webp.onerror = function () {
        if (webp.height === 1) {
          slides.forEach(function (el) {
            el.style.backgroundImage = "url('assets/img/hero/hero.webp')";
          });
        }
      };
      webp.src =
        "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
    })();
    if (slides.length > 1) {
      var current = 0;
      setInterval(function () {
        slides[current].classList.remove("hero__slide--active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("hero__slide--active");
      }, 5000);
    }
  }
})();
