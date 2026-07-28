const searchInput = document.querySelector('[data-spell-search]');
const filterButtons = document.querySelectorAll('[data-spell-filter]');
const spellEntries = document.querySelectorAll('[data-spell-card]');
const resultCount = document.querySelector('[data-spell-count]');
let activeFilter = 'all';

function updateSpellDirectory() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;

  spellEntries.forEach((entry) => {
    const category = entry.dataset.category || '';
    const haystack = entry.textContent.toLowerCase();
    const categoryMatch = activeFilter === 'all' || category === activeFilter;
    const queryMatch = !query || haystack.includes(query);
    const shouldShow = categoryMatch && queryMatch;
    entry.classList.toggle('hidden', !shouldShow);
    if (shouldShow) visible += 1;
  });

  if (resultCount) {
    resultCount.textContent = `${visible} spell${visible === 1 ? '' : 's'} shown`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.spellFilter || 'all';
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    updateSpellDirectory();
  });
});

searchInput?.addEventListener('input', updateSpellDirectory);
updateSpellDirectory();
