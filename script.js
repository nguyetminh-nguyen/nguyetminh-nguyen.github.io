/* =============================================================
   SCRIPT.JS - builds every page from data.js
   You normally do not need to edit this file.
   ============================================================= */

(function () {
  "use strict";

  const D = window.siteData || (typeof siteData !== "undefined" ? siteData : null);
  if (!D) {
    document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">data.js could not be loaded.</p>';
    return;
  }

  /* ---------- helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const on = (key) => D.sections && D.sections[key] && D.sections[key].enabled;
  const label = (key, fallback) =>
    (D.sections && D.sections[key] && D.sections[key].label) || fallback;
  const has = (arr) => Array.isArray(arr) && arr.length > 0;
  const ARROW = '<span class="arrow" aria-hidden="true">&rarr;</span>';

  /* ---------- header + hero ---------- */
  function renderChrome() {
    const p = D.profile || {};
    document.title = p.name ? p.name + " - " + (p.role || "Portfolio") : "Portfolio";

    $("#brandMark").textContent = p.initials || (p.name || "").slice(0, 2).toUpperCase();
    $("#brandName").textContent = p.name || "";
    $("#brandRole").textContent = p.role || "";

    // nav
    const order = ["about", "projects", "skills", "experience", "research", "writing", "contact"];
    $("#nav").innerHTML = order
      .filter(on)
      .map((k) => `<a href="#${k}" data-nav="${k}">${esc(label(k, k))}</a>`)
      .join("");

    // hero
    $("#heroRole").textContent = p.role || "";
    $("#heroName").textContent = p.name || "";
    // A blank headline or intro in data.js removes the line completely,
    // rather than leaving an empty gap under the name.
    const headline = $("#heroHeadline");
    headline.textContent = p.headline || "";
    headline.style.display = p.headline ? "" : "none";

    const intro = $("#heroIntro");
    intro.textContent = p.intro || "";
    intro.style.display = p.intro ? "" : "none";

    // Email and phone live in the Contact section, so the hero does not
    // repeat them. Location shows only if profile.location is filled in.
    const meta = [];
    if (p.location) meta.push(`<li><span class="dot"></span>${esc(p.location)}</li>`);
    if (p.phone) meta.push(`<li><span class="dot"></span>${esc(p.phone)}</li>`);
    $("#heroMeta").innerHTML = meta.join("");

    // The portrait tile and the availability badge were removed from the hero
    // in index.html. These guards let the code run with or without them, so
    // putting the markup back is enough to switch them on again.
    const portrait = $("#portrait");
    if (portrait) {
      if (p.photo) {
        portrait.style.backgroundImage = `url("${p.photo}")`;
        portrait.textContent = "";
      } else {
        portrait.textContent = p.initials || (p.name || "").slice(0, 2).toUpperCase();
      }
    }

    const badge = $("#availability");
    if (badge) {
      if (p.availability) badge.textContent = p.availability;
      else badge.style.display = "none";
    }

    // CV buttons
    [["#headerCv", "Download CV"], ["#heroCv", "Download CV"]].forEach(([sel]) => {
      const el = $(sel);
      if (p.cvFile) el.setAttribute("href", p.cvFile);
      else el.remove();
    });

    // footer
    $("#footerNote").textContent =
      (D.footer && D.footer.note ? D.footer.note + " " : "") + "© " + new Date().getFullYear();
    $("#footerLinks").innerHTML = (D.socials || [])
      .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`)
      .join("");
  }

  /* ---------- sections ---------- */
  function sectionShell(key, opts) {
    const alt = opts.alt ? " alt" : "";
    return `
      <section class="section${alt}" id="${key}">
        <div class="container">
          <div class="section-head reveal">
            <p class="section-label">${esc(opts.eyebrow || label(key, key))}</p>
            <h2 class="section-title">${esc(opts.title)}</h2>
            ${opts.intro ? `<p class="section-intro">${esc(opts.intro)}</p>` : ""}
          </div>
          ${opts.body}
        </div>
      </section>`;
  }

  function aboutSection() {
    const a = D.about || {};
    const stats = has(a.highlights)
      ? `<div class="stat-list reveal">${a.highlights
          .map((h) => `<div class="stat"><div class="stat-value">${esc(h.value)}</div><div class="stat-label">${esc(h.label)}</div></div>`)
          .join("")}</div>`
      : "";
    const body = `
      <div class="about-grid">
        <div class="about-text reveal">${(a.paragraphs || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        ${stats}
      </div>`;
    return sectionShell("about", { title: a.heading || "About", eyebrow: label("about", "About"), body });
  }

  // True when the project has a live embed URL (Power BI / Excel online / etc.)
  const isLive = (pr) => !!(pr && pr.detail && pr.detail.embed && pr.detail.embed.url);

  function projectCard(pr) {
    // The cover is shown as a clean preview: no dark overlay, anchored to the
    // top of the image so the header row of a dashboard stays readable.
    // The gradient sits behind the image, so a cover that is missing (or not
    // added yet) still shows a coloured panel instead of a white box.
    const cover = pr.cover
      ? ` style="background-image:url('${esc(pr.cover)}'),linear-gradient(135deg,var(--navy-800),var(--accent))"`
      : "";
    const flags = [
      isLive(pr) ? `<span class="flag flag-live">Live</span>` : "",
      pr.featured ? `<span class="flag">Featured</span>` : "",
    ].join("");

    // Category first, then the project's own tags - the chip row sits above
    // the title, the way the reference layout does it.
    const chips = []
      .concat(pr.category ? [`<li class="tag tag-lead">${esc(pr.category)}</li>`] : [])
      .concat((pr.tags || []).slice(0, 3).map((t) => `<li class="tag">${esc(t)}</li>`));
    const tags = chips.length ? `<ul class="tag-row">${chips.join("")}</ul>` : "";

    const cta = isLive(pr) ? "View live dashboard" : "View project";

    return `
      <a class="card reveal" href="#/project/${esc(pr.id)}" data-category="${esc(pr.category || "")}"${
        pr.hideFromAll ? ` data-hide-from-all="1" style="display:none"` : ""
      }>
        <div class="card-cover${pr.cover ? "" : " is-blank"}"${cover}>
          ${flags ? `<div class="cover-flags">${flags}</div>` : ""}
        </div>
        <div class="card-body">
          ${tags}
          <h3 class="card-title">${esc(pr.title)}</h3>
          <p class="card-summary">${esc(pr.summary)}</p>
          <span class="card-more">${cta} ${ARROW}</span>
        </div>
      </a>`;
  }

  function projectsSection() {
    const list = D.projects || [];
    if (!list.length) {
      return sectionShell("projects", {
        title: "Projects",
        body: `<p class="empty">No projects yet - add one in data.js.</p>`,
      });
    }
    // Filter buttons. The list comes from sections.projects.filters in data.js;
    // if it isn't set, the categories actually used by your projects are used.
    const cfg = D.sections.projects || {};
    const used = list.map((p) => p.category).filter((c, i, arr) => c && arr.indexOf(c) === i);
    let cats = Array.isArray(cfg.filters) && cfg.filters.length ? cfg.filters.slice() : ["All"].concat(used);
    if (cats[0] !== "All") cats.unshift("All");
    if (cfg.hideEmptyFilters) cats = cats.filter((c) => c === "All" || used.includes(c));

    // A project with hideFromAll: true in data.js stays out of the All tab and
    // out of its count; it appears only under its own category button.
    const counts = {};
    cats.forEach(
      (c) =>
        (counts[c] =
          c === "All"
            ? list.filter((p) => !p.hideFromAll).length
            : list.filter((p) => p.category === c).length)
    );

    const filters =
      cats.length > 2
        ? `<div class="filters reveal">${cats
            .map(
              (c, i) =>
                `<button class="filter${i === 0 ? " active" : ""}" data-filter="${esc(c)}">${esc(c)}<span class="filter-count">${counts[c]}</span></button>`
            )
            .join("")}</div>`
        : "";

    const body = `${filters}
      <div class="project-grid" id="projectGrid">${list.map(projectCard).join("")}</div>
      <p class="empty" id="projectEmpty" hidden>${esc(cfg.emptyText || "Nothing here yet - this section is still being written up.")}</p>`;
    return sectionShell("projects", {
      title: label("projects", "Projects"),
      intro: (D.sections.projects && D.sections.projects.intro) || "",
      body,
      alt: true,
    });
  }

  function skillsSection() {
    const s = D.skills || {};
    const body = `<div class="skills-grid">${(s.groups || [])
      .map(
        (g) => `<div class="skill-group reveal"><h3>${esc(g.name)}</h3>
          <ul class="skill-items">${(g.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`
      )
      .join("")}</div>`;
    return sectionShell("skills", { title: s.heading || "Skills", eyebrow: label("skills", "Skills"), body });
  }

  function experienceSection() {
    const e = D.experience || {};
    const body = `<div class="timeline">${(e.items || [])
      .map(
        (it) => `<div class="tl-item ${esc(it.type || "work")} reveal">
          <div class="tl-head">
            <span class="tl-role">${esc(it.role)}</span>
            <span class="tl-period">${esc(it.period || "")}</span>
          </div>
          <div class="tl-org">${esc(it.org)}${it.location ? " · " + esc(it.location) : ""}</div>
          <ul class="tl-points">${(it.points || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>`
      )
      .join("")}</div>`;
    return sectionShell("experience", {
      title: e.heading || "Experience",
      eyebrow: label("experience", "Experience"),
      body,
      alt: true,
    });
  }

  function researchSection() {
    const r = D.research || {};
    const body = `<div class="entry-list">${(r.items || [])
      .map(
        (it) => `<article class="entry reveal">
          <h3>${esc(it.title)}</h3>
          ${it.status ? `<div class="meta">${esc(it.status)}</div>` : ""}
          <p>${esc(it.abstract)}</p>
          ${
            has(it.links)
              ? `<div class="entry-links">${it.links
                  .map((l) => `<a href="${esc(l.url)}">${esc(l.label)} ${ARROW}</a>`)
                  .join("")}</div>`
              : ""
          }
        </article>`
      )
      .join("")}</div>`;
    return sectionShell("research", {
      title: r.heading || "Research",
      eyebrow: label("research", "Research"),
      intro: r.intro,
      body,
    });
  }

  function writingSection() {
    const w = D.writing || {};
    const body = `<div class="entry-list">${(w.items || [])
      .map(
        (it) => `<article class="entry reveal">
          <h3>${esc(it.title)}</h3>
          ${it.date ? `<div class="meta">${esc(it.date)}</div>` : ""}
          <p>${esc(it.excerpt)}</p>
          ${it.url ? `<div class="entry-links"><a href="${esc(it.url)}">Read ${ARROW}</a></div>` : ""}
        </article>`
      )
      .join("")}</div>`;
    return sectionShell("writing", {
      title: w.heading || "Writing",
      eyebrow: label("writing", "Writing"),
      intro: w.intro,
      body,
      alt: true,
    });
  }

  function contactSection() {
    const c = D.contact || {};
    const p = D.profile || {};
    const links = (D.socials || [])
      .filter((s) => !/^mailto:/i.test(s.url))
      .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`)
      .join("");
    return `
      <section class="section" id="contact">
        <div class="container">
          <div class="contact-card reveal">
            <div>
              <h2>${esc(c.heading || "Get in touch")}</h2>
              <p>${esc(c.text || "")}</p>
              <div class="contact-meta">
                ${p.email ? `<span><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></span>` : ""}
                ${p.location ? `<span>${esc(p.location)}</span>` : ""}
                ${links}
              </div>
            </div>
            <div class="contact-actions">
              ${p.email ? `<a class="btn btn-primary" href="mailto:${esc(p.email)}">${esc(c.ctaLabel || "Send an email")}</a>` : ""}
              ${p.cvFile ? `<a class="btn btn-ghost" href="${esc(p.cvFile)}" download>Download CV</a>` : ""}
            </div>
          </div>
        </div>
      </section>`;
  }

  function renderSections() {
    const html = [];
    if (on("about")) html.push(aboutSection());
    if (on("projects")) html.push(projectsSection());
    if (on("skills")) html.push(skillsSection());
    if (on("experience")) html.push(experienceSection());
    if (on("research")) html.push(researchSection());
    if (on("writing")) html.push(writingSection());
    if (on("contact")) html.push(contactSection());
    $("#sections").innerHTML = html.join("");
    bindFilters();
  }

  /* ---------- project filters ---------- */
  function bindFilters() {
    const wrap = $("#projects");
    if (!wrap) return;
    const buttons = wrap.querySelectorAll(".filter");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        let visible = 0;
        wrap.querySelectorAll(".card").forEach((card) => {
          const show =
            f === "All" ? card.dataset.hideFromAll !== "1" : card.dataset.category === f;
          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
        const grid = wrap.querySelector("#projectGrid");
        const empty = wrap.querySelector("#projectEmpty");
        if (grid) grid.style.display = visible ? "" : "none";
        if (empty) empty.hidden = visible > 0;
      });
    });
  }

  /* ---------- live dashboard band (detail.embed in data.js) ----------
     detail.embed = {
       url:      "https://app.powerbi.com/view?r=...",   // Publish-to-web link
       pageName: "ReportSection...",                      // optional, see below
       heading:  "Dashboard preview",                     // optional
       note:     "Use the arrows below to change page.",  // optional
       ratio:    "16 / 9",                                // optional
       fallbackNote: "..."                                // optional
     }
     pageName forces which page the report opens on. Without it, Power BI
     opens whichever page was active when the report was last saved - which
     is often the last page you happened to be editing.
     If no url is set, the cover image is shown as a large static preview so
     the page still looks finished while you wait for the embed link. */
  function embedUrl(e) {
    if (!e.url) return "";
    if (!e.pageName) return e.url;
    return e.url + (e.url.indexOf("?") >= 0 ? "&" : "?") + "pageName=" + encodeURIComponent(e.pageName);
  }

  /* Builds one live-report band. Used by previewBand for detail.embed, and by
     extraBand for detail.extraEmbed - the second report shown on a project
     page when another project's dashboard is built on the same work. */
  function embedBand(e, pr) {
    const ratio = e.ratio || "16 / 9";
    // Numeric form of the same ratio, so the CSS can cap the frame by the
    // height of the viewport and still keep its shape.
    const parts = String(ratio).split("/");
    const ar =
      parts.length === 2 && parseFloat(parts[1]) ? parseFloat(parts[0]) / parseFloat(parts[1]) : 16 / 9;
    const src = embedUrl(e);
    return `
      <section class="preview-band">
        <div class="container">
          <div class="preview-head">
            <div>
              <h2 class="preview-title">${esc(e.heading || "Dashboard preview")}</h2>
              ${e.note ? `<p class="preview-note">${esc(e.note)}</p>` : ""}
            </div>
            <a class="btn btn-ghost btn-sm preview-open" href="${esc(src)}" target="_blank" rel="noopener">
              Open full screen <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
        <div class="container container-wide">
          <div class="embed-frame" style="--embed-ratio:${esc(ratio)};--embed-ar:${ar.toFixed(4)}">
            <iframe
              src="${esc(src)}"
              title="${esc(e.title || pr.title)}"
              frameborder="0"
              allowfullscreen="true"
              loading="lazy"></iframe>
          </div>
        </div>
      </section>`;
  }

  /* A second live report on the same project page. Fill detail.extraEmbed in
     data.js with the same fields as detail.embed to switch it on. */
  function extraBand(pr) {
    const e = (pr.detail && pr.detail.extraEmbed) || {};
    return e.url ? embedBand(e, pr) : "";
  }

  function previewBand(pr) {
    const e = (pr.detail && pr.detail.embed) || {};
    const heading = e.heading || "Dashboard preview";

    if (e.url) return embedBand(e, pr);

    if (!pr.cover) return "";
    return `
      <section class="preview-band">
        <div class="container">
          <div class="preview-head">
            <div>
              <h2 class="preview-title">${esc(heading)}</h2>
              <p class="preview-note">${esc(
                e.fallbackNote || "Static preview - download the file below to open the working version."
              )}</p>
            </div>
          </div>
        </div>
        <div class="container container-wide">
          <div class="preview-static"><img src="${esc(pr.cover)}" alt="${esc(pr.title)}" loading="lazy" /></div>
        </div>
      </section>`;
  }

  /* ---------- project detail page ---------- */
  function renderProject(id) {
    const list = D.projects || [];
    const idx = list.findIndex((p) => p.id === id);
    const pr = list[idx];
    const view = $("#projectView");

    if (!pr) {
      view.innerHTML = `<section class="section"><div class="container">
        <a class="back-link" href="#projects">&larr; Back to projects</a>
        <h1 class="detail-title">Project not found</h1></div></section>`;
      return;
    }

    const d = pr.detail || {};
    const prev = list[idx - 1];
    const next = list[idx + 1];

    const blocks = [];
    if (d.context) blocks.push(`<div class="detail-block"><h2>What is this project about?</h2><p>${esc(d.context)}</p></div>`);
    if (has(d.results))
      blocks.push(
        `<div class="detail-block"><h2>Key findings</h2><ul class="check-list">${d.results
          .map((s) => `<li>${esc(s)}</li>`)
          .join("")}</ul></div>`
      );

    // Optional screenshots: detail.images = [{ src: "assets/shot.png", caption: "..." }]
    if (has(d.images))
      blocks.push(
        `<div class="detail-block"><h2>Screens</h2><div class="shot-list">${d.images
          .map(
            (im) =>
              `<figure class="shot"><img src="${esc(im.src)}" alt="${esc(im.caption || pr.title)}" loading="lazy" />${
                im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ""
              }</figure>`
          )
          .join("")}</div></div>`
      );

    // Sidebar. "My role", "Tools" and "At a glance" were removed on purpose -
    // the role sits in the write-up, the tools are already in the chips on the
    // card, and category / period are shown as pills at the top of this page.
    const side = [];
    if (has(pr.tags))
      side.push(`<div class="side-card"><h3>Focus areas</h3><ul>${pr.tags.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`);

    view.innerHTML = `
      <section class="detail-hero">
        <div class="container">
          <a class="back-link" href="#projects">&larr; All projects</a>
          <div class="detail-meta">
            ${pr.category ? `<span class="pill">${esc(pr.category)}</span>` : ""}
            ${pr.period ? `<span class="pill">${esc(pr.period)}</span>` : ""}
          </div>
          <h1 class="detail-title">${esc(pr.title)}</h1>
          ${
            has(pr.links)
              ? `<div class="detail-links">${pr.links
                  .map(
                    (l, i) =>
                      `<a class="btn ${i === 0 ? "btn-primary" : "btn-ghost"}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`
                  )
                  .join("")}</div>`
              : ""
          }
        </div>
      </section>

      ${previewBand(pr)}
      ${extraBand(pr)}

      <section class="detail-body">
        <div class="container">
          <div class="detail-layout${side.length ? "" : " no-side"}">
            <div>${blocks.join("") || '<p class="empty">Case study details coming soon.</p>'}</div>
            ${side.length ? `<aside class="detail-side">${side.join("")}</aside>` : ""}
          </div>
          <nav class="detail-nav">
            <span>${prev ? `<a href="#/project/${esc(prev.id)}">&larr; ${esc(prev.title)}</a>` : ""}</span>
            <span>${next ? `<a href="#/project/${esc(next.id)}">${esc(next.title)} &rarr;</a>` : ""}</span>
          </nav>
        </div>
      </section>`;
  }

  /* ---------- routing ---------- */
  function route() {
    const hash = window.location.hash || "";
    const match = hash.match(/^#\/project\/(.+)$/);
    const home = $("#homeView");
    const view = $("#projectView");

    if (match) {
      renderProject(decodeURIComponent(match[1]));
      home.hidden = true;
      view.hidden = false;
      window.scrollTo(0, 0);
    } else {
      view.hidden = true;
      home.hidden = false;
      if (hash && hash.length > 1) {
        const target = document.getElementById(hash.slice(1));
        if (target && typeof target.scrollIntoView === "function") {
          // let layout settle before scrolling
          requestAnimationFrame(() => target.scrollIntoView({ behavior: "auto", block: "start" }));
        }
      }
    }
    closeNav();
    observeReveal();
  }

  /* ---------- mobile nav ---------- */
  const navEl = () => $("#nav");
  const toggleEl = () => $("#navToggle");
  function closeNav() {
    navEl().classList.remove("open");
    toggleEl().setAttribute("aria-expanded", "false");
  }
  function bindNav() {
    toggleEl().addEventListener("click", () => {
      const open = navEl().classList.toggle("open");
      toggleEl().setAttribute("aria-expanded", open ? "true" : "false");
    });
    navEl().addEventListener("click", (e) => {
      if (e.target.tagName === "A") closeNav();
    });
  }

  /* ---------- scroll spy ---------- */
  function bindSpy() {
    const links = Array.from(document.querySelectorAll("[data-nav]"));
    if (!links.length) return;
    const sections = links
      .map((l) => document.getElementById(l.dataset.nav))
      .filter(Boolean);
    const spy = () => {
      if (!$("#projectView").hidden) return;
      const y = window.scrollY + 140;
      let current = null;
      sections.forEach((s) => {
        if (s.offsetTop <= y) current = s.id;
      });
      links.forEach((l) => l.classList.toggle("active", l.dataset.nav === current));
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- reveal on scroll ---------- */
  let io;
  function observeReveal() {
    const items = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
    }
    items.forEach((el) => io.observe(el));
  }

  /* ---------- init ---------- */
  renderChrome();
  renderSections();
  bindNav();
  bindSpy();
  window.addEventListener("hashchange", route);
  route();
})();
