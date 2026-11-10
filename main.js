/* Monta as páginas a partir do content.js. */
(function () {
  const LANGS = ["pt", "en"];
  const store = {
    get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch (e) {} },
  };
  const setURL = (u) => { try { history.replaceState(null, "", u); } catch (e) {} };

  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) { store.set(q); return q; }
    const s = store.get();
    if (LANGS.includes(s)) return s;
    return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
  }

  let lang = detectLang();
  let bannerTimer = null;
  const page = document.body.dataset.page;
  const t = () => UI[lang];
  const L = (v) => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.pt) : v;
  const img = (slug, file) => `images/projetos/${slug}/${file}`;
  const paras = (s) => String(s).split(/\n\s*\n/).map((p) => `<p>${p.trim()}</p>`).join("");
  const ext = 'target="_blank" rel="noopener"';
  const bySlugs = (list) => (list || []).map((s) => PROJETOS.find((p) => p.slug === s)).filter(Boolean);

  /* ícone de conversa usado no link do WhatsApp */
  const ICON_CHAT = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-8A2.5 2.5 0 0 1 6.5 3z"/><circle cx="8.5" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="9.5" r="1" fill="currentColor" stroke="none"/></svg>`;

  /* ---------- partes fixas ---------- */
  function header() {
    const cur = (on) => (on ? ' aria-current="page"' : "");
    const logo = SITE.logo ? `<img src="${SITE.logo}" alt="cath">` : "cath";
    return `
    <a class="skip" href="#main">${lang === "pt" ? "Pular para o conteúdo" : "Skip to content"}</a>
    <header class="site-header">
      <a class="logo" href="index.html" aria-label="cath">${logo}</a>
      <nav class="nav" aria-label="Menu">
        <a href="projetos.html"${cur(page === "projetos" || page === "projeto")}>${t().nav.projetos}</a>
        <a href="sobre.html"${cur(page === "sobre")}>${t().nav.sobre}</a>
        <a href="#contato">${t().nav.contato}</a>
        <span class="lang">
          ${LANGS.map((l) => `<button type="button" data-lang="${l}" aria-pressed="${l === lang}">${l.toUpperCase()}</button>`).join("")}
        </span>
      </nav>
    </header>`;
  }

  function footer() {
    const s = SITE;
    const cv = s.cv || {};
    const links = [
      `<a href="mailto:${s.email}">${s.email}</a>`,
      s.whatsapp && `<a class="icon-link" href="https://wa.me/${s.whatsapp}" ${ext} aria-label="WhatsApp ${s.telefone}" title="WhatsApp">${ICON_CHAT}</a>`,
      s.linkedin && `<a href="${s.linkedin}" ${ext}>LinkedIn ↗</a>`,
      cv.pt && `<a href="${cv.pt}" ${ext}>${t().cvPt} ↗</a>`,
      cv.en && `<a href="${cv.en}" ${ext}>${t().cvEn} ↗</a>`,
      s.instagram && `<a href="${s.instagram}" ${ext}>Instagram ↗</a>`,
      s.behance && `<a href="${s.behance}" ${ext}>Behance ↗</a>`,
    ].filter(Boolean).join("");
    return `
    <footer class="site-footer" id="contato">
      <p class="eyebrow">${t().nav.contato}</p>
      <h2 class="display reveal"><a href="mailto:${s.email}">${t().ctaTitulo}</a></h2>
      <p class="lead">${t().ctaTexto}</p>
      <div class="contact-links">${links}</div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${s.nome}</span>
        <span>${L(s.local)}</span>
        <a href="#top">${t().topo} ↑</a>
      </div>
    </footer>`;
  }

  function card(p, i) {
    return `
    <a class="card reveal" style="--d:${i % 3}" href="projeto.html?p=${p.slug}" data-cat="${p.categoria}">
      <div class="card-media">
        <img src="${img(p.slug, "capa.jpg")}" alt="${p.nome}" loading="lazy">
        <div class="card-info">
          <h3 class="card-title">${p.nome}</h3>
          <p class="card-concept">(${L(p.conceito)})</p>
        </div>
      </div>
    </a>`;
  }

  /* ---------- banner rotativo ---------- */
  function banner() {
    const slides = typeof BANNER !== "undefined" ? bySlugs(BANNER) : PROJETOS.slice(0, 4);
    const first = slides[0];
    const dots = slides.length > 1
      ? `<div class="dots">${slides.map((p, i) =>
          `<button type="button" class="dot" data-slide="${i}" aria-label="${p.nome}" aria-pressed="${i === 0}"></button>`).join("")}</div>`
      : "";
    return `
    <section class="banner" aria-label="${t().banner}">
      ${slides.map((p, i) => `
      <div class="slide${i === 0 ? " is-active" : ""}" data-slug="${p.slug}" aria-hidden="${i !== 0}">
        <img src="${img(p.slug, "banner.jpg")}" data-fallback="${img(p.slug, "capa.jpg")}" alt="${p.nome}">
      </div>`).join("")}
      <div class="banner-bar">
        <h1 class="banner-title reveal">${t().heroTitulo}</h1>
        ${first ? `<div class="banner-nav">
          <a class="banner-caption" href="projeto.html?p=${first.slug}">${first.nome} →</a>
          ${dots}
        </div>` : ""}
      </div>
    </section>`;
  }

  /* ---------- páginas ---------- */
  function pageHome() {
    const dest = typeof HOME !== "undefined" ? bySlugs(HOME) : PROJETOS.slice(0, 6);
    return `
    ${banner()}
    <section class="intro">
      <p class="lead reveal">${t().heroTexto}</p>
      <ul class="pills reveal">${t().heroServicos.map((s) => `<li class="pill">${s}</li>`).join("")}</ul>
    </section>
    <section class="section">
      <div class="section-head">
        <h2 class="h2">${t().selecionados}</h2>
        <a class="link-arrow" href="projetos.html">${t().verTodos} (${PROJETOS.length}) →</a>
      </div>
      <div class="grid grid--3">${dest.map(card).join("")}</div>
    </section>`;
  }

  function pageProjetos() {
    const cats = [...new Set(PROJETOS.map((p) => p.categoria))];
    const count = (c) => PROJETOS.filter((p) => p.categoria === c).length;
    const btn = (f, label, n) =>
      `<button type="button" class="pill" data-filter="${f}" aria-pressed="false">${label} <span class="count">${n}</span></button>`;
    return `
    <section class="page-intro">
      <h1 class="display reveal">${t().projetosTitulo}</h1>
      <p class="lead reveal">${t().projetosTexto}</p>
      <div class="pills filters reveal" role="group">
        ${btn("todos", t().todos, PROJETOS.length)}
        ${cats.map((c) => btn(c, t().categorias[c] || c, count(c))).join("")}
      </div>
    </section>
    <section class="section">
      <div class="grid grid--3" id="lista">${PROJETOS.map(card).join("")}</div>
    </section>`;
  }

  function pageProjeto() {
    const slug = new URLSearchParams(location.search).get("p");
    const i = PROJETOS.findIndex((p) => p.slug === slug);
    if (i < 0) { location.replace("projetos.html"); return ""; }
    const p = PROJETOS[i];
    const next = PROJETOS[(i + 1) % PROJETOS.length];
    document.title = `${p.nome} · cath`;
    const gal = Array.from({ length: p.galeria || 0 }, (_, k) => {
      const f = String(k + 1).padStart(2, "0") + ".jpg";
      return `<figure class="gallery-item reveal"><img src="${img(p.slug, f)}" alt="${p.nome}, ${k + 1}" loading="lazy"></figure>`;
    }).join("");
    return `
    <article>
      <header class="case-head">
        <a class="link-back" href="projetos.html">← ${t().voltar}</a>
        <h1 class="display reveal">${p.nome}</h1>
        <p class="lead reveal">${L(p.conceito)}</p>
        <dl class="meta">
          <div><dt>${t().categoria}</dt><dd>${t().categorias[p.categoria] || p.categoria}</dd></div>
          <div><dt>${t().ano}</dt><dd>${p.ano}</dd></div>
          <div><dt>${t().local}</dt><dd>${L(p.local)}</dd></div>
        </dl>
      </header>
      <figure class="case-cover"><img src="${img(p.slug, "capa.jpg")}" alt="${p.nome}"></figure>
      <div class="case-text">${paras(L(p.texto))}</div>
      <div class="gallery">${gal}</div>
      <a class="next" href="projeto.html?p=${next.slug}">
        <span class="eyebrow">${t().proximo}</span>
        <span class="display">${next.nome} →</span>
      </a>
    </article>`;
  }

  function pageSobre() {
    return `
    <section class="about">
      <figure class="about-photo reveal"><img src="images/cath.jpg" alt="${SITE.nome}"></figure>
      <div class="about-text">
        <h1 class="display reveal">${t().sobreTitulo}</h1>
        ${t().sobreTexto.map((x) => `<p class="reveal">${x}</p>`).join("")}
        <h2 class="eyebrow">${t().servicosTitulo}</h2>
        <ul class="pills">${t().servicos.map((s) => `<li class="pill">${s}</li>`).join("")}</ul>
      </div>
    </section>`;
  }

  /* ---------- comportamentos ---------- */
  function initImages() {
    document.querySelectorAll("#app img").forEach((im) => {
      const ok = () => im.parentElement && im.parentElement.classList.add("is-loaded");
      const fail = () => {
        const f = im.dataset.fallback;
        if (!f) { im.remove(); return; }
        im.removeAttribute("data-fallback");
        im.addEventListener("load", ok, { once: true });
        im.addEventListener("error", fail, { once: true });
        im.src = f;
      };
      if (im.complete) { im.naturalWidth ? ok() : fail(); }
      else { im.addEventListener("load", ok, { once: true }); im.addEventListener("error", fail, { once: true }); }
    });
  }

  function initBanner() {
    const root = document.querySelector(".banner");
    if (!root) return;
    const slides = [...root.querySelectorAll(".slide")];
    const dots = [...root.querySelectorAll("[data-slide]")];
    const cap = root.querySelector(".banner-caption");
    if (slides.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0;

    const go = (n) => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => {
        s.classList.toggle("is-active", i === cur);
        s.setAttribute("aria-hidden", String(i !== cur));
      });
      dots.forEach((d, i) => d.setAttribute("aria-pressed", String(i === cur)));
      const p = PROJETOS.find((x) => x.slug === slides[cur].dataset.slug);
      if (cap && p) { cap.href = `projeto.html?p=${p.slug}`; cap.textContent = `${p.nome} →`; }
    };
    const stop = () => { clearInterval(bannerTimer); bannerTimer = null; };
    const play = () => { stop(); if (!reduce) bannerTimer = setInterval(() => go(cur + 1), 5000); };

    dots.forEach((d) => d.addEventListener("click", () => {
      go(Number(d.dataset.slide));
      if (bannerTimer) play();
    }));
    root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") stop(); });
    root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") play(); });
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget)) play(); });
    play();
  }

  function initFilters() {
    const btns = [...document.querySelectorAll("[data-filter]")];
    if (!btns.length) return;
    const apply = (f) => {
      const valid = btns.some((b) => b.dataset.filter === f) ? f : "todos";
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === valid)));
      document.querySelectorAll("#lista .card").forEach((c) => {
        c.hidden = !(valid === "todos" || c.dataset.cat === valid);
      });
    };
    btns.forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.filter;
      setURL(f === "todos" ? location.pathname + location.search : "#" + f);
      apply(f);
    }));
    apply(location.hash.slice(1) || "todos");
  }

  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  function initLang() {
    document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
      lang = b.dataset.lang;
      store.set(lang);
      const u = new URL(location.href);
      u.searchParams.delete("lang");
      setURL(u.href);
      render();
    }));
  }

  function render() {
    clearInterval(bannerTimer); bannerTimer = null;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    const views = { home: pageHome, projetos:
