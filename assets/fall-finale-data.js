(() => {
  const urls = Array.from({ length: 22 }, (_, i) =>
    `assets/fall-video/part${String(i).padStart(2, '0')}.txt`
  );

  window.FALL_FINALE_BASE64 = '';
  window.FALL_FINALE_READY = Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) throw new Error(`Finale segment failed: ${url}`);
      return (await res.text()).trim();
    })
  ).then((chunks) => {
    window.FALL_FINALE_BASE64 = chunks.join('');
    return window.FALL_FINALE_BASE64;
  });

  document.addEventListener(
    'click',
    function gateFinale(event) {
      const target = event.target;
      const button = target instanceof Element ? target.closest('#openFilm') : null;
      if (!button || window.FALL_FINALE_BASE64) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      const oldText = button.textContent;
      button.disabled = true;
      button.textContent = 'Opening memory…';

      window.FALL_FINALE_READY
        .then(() => {
          button.disabled = false;
          button.textContent = oldText;
          button.click();
        })
        .catch((error) => {
          console.error(error);
          button.disabled = false;
          button.textContent = 'Tap to retry';
        });
    },
    true
  );
})();
