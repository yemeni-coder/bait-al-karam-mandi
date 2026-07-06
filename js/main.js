// ============================================================
// Bait Al Karam — Main interactivity
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Crash-proof storage ----------
     In some viewers (sandboxed previews, certain in-app browsers),
     touching localStorage THROWS an error. If that happens unguarded,
     the whole script dies before it can build the menu — the page
     shows only static HTML: empty cards, no captions, no pictures.
     These wrappers make storage failure harmless. */
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ---------- Language toggle ---------- */
  const langToggle = document.getElementById("langToggle");
  const html = document.documentElement;
  const body = document.body;

  function setLang(lang) {
    if (lang === "en") {
      html.setAttribute("lang", "en");
      html.setAttribute("dir", "ltr");
      html.setAttribute("data-lang", "en");
      body.classList.remove("lang-ar");
      body.classList.add("lang-en");
    } else {
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
      html.setAttribute("data-lang", "ar");
      body.classList.remove("lang-en");
      body.classList.add("lang-ar");
    }
    safeSet("baitalkaram_lang", lang);
    if (typeof syncTopbarOffset === "function") syncTopbarOffset();
    if (typeof setupTaglineTicker === "function") setupTaglineTicker();
  }

  const savedLang = safeGet("baitalkaram_lang");
  try { if (savedLang) setLang(savedLang); } catch (e) { console.error("lang init:", e); }

  langToggle.addEventListener("click", () => {
    const current = body.classList.contains("lang-ar") ? "ar" : "en";
    setLang(current === "ar" ? "en" : "ar");
  });

  /* ---------- Tagline ticker (seamless infinite loop) ----------
     Clone the authored phrase set until the track is comfortably
     wider than the viewport, keeping an EVEN number of copies so a
     -50% shift lines the pattern up with itself. Duration is set from
     the measured width to keep a constant scroll speed. */
  function setupTaglineTicker() {
    const track = document.getElementById("taglineTrack");
    if (!track) return;
    if (!track.dataset.originalHtml) track.dataset.originalHtml = track.innerHTML;
    track.style.animation = "none";
    track.innerHTML = track.dataset.originalHtml;

    const oneSet = track.scrollWidth;
    if (oneSet === 0) return;
    let copies = Math.ceil((window.innerWidth * 2) / oneSet);
    if (copies < 2) copies = 2;
    if (copies % 2 !== 0) copies += 1;
    for (let i = 1; i < copies; i++) {
      track.insertAdjacentHTML("beforeend", track.dataset.originalHtml);
    }
    const total = oneSet * copies;
    const PX_PER_SEC = 55;
    track.style.setProperty("--tagline-duration", (total / 2 / PX_PER_SEC) + "s");
    void track.offsetWidth;
    track.style.animation = "";
  }
  setupTaglineTicker();
  let taglineResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(taglineResizeTimer);
    taglineResizeTimer = setTimeout(() => { try { setupTaglineTicker(); } catch (e) {} }, 200);
  });

  /* ---------- Fixed top bar offset ----------
     The top bar (tagline + header) is fixed, so push page content down
     by exactly its height. Recompute on load, resize, and lang change. */
  const topbar = document.getElementById("topbar");
  function syncTopbarOffset() {
    if (!topbar) return;
    const h = topbar.offsetHeight;
    document.body.style.paddingTop = h + "px";
    // keep in-page anchor jumps from hiding under the bar
    document.documentElement.style.scrollPaddingTop = h + 12 + "px";
  }
  syncTopbarOffset();
  window.addEventListener("resize", syncTopbarOffset);
  window.addEventListener("load", syncTopbarOffset);

  /* ---------- Mobile menu (centered floating card) ---------- */
  const burger = document.getElementById("burger");
  const mMenu = document.getElementById("mMenu");
  const mMenuBackdrop = document.getElementById("mMenuBackdrop");
  const mMenuClose = document.getElementById("mMenuClose");

  function openNav() {
    mMenu.classList.add("open");
    mMenuBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    mMenu.classList.remove("open");
    mMenuBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", () => {
    mMenu.classList.contains("open") ? closeNav() : openNav();
  });
  if (mMenuBackdrop) mMenuBackdrop.addEventListener("click", closeNav);
  if (mMenuClose) mMenuClose.addEventListener("click", closeNav);
  if (mMenu) mMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mMenu && mMenu.classList.contains("open")) closeNav();
  });

  /* ============================================================
     Menu — Rising & Falling Columns (responsive, N columns)
     The reel builds N columns (4 desktop / 3 tablet / 2 phone, read from
     the CSS --cols variable). Each column has two stacked slots that
     ping-pong between "front" (visible) and "back" (offscreen). On every
     step, each column loads its next dish into the back slot and animates:
     front slides out, back slides to rest. Odd columns exit downward
     (next enters from above); even columns exit upward (next from below) —
     so neighboring columns move against each other. Stepping advances by
     N dishes so the whole visible set turns over. Clicking a dish opens
     its details. Rebuilds automatically when the column count changes.
  ============================================================ */
  const filterChipsEl = document.getElementById("filterChips");
  const reelEl = document.getElementById("pairReel");
  const pairPrev = document.getElementById("pairPrev");
  const pairNext = document.getElementById("pairNext");

  const AUTO_ADVANCE_MS = 4000;

  let activeCat = "all";
  let items = [];
  let startIndex = 0;     // index of the dish shown in the first column
  let autoTimer = null;
  let cols = [];          // array of { slots:[el,el], front, exit, enterFrom }
  let colCount = 0;

  function currentItems() {
    return activeCat === "all" ? MENU : MENU.filter(m => m.cat === activeCat);
  }

  const mod = (n, m) => ((n % m) + m) % m;

  // How many columns the CSS wants right now (kept in sync with the media
  // queries via the --cols custom property; falls back to a width guess).
  function desiredCols() {
    const v = parseInt(getComputedStyle(reelEl).getPropertyValue("--cols"), 10);
    if (v >= 1) return v;
    const w = window.innerWidth;
    return w <= 640 ? 2 : w <= 1024 ? 3 : 4;
  }

  // Fallback panel if an image URL fails to load — never a blank card.
  function fallbackImg(label) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='700' height='900'>` +
      `<rect width='100%' height='100%' fill='#A6461F'/>` +
      `<text x='50%' y='47%' dominant-baseline='middle' text-anchor='middle' ` +
      `font-family='sans-serif' font-weight='700' font-size='38' fill='#FBF3E4'>${label}</text>` +
      `<text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' ` +
      `font-family='sans-serif' font-size='20' fill='#FBF3E4' opacity='0.8'>(image failed to load)</text></svg>`;
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  function attachFallback(imgEl, label) {
    imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = fallbackImg(label); };
  }

  function setSlotItem(el, item) {
    el.dataset.itemId = item.id;
    const img = el.querySelector("img");
    attachFallback(img, item.en);
    img.src = item.img;
    img.alt = item.en;
    el.querySelector(".pair-caption").innerHTML =
      `<span class="ar">${item.ar}</span><span class="en">${item.en}</span>` +
      `<span class="pair-price">${item.price}</span>`;
  }

  function placeInstant(el, item, yPercent) {
    setSlotItem(el, item);
    el.style.transition = "none";
    el.style.transform = `translateY(${yPercent}%)`;
    void el.offsetWidth;
    el.style.transition = "";
  }

  // (Re)build the DOM columns for the current colCount.
  function buildColumns() {
    colCount = desiredCols();
    reelEl.innerHTML = "";
    cols = [];
    for (let i = 0; i < colCount; i++) {
      const col = document.createElement("div");
      col.className = "pair-col";
      const track = document.createElement("div");
      track.className = "pair-track";
      const slotA = makeSlot();
      const slotB = makeSlot();
      track.appendChild(slotA);
      track.appendChild(slotB);
      col.appendChild(track);
      reelEl.appendChild(col);
      // even index → exit downward/enter above; odd index → the opposite
      const goesDown = (i % 2 === 0);
      cols.push({
        slots: [slotA, slotB],
        front: 0,
        exit: goesDown ? 100 : -100,
        enterFrom: goesDown ? -100 : 100,
      });
    }
  }

  function makeSlot() {
    const b = document.createElement("button");
    b.className = "pair-slot";
    b.innerHTML = `<img src="" alt=""><span class="pair-caption"></span>`;
    b.addEventListener("click", () => {
      const item = MENU.find(m => m.id === b.dataset.itemId);
      if (item) openModal(item);
    });
    return b;
  }

  // Show the current window of dishes with no animation (initial paint / filter change).
  function renderInstant() {
    if (!items.length) return;
    cols.forEach((col, i) => {
      const item = items[mod(startIndex + i, items.length)];
      placeInstant(col.slots[col.front], item, 0);
      placeInstant(col.slots[1 - col.front], item, col.enterFrom);
    });
  }

  function animateColumn(col, newItem) {
    const frontEl = col.slots[col.front];
    const backEl = col.slots[1 - col.front];
    placeInstant(backEl, newItem, col.enterFrom);
    requestAnimationFrame(() => {
      frontEl.style.transform = `translateY(${col.exit}%)`;
      backEl.style.transform = "translateY(0%)";
    });
    col.front = 1 - col.front;
  }

  function step(delta) {
    if (items.length < 2 || !cols.length) return;
    startIndex = mod(startIndex + delta * colCount, items.length);
    cols.forEach((col, i) => {
      const newItem = items[mod(startIndex + i, items.length)];
      animateColumn(col, newItem);
    });
    restartAutoTimer();
  }

  function goNext() { step(1); }
  function goPrev() { step(-1); }

  function restartAutoTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(goNext, AUTO_ADVANCE_MS);
  }
  function pause() { clearInterval(autoTimer); }
  function resume() { restartAutoTimer(); }

  pairPrev.addEventListener("click", goPrev);
  pairNext.addEventListener("click", goNext);

  // Rebuild columns when the responsive count changes on resize/rotate.
  let reelResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(reelResizeTimer);
    reelResizeTimer = setTimeout(() => {
      if (desiredCols() !== colCount) {
        buildColumns();
        renderInstant();
      }
    }, 200);
  });

  function renderChips() {
    const all = document.createElement("button");
    all.className = "chip active";
    all.dataset.cat = "all";
    all.innerHTML = `<span class="ar">الكل</span><span class="en">All</span>`;
    filterChipsEl.appendChild(all);

    CATEGORIES.forEach(cat => {
      const chip = document.createElement("button");
      chip.className = "chip";
      chip.dataset.cat = cat.id;
      chip.innerHTML = `<span class="ar">${cat.ar}</span><span class="en">${cat.en}</span>`;
      filterChipsEl.appendChild(chip);
    });

    filterChipsEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      activeCat = btn.dataset.cat;
      filterChipsEl.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      items = currentItems();
      startIndex = 0;
      renderInstant();
      restartAutoTimer();
    });
  }

  try {
    renderChips();
    items = currentItems();
    buildColumns();
    renderInstant();
    restartAutoTimer();
  } catch (e) { console.error("menu init:", e); }

  /* ---------- Dish detail overlay ---------- */
  const modal = document.getElementById("dishModal");
  const modalClose = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalCat = document.getElementById("modalCat");
  const modalTitleAr = document.getElementById("modalTitleAr");
  const modalTitleEn = document.getElementById("modalTitleEn");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");

  function openModal(item) {
    if (!item) return;
    const catObj = CATEGORIES.find(c => c.id === item.cat);
    attachFallback(modalImg, item.en);
    modalImg.src = item.img;
    modalImg.alt = item.en;
    modalCat.innerHTML = catObj ? `<span class="ar">${catObj.ar}</span><span class="en">${catObj.en}</span>` : "";
    modalTitleAr.textContent = item.ar;
    modalTitleEn.textContent = item.en;
    modalPrice.textContent = item.price;
    modalDesc.innerHTML = `<span class="ar">${item.descAr}</span><span class="en">${item.descEn}</span>`;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    pause();
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    resume();
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  /* ============================================================
     Printed menu — click any page to view it full-size
  ============================================================ */
  (function initMenuPages() {
    const cards = document.querySelectorAll(".menu-page-card");
    const box = document.getElementById("menuLightbox");
    const boxImg = document.getElementById("menuLightboxImg");
    const boxClose = document.getElementById("menuLightboxClose");
    if (!cards.length || !box) return;

    function open(src) {
      boxImg.src = src;
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open");
      document.body.style.overflow = "";
    }
    cards.forEach(card => {
      card.addEventListener("click", () => open(card.dataset.full || card.querySelector("img").src));
    });
    boxClose.addEventListener("click", close);
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && box.classList.contains("open")) close(); });
  })();

  /* ============================================================
     "Take a Look" — two infinite marquees drifting in opposite
     directions: videos on top (one way), photos below (the other way).
     Both pause on hover/touch. Clicking any tile opens it enlarged
     with its short description. Placeholders show until real media
     (VIDEOS[].src / PHOTOS[].src in data.js) is provided.
  ============================================================ */

  // Shared helper: build a seamless two-track marquee from tiles.
  function buildMarquee(rowEl, tiles, direction) {
    if (!rowEl) return;
    const marquee = document.createElement("div");
    marquee.className = "media-marquee";
    marquee.dataset.dir = direction; // "rtl" or "ltr" scroll

    function track() {
      const t = document.createElement("div");
      t.className = "media-track";
      tiles.forEach(makeTileEl => t.appendChild(makeTileEl()));
      return t;
    }
    marquee.appendChild(track());
    marquee.appendChild(track()); // duplicate for seamless loop
    rowEl.appendChild(marquee);

    requestAnimationFrame(() => {
      const one = marquee.querySelector(".media-track");
      const width = one ? one.scrollWidth : 1200;
      const PX_PER_SEC = 42;
      marquee.style.setProperty("--marquee-duration", (width / PX_PER_SEC) + "s");
    });
  }

  /* ---- Videos (top row) ---- */
  (function initVideos() {
    const row = document.getElementById("videoRow");
    if (!row || typeof VIDEOS === "undefined") return;

    const modal = document.getElementById("videoModal");
    const player = document.getElementById("videoModalPlayer");
    const desc = document.getElementById("videoModalDesc");
    const closeBtn = document.getElementById("videoModalClose");

    function open(v) {
      desc.innerHTML = `<span class="ar">${v.ar}</span><span class="en">${v.en}</span>`;
      if (v.src) { player.src = v.src; player.muted = false; player.style.display = ""; player.play().catch(()=>{}); }
      else { player.removeAttribute("src"); player.style.display = "none"; }
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      player.pause(); player.removeAttribute("src"); player.load();
    }
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });

    const tiles = VIDEOS.map((v, i) => () => {
      const tile = document.createElement("button");
      tile.className = "media-tile video-tile";
      if (v.src) {
        tile.innerHTML = `<video src="${v.src}" muted loop playsinline preload="metadata"></video><span class="play-badge">▶</span>`;
        tile.querySelector("video").play().catch(()=>{});
      } else {
        tile.innerHTML = `<div class="media-placeholder video-ph"><span class="vp-icon">🎬</span><span class="vp-label"><span class="ar">فيديو ${i+1}</span><span class="en">Video ${i+1}</span></span></div>`;
      }
      tile.addEventListener("click", () => open(v));
      return tile;
    });
    buildMarquee(row, tiles, "rtl");
  })();

  /* ---- Photos (bottom row, opposite direction) ---- */
  (function initPhotos() {
    const row = document.getElementById("photoRow");
    if (!row || typeof PHOTOS === "undefined") return;

    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("photoModalImg");
    const desc = document.getElementById("photoModalDesc");
    const closeBtn = document.getElementById("photoModalClose");

    function open(ph) {
      desc.innerHTML = `<span class="ar">${ph.ar}</span><span class="en">${ph.en}</span>`;
      modalImg.src = ph.src || "";
      modalImg.alt = ph.en;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) close(); });

    const tiles = PHOTOS.map((ph, i) => () => {
      const tile = document.createElement("button");
      tile.className = "media-tile photo-tile";
      if (ph.src) {
        tile.innerHTML = `<img src="${ph.src}" alt="${ph.en}" loading="lazy"><span class="zoom-badge">⤢</span>`;
        const im = tile.querySelector("img");
        im.onerror = () => { im.onerror = null; im.replaceWith(placeholderNode("📸", "Photo " + (i+1))); };
      } else {
        tile.appendChild(placeholderNode("📸", "Photo " + (i+1)));
      }
      tile.addEventListener("click", () => open(ph));
      return tile;
    });
    buildMarquee(row, tiles, "ltr");

    function placeholderNode(icon, label) {
      const d = document.createElement("div");
      d.className = "media-placeholder photo-ph";
      d.innerHTML = `<span class="vp-icon">${icon}</span><span class="vp-label">${label}</span>`;
      return d;
    }
  })();

});
