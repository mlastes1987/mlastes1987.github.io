'use strict';

// Keep these notes in sync with the visible cards. Status is a dated snapshot.
const projects = {
  odysselya: { title: 'Shinseiki Odysselya', body: `<p>An unofficial English fan translation of VIC TOKAI’s 1993 Super Famicom RPG.</p><p>The latest local playtest, R16, improves the Rasetsu party header and the formation markers and labels in Battle Mode. Emulator checks covered changing rows and returning to Items. The local BPS patch reproduces the tested build.</p><p>Public release is still marked coming soon, with no announced date. The gallery shows development captures. The translation was made with extensive AI assistance, and corrections and playtesting feedback are welcome.</p>`, links: [['Project page','https://github.com/mlastes1987/odysselya-eng'],['Community','https://discord.gg/DwR2jxj5b']] },
  srw: { title: 'Super Robot Wars HD', body: `<p>English translation of Super Robot Taisen HD / Super Robot Wars HD, including story and battle dialogue, menus, unit information, and artwork.</p><h3>Latest local preview packages</h3><ul><li><strong>PS3:</strong> 0.1.9-preview for Japanese NPJB00514 in RPCS3, with a Windows patcher.</li><li><strong>PS Vita:</strong> 0.1.10-vita-preview for PCSG00260, packaged as a rePatch overlay.</li></ul><p>The public repository lists earlier previews and directs players to Discord for test builds and feedback. Vita hardware compatibility still needs confirmation. The gallery shows PS3 / RPCS3 captures.</p>`, links: [['Project & guides','https://github.com/mlastes1987/SRTHD-En'],['Get test builds','https://discord.gg/DwR2jxj5b'],['Report a bug','https://github.com/mlastes1987/SRTHD-En/issues']] },
  emerald: { title: 'Emerald Earth Fire', body: `<p>A Pokémon Emerald decompilation ROM hack based on RHH’s <strong>pokeemerald-expansion 1.17.0</strong>.</p><p>The source builds the two-region adventure. After the Hoenn League, players can travel from Lilycove to Vermilion, receive a Kanto starter, earn a separate set of badges, and visit the Sevii Islands.</p><p>Focused save, trainer-data, and progression checks pass in the emulator. A full in-game playthrough is still pending. The public repository provides source and build instructions.</p><p>Credit to RHH, pokeemerald-expansion contributors, and pret’s Pokémon Emerald decompilation.</p>`, links: [['Project source','https://github.com/mlastes1987/EmeraldEarthFire'],['Upstream engine','https://github.com/rh-hideout/pokeemerald-expansion']] },
  namida: {
    title: 'Tengai Makyou III: Namida',
    body: `<p>English translation in progress for the Japanese PlayStation 2 RPG.</p><p>The main message archive yielded 27,635 indexed entries. The draft includes 1,063 hand-translated entries and a machine-assisted pass that still needs contextual review. Local Test 04 inserts the hand-translated event text through ev0323mes plus reviewed system and credits text.</p><p>In-game text fit and text outside the main archive still need work. A public patch is pending.</p>`,
    links: [['Tools & documentation', 'https://github.com/mlastes1987/namida']]
  },
  'odysselya-ii': {
    title: 'Shinseiki Odysselya II',
    body: `<p>English translation in progress for the Super Famicom sequel.</p><p>The current internal build includes 398 English text entries. An emulator test booted through the opening and verified Erg’s Sparta exit line. The 49 new Athens entries still need in-game review.</p><p>The gallery shows earlier captures of the Sparta dialogue and field menus. A public patch is pending.</p>`,
    links: []
  }
};
const galleries = {
  odysselya: { title:'Shinseiki Odysselya',pixel:true,shots:[['odysselya-dialogue.png','Koror and Kyle in the sanctuary. English dialogue from a work-in-progress SNES build.'],['odysselya-battle.png','English battle dialogue against a moonlit backdrop. Work in progress.'],['odysselya-exploration.png','Exploring a snowy landscape in the development build.'],['odysselya-equipment.png','English equipment and party menus. Layout and text remain subject to polish.']] },
  srw: { title:'Super Robot Wars HD',pixel:false,shots:[['srw-prelude.png','Translated prelude. Authentic PS3 / RPCS3 capture, not a Vita screenshot.'],['srw-title-screen.png','English logo and faithful menu artwork. PS3 / RPCS3 capture approved November 4, 2026.'],['srw-episode-briefing.png','Episode title and English briefing. PS3 / RPCS3 development capture.']] },
  'odysselya-ii': {
    title: 'Shinseiki Odysselya II',
    pixel: true,
    shots: [
      ['odysselya-ii-sparta.png', 'Erg’s town-exit dialogue in Sparta, captured in the November 16 development build.'],
      ['odysselya-ii-party.png', 'The party overview with English field menu tabs, character names, and the Gold label.'],
      ['odysselya-ii-items.png', 'The item menu with English Use, Move, Discard, and Sort commands. Item names are still in Japanese.'],
      ['odysselya-ii-opening.png', 'The opening date caption, “509 BC,” in the Super Famicom preview.'],
      ['odysselya-ii-title.png', 'Original Shinseiki Odysselya II title logo during the opening.']
    ]
  }
};
const filters=document.querySelector('.filters');
filters.hidden=false;
filters.addEventListener('click',event=>{
  const button=event.target.closest('[data-filter]'); if(!button)return;
  filters.querySelectorAll('button').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected));});
  let visible=0;
  document.querySelectorAll('.project').forEach(project=>{const matches=button.dataset.filter==='all'||project.dataset.category===button.dataset.filter;project.hidden=!matches;if(matches)visible++;});
  document.querySelector('.project-count').textContent=`${visible} ${visible===1?'project':'projects'} in the collection`;
});
const galleryDialog=document.querySelector('#gallery-dialog');
const notesDialog=document.querySelector('#notes-dialog');
let activeGallery,shotIndex=0,lastTrigger;
function renderShot(){
  const gallery=galleries[activeGallery];const [file,caption]=gallery.shots[shotIndex];const img=document.querySelector('#gallery-image');
  img.src=`assets/screenshots/${file}`;img.alt=caption;img.classList.toggle('pixel',gallery.pixel);
  document.querySelector('#gallery-title').textContent=gallery.title;
  document.querySelector('#gallery-caption').textContent=caption;
  document.querySelector('#gallery-position').textContent=`${shotIndex+1} / ${gallery.shots.length}`;
}
function changeShot(direction){shotIndex=(shotIndex+direction+galleries[activeGallery].shots.length)%galleries[activeGallery].shots.length;renderShot();}
document.querySelectorAll('.gallery-trigger').forEach(button=>button.addEventListener('click',()=>{activeGallery=button.dataset.gallery;shotIndex=Number(button.dataset.index||0);lastTrigger=button;renderShot();galleryDialog.showModal();}));
document.querySelector('#gallery-prev').addEventListener('click',()=>changeShot(-1));
document.querySelector('#gallery-next').addEventListener('click',()=>changeShot(1));
galleryDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();changeShot(-1);}if(event.key==='ArrowRight'){event.preventDefault();changeShot(1);}});
document.querySelectorAll('.details-trigger').forEach(button=>button.addEventListener('click',()=>{
  const project=projects[button.dataset.project];lastTrigger=button;
  document.querySelector('#notes-content').innerHTML=`<h2 id="notes-title">${project.title}</h2>${project.body}<div class="note-links">${project.links.map(([label,url])=>`<a href="${url}">${label} ↗</a>`).join('')}</div><p class="note-date">Status checked November 20, 2026</p>`;
  notesDialog.showModal();
}));
for(const dialog of [galleryDialog,notesDialog]){
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const bounds=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close();});
  dialog.addEventListener('close',()=>lastTrigger?.focus());
}
