/* =====================================================================
   book.js — книга, що гортається, без сторонніх бібліотек.

   FlipBook(контейнер, { pages: ['p-01.webp', ...], ratio: 0.7047, reduce: false })
     pages  — адреси картинок сторінок по порядку (1-ша — обкладинка)
     ratio  — ширина / висота однієї сторінки
   Повертає { destroy() }.

   Як це працює
   • Широкий екран: розвороти. Обкладинка стоїть окремо, далі пари 2–3, 4–5 …
     остання сторінка (задня обкладинка) теж окремо.
   • Вузький екран (телефон): по одній сторінці.
   • Гортати можна: кліком по правій / лівій половині книги, перетягуванням
     (мишкою чи пальцем), кнопками під книгою, стрілками ← → на клавіатурі.
   • Картинки підвантажуються лише навколо поточної сторінки.
   ===================================================================== */
(function (global) {
  'use strict';

  var SVG_L = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20 12H4M10 6L4 12L10 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>';
  var SVG_R = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 12H20M14 6L20 12L14 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>';

  function mk(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function FlipBook(host, opts) {
    opts = opts || {};
    var pages = opts.pages || [];
    var N = pages.length;
    var ratio = opts.ratio || 0.7;
    var reduce = !!opts.reduce;
    var NEAR = 4;                       // скільки аркушів навколо поточного тримаємо завантаженими

    var mode = null;                    // 'spread' | 'single'
    var f = 0;                          // скільки аркушів уже перегорнуто
    var maxF = 0;
    var pw = 0, ph = 0;
    var leaves = [];
    var drag = null;
    var destroyed = false;

    /* ---------- каркас ---------- */
    host.innerHTML = '';
    var root = mk('div', 'bk');
    root.tabIndex = 0;
    root.setAttribute('role', 'group');
    root.setAttribute('aria-roledescription', 'book');
    root.setAttribute('aria-label', 'Книга / Book');
    var stage = mk('div', 'bk-stage');
    var book = mk('div', 'bk-book');
    stage.appendChild(book);
    root.appendChild(stage);

    var ui = mk('div', 'bk-ui');
    var btnPrev = mk('button', 'bk-btn');
    btnPrev.type = 'button';
    btnPrev.setAttribute('aria-label', 'Попередня сторінка / Previous page');
    btnPrev.innerHTML = SVG_L;
    var count = mk('span', 'bk-count');
    count.setAttribute('aria-live', 'polite');
    var btnNext = mk('button', 'bk-btn');
    btnNext.type = 'button';
    btnNext.setAttribute('aria-label', 'Наступна сторінка / Next page');
    btnNext.innerHTML = SVG_R;
    ui.appendChild(btnPrev); ui.appendChild(count); ui.appendChild(btnNext);

    host.appendChild(root);
    host.appendChild(ui);
    root.style.setProperty('--bk-t', reduce ? '0.01s' : '0.85s');

    /* ---------- розміри й режим ---------- */
    function measure() {
      var W = host.clientWidth || 600;
      var H = clamp(window.innerHeight * 0.86, 380, 1000);
      var m = (W >= 640 && !opts.single) ? 'spread' : 'single';
      var w1 = m === 'spread' ? Math.min(W / 2, H * ratio) : Math.min(W, H * ratio);
      return { m: m, pw: Math.floor(w1), ph: Math.floor(w1 / ratio) };
    }

    function applySize(s) {
      pw = s.pw; ph = s.ph;
      root.style.setProperty('--pw', pw + 'px');
      root.style.setProperty('--ph', ph + 'px');
    }

    function build(m) {
      mode = m;
      book.innerHTML = '';
      leaves = [];
      root.className = 'bk bk-' + m;
      var L;
      if (m === 'spread') {
        L = Math.ceil(N / 2);
        maxF = (N % 2 === 0) ? L : L - 1;   // непарна кількість: остання сторінка — права в останньому розвороті
      } else {
        L = N;
        maxF = Math.max(0, N - 1);
      }
      var shL = mk('div', 'bk-sh bk-sh-l');
      var shR = mk('div', 'bk-sh bk-sh-r');
      book.appendChild(shL); book.appendChild(shR);
      book._shL = shL; book._shR = shR;

      for (var j = 0; j < L; j++) {
        var lf = mk('div', 'bk-leaf');
        var fr = mk('div', 'bk-face bk-front');
        var fi = mk('img');
        fi.alt = 'Сторінка ' + (m === 'spread' ? 2 * j + 1 : j + 1) + ' / Page';
        fi.draggable = false;
        fi.decoding = 'async';
        fi._src = pages[m === 'spread' ? 2 * j : j];
        fr.appendChild(fi);
        lf.appendChild(fr);

        var bk = mk('div', 'bk-face bk-back');
        if (m === 'spread' && 2 * j + 1 < N) {
          var bi = mk('img');
          bi.alt = 'Сторінка ' + (2 * j + 2) + ' / Page';
          bi.draggable = false;
          bi.decoding = 'async';
          bi._src = pages[2 * j + 1];
          bk.appendChild(bi);
        } else {
          bk.className += ' bk-blank';
        }
        lf.appendChild(bk);
        book.appendChild(lf);
        leaves.push(lf);
      }
    }

    /* ---------- відображення стану ---------- */
    function load(img) {
      if (img && img._src && !img.getAttribute('src')) img.src = img._src;
    }

    function render() {
      var L = leaves.length, j, lf;
      for (j = 0; j < L; j++) {
        lf = leaves[j];
        var flipped = j < f;
        lf.classList.toggle('is-flipped', flipped);
        lf.style.zIndex = flipped ? (j + 1) : (L - j);
        var far = j < f - NEAR || j > f + NEAR;
        lf.classList.toggle('is-far', far);
        if (!far) {
          var imgs = lf.getElementsByTagName('img');
          for (var k = 0; k < imgs.length; k++) load(imgs[k]);
        }
      }
      var hasL = f > 0, hasR = f < L || (mode === 'single' && f <= maxF);
      if (mode === 'spread') hasR = f < L;
      book._shL.style.opacity = (mode === 'spread' && hasL) ? 1 : 0;
      book._shR.style.opacity = hasR ? 1 : 0;

      /* обкладинка / задня сторінка стоять по центру */
      var shift = 0;
      if (mode === 'spread') {
        if (f === 0) shift = -pw / 2;
        else if (f === L) shift = pw / 2;
      }
      book.style.transform = 'translateX(' + shift + 'px)';

      var label;
      if (mode === 'spread') {
        if (f === 0) label = '1';
        else if (f === L) label = String(N);
        else label = (2 * f) + '–' + (2 * f + 1);
      } else {
        label = String(f + 1);
      }
      count.textContent = label + ' / ' + N;
      btnPrev.disabled = f <= 0;
      btnNext.disabled = f >= maxF;
    }

    function go(d) {
      var nf = clamp(f + d, 0, maxF);
      if (nf === f) return;
      f = nf;
      render();
    }

    function setBounds(n) { f = clamp(n, 0, maxF); }

    /* ---------- (пере)збирання при зміні розмірів ---------- */
    function layout() {
      var s = measure();
      applySize(s);
      if (s.m !== mode) {
        /* переносимо поточну сторінку між режимами */
        var page;
        if (mode === 'spread') page = f === 0 ? 0 : 2 * f - 1;
        else if (mode === 'single') page = f;
        else page = 0;
        build(s.m);
        if (s.m === 'spread') f = page === 0 ? 0 : Math.ceil(page / 2);
        else f = page;
        setBounds(f);
      }
      render();
    }

    /* ---------- перетягування ---------- */
    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest && e.target.closest('.bk-ui')) return;
      var r = book.getBoundingClientRect();
      var x = e.clientX - r.left;
      var side = x >= r.width / 2 ? 'r' : 'l';
      var idx = side === 'r' ? f : f - 1;
      var ok = side === 'r' ? f < maxF : f > 0;
      drag = {
        id: e.pointerId, x0: e.clientX, side: side,
        idx: idx, leaf: ok ? leaves[idx] : null,
        moved: false, t: side === 'r' ? 0 : 1
      };
      try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    }

    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x0;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        root.classList.add('is-dragging');
        if (drag.leaf) drag.leaf.style.transition = 'none';
      }
      if (!drag.moved || !drag.leaf) return;
      var span = pw * 0.9;
      var t = drag.side === 'r' ? clamp(-dx / span, 0, 1) : 1 - clamp(dx / span, 0, 1);
      drag.t = t;
      drag.leaf.style.zIndex = 1000;
      drag.leaf.style.transform = 'rotateY(' + (-180 * t) + 'deg)';
    }

    function finishDrag(commit) {
      var d = drag; drag = null;
      root.classList.remove('is-dragging');
      if (d.leaf) {
        d.leaf.style.transition = '';
        void d.leaf.offsetWidth;         // зафіксувати поточний кут, щоб далі була плавна анімація
        d.leaf.style.transform = '';
      }
      if (commit && d.leaf) {
        f = d.side === 'r' ? f + 1 : f - 1;
      }
      render();
    }

    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag;
      try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
      if (!d.moved) {                       // звичайний клік
        drag = null;
        if (d.leaf) go(d.side === 'r' ? 1 : -1);
        return;
      }
      var commit = d.side === 'r' ? d.t > 0.22 : d.t < 0.78;
      finishDrag(commit);
    }

    function onCancel(e) {
      if (!drag || e.pointerId !== drag.id) return;
      finishDrag(false);
    }

    /* ---------- клавіатура ---------- */
    function onKey(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var t = e.target;
      if (t && t.closest && t.closest('input, textarea, select, video, [contenteditable]')) return;
      if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
      else if (e.key === 'Home' && t === root) { setBounds(0); render(); e.preventDefault(); }
      else if (e.key === 'End' && t === root) { setBounds(maxF); render(); e.preventDefault(); }
    }

    var rT = null;
    function onResize() {
      clearTimeout(rT);
      rT = setTimeout(function () { if (!destroyed) layout(); }, 120);
    }

    btnPrev.addEventListener('click', function () { go(-1); });
    btnNext.addEventListener('click', function () { go(1); });
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onCancel);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    layout();

    return {
      destroy: function () {
        destroyed = true;
        clearTimeout(rT);
        document.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        host.innerHTML = '';
      },
      get page() { return mode === 'spread' ? (f === 0 ? 1 : 2 * f) : f + 1; },
      get mode() { return mode; },
      go: go
    };
  }

  global.FlipBook = FlipBook;
})(window);
