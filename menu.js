// Mobile / tablet menu: a hamburger button in the header opens a full-screen panel
(function () {
  function init() {
    var nav = document.querySelector('nav.primary');
    if (!nav || document.querySelector('.menu-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.parentNode.insertBefore(btn, nav.nextSibling);

    var panel = document.createElement('div');
    panel.className = 'mobile-menu';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Menu');
    panel.hidden = true;
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'mobile-menu-close';
    close.setAttribute('aria-label', 'Close menu');
    close.innerHTML = '<span></span><span></span>';
    panel.appendChild(close);
    var list = document.createElement('nav');
    list.setAttribute('aria-label', 'Mobile');
    var home = document.querySelector('a.logo, header a[href$="index.html"]');
    var homeHref = home ? home.getAttribute('href') : 'index.html';
    if (homeHref === '#') homeHref = 'index.html';
    var h = document.createElement('a'); h.href = homeHref; h.textContent = 'Home'; list.appendChild(h);
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
      var c = a.cloneNode(true);
      c.removeAttribute('style');
      list.appendChild(c);
    });
    panel.appendChild(list);
    document.body.appendChild(panel);

    function set(open) {
      panel.hidden = !open;
      document.documentElement.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) close.focus(); else btn.focus({ preventScroll: true });
    }
    btn.addEventListener('click', function () { set(true); });
    close.addEventListener('click', function () { set(false); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900 && !panel.hidden) set(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
