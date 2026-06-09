/* ============================================================
   TerraViva — Agronegócio | Scripts
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Ano automático no rodapé ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Header com efeito ao rolar ---------- */
  const header = document.getElementById("header");
  const backTop = document.getElementById("backTop");

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add("scrolled");
      backTop.classList.add("show");
    } else {
      header.classList.remove("scrolled");
      backTop.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------- Menu mobile ---------- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("active");
    });
  });

  /* ---------- Animação de revelação ao rolar ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Contador animado dos números ---------- */
  const counters = document.querySelectorAll(".stat__num");
  const animateCount = (el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- Formulário de contato ---------- */
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const assunto = form.assunto.value;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !emailOk || !assunto) {
        feedback.textContent = "Por favor, preencha nome, e-mail válido e assunto.";
        feedback.className = "form__feedback err";
        return;
      }

      feedback.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e retornaremos em breve. 🌱`;
      feedback.className = "form__feedback ok";
      form.reset();
    });
  }
});
