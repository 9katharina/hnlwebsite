// Shared across all HNL pages: cursor-tracked ambient glow, scroll-reveal, nav shadow.
(function () {
  // Cursor-tracked glow position (falls back to a fixed point on touch devices)
  let raf = null;
  function onMove(e) {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
      raf = null;
    });
  }
  window.addEventListener('mousemove', onMove, { passive: true });

  // Scroll-reveal for any .reveal element
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Nav shadow/blur once scrolled, for pages using .site-nav
    const nav = document.querySelector('.site-nav');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }
  });
})();
