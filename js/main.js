// SCORE X LP 共通スクリプト
document.addEventListener('DOMContentLoaded', function () {
  // ===== UTMパラメータの保持と引き継ぎ（Meta広告の判別用） =====
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  var utm = {};
  try { utm = JSON.parse(sessionStorage.getItem('scx_utm') || '{}'); } catch (e) { utm = {}; }
  var params = new URLSearchParams(window.location.search);
  var found = false;
  UTM_KEYS.forEach(function (k) {
    var v = params.get(k);
    if (v) { utm[k] = v; found = true; }
  });
  // 最初に着地したURL（広告からの流入URL）を記録
  if (found || !utm.landing_url) utm.landing_url = window.location.href;
  try { sessionStorage.setItem('scx_utm', JSON.stringify(utm)); } catch (e) {}
  window.SCX_UTM = utm;

  // サイト内リンクにUTMを引き継ぐ（LP → フォーム → サンクス）
  var qs = [];
  UTM_KEYS.forEach(function (k) {
    if (utm[k]) qs.push(k + '=' + encodeURIComponent(utm[k]));
  });
  if (qs.length) {
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      var h = a.getAttribute('href');
      if (!h || /^(https?:|mailto:|tel:|#|javascript:)/i.test(h)) return;
      a.setAttribute('href', h + (h.indexOf('?') >= 0 ? '&' : '?') + qs.join('&'));
    });
  }

  // ハンバーガーメニュー
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      menu.style.display = (menu.style.display === 'none' || !menu.style.display) ? 'block' : 'none';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.style.display = 'none'; });
    });
  }
  // FAQアコーディオン
  document.querySelectorAll('.faq-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var ans = b.parentElement.querySelector('.faq-ans');
      var sym = b.querySelector('.faq-sym');
      var open = ans && ans.style.display !== 'none';
      if (ans) ans.style.display = open ? 'none' : 'flex';
      if (sym) sym.textContent = open ? '＋' : '−';
    });
  });
  // 導入事例動画（サムネイル→クリックで再生）
  document.querySelectorAll('.yt-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var wrap = b.parentElement;
      var f = document.createElement('iframe');
      f.src = b.getAttribute('data-embed');
      f.title = 'YouTube video player';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      wrap.appendChild(f);
      b.remove();
    });
  });

  // 追従CTA：FVを通過してから表示
  var fv = document.getElementById('fv');
  var sticky = document.getElementById('stickyCta');
  if (fv && sticky) {
    var toggle = function (show) {
      sticky.style.opacity = show ? '1' : '0';
      sticky.style.visibility = show ? 'visible' : 'hidden';
      sticky.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { toggle(!e.isIntersecting); });
      }, { threshold: 0 }).observe(fv);
    } else {
      window.addEventListener('scroll', function () {
        toggle(window.scrollY > fv.offsetHeight);
      }, { passive: true });
    }
  }
});
