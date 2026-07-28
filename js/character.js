const selectedId = new URLSearchParams(location.search).get('id');
const person = (window.hpCharacters || []).find(item => item[0] === selectedId) || [
  'unknown', 'Unknown character', 'Unknown actor', 'Wizarding World',
  'This character profile is being prepared.',
  'Return to the directory to explore the complete collection.', '—', '—'
];
const fallback = 'https://image.tmdb.org/t/p/w500/4qCqAdHcNKeAHcK8tJ8wNJZa9cx.jpg';
document.title = `${person[1]} | The Wizarding Archive`;
if (selectedId && person[0] === selectedId) { const canonicalLink = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' })); const canonicalUrl = new URL('ui/character.html', document.baseURI); canonicalUrl.searchParams.set('id', selectedId); canonicalLink.href = canonicalUrl.href; }
const descriptionMeta = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }));
descriptionMeta.content = `${person[1]} character profile: actor, role, Hogwarts house, story importance, and key moments in Harry Potter.`;

function page(image) {
  document.body.innerHTML = `<header class="site-header"><a class="brand" href="index.html"><span class="brand-mark">✦</span><span><small>THE</small> WIZARDING<br>ARCHIVE</span></a><button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span></button><nav class="main-nav"><a href="index.html">Home</a><a href="index.html#films">The Books</a><a href="index.html#horcruxes">Horcruxes</a><a class="active" href="ui/characters.html">Characters</a></nav><a class="nav-cta" href="index.html#about">About the archive <span>↗</span></a></header><main class="character-profile section-shell"><section class="profile-hero"><div class="profile-image"><img src="${image}" alt="${person[1]}" onerror="this.src='${fallback}'"></div><div><p class="eyebrow"><span></span> Character profile</p><h1>${person[1]}</h1><p class="profile-role">${person[3]}</p><p class="profile-summary">${person[4]}</p><div class="profile-facts"><div class="profile-fact"><span>Portrayed by</span><strong>${person[2]}</strong></div><div class="profile-fact"><span>House / affiliation</span><strong>${person[6]}</strong></div><div class="profile-fact"><span>Key role</span><strong>${person[7]}</strong></div></div></div></section><section class="profile-story"><h2>Role in the story</h2><p>${person[5]}</p></section><a class="back-directory" href="ui/characters.html">← Back to all characters</a></main><footer class="site-footer section-shell"><span>✦ The Wizarding Archive</span><span>Made for the magic we carry with us.</span><span>© 2026 · Unofficial fan project</span></footer>`;
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
  const closeMenuFromOutside = event => {
    if (!nav.classList.contains('open')) return;
    const target = event.target;
    if (toggle.contains(target) || target.closest('.main-nav')) return;
    closeMenu();
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('pointerdown', closeMenuFromOutside, true);
  document.addEventListener('click', closeMenuFromOutside, true);
  document.addEventListener('touchstart', closeMenuFromOutside, true);
  window.addEventListener('scroll', closeMenu, { passive: true });
}

// Render the profile immediately. The public character API only upgrades the image later,
// so a slow image service can never leave this route blank.
page(fallback);
fetch('https://hp-api.onrender.com/api/characters')
  .then(response => response.json())
  .then(data => {
    const record = data.find(item => item.name === person[1]);
    if (record && record.image) document.querySelector('.profile-image img').src = record.image;
  })
  .catch(() => {});
