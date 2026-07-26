const films = [
  {year:'2001 · Chris Columbus', title:"Harry Potter and the\nPhilosopher's Stone", summary:'An ordinary boy discovers on his eleventh birthday that he is a wizard. At Hogwarts School of Witchcraft and Wizardry, Harry finds a home, two loyal friends, and a mystery that leads him face-to-face with his past.', tags:['Wonder','First year','The beginning'], quote:'“The magic begins.”'},
  {year:'2002 · Chris Columbus', title:'Harry Potter and the\nChamber of Secrets', summary:'A mysterious voice echoes through Hogwarts and students begin to turn to stone. Harry, Ron, and Hermione descend beneath the school to uncover an ancient secret.', tags:['Secrets','Loyalty','The heir'], quote:'“The chamber has been opened.”'},
  {year:'2004 · Alfonso Cuarón', title:'Harry Potter and the\nPrisoner of Azkaban', summary:'A dangerous prisoner has escaped from Azkaban. As the year darkens, Harry learns that the past is rarely as simple as it first appears—and that some monsters are not what they seem.', tags:['Time','Patronus','The past'], quote:'“Happiness can be found.”'},
  {year:'2005 · Mike Newell', title:'Harry Potter and the\nGoblet of Fire', summary:'The Triwizard Tournament brings danger and spectacle to Hogwarts. Three impossible tasks lead to a graveyard, a rebirth, and the return of the darkest wizard in history.', tags:['Tournament','Courage','Rebirth'], quote:'“Difficult times lie ahead.”'},
  {year:'2007 · David Yates', title:'Harry Potter and the\nOrder of the Phoenix', summary:'The Ministry refuses to believe that Voldemort has returned. Harry builds a secret army of students and discovers that his connection to the Dark Lord may be deeper than he knew.', tags:['Resistance','Prophecy','D.A.'], quote:'“Things are going to change.”'},
  {year:'2009 · David Yates', title:'Harry Potter and the\nHalf-Blood Prince', summary:'As Voldemort’s grip tightens, Dumbledore guides Harry through memories that reveal the key to defeating him. At Hogwarts, love and loss sit beside a growing shadow.', tags:['Memories','Secrets','Sacrifice'], quote:'“Once again, you show no signs of weakness.”'},
  {year:'2010 · David Yates', title:'Harry Potter and the\nDeathly Hallows — Part 1', summary:'Harry, Ron, and Hermione leave the safety of Hogwarts to find and destroy the remaining Horcruxes. The wizarding world is at war, and nowhere feels safe.', tags:['The hunt','Friendship','Exile'], quote:'“We’re all going to keep fighting.”'},
  {year:'2011 · David Yates', title:'Harry Potter and the\nDeathly Hallows — Part 2', summary:'The final battle begins at Hogwarts. With every secret revealed and every sacrifice counted, Harry faces Voldemort for the last time.', tags:['The battle','Choice','The end'], quote:'“Not my daughter, you b—!”'}
];

const detail = document.querySelector('#film-detail');
document.querySelectorAll('.film-tab[data-film]').forEach(tab => tab.addEventListener('click', () => {
  const index = Number(tab.dataset.film); const film = films[index];
  document.querySelectorAll('.film-tab[data-film]').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected','false'); });
  tab.classList.add('active'); tab.setAttribute('aria-selected','true');
  detail.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}],{duration:350,easing:'ease-out'});
  detail.innerHTML = `<div class="film-number">${String(index+1).padStart(2,'0')} / 08</div><p class="film-year">${film.year}</p><h3>${film.title.replace('\n','<br /><em>').replace(/$/, '</em>')}</h3><p class="film-summary">${film.summary}</p><div class="film-tags">${film.tags.map(tag => `<span>${tag}</span>`).join('')}</div><div class="detail-footer"><span>${film.quote}</span><span class="film-dot">✦</span></div>`;
}));

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('.gallery-card').forEach(card => card.addEventListener('click', () => { lightbox.querySelector('h2').textContent = card.dataset.title; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); }));
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox); lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()}); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const menuToggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});
const closeMenu=()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')};
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('pointerdown',event=>{if(!nav.classList.contains('open'))return;const target=event.target;if(menuToggle.contains(target)||target.closest('.main-nav a'))return;closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu()});

const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.addEventListener('mousemove',e=>{const glow=document.querySelector('.cursor-glow');glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`});

const horcruxes = [
  ['Tom Riddle’s Diary','A school diary carrying a memory of sixteen-year-old Tom Riddle. It possessed Ginny Weasley and reopened the Chamber of Secrets.','Found in Chamber of Secrets (Part 2).','Harry stabbed it with a basilisk fang in the Chamber of Secrets.'],
  ['Marvolo Gaunt’s Ring','A Peverell family ring that Voldemort turned into a Horcrux; it also held the Resurrection Stone and was protected by a lethal curse.','Found in Half-Blood Prince (Part 6), at the Gaunt shack.','Dumbledore destroyed it with the Sword of Gryffindor, but the curse fatally injured his hand.'],
  ['Slytherin’s Locket','Salazar Slytherin’s locket, hidden in a sea cave and later carried by Dolores Umbridge after Mundungus Fletcher stole it.','Recovered in Deathly Hallows — Part 1.','Ron used the Sword of Gryffindor after the locket tried to exploit his fears.'],
  ['Hufflepuff’s Cup','Helga Hufflepuff’s gold cup, stolen from Hepzibah Smith and hidden in Bellatrix Lestrange’s vault at Gringotts.','Found in Deathly Hallows — Part 2.','Hermione destroyed it with a basilisk fang in the Chamber of Secrets.'],
  ['Ravenclaw’s Diadem','The lost diadem of Rowena Ravenclaw, hidden in the Room of Requirement after Voldemort believed nobody could find it.','Located in Deathly Hallows — Part 2.','Crabbe’s Fiendfyre destroyed it during the Battle of Hogwarts.'],
  ['Nagini','Voldemort’s snake and final intentional Horcrux, kept close as both companion and weapon.','Identified in Deathly Hallows — Part 2.','Neville Longbottom beheaded her with the Sword of Gryffindor.'],
  ['Harry Potter','An accidental Horcrux created when Voldemort’s curse rebounded on baby Harry, leaving a fragment of Voldemort’s soul inside him.','Revealed in Deathly Hallows — Part 2.','Voldemort’s Killing Curse destroyed the soul fragment in the Forbidden Forest, while Harry survived.']
];
document.querySelectorAll('.horcrux-card').forEach((card,index)=>{const item=horcruxes[index];if(!item)return;card.querySelector('h3').textContent=item[0];card.querySelector('p').textContent=item[1];card.querySelector('div:last-of-type').insertAdjacentHTML('beforeend',`<span class="horcrux-detail"><strong>Found:</strong> ${item[2]}<br><strong>Destroyed:</strong> ${item[3]}</span>`);card.setAttribute('role','link');card.setAttribute('tabindex','0');card.setAttribute('aria-label',`Read more about ${item[0]}`);const visit=()=>location.href=`horcrux-${index+1}.html`;card.addEventListener('click',visit);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')visit()})});
