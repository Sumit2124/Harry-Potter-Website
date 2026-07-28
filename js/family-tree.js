(function () {
  const menuToggle = document.querySelector('#family-menu-toggle');
  const nav = document.querySelector('#family-nav');
  const insight = document.querySelector('#family-insight');
  const insightTitle = document.querySelector('#insight-title');
  const insightCopy = document.querySelector('#insight-copy');
  const insightLink = document.querySelector('#insight-link');
  const insightClose = document.querySelector('#insight-close');

  const people = {
    harry: ['Harry Potter', 'Harry is connected to several branches at once: the Potter and Evans lines by birth, the Weasleys through marriage and friendship, and the wider wizarding world through the family he chooses. Lily’s sacrifice and the loyalty of his friends shape every major choice he makes.', 'ui/character.html?id=harry-potter'],
    fleamont: ['Fleamont Potter', 'Fleamont is James Potter’s father and the inventor of Sleekeazy’s Hair Potion. His success gave the Potter family a comfortable life, but the family’s most important inheritance was the courage and kindness carried forward by James and Harry.', 'ui/character.html?id=james-potter'],
    euphemia: ['Euphemia Potter', 'Euphemia is James Potter’s mother and Harry’s grandmother. She and Fleamont raised James before he joined Hogwarts, where his friendship with Sirius, Remus, and Peter became one of the most important—and tragic—friendships in the story.', 'ui/character.html?id=james-potter'],
    james: ['James Potter', 'James is Harry’s father, a talented Animagus, and one of the original Marauders. He grows from a reckless student into a husband and father whose final stand beside Lily shows how deeply his love for his family runs.', 'ui/character.html?id=james-potter'],
    lily: ['Lily Evans', 'Lily is Harry’s mother and the source of the protective magic that saves him as a baby. Her choice turns an act of sacrifice into a lasting protection, making love—not ancestry or power—the strongest force in Harry’s story.', 'ui/character.html?id=lily-potter'],
    arthur: ['Arthur Weasley', 'Arthur is the warm-hearted centre of the Weasley household. His curiosity about Muggle life, steady moral courage, and unconditional welcome help make the Burrow a second home for Harry.', 'ui/character.html?id=arthur-weasley'],
    molly: ['Molly Weasley', 'Molly is a fierce protector, a loving mother, and one of the clearest examples of chosen family in the series. Her care for Harry is practical and emotional: she feeds him, worries over him, and stands beside him when the war reaches home.', 'ui/character.html?id=molly-weasley'],
    ron: ['Ron Weasley', 'Ron becomes Harry’s closest friend and a brother in everything but blood. His humour, loyalty, and willingness to return after fear or doubt make him essential to the trio and to Harry’s sense of belonging.', 'ui/character.html?id=ron-weasley'],
    ginny: ['Ginny Weasley', 'Ginny is the youngest Weasley sibling, a gifted Quidditch player, and a confident witch who grows beyond the shy girl Harry first meets. Her relationship with Harry connects two families that have already chosen one another.', 'ui/character.html?id=ginny-weasley'],
    'fred-george': ['Fred and George Weasley', 'Fred and George turn mischief into a business and resistance into a form of joy. Their jokes are never only jokes: the twins use humour to challenge authority, protect their friends, and keep the Weasley spirit alive in dark times.', 'ui/characters.html'],
    'chosen-family': ['The chosen family', 'Harry’s family is expanded by the people who repeatedly choose him: Ron and Hermione, the Weasleys, Sirius, Remus, Neville, Luna, and the members of Dumbledore’s Army. The story treats these bonds as real inheritance.', 'ui/harry-potter-character-guide.html'],
    cygnus: ['Cygnus and Druella Black', 'Cygnus and Druella are the parents of Bellatrix, Andromeda, and Narcissa. Their household represents the old pure-blood ideology that shapes the Black sisters differently: one embraces it, one rejects it, and one protects her family while living inside it.', 'ui/characters.html'],
    bellatrix: ['Bellatrix Lestrange', 'Bellatrix is the most fanatical of the Black sisters. Her loyalty to Voldemort is built on obsession with power and blood status, showing how family inheritance can be used to justify cruelty instead of compassion.', 'ui/character.html?id=bellatrix-lestrange'],
    andromeda: ['Andromeda Tonks', 'Andromeda rejects the Black family’s prejudice by marrying Ted Tonks, a Muggle-born wizard. Her life shows the cost of choosing love over status, and her daughter Nymphadora carries that courage forward.', 'ui/characters.html'],
    narcissa: ['Narcissa Malfoy', 'Narcissa remains tied to the values of the Black family, but her choices are ultimately driven by protecting Draco. Her lie in the Forbidden Forest proves that a mother’s love can interrupt even Voldemort’s final victory.', 'ui/character.html?id=narcissa-malfoy'],
    tonks: ['Nymphadora Tonks', 'Tonks is Andromeda’s daughter, a Metamorphmagus, and an Auror who fights for the Order. She inherits the Black family’s power but chooses a life defined by service, humour, and love for Remus Lupin.', 'ui/character.html?id=nymphadora-tonks'],
    draco: ['Draco Malfoy', 'Draco is raised inside the Malfoy and Black family expectations. His sixth year reveals the fear beneath that privilege, and his hesitation during the war shows a person struggling to escape the role chosen for him.', 'ui/character.html?id=draco-malfoy'],
    marvolo: ['Marvolo Gaunt', 'Marvolo is Merope’s father and a descendant of Salazar Slytherin through the Gaunt line. He treats ancestry as a reason for superiority, but his pride leaves the family isolated and unable to offer the love its members need.', 'ui/characters.html'],
    merope: ['Merope Gaunt', 'Merope grows up under her father’s cruelty and later becomes Tom Riddle Sr.’s wife. Her life is tragic, but her son inherits the Gaunt connection to Slytherin and the unresolved wounds of a family that valued blood over care.', 'ui/characters.html'],
    'tom-sr': ['Tom Riddle Sr.', 'Tom Riddle Sr. is a Muggle from the village near the Gaunt home. His relationship with Merope becomes part of the chain of events that leads to the birth of Tom Riddle Jr., though the family connection is marked by abandonment and resentment.', 'ui/characters.html'],
    voldemort: ['Tom Riddle, later Voldemort', 'Tom Riddle is Harry’s distant family connection through the Gaunt line, but the story makes a deliberate contrast between them. Both inherit unusual histories; Harry chooses connection, while Riddle turns inheritance into an excuse to reject humanity.', 'ui/harry-potter-horcruxes-explained.html']
  };

  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('pointerdown', (event) => {
    if (!nav?.classList.contains('open')) return;
    if (menuToggle?.contains(event.target) || nav.contains(event.target)) return;
    closeMenu();
  }, true);

  function openInsight(key) {
    const person = people[key];
    if (!person || !insight) return;
    insightTitle.textContent = person[0];
    insightCopy.textContent = person[1];
    insightLink.href = person[2];
    insightLink.textContent = person[2].includes('character') || person[2].includes('characters') ? 'Open related character notes ↗' : 'Explore this story thread ↗';
    insight.classList.add('is-open');
    insight.setAttribute('aria-hidden', 'false');
    insightClose?.focus();
  }

  function closeInsight() {
    if (!insight) return;
    insight.classList.remove('is-open');
    insight.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-person]').forEach((card) => {
    card.addEventListener('click', () => openInsight(card.dataset.person));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openInsight(card.dataset.person);
      }
    });
  });
  insightClose?.addEventListener('click', closeInsight);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeInsight();
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}());
