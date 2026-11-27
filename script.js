'use strict';

// Keep these notes in sync with the visible cards. Status is a dated snapshot.
const projects = {
  odysselya: {
    title: 'Shinseiki Odysselya',
    body: `<p>English v0.9 is the first public beta of the fan translation for VIC TOKAI’s 1993 Super Famicom RPG. It includes the English opening, all 5,301 extracted dialogue entries, translated menus, and updated battle cries.</p><p>The download includes a BPS patch, an English walkthrough through Chapter 4, and the labeled 550 BC world map. Apply the patch to a clean, unheadered Japanese copy of Shinseiki Odysselya.</p><p>Press Select+B during free movement to open Assist and adjust random encounters, battle EXP, or gold. Later chapters still need broader playtesting, and some title, chapter, and credits graphics remain in Japanese. The gallery shows development captures. The translation was made with extensive AI assistance, and playtesting feedback is welcome.</p>`,
    links: [
      ['v0.9 release & download', 'https://github.com/mlastes1987/odysselya-eng/releases/tag/v0.9'],
      ['Project page', 'https://github.com/mlastes1987/odysselya-eng'],
      ['Community', 'https://discord.gg/DwR2jxj5b']
    ]
  },
  srw: { title: 'Super Robot Wars HD', body: `<p>English translation of Super Robot Taisen HD / Super Robot Wars HD, including story and battle dialogue, menus, unit information, and artwork.</p><h3>Current playtest builds</h3><ul><li><strong>PS3:</strong> 0.1.10-preview for Japanese NPJB00514 in RPCS3, with a Windows patcher.</li><li><strong>PS Vita:</strong> 0.1.11-vita-preview for PCSG00260, packaged as a rePatch overlay.</li></ul><p>The November 22 previews keep intermission help on one line, fit upgrade effects inside their panels, and add English Upgrade Unit and Upgrade Item banners. Automated checks passed. The updated layouts still need an in-game visual check. Ask about build availability on Discord. Vita hardware compatibility still needs confirmation. The gallery shows PS3 / RPCS3 captures.</p>`, links: [['Project & guides','https://github.com/mlastes1987/SRTHD-En'],['Get test builds','https://discord.gg/DwR2jxj5b'],['Report a bug','https://github.com/mlastes1987/SRTHD-En/issues']] },
  emerald: { title: 'Emerald Earth Fire', body: `<p>A Pokémon Emerald decompilation ROM hack based on RHH’s <strong>pokeemerald-expansion 1.17.0</strong>.</p><p>The source builds the two-region adventure. After the Hoenn League, players can travel from Lilycove to Vermilion, receive a Kanto starter, earn a separate set of badges, and visit the Sevii Islands.</p><p>The v0.4-beta build adds a red-sky Rayquaza title screen and fixes regional progression and save handling. Birch offers Sprigatito, Chimchar, or Sobble. A new game starts with 35,000 Pokédollars and supplies in the bedroom PC. DexNav becomes available after receiving the Pokédex. The integration check passed 5,177 headless tests, and a separate emulator check verified the title animation and transition to the main menu. A full Hoenn-to-Kanto playthrough is still pending. The public repository provides source and build instructions.</p><p>Credit to RHH, pokeemerald-expansion contributors, and pret’s Pokémon Emerald decompilation.</p>`, links: [['Project source','https://github.com/mlastes1987/EmeraldEarthFire'],['Upstream engine','https://github.com/rh-hideout/pokeemerald-expansion']] },
  'odysselya-ii': {
    title: 'Shinseiki Odysselya II',
    body: `<p>English translation in progress for the Super Famicom sequel.</p><p>The November 23 internal playtest has English for all 6,758 entries in the current script index. The latest build translates the Gear slot markers, combat stats, seven weapon proficiencies, and sixteen magic schools. Emulator checks covered the Gear and Status screens and the opening through the Sparta exit. Later scenes still need in-game testing, and battle effects, graphics, and credits remain in development.</p><p>The gallery shows earlier captures of the Sparta dialogue and field menus. The shared project repository tracks both games, and the sequel patch is forthcoming.</p>`,
    links: [['Shared project page', 'https://github.com/mlastes1987/odysselya-eng#project-status']]
  },
  unitron: {
    title: 'Kikou Seiki Unitron',
    body: `<p>English fan translation in development for the Neo Geo Pocket Color RPG. The preview uses a proportional font adapted from the Shinseiki Odysselya translation.</p><p>The latest local preview covers the menus and prologue, then follows the story through the Spirit Shrine, Silver Lake, Verdant Forest, the Black Knight encounter at Rafias, and the Mirage Tower briefing. It translates the battle interface and all named equipment catalogue entries. Later story scenes, most enemy names and enemy-specific moves, and some partner battle dialogue remain in progress.</p><p>The public repository has IPS patch build instructions. The gallery shows earlier preview captures.</p>`,
    links: [['Project & build instructions', 'https://github.com/mlastes1987/unitron']]
  }
};
const galleries = {
  unitron: {
    title: 'Kikou Seiki Unitron',
    pixel: true,
    shots: [
      ['unitron-menu.png', 'The translated main menu.'],
      ['unitron-prologue.png', 'English text in the scrolling prologue.'],
      ['unitron-battle.png', 'The translated battle command menu and prompt.']
    ]
  },
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
  galleryDialog.querySelector('.gallery-controls').hidden = galleries[activeGallery].shots.length === 1;
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
  document.querySelector('#notes-content').innerHTML=`<h2 id="notes-title">${project.title}</h2>${project.body}<div class="note-links">${project.links.map(([label,url])=>`<a href="${url}">${label} ↗</a>`).join('')}</div><p class="note-date">Status checked November 23, 2026</p>`;
  notesDialog.showModal();
}));
for(const dialog of [galleryDialog,notesDialog]){
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const bounds=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close();});
  dialog.addEventListener('close',()=>lastTrigger?.focus());
}
