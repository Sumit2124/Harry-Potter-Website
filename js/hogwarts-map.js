const markerButtons = document.querySelectorAll('.map-marker');
const mapTitle = document.querySelector('[data-map-title]');
const mapCopy = document.querySelector('[data-map-copy]');
const footstepTrail = document.querySelector('[data-footstep-trail]');
const routeStart = { x: 18, y: 58 };

const mapLocations = {
  'great-hall': {
    title: 'The Great Hall',
    copy: 'Feasts, Sorting ceremonies, school notices, and several public turning points begin here.',
    x: 48,
    y: 36,
    curve: -10
  },
  library: {
    title: 'Hogwarts Library',
    copy: 'Hermione treats the library like a second common room: restricted shelves, research trails, and hard answers.',
    x: 63,
    y: 49,
    curve: 8
  },
  'room-of-requirement': {
    title: 'Room of Requirement',
    copy: 'A hidden room that appears when someone truly needs it, from Dumbledore’s Army practice to the final Horcrux search.',
    x: 41,
    y: 24,
    curve: -17
  },
  'forbidden-forest': {
    title: 'Forbidden Forest',
    copy: 'A dangerous edge of the school where secrets, creatures, sacrifice, and courage repeatedly meet.',
    x: 74,
    y: 69,
    curve: 13
  },
  'black-lake': {
    title: 'Black Lake',
    copy: 'The lake hides merpeople, the second Triwizard task, and a colder kind of Hogwarts mystery.',
    x: 28,
    y: 75,
    curve: 15
  },
  'quidditch-pitch': {
    title: 'Quidditch Pitch',
    copy: 'The place where Harry first becomes visible as more than the Boy Who Lived: a player, a risk-taker, and a teammate.',
    x: 21,
    y: 23,
    curve: -8
  },
  'astronomy-tower': {
    title: 'Astronomy Tower',
    copy: 'A high tower used for lessons and lookout moments, later becoming one of the most tragic locations in the castle.',
    x: 77,
    y: 17,
    curve: -14
  },
  'hospital-wing': {
    title: 'Hospital Wing',
    copy: 'Where magical injuries, Quidditch accidents, cursed objects, and dangerous school years leave visible consequences.',
    x: 40,
    y: 48,
    curve: -5
  },
  owlery: {
    title: 'Owlery',
    copy: 'The high roost where letters leave Hogwarts, carrying warnings, comfort, secrets, and news from the outside world.',
    x: 22,
    y: 12,
    curve: -16
  },
  'hagrids-hut': {
    title: "Hagrid's Hut",
    copy: 'A warm edge-of-the-grounds refuge where Harry, Ron, and Hermione often find loyalty before official answers.',
    x: 76,
    y: 55,
    curve: 11
  },
  dungeons: {
    title: 'The Dungeons',
    copy: 'The lower castle carries Potions lessons, Slytherin atmosphere, and the cold pressure Harry feels around Snape.',
    x: 55,
    y: 62,
    curve: 5
  },
  'chamber-of-secrets': {
    title: 'Chamber of Secrets',
    copy: 'The hidden chamber beneath Hogwarts exposes Salazar Slytherin’s legacy, the basilisk, and Tom Riddle’s diary.',
    x: 58,
    y: 78,
    curve: 12
  },
  'gryffindor-common-room': {
    title: 'Gryffindor Common Room',
    copy: 'Harry’s first true Hogwarts home: a warm, noisy space of friendship, late-night plans, and house loyalty.',
    x: 34,
    y: 36,
    curve: -7
  },
  'slytherin-common-room': {
    title: 'Slytherin Common Room',
    copy: 'A lake-level common room imagined with green light, old ambition, and the weight of Slytherin history.',
    x: 67,
    y: 69,
    curve: 10
  },
  'headmasters-office': {
    title: "Headmaster's Office",
    copy: 'A room of portraits, memories, authority, and late explanations, where the truth often arrives in fragments.',
    x: 56,
    y: 22,
    curve: -12
  },
  'whomping-willow': {
    title: 'Whomping Willow',
    copy: 'The violent tree hides the tunnel to the Shrieking Shack and points toward the Marauders’ secret history.',
    x: 20,
    y: 61,
    curve: 9
  }
};

function getRoutePoint(target, step, total) {
  const t = step / (total - 1);
  const curve = Math.sin(Math.PI * t) * target.curve;
  return {
    x: routeStart.x + (target.x - routeStart.x) * t + curve * 0.35,
    y: routeStart.y + (target.y - routeStart.y) * t - curve * 0.18
  };
}

function renderFootsteps(locationId) {
  const target = mapLocations[locationId];
  if (!footstepTrail || !target) return;

  footstepTrail.replaceChildren();
  const totalSteps = 13;

  for (let index = 0; index < totalSteps; index += 1) {
    const point = getRoutePoint(target, index, totalSteps);
    const nextPoint = getRoutePoint(target, Math.min(index + 1, totalSteps - 1), totalSteps);
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI + 88;
    const footstep = document.createElement('span');
    footstep.className = `footstep ${index % 2 ? 'footstep-right' : 'footstep-left'}`;
    footstep.style.setProperty('--x', `${point.x}%`);
    footstep.style.setProperty('--y', `${point.y}%`);
    footstep.style.setProperty('--angle', `${angle}deg`);
    footstep.style.setProperty('--delay', `${index * 0.55}s`);
    footstepTrail.append(footstep);
  }
}

markerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = mapLocations[button.dataset.location];
    if (!selected || !mapTitle || !mapCopy) return;
    markerButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    mapTitle.textContent = selected.title;
    mapCopy.textContent = selected.copy;
    renderFootsteps(button.dataset.location);
  });
});

renderFootsteps('great-hall');
