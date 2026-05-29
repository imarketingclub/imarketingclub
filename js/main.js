document.querySelectorAll('a[rel~="sponsored"]').forEach(a => {
  a.addEventListener('click', () => {
    gtag('event', 'affiliate_click', {
      tool_name: a.dataset.tool || a.textContent.trim(),
      destination: a.href
    });
  });
});
