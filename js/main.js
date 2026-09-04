/**
 * Comportamento do site — menu mobile, header no scroll, entrada do hero,
 * scroll reveal e preenchimento do portfólio a partir de js/data.js.
 * Tudo protegido por try/catch: se algo falhar, o CSS de fallback (sem
 * classe .js) já garante conteúdo visível.
 */

(() => {
  try {
    document.addEventListener("DOMContentLoaded", () => {
      initHeaderScroll();
      initMobileNav();
      initHeroEntrance();
      initReveal();
      initPortfolio();
      initWhatsAppLinks();
      initFooterYear();
    });
  } catch (err) {
    // Falha silenciosa — o failsafe inline no HTML garante visibilidade.
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    var toggle = document.getElementById("menu-toggle");
    var closeBtn = document.getElementById("mobile-nav-close");
    var nav = document.getElementById("mobile-nav");
    if (!toggle || !nav) return;

    function open() {
      nav.classList.add("is-open");
      nav.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function close() {
      nav.classList.remove("is-open");
      nav.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }

    toggle.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) close();
      else open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) close();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && nav.classList.contains("is-open")) close();
    });
  }

  function initHeroEntrance() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("is-loaded");
      });
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    var observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
  }

  function initPortfolio() {
    if (typeof PROJECTS === "undefined") return;
    var list = document.getElementById("portfolio-list");
    if (!list) return;

    list.innerHTML = PROJECTS.map(
      (p, i) =>
        '<a class="portfolio-row reveal" href="' +
        p.url +
        '" target="_blank" rel="noopener">' +
        '<span class="portfolio-row__index">' +
        String(i + 1).padStart(2, "0") +
        "</span>" +
        '<span class="portfolio-row__body">' +
        '<span class="portfolio-row__category">' +
        p.categoria +
        "</span>" +
        '<span class="portfolio-row__name">' +
        p.nome +
        "</span>" +
        '<p class="portfolio-row__desc">' +
        p.descricao +
        "</p>" +
        "</span>" +
        '<span class="portfolio-row__cta">Ver projeto ' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17L17 7M17 7H9M17 7v8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "</span>" +
        "</a>",
    ).join("");

    initReveal();
  }

  function initWhatsAppLinks() {
    if (typeof WHATSAPP_NUMBER === "undefined") return;
    var mensagem = encodeURIComponent(
      "Olá! Quero saber mais sobre a criação do meu site com a TGS Web Studio.",
    );
    var link = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + mensagem;

    [
      "cta-header",
      "cta-hero",
      "cta-mobile-nav",
      "cta-pricing",
      "cta-final",
    ].forEach((id) => {
      var el = document.getElementById(id);
      if (el) el.href = link;
    });
  }

  function initFooterYear() {
    var el = document.getElementById("ano-atual");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
