// SCORE X LP 共通スクリプト
document.addEventListener('DOMContentLoaded', function () {
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
