(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */
  function both(v) {
    if (v == null) return '';
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string') return v;
    return '<span lang="uk">' + (v.uk || '') + '</span><span lang="en">' + (v.en || v.uk || '') + '</span>';
  }
  function plain(v) { return typeof v === 'string' ? v : (v && v.uk) || ''; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function ytId(u) {
    var m = String(u || '').match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function vimeoId(u) {
    var m = String(u || '').match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  }
  function videoHTML(u, w) {
    var y = ytId(u), v = vimeoId(u);
    if (y) return '<iframe src="https://www.youtube-nocookie.com/embed/' + y + '" title="Video" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    if (v) return '<iframe src="https://player.vimeo.com/video/' + v + '" title="Video" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>';
    var poster = (w && w.poster) ? ' poster="' + esc(w.poster) + '"' : '';
    return '<video controls playsinline preload="metadata"' + poster + ' src="' + esc(u) + '"></video>';
  }

  /* сторінки книги: dir + p-01.webp … (кількість цифр залежить від count) */
  function bookPages(w) {
    var b = w.book, out = [], pad = String(b.count).length, i, n;
    for (i = 1; i <= b.count; i++) {
      n = String(i);
      while (n.length < pad) n = '0' + n;
      out.push(b.dir + 'p-' + n + '.' + (b.ext || 'webp'));
    }
    return out;
  }
  var ARROW_L = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M20 12H4M10 6L4 12L10 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 12H20M14 6L20 12L14 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>';

  function imgList(w) { return Array.isArray(w.img) ? w.img : (w.img ? [w.img] : []); }
  function cover(w) {
    var l = imgList(w);
    if (l.length) return l[0];
    if (w.book && w.book.count) return bookPages(w)[0];
    var y = ytId(w.video);
    return y ? 'https://i.ytimg.com/vi/' + y + '/hqdefault.jpg' : null;
  }
  function imgTag(src, w, lazy, cls) {
    return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + esc(src) + '" alt="' + esc(plain(w.alt || w.title)) + '"' + (lazy ? ' loading="lazy" decoding="async"' : '') + '>';
  }
  /* one picture, or a stack of pictures that crossfade into each other */
  function mediaImgs(w, lazy) {
    var l = imgList(w);
    if (l.length > 1) {
      return '<span class="fade">' + l.map(function (s, i) {
        return imgTag(s, w, lazy, i === 0 ? 'is-active' : '');
      }).join('') + '</span>';
    }
    return imgTag(l[0] || cover(w), w, lazy);
  }

  var fadeTimers = [];
  var hoverResets = [];
  function stopFades() {
    fadeTimers.forEach(function (t) { clearTimeout(t); clearInterval(t); });
    fadeTimers = [];
    hoverResets.forEach(function (r) { r(); });
    hoverResets = [];
  }
  /* project window: images crossfade only while the cursor (or keyboard focus) is on a work */
  function hoverFades(scope) {
    [].forEach.call(scope.querySelectorAll('.work'), function (a) {
      var im = a.querySelectorAll('.fade img'), cur = 0, iv = null;
      if (im.length < 2) return;
      function show(i) {
        im[cur].classList.remove('is-active');
        cur = i;
        im[cur].classList.add('is-active');
      }
      function enter() {
        if (iv) return;
        show((cur + 1) % im.length);
        iv = setInterval(function () { show((cur + 1) % im.length); }, 1400);
      }
      function leave() {
        if (iv) { clearInterval(iv); iv = null; }
        if (cur !== 0) show(0);
      }
      a.addEventListener('mouseenter', enter);
      a.addEventListener('mouseleave', leave);
      a.addEventListener('focus', enter);
      a.addEventListener('blur', leave);
      hoverResets.push(leave);
    });
  }
  function startFades(scope) {
    var gap = reduce ? 7000 : 3600;
    [].forEach.call(scope.querySelectorAll('.fade'), function (f, n) {
      var im = f.querySelectorAll('img'), cur = 0;
      if (im.length < 2) return;
      function step() {
        im[cur].classList.remove('is-active');
        cur = (cur + 1) % im.length;
        im[cur].classList.add('is-active');
      }
      fadeTimers.push(setTimeout(function () {
        step();
        fadeTimers.push(setInterval(step, gap));
      }, 1500 + n * 600));
    });
  }

  /* ---------- categories ---------- */
  var catsEl = document.getElementById('cats'), heroEl = document.getElementById('hero');
  catsEl.innerHTML = CATEGORIES.map(function (c) {
    var list = c.projects.map(function (p, pi) {
      return '<li><a href="#/p/' + c.id + '-' + pi + '"><span>' + both(p.name) +
        (p.isNew ? '<sup class="badge">' + both({ uk: 'Нове', en: 'New' }) + '</sup>' : '') +
        '</span></a></li>';
    }).join('');
    return '<div class="cat" data-cat="' + c.id + '"><div class="cat-clip">' +
      '<button class="cat-head" type="button" aria-expanded="false" aria-controls="body-' + c.id + '">' +
        '<span>' + both(c.title) + '<span class="count">' + c.projects.length + '</span></span>' +
      '</button>' +
      '<div class="cat-body" id="body-' + c.id + '"><div class="cat-body-inner"><ul class="plist">' + list + '</ul></div></div>' +
    '</div></div>';
  }).join('');

  var cats = [].slice.call(catsEl.querySelectorAll('.cat'));

  function setOpen(target) {
    cats.forEach(function (c) {
      var on = c === target;
      c.classList.toggle('is-open', on);
      c.querySelector('.cat-head').setAttribute('aria-expanded', on ? 'true' : 'false');
      c.inert = !!target && !on;
    });
    catsEl.classList.toggle('has-open', !!target);
    heroEl.classList.toggle('is-collapsed', !!target);
    heroEl.inert = !!target;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  cats.forEach(function (c) {
    c.querySelector('.cat-head').addEventListener('click', function () {
      setOpen(c.classList.contains('is-open') ? null : c);
    });
  });

  document.getElementById('home').addEventListener('click', function (e) {
    e.preventDefault();
    if (location.hash) clearHash();
    setOpen(null);
  });

  /* ---------- reel: endless strip ---------- */
  (function () {
    var track = document.getElementById('reel');
    var items = (SITE.reel && SITE.reel.length) ? SITE.reel.slice() : null;
    var base = [], i;
    if (items) {
      while (base.length < 8) base = base.concat(items);
    } else {
      for (i = 1; i <= 7; i++) base.push(null);
    }
    var set = base.map(function (src, k) {
      var inner = src
        ? '<img src="' + esc(src) + '" alt="" loading="lazy" decoding="async">'
        : both({ uk: 'Робота 0' + (k + 1), en: 'Work 0' + (k + 1) });
      return '<figure class="slide"><div class="tile' + (src ? ' has-media' : '') + '">' + inner + '</div></figure>';
    }).join('');
    track.innerHTML = set +
      '<div style="display:contents" aria-hidden="true">' + set + set + '</div>';
    track.style.animationDuration = (base.length * 9 * (reduce ? 3.4 : 1)) + 's';
  })();

  /* ---------- projects and works ---------- */
  var PROJ = {}, WORK = {};
  CATEGORIES.forEach(function (c) {
    c.projects.forEach(function (p, pi) {
      var pid = c.id + '-' + pi;
      var list = (p.works && p.works.length) ? p.works : [{}, {}, {}, {}, {}, {}];
      var works = list.map(function (raw, k) {
        var w = {}, key;
        for (key in raw) if (Object.prototype.hasOwnProperty.call(raw, key)) w[key] = raw[key];
        w.id = pid + '-' + k; w.pid = pid; w.k = k;
        if (!w.title) w.title = { uk: 'Робота 0' + (k + 1), en: 'Work 0' + (k + 1) };
        WORK[w.id] = w;
        return w;
      });
      PROJ[pid] = { id: pid, cat: c, p: p, works: works };
    });
  });

  var bookInst = null;
  function destroyBook() {
    if (bookInst) { bookInst.destroy(); bookInst = null; }
  }

  var modal = document.getElementById('modal'),
      mGrid = document.getElementById('modalGrid'),
      mTitle = document.getElementById('modalTitle'),
      mClose = document.getElementById('modalClose'),
      mainEl = document.querySelector('main'),
      pageEl = document.getElementById('page'),
      topbar = document.getElementById('topbar'),
      modalOpen = false, lastFocus = null;

  function tile(w) {
    var c = cover(w);
    return '<div class="tile' + (c ? ' has-media' : '') + '">' + (c ? mediaImgs(w, true) : both(w.title)) +
      (w.video && !w.book ? '<span class="play" aria-hidden="true"></span>' : '') + '</div>';
  }

  function openModal(pid) {
    var P = PROJ[pid];
    mTitle.innerHTML = both(P.p.name);
    mGrid.innerHTML = P.works.map(function (w) {
      return '<a class="work" href="#/w/' + w.id + '">' + tile(w) + '</a>';
    }).join('');
    stopFades();
    hoverFades(mGrid);
    if (!modalOpen) lastFocus = document.activeElement;
    modalOpen = true;
    modal.inert = false;
    modal.classList.add('is-open');
    mainEl.inert = true; topbar.inert = true;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-body').scrollTop = 0;
    mClose.focus({ preventScroll: true });
  }

  function closeModal() {
    if (!modalOpen) return;
    modalOpen = false;
    stopFades();
    modal.classList.remove('is-open');
    modal.inert = true;
    mainEl.inert = false; topbar.inert = false;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function showHome() {
    stopFades();
    destroyBook();
    pageEl.hidden = true;
    mainEl.hidden = false;
  }

  function showPage(wid) {
    var w = WORK[wid], P = PROJ[w.pid], ws = P.works;
    var prev = ws[(w.k + ws.length - 1) % ws.length], next = ws[(w.k + 1) % ws.length];
    var hasBook = !!(w.book && w.book.count);
    var hasImg = imgList(w).length > 0;
    var real = !!(hasImg || w.video || hasBook);

    stopFades();
    destroyBook();

    var heroHTML;
    if (hasBook) {
      /* книга, що гортається; відео (якщо є) іде нижче, окремим блоком */
      heroHTML = '<div class="book-host" id="bookHost"></div>';
    } else {
      var heroCls = 'tile page-hero' + (w.video ? ' is-media' : (hasImg ? ' is-photo' : ''));
      var heroIn = w.video ? videoHTML(w.video, w)
                 : (hasImg ? mediaImgs(w, false) : both({ uk: 'Головне зображення', en: 'Main image' }));
      heroHTML = '<div class="' + heroCls + '">' + heroIn + '</div>';
    }

    var videoBlock = '';
    if (hasBook && w.video) {
      var vp = String(w.videoRatio || '16/9').split('/');
      var vrn = (+vp[0]) / (+vp[1]) || (16 / 9);
      videoBlock = '<div class="video-block' + (vrn < 1 ? ' is-portrait' : '') + '" style="--vr:' + (w.videoRatio || '16/9') + ';--vrn:' + vrn.toFixed(4) + '">' +
        videoHTML(w.video, w) + '</div>';
    }

    var meta =
      '<h3>' + both({ uk: 'Категорія', en: 'Category' }) + '</h3><p>' + both(P.cat.title) + '</p>' +
      '<h3>' + both({ uk: 'Проєкт', en: 'Project' }) + '</h3><p>' + both(P.p.name) + '</p>';
    if (w.year) meta += '<h3>' + both({ uk: 'Рік', en: 'Year' }) + '</h3><p>' + both(w.year) + '</p>';
    if (w.tools) meta += '<h3>' + both({ uk: 'Інструменти', en: 'Tools' }) + '</h3><p>' + both(w.tools) + '</p>';

    var blocks = [
      ['task', { uk: 'Завдання', en: 'Brief' }, { uk: 'Тут буде короткий опис завдання: для кого проєкт і що потрібно було зробити. Замініть цей текст на свій.', en: 'A short description of the brief goes here: who the project is for and what had to be done. Replace this text with your own.' }],
      ['process', { uk: 'Процес', en: 'Process' }, { uk: 'Тут розкажіть, як проходила робота: ідеї, ескізи, інструменти, труднощі.', en: 'Describe how the work went: ideas, sketches, tools, challenges.' }],
      ['result', { uk: 'Результат', en: 'Result' }, { uk: 'Тут опишіть результат: що вийшло, де це використали і що ви винесли з проєкту.', en: 'Describe the outcome: what came out of it, where it was used, what you took from the project.' }]
    ].map(function (b) {
      var text = w[b[0]];
      if (text == null) { if (real) return ''; text = b[2]; }
      return '<h3>' + both(b[1]) + '</h3><p>' + both(text) + '</p>';
    }).join('');

    var extra = '';
    if (w.images && w.images.length) {
      extra = '<div class="gallery">' + w.images.map(function (it) {
        var o = typeof it === 'string' ? { src: it } : it;
        return '<div' + (o.full ? ' class="full"' : '') + '>' + imgTag(o.src, w, true) + '</div>';
      }).join('') + '</div>';
    } else if (!real) {
      extra = '<div class="page-more"><div class="tile">' + both({ uk: 'Зображення 2', en: 'Image 2' }) +
              '</div><div class="tile">' + both({ uk: 'Зображення 3', en: 'Image 3' }) + '</div></div>';
    }

    var nav = ws.length > 1
      ? '<nav class="page-nav" aria-label="Works">' +
          '<a href="#/w/' + prev.id + '" aria-label="Попередня робота / Previous work">' + ARROW_L + '</a>' +
          '<a href="#/w/' + next.id + '" aria-label="Наступна робота / Next work">' + ARROW_R + '</a>' +
        '</nav>'
      : '';

    pageEl.innerHTML =
      '<a class="back" href="#/p/' + P.id + '">' + both({ uk: '← Назад', en: '← Back' }) + '</a>' +
      '<div class="page-kicker">' + both(P.p.name) + '</div>' +
      '<h2 class="page-title">' + both(w.title) + '</h2>' +
      heroHTML +
      '<div class="page-grid"><div>' + meta + '</div><div>' + blocks + '</div></div>' +
      videoBlock + extra + nav;

    mainEl.hidden = true;
    pageEl.hidden = false;
    if (hasBook && window.FlipBook) {
      bookInst = window.FlipBook(document.getElementById('bookHost'), {
        pages: bookPages(w), ratio: w.book.ratio || 0.7, reduce: reduce
      });
    }
    startFades(pageEl);
    window.scrollTo(0, 0);
  }

  function route() {
    var m = (location.hash || '').match(/^#\/(p|w)\/([\w-]+)$/);
    if (m && m[1] === 'p' && PROJ[m[2]]) { showHome(); openModal(m[2]); }
    else if (m && m[1] === 'w' && WORK[m[2]]) { closeModal(); showPage(m[2]); }
    else { closeModal(); showHome(); }
  }

  function clearHash() {
    try { history.pushState(null, '', location.pathname + location.search); }
    catch (e) { location.hash = ''; }
    route();
  }

  mClose.addEventListener('click', clearHash);
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) clearHash(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalOpen) clearHash(); });
  window.addEventListener('hashchange', route);
  window.addEventListener('popstate', route);
  route();

  /* ---------- theme ---------- */
  document.getElementById('theme').addEventListener('click', function () {
    var t = root.getAttribute('data-theme');
    var dark = t === 'dark' || (t !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-theme', dark ? 'light' : 'dark');
  });

  /* ---------- language ---------- */
  function setLang(l) {
    root.setAttribute('lang', l);
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved === 'en' || saved === 'uk') setLang(saved);

  document.getElementById('langBtn').addEventListener('click', function () {
    setLang(root.getAttribute('lang') === 'uk' ? 'en' : 'uk');
  });
})();
