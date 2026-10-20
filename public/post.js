// Language switch (#kr-content / #en-content), sticky TOC, code copy buttons, reading time.
// Without JavaScript both languages stay visible and the in-page anchor bar is shown.
(function () {
  var d = document;
  var kr = d.getElementById('kr-content');
  var en = d.getElementById('en-content');
  if (!kr || !en) return;
  var sw = d.getElementById('lang-switch');
  var h1 = d.getElementById('post-title');
  var toc = d.getElementById('sticky-toc');
  var rt = d.getElementById('reading-time');
  var KEY = 'lang';

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function buildToc(root) {
    toc.textContent = '';
    var hs = root.querySelectorAll('h2[id]');
    hs.forEach(function (h) {
      var a = d.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      toc.appendChild(a);
    });
    toc.hidden = !hs.length;
  }

  function readingTime(root, lang) {
    var t = root.textContent || '';
    var min = lang === 'en'
      ? Math.ceil(t.trim().split(/\s+/).length / 200)
      : Math.ceil(t.replace(/\s+/g, '').length / 500);
    rt.textContent = lang === 'en' ? min + ' min read' : '읽는 시간 약 ' + min + '분';
  }

  function apply(lang) {
    var isEn = lang === 'en';
    kr.hidden = isEn;
    en.hidden = !isEn;
    d.documentElement.lang = isEn ? 'en' : 'ko';
    var title = isEn ? h1.dataset.en : h1.dataset.ko;
    h1.textContent = title;
    d.title = d.title.replace(/^[^|]*/, title + ' ');
    sw.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    var root = isEn ? en : kr;
    buildToc(root);
    readingTime(root, lang);
    set(lang);
  }

  sw.hidden = false;
  sw.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-lang]');
    if (b) apply(b.dataset.lang);
  });

  var start = get();
  if (location.hash.indexOf('#en-') === 0) start = 'en';
  else if (location.hash.indexOf('#kr-') === 0) start = 'ko';
  else if (!start) start = (navigator.language || '').indexOf('en') === 0 ? 'en' : 'ko';
  apply(start);

  // code copy buttons
  d.querySelectorAll('.post-body pre').forEach(function (pre) {
    var btn = d.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code') || pre;
      var done = function (ok) {
        btn.textContent = ok ? 'Copied' : 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code.textContent).then(function () { done(true); }, function () { done(false); });
      } else done(false);
    });
    pre.appendChild(btn);
  });

  // highlight the current section in the sticky TOC
  window.addEventListener('scroll', function () {
    var cur = null;
    (en.hidden ? kr : en).querySelectorAll('h2[id]').forEach(function (h) {
      if (h.getBoundingClientRect().top < 120) cur = h.id;
    });
    toc.querySelectorAll('a').forEach(function (a) { a.classList.toggle('on', a.hash === '#' + cur); });
  }, { passive: true });
})();
