(function () {
  const rituals = [
    {
      character: 'Hermione Granger',
      label: 'Character of the week',
      copy: 'A reminder that preparation is its own kind of bravery. Revisit Hermione’s best decisions, then test your character match.',
      spell: 'Alohomora an overlooked detail',
      href: 'ui/character.html?id=hermione-granger',
      action: 'Meet Hermione'
    },
    {
      character: 'Neville Longbottom',
      label: 'Character of the week',
      copy: 'Quiet courage can become the turning point. Follow Neville’s growth from uncertain student to defender of Hogwarts.',
      spell: 'Find the courage to begin',
      href: 'ui/character.html?id=neville-longbottom',
      action: 'Meet Neville'
    },
    {
      character: 'Luna Lovegood',
      label: 'Character of the week',
      copy: 'The archive is looking for the detail everyone else missed. Explore Luna’s perspective and return Friday for a new wallpaper.',
      spell: 'See what others cannot',
      href: 'ui/character.html?id=luna-lovegood',
      action: 'Meet Luna'
    },
    {
      character: 'Sirius Black',
      label: 'Character of the week',
      copy: 'Some stories are about finding family after loss. Revisit Sirius’s place in Harry’s story and take today’s wizarding question.',
      spell: 'Open a path to home',
      href: 'ui/character.html?id=sirius-black',
      action: 'Meet Sirius'
    }
  ];

  const week = Math.floor(Date.now() / 604800000);
  const ritual = rituals[((week % rituals.length) + rituals.length) % rituals.length];
  const friday = new Date().getDay() === 5;
  const firstVisitKey = 'wizardingArchiveLastVisit';
  const lastVisit = localStorage.getItem(firstVisitKey);
  const today = new Date().toISOString().slice(0, 10);
  const welcome = lastVisit === today ? 'Welcome back, archivist.' : 'A new page of the archive is waiting.';
  localStorage.setItem(firstVisitKey, today);

  const weekly = document.getElementById('weekly');
  if (weekly && !document.getElementById('weekly-detail')) {
    weekly.querySelector('div')?.insertAdjacentHTML('beforeend', '<p class="weekly-detail" id="weekly-detail"></p><small class="weekly-date" id="weekly-date"></small>');
  }

  const setText = (id, value) => { const node = document.getElementById(id); if (node) node.textContent = value; };
  setText('weekly-title', `${ritual.label}: ${ritual.character}`);
  setText('weekly-copy', ritual.copy);
  setText('weekly-detail', `${welcome} This week’s hidden prompt: ${ritual.spell}.`);
  setText('weekly-date', friday ? 'Friday wallpaper unlocked today' : 'New wallpaper every Friday');
  setText('return-copy', friday ? `The Friday reveal is live. ${ritual.spell}, then visit the gallery for this week’s wallpaper.` : `Return Friday for a new wallpaper. Until then, ${ritual.spell.toLowerCase()}.`);
  setText('return-label', friday ? 'The reveal is live' : 'Your next visit');
  setText('ritual-title', `${ritual.character}: a reason to return`);
  setText('ritual-copy', ritual.copy);
  setText('ritual-spell', ritual.spell);

  const action = document.getElementById('ritual-action');
  if (action) { action.href = ritual.href; action.textContent = `${ritual.action} →`; }

})();
