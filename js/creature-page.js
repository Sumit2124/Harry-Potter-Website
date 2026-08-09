(function () {
  const creatures = {
    'hungarian-horntail': {
      name: 'Hungarian Horntail',
      type: 'Dragon',
      role: 'Triwizard danger',
      intro: 'The Hungarian Horntail is the kind of creature that makes the magical world feel both beautiful and dangerous at the same time.',
      sections: [
        ['What it is', 'A fierce dragon with spiked armour, a huge reach, and a flame breath that turns the first Triwizard task into a true survival test.'],
        ['Why it matters', 'It pushes Harry into one of the saga’s most memorable moments of improvisation, courage, and reflexes.'],
        ['Where it appears', 'Most clearly in the Goblet of Fire era, where it becomes the emblem of wizarding competition that has gone too far.']
      ],
      related: ['ui/harry-potter-movie-order.html', 'ui/harry-potter-character-guide.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'fawkes': {
      name: 'Fawkes',
      type: 'Phoenix',
      role: 'Loyal companion',
      intro: 'Fawkes is one of the purest magical symbols in the series: rebirth, loyalty, and help appearing just when it is needed most.',
      sections: [
        ['What it is', 'A phoenix associated with Dumbledore, known for healing tears, carrying great meaning, and rising again from ash.'],
        ['Why it matters', 'Fawkes saves Harry in the Chamber of Secrets and turns magical wonder into something emotionally transformative.'],
        ['Where it appears', 'Hogwarts, Dumbledore’s office, and key moments where hope needs a visible sign.']
      ],
      related: ['ui/harry-potter-ending-explained.html', 'ui/harry-potter-patronus-list.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'basilisk': {
      name: 'Basilisk',
      type: 'Serpent',
      role: 'Ancient terror',
      intro: 'The basilisk is the dark, hidden threat at the heart of the Chamber of Secrets storyline.',
      sections: [
        ['What it is', 'A giant serpent bred to kill, whose direct gaze petrifies or kills and whose venom is one of the few things that can destroy Horcruxes.'],
        ['Why it matters', 'It links the school mystery to Tom Riddle’s diary and gives the Chamber of Secrets its terrifying shape.'],
        ['Where it appears', 'Beneath Hogwarts, inside the Chamber, and in the clues that Hermione uncovers while investigating the attacks.']
      ],
      related: ['ui/harry-potter-horcruxes-explained.html', 'ui/harry-potter-character-guide.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'thestral': {
      name: 'Thestral',
      type: 'Winged horse',
      role: 'Hidden travel',
      intro: 'Thestrals are creatures you only notice once the story has changed you enough to see death clearly.',
      sections: [
        ['What it is', 'A skeletal horse-like magical creature with leathery wings, visible only to people who have witnessed death.'],
        ['Why it matters', 'It gives the story one of its most haunting ideas: perception changes after loss.'],
        ['Where it appears', 'Used as transportation by Harry’s group and associated with the Ministry battle and later travel.']
      ],
      related: ['ui/harry-potter-timeline.html', 'ui/harry-potter-ending-explained.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'hippogriff': {
      name: 'Hippogriff',
      type: 'Hybrid beast',
      role: 'Proud creature',
      intro: 'Hippogriffs are a test of manners as much as magic: you must show respect before they will trust you.',
      sections: [
        ['What it is', 'A magical hybrid of horse and eagle, with a proud temperament and strong sense of etiquette.'],
        ['Why it matters', 'It teaches that magical creatures are not props; they are beings with dignity and expectations.'],
        ['Where it appears', 'Most famously through Buckbeak in Prisoner of Azkaban and the wider Hogwarts care of magical creatures world.']
      ],
      related: ['ui/harry-potter-character-guide.html', 'ui/harry-potter-timeline.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'centaur': {
      name: 'Centaur',
      type: 'Forest guardian',
      role: 'Star reader',
      intro: 'Centaurs are one of the clearest examples of the forest having its own politics, wisdom, and boundaries.',
      sections: [
        ['What it is', 'An intelligent humanoid creature that studies the stars, values independence, and resists human interference.'],
        ['Why it matters', 'Centaur scenes deepen the sense that the wizarding world is older than Hogwarts and indifferent to human assumptions.'],
        ['Where it appears', 'The Forbidden Forest, especially in encounters involving prophecy, punishment, and danger.']
      ],
      related: ['ui/interactive-hogwarts-map.html', 'ui/harry-potter-character-guide.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'house-elf': {
      name: 'House-elf',
      type: 'Servant magic',
      role: 'Freedom and loyalty',
      intro: 'House-elves are a reminder that the series’ magic often sits beside serious questions about freedom, class, and care.',
      sections: [
        ['What it is', 'A domestic magical being with powerful abilities and a historically enforced connection to service.'],
        ['Why it matters', 'Dobby, Kreacher, and other house-elves reveal how the story treats loyalty, kindness, and choice.'],
        ['Where it appears', 'Throughout Hogwarts, Malfoy Manor, the Burrow, and many of the story’s most emotional rescues.']
      ],
      related: ['ui/harry-potter-character-guide.html', 'ui/harry-potter-ending-explained.html', 'ui/magical-creatures-encyclopedia.html']
    },
    'acromantula': {
      name: 'Acromantula',
      type: 'Giant spider',
      role: 'Forest threat',
      intro: 'The acromantula takes an ordinary fear and makes it enormous, which is exactly what the forest does best.',
      sections: [
        ['What it is', 'A giant spider capable of speech and organised behaviour, but still wildly dangerous to humans.'],
        ['Why it matters', 'It makes the Forbidden Forest feel like a place where school rules stop and survival begins.'],
        ['Where it appears', 'The Forbidden Forest and Hagrid-adjacent creature stories that blur care, comedy, and risk.']
      ],
      related: ['ui/interactive-hogwarts-map.html', 'ui/harry-potter-books-in-order.html', 'ui/magical-creatures-encyclopedia.html']
    }
  };

  const key = new URLSearchParams(location.search).get('creatureId') || 'fawkes';
  const item = creatures[key] || creatures.fawkes;
  document.title = `${item.name} | The Wizarding Archive`;

  const canonicalLink = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }));
  const canonicalUrl = new URL('ui/creature.html', document.baseURI);
  canonicalUrl.searchParams.set('creatureId', key);
  canonicalLink.href = canonicalUrl.href;

  const descriptionMeta = document.querySelector('meta[name="description"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'description' }));
  descriptionMeta.content = `${item.name} explained with creature meaning, story role, and where it matters in the Harry Potter world.`;

  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${item.name} | The Wizarding Archive`,
    description: descriptionMeta.content,
    url: canonicalUrl.href,
    author: { '@type': 'Person', name: 'Sumit Thapliyal' },
    publisher: { '@type': 'Organization', name: 'The Wizarding Archive' }
  });
  document.head.append(jsonLd);

  document.body.innerHTML = `
    <header class="site-header">
      <a class="brand" href="index.html"><span class="brand-mark">✦</span><span><small>THE</small> WIZARDING<br>ARCHIVE</span></a>
      <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span></button>
      <nav class="main-nav">
        <a href="index.html">Home</a>
        <a href="ui/archive-search.html">Search</a>
        <a class="active" href="ui/magical-creatures-encyclopedia.html">Creatures</a>
        <a href="ui/harry-potter-character-guide.html">Character guide</a>
        <a href="ui/harry-potter-horcruxes-explained.html">Horcruxes</a>
      </nav>
      <a class="nav-cta" href="ui/magic.html">Play <span>↗</span></a>
    </header>
    <main class="search-page">
      <section class="search-hero">
        <div>
          <p class="eyebrow"><span></span> Creature archive note</p>
          <h1>${item.name}<br><em>${item.type}</em></h1>
          <p class="search-intro">${item.intro}</p>
        </div>
        <div class="search-panel">
          <div class="search-toolbar">
            <div class="sound-strip">
              <div>
                <small>Ambient archive</small>
                <strong>Creature theme</strong>
              </div>
              <div class="sound-controls" data-sound-controls>
                <button type="button" data-audio-toggle>Sound off</button>
                <input type="range" min="0" max="100" value="35" data-audio-range aria-label="Sound volume">
              </div>
            </div>
            <div class="search-filters" aria-label="Creature highlights">
              <button class="search-filter active" type="button">Overview</button>
              <button class="search-filter" type="button">Story role</button>
              <button class="search-filter" type="button">Creature facts</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="search-results">
          ${item.sections.map((section) => `
            <article class="search-card">
              <small>${section[0]}</small>
              <h3>${item.name}</h3>
              <p>${section[1]}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <section class="explorer-section" style="border-bottom:0;padding-bottom:0">
        <h2>Why this creature matters</h2>
        <div class="quick-grid">
          <article class="quick-card"><small>Role</small><h3>${item.role}</h3><p>${item.sections[1][1]}</p></article>
          <article class="quick-card"><small>Best reading path</small><h3>Where to start</h3><p>${item.sections[2][1]}</p></article>
          <a class="quick-card" href="ui/magical-creatures-encyclopedia.html"><small>Back to directory</small><h3>Creature encyclopedia</h3><p>Return to the full bestiary and continue exploring other magical creatures.</p></a>
        </div>
      </section>
      <section class="explorer-section" style="border-bottom:0">
        <h2>Related archive paths</h2>
        <div class="quick-grid">
          ${item.related.map((href) => {
            const label = href.includes('horcrux') ? 'Horcrux guide' : href.includes('character') ? 'Character guide' : href.includes('map') ? 'Interactive map' : href.includes('movie') ? 'Movie order' : href.includes('ending') ? 'Ending explained' : href.includes('books') ? 'Books in order' : 'Archive page';
            return `<a class="quick-card" href="${href}"><small>Related path</small><h3>${label}</h3><p>Continue exploring the archive through a connected page.</p></a>`;
          }).join('')}
        </div>
      </section>
      <a class="guide-back" href="ui/magical-creatures-encyclopedia.html">← Back to creatures directory</a>
    </main>
    <footer class="site-footer section-shell"><span>✦ The Wizarding Archive</span><span>Made for the magic we carry with us.</span><span>© 2026 · Unofficial fan project</span></footer>
  `;

  const audioToggle = document.querySelector('[data-audio-toggle]');
  const audioRange = document.querySelector('[data-audio-range]');
  let audioContext = null;
  let audioMaster = null;
  let audioEnabled = localStorage.getItem('wizardingArchiveAudio') === 'on';

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
      audioMaster.gain.value = Number(localStorage.getItem('wizardingArchiveAudioVolume') || 0.45);
      audioMaster.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    return audioContext;
  };

  const playCreatureTheme = async () => {
    if (!audioEnabled) return;
    const ctx = await ensureAudio();
    if (!ctx || !audioMaster || audioMaster.__playing) return;
    audioMaster.__playing = true;
    const sequence = [
      [196, 0.06, 'sine', 0],
      [293.66, 0.045, 'triangle', 150],
      [392, 0.04, 'sine', 300],
      [493.88, 0.03, 'triangle', 450]
    ];
    sequence.forEach(([frequency, gainValue, type, delay]) => {
      const tone = ctx.createOscillator();
      const gain = ctx.createGain();
      tone.type = type;
      tone.frequency.value = frequency;
      gain.gain.value = gainValue;
      tone.connect(gain).connect(audioMaster);
      window.setTimeout(() => tone.start(), delay);
      window.setTimeout(() => {
        try { tone.stop(); } catch (_) {}
      }, delay + 980);
    });
    window.setTimeout(() => { audioMaster.__playing = false; }, 1600);
  };

  const playChime = async () => {
    const ctx = await ensureAudio();
    if (!ctx || !audioMaster) return;
    const tones = [392, 523.25, 659.25];
    tones.forEach((frequency, index) => {
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
  };

  audioToggle?.addEventListener('click', async () => {
    audioEnabled = !audioEnabled;
    localStorage.setItem('wizardingArchiveAudio', audioEnabled ? 'on' : 'off');
    syncAudioUi();
    await playChime();
    if (audioEnabled) await playCreatureTheme();
  });

  audioRange?.addEventListener('input', () => {
    const value = Number(audioRange.value) / 100;
    localStorage.setItem('wizardingArchiveAudioVolume', String(value));
    if (audioMaster) audioMaster.gain.value = value;
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
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
  }

  syncAudioUi();
  if (audioEnabled) playCreatureTheme();
})();
