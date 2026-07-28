const markerButtons = document.querySelectorAll('.map-marker');
const mapTitle = document.querySelector('[data-map-title]');
const mapCopy = document.querySelector('[data-map-copy]');

const mapLocations = {
  'great-hall': ['The Great Hall', 'Feasts, Sorting ceremonies, school notices, and several public turning points begin here.'],
  library: ['Hogwarts Library', 'Hermione treats the library like a second common room: restricted shelves, research trails, and hard answers.'],
  'room-of-requirement': ['Room of Requirement', 'A hidden room that appears when someone truly needs it, from Dumbledore’s Army practice to the final Horcrux search.'],
  'forbidden-forest': ['Forbidden Forest', 'A dangerous edge of the school where secrets, creatures, sacrifice, and courage repeatedly meet.'],
  'black-lake': ['Black Lake', 'The lake hides merpeople, the second Triwizard task, and a colder kind of Hogwarts mystery.'],
  'quidditch-pitch': ['Quidditch Pitch', 'The place where Harry first becomes visible as more than the Boy Who Lived: a player, a risk-taker, and a teammate.']
};

markerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = mapLocations[button.dataset.location];
    if (!selected || !mapTitle || !mapCopy) return;
    markerButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    mapTitle.textContent = selected[0];
    mapCopy.textContent = selected[1];
  });
});
