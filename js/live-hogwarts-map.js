const liveMarkerButtons = document.querySelectorAll('.live-map-board .map-marker');
const liveTitle = document.querySelector('[data-live-location-title]');
const liveCopy = document.querySelector('[data-live-location-copy]');
const liveRegion = document.querySelector('[data-live-region]');
const liveToast = document.querySelector('[data-map-toast]');
let toastTimer;

const liveLocations = {
  'great-hall': {
    title: 'The Great Hall',
    copy: 'The social heart of Hogwarts. Feasts, Sorting ceremonies, school warnings, celebrations, and final-battle regrouping all pass through this enchanted hall.',
    region: 'Castle center'
  },
  library: {
    title: 'Hogwarts Library',
    copy: 'The research engine of the story. Hermione repeatedly turns the library into a survival tool, especially when the trio needs history, spell law, or restricted knowledge.',
    region: 'Academic wing'
  },
  'room-of-requirement': {
    title: 'Room of Requirement',
    copy: 'A hidden room that appears only for genuine need. It becomes a classroom for Dumbledore’s Army, a refuge, a hiding place, and a final Horcrux battlefield.',
    region: 'Seventh floor'
  },
  'forbidden-forest': {
    title: 'Forbidden Forest',
    copy: 'The school’s dangerous edge. Creatures, punishment, prophecy, and Harry’s walk toward sacrifice all give the forest a darker gravity than the castle corridors.',
    region: 'Grounds'
  },
  'black-lake': {
    title: 'Black Lake',
    copy: 'A deep magical ecosystem below Hogwarts. It holds merpeople, the second Triwizard task, and the constant feeling that the school has another world under its surface.',
    region: 'Grounds'
  },
  'quidditch-pitch': {
    title: 'Quidditch Pitch',
    copy: 'A public stage for courage and rivalry. Harry becomes visible here not only as the Boy Who Lived, but as a teammate, seeker, and risk-taker.',
    region: 'Grounds'
  },
  'astronomy-tower': {
    title: 'Astronomy Tower',
    copy: 'A high, exposed tower where lessons and lookout moments turn into tragedy. It carries one of the series’ heaviest turning points.',
    region: 'Upper castle'
  },
  'hospital-wing': {
    title: 'Hospital Wing',
    copy: 'The place where magical adventure leaves consequences. Quidditch injuries, curses, petrification, and near escapes become visible here.',
    region: 'Castle care'
  },
  owlery: {
    title: 'Owlery',
    copy: 'The castle’s message tower. Letters, warnings, comfort, and secrets travel through this high roost when students need the outside world.',
    region: 'Upper castle'
  },
  'hagrids-hut': {
    title: "Hagrid's Hut",
    copy: 'A warm boundary between rules and wild magic. Hagrid’s hut often gives Harry, Ron, and Hermione loyalty before the adults give them answers.',
    region: 'Grounds edge'
  },
  dungeons: {
    title: 'The Dungeons',
    copy: 'The lower castle, tied to Potions, Slytherin, and Snape’s pressure. The mood here is colder, older, and more secretive than the upper halls.',
    region: 'Lower castle'
  },
  'chamber-of-secrets': {
    title: 'Chamber of Secrets',
    copy: 'An ancient hidden chamber beneath Hogwarts. It exposes Salazar Slytherin’s legacy, the basilisk, Ginny’s possession, and Tom Riddle’s diary Horcrux.',
    region: 'Below the castle'
  },
  'gryffindor-common-room': {
    title: 'Gryffindor Common Room',
    copy: 'Harry’s first real home inside Hogwarts: warm, noisy, imperfect, full of friendship, late plans, and house loyalty.',
    region: 'Gryffindor tower'
  },
  'slytherin-common-room': {
    title: 'Slytherin Common Room',
    copy: 'A lake-level common room imagined with green light, old ambition, and the pressure of Slytherin history.',
    region: 'Lower castle'
  },
  'headmasters-office': {
    title: "Headmaster's Office",
    copy: 'A room of portraits, memory, authority, and difficult explanations. It is where truth often arrives late, but with weight.',
    region: 'Upper castle'
  },
  'whomping-willow': {
    title: 'Whomping Willow',
    copy: 'A violent tree hiding the tunnel to the Shrieking Shack. It points directly toward Lupin, Sirius, Pettigrew, and the Marauders’ secret past.',
    region: 'Grounds'
  }
};

function selectLiveLocation(locationId) {
  const selected = liveLocations[locationId];
  if (!selected || !liveTitle || !liveCopy) return;
  liveMarkerButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.location === locationId);
  });
  liveTitle.textContent = selected.title;
  liveCopy.textContent = selected.copy;
  if (liveRegion) liveRegion.textContent = selected.region;
}

function showMapToast(name, message) {
  if (!liveToast) return;
  clearTimeout(toastTimer);
  liveToast.innerHTML = `<strong>${name}</strong><span>${message}</span>`;
  liveToast.classList.add('show');
  toastTimer = setTimeout(() => liveToast.classList.remove('show'), 4200);
}

liveMarkerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectLiveLocation(button.dataset.location);
  });
});

document.querySelectorAll('[data-person]').forEach((personButton) => {
  const revealPerson = () => {
    showMapToast(personButton.dataset.person, personButton.dataset.toast);
  };
  personButton.addEventListener('mouseenter', revealPerson);
  personButton.addEventListener('focus', revealPerson);
  personButton.addEventListener('click', revealPerson);
});

document.querySelectorAll('[data-roamer]').forEach((roamerButton) => {
  const revealRoamer = () => {
    showMapToast(roamerButton.dataset.roamer, roamerButton.dataset.toast);
  };
  roamerButton.addEventListener('mouseenter', revealRoamer);
  roamerButton.addEventListener('focus', revealRoamer);
  roamerButton.addEventListener('click', () => {
    revealRoamer();
    const mapBoard = document.querySelector('.live-map-board');
    if (mapBoard && window.matchMedia('(max-width: 1050px)').matches) {
      mapBoard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

selectLiveLocation('great-hall');
