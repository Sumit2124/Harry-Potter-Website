(function () {
  const catalog = window.archiveSearchData || {};
  const searchInput = document.querySelector('[data-archive-search]');
  const resultGrid = document.querySelector('[data-search-results]');
  const resultCount = document.querySelector('[data-search-count]');
  const categoryButtons = document.querySelectorAll('[data-search-category]');
  const emptyState = document.querySelector('[data-search-empty]');
  const audioToggle = document.querySelector('[data-audio-toggle]');
  const audioRange = document.querySelector('[data-audio-range]');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  let activeCategory = 'all';
  let audioContext = null;
  let audioMaster = null;
  let audioEnabled = localStorage.getItem('wizardingArchiveAudio') === 'on';

  const collections = [
    { type: 'Character', label: 'characters', data: catalog.characters || [] },
    { type: 'Spell', label: 'spells', data: catalog.spells || [] },
    { type: 'Book', label: 'books', data: catalog.books || [] },
    { type: 'Horcrux', label: 'horcruxes', data: catalog.horcruxes || [] },
    { type: 'Location', label: 'locations', data: catalog.locations || [] },
    { type: 'Creature', label: 'creatures', data: catalog.creatures || [] }
  ];

  const syncAudioUi = () => {
    if (audioToggle) {
      audioToggle.textContent = audioEnabled ? 'Sound on' : 'Sound off';
      audioToggle.setAttribute('aria-pressed', String(audioEnabled));
    }
    if (audioRange) {
      audioRange.value = String(Math.round((Number(localStorage.getItem('wizardingArchiveAudioVolume') || 0.35) * 100)));
    }
  };

  const ensureAudio = async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!audioContext) {
      audioContext = new AudioContext();
      audioMaster = audioContext.createGain();
      audioMaster.gain.value = Number(localStorage.getItem('wizardingArchiveAudioVolume') || 0.35);
      audioMaster.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    return audioContext;
  };

  const maybePlayHum = async () => {
    if (!audioEnabled) return;
    const ctx = await ensureAudio();
    if (!ctx || !audioMaster || audioMaster.__playing) return;
    audioMaster.__playing = true;
    const notes = [110, 164, 220];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.028 : 0.014;
      oscillator.connect(gain).connect(audioMaster);
      oscillator.start();
      window.setTimeout(() => {
        try { oscillator.stop(); } catch (_) {}
      }, 1800 + index * 220);
    });
    window.setTimeout(() => { audioMaster.__playing = false; }, 1900);
  };

  const render = () => {
    if (!resultGrid) return;
    const query = (searchInput?.value || '').trim().toLowerCase();
    const cards = [];
    collections.forEach((collection) => {
      if (activeCategory !== 'all' && activeCategory !== collection.label) return;
      collection.data.forEach((item) => {
        const haystack = item.slice(1, item.length - 1).join(' ').toLowerCase();
        if (query && !haystack.includes(query)) return;
        let copyIndex = 2;
        if (collection.label === 'characters') copyIndex = 5;
        if (collection.label === 'books') copyIndex = 3;
        if (collection.label === 'spells') copyIndex = 3;
        if (collection.label === 'creatures') copyIndex = 3;
        cards.push({
          type: collection.type,
          title: item[1],
          copy: item[copyIndex] || item[2],
          href: item[item.length - 1]
        });
      });
    });
    resultCount.textContent = `${cards.length} result${cards.length === 1 ? '' : 's'} found`;
    emptyState.hidden = cards.length > 0;
    resultGrid.innerHTML = cards.map((card) => `
      <a class="search-card" href="${card.href}">
        <small>${card.type}</small>
        <h3>${card.title}</h3>
        <p>${card.copy}</p>
        <span>Open archive entry ↗</span>
      </a>
    `).join('');
  };

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.searchCategory || 'all';
      categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
      render();
      maybePlayHum();
    });
  });

  searchInput?.addEventListener('input', render);
  audioToggle?.addEventListener('click', async () => {
    audioEnabled = !audioEnabled;
    localStorage.setItem('wizardingArchiveAudio', audioEnabled ? 'on' : 'off');
    syncAudioUi();
    if (audioEnabled) {
      await maybePlayHum();
    }
  });
  audioRange?.addEventListener('input', () => {
    const value = Number(audioRange.value) / 100;
    localStorage.setItem('wizardingArchiveAudioVolume', String(value));
    if (audioMaster) audioMaster.gain.value = value;
  });

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('pointerdown', (event) => {
      if (!nav.classList.contains('open')) return;
      const target = event.target;
      if (toggle.contains(target) || target.closest('.main-nav')) return;
      closeMenu();
    }, true);
    document.addEventListener('focusin', (event) => {
      if (!nav.classList.contains('open')) return;
      const target = event.target;
      if (toggle.contains(target) || target.closest('.main-nav')) return;
      closeMenu();
    }, true);
    window.addEventListener('scroll', closeMenu, { passive: true });
  }

  syncAudioUi();
  render();
})();
