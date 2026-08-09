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
  let audioReverb = null;
  let audioDelay = null;
  let masterGain = 0.45;
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
      audioRange.value = String(Math.round((Number(localStorage.getItem('wizardingArchiveAudioVolume') || 0.45) * 100)));
    }
  };

  const ensureAudio = async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!audioContext) {
      audioContext = new AudioContext();
      audioMaster = audioContext.createGain();
      masterGain = Number(localStorage.getItem('wizardingArchiveAudioVolume') || 0.45);
      audioMaster.gain.value = masterGain;
      audioReverb = audioContext.createDelay(1.2);
      audioDelay = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1800;
      filter.Q.value = 0.7;
      audioReverb.delayTime.value = 0.23;
      audioDelay.gain.value = 0.28;
      audioMaster.connect(filter);
      filter.connect(audioDelay);
      audioDelay.connect(audioReverb);
      audioReverb.connect(audioContext.destination);
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
    const notes = [174.61, 220, 261.63, 329.63, 392];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index < 2 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.09 : index === 1 ? 0.06 : 0.04;
      oscillator.connect(gain).connect(audioMaster);
      oscillator.start();
      window.setTimeout(() => {
        try { oscillator.stop(); } catch (_) {}
      }, 1850 + index * 220);
    });
    window.setTimeout(() => { audioMaster.__playing = false; }, 2400);
  };

  const playChime = async () => {
    const ctx = await ensureAudio();
    if (!ctx || !audioMaster) return;
    const notes = [392, 523.25, 659.25];
    notes.forEach((frequency, index) => {
      const tone = ctx.createOscillator();
      const gain = ctx.createGain();
      tone.type = index === 1 ? 'triangle' : 'sine';
      tone.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.09 : 0.06;
      tone.connect(gain).connect(audioMaster);
      window.setTimeout(() => tone.start(), index * 110);
      window.setTimeout(() => {
        try { tone.stop(); } catch (_) {}
      }, 780 + index * 110);
    });
    window.setTimeout(() => {
      if (audioReverb) audioReverb.delayTime.value = 0.22;
    }, 200);
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
    await playChime();
    if (audioEnabled) await maybePlayHum();
  });
  audioRange?.addEventListener('input', () => {
    const value = Number(audioRange.value) / 100;
    localStorage.setItem('wizardingArchiveAudioVolume', String(value));
    masterGain = value;
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
