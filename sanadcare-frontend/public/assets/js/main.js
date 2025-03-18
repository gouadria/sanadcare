/**
 * Template Name: Medilab
 * Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict"; // Optionnel dans un module moderne

  /**
   * Appliquer la classe .scrolled au body lorsque la page est défilée
   * Vérifie que l'élément #header existe
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) {
      console.warn('L\'élément avec l\'ID "header" est introuvable.');
      return;
    }
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  // Attendre que le DOM soit complètement chargé
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Masquer le menu mobile lors du clic sur un lien interne
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Basculer les dropdowns du menu mobile
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      if (this.parentNode.nextElementSibling) {
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      }
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Bouton de retour en haut
   */
  let scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Initialisation de l'animation au scroll (AOS)
   */
  if (typeof AOS !== "undefined") {
    window.addEventListener("load", function aosInit() {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    });
  } else {
    console.warn("AOS n'est pas défini. Veuillez inclure la bibliothèque AOS.");
  }

  /**
   * Initialisation de glightbox
   */
  if (typeof GLightbox !== "undefined") {
    const glightbox = GLightbox({
      selector: ".glightbox",
    });
  } else {
    console.warn("GLightbox n'est pas défini. Veuillez inclure la bibliothèque GLightbox.");
  }

  /**
   * Initialisation de Pure Counter
   */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  } else {
    console.warn("PureCounter n'est pas défini. Veuillez inclure la bibliothèque PureCounter.");
  }

  /**
   * FAQ Toggle
   */
  document.querySelectorAll(".faq-item h3, .faq-item .faq-toggle").forEach(
    (faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    }
  );

  /**
   * Initialisation des sliders Swiper
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config;
      try {
        config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
      } catch (error) {
        console.error("Erreur de parsing JSON pour swiper-config :", error);
        return;
      }
      if (
        swiperElement.classList.contains("swiper-tab") &&
        typeof initSwiperWithCustomPagination === "function"
      ) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else if (typeof Swiper !== "undefined") {
        new Swiper(swiperElement, config);
      } else {
        console.warn("Swiper n'est pas défini. Veuillez inclure la bibliothèque Swiper.");
      }
    });
  }
  window.addEventListener("load", initSwiper);
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      if (!(swiperElement instanceof Element)) {
        console.error("swiperElement n'est pas un élément DOM valide :", swiperElement);
        return;
      }
      const configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) {
        console.warn("Aucune configuration swiper trouvée pour :", swiperElement);
        return;
      }
    
      // Initialisation de Swiper en fonction du type
      if (
        swiperElement.classList.contains("swiper-tab") &&
        typeof initSwiperWithCustomPagination === "function"
      ) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else if (typeof Swiper !== "undefined") {
        // Avant d'initialiser, vérifie que swiperElement est un élément DOM
        if (!(swiperElement instanceof Element)) {
          console.error("swiperElement n'est pas un élément DOM valide :", swiperElement);
          return;
        }
      
      } else {
        console.warn("Swiper n'est pas défini. Veuillez inclure la bibliothèque Swiper.");
      }
    });
  }
  

  /**
   * Correction de la position de scroll lors du chargement de la page pour les URLs avec hash
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(target).scrollMarginTop;
          window.scrollTo({
            top: target.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
