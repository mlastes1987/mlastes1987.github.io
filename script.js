'use strict';

// Keep these notes in sync with the visible cards. Status is a dated snapshot.
const projects = {
  odysselya: { title: 'Shinseiki Odysselya', body: `<p>An unofficial English fan translation of VIC TOKAI’s 1993 Super Famicom RPG.</p><h3>Where it stands</h3><p>All 5,167 extracted script messages have a reviewed first-pass English translation. An experimental English overlay is playable, with opening and menu emulator coverage. Later scenes, graphics text, and further polish remain in progress.</p><p>The public project is marked <strong>coming soon</strong>. A release date has not been announced. The screenshots are authentic development-build captures.</p><p>Development tools remain private. The translation was made with extensive AI assistance; corrections and playtesting feedback are welcome.</p>`, links: [['Project page','https://github.com/mlastes1987/odysselya-eng'],['Community','https://discord.gg/DwR2jxj5b']] },
  srw: { title: 'Super Robot Wars HD', body: `<p>English translation of Super Robot Taisen HD / Super Robot Wars HD: story, battle dialogue, menus, unit information, and English artwork.</p><h3>Available for testing</h3><ul><li><strong>PS3:</strong> 0.1.1-preview for Japanese NPJB00514 in RPCS3, with a Windows patcher.</li><li><strong>PS Vita:</strong> early 0.1.2-vita-preview for PCSG00260, packaged as a rePatch overlay.</li></ul><p>These are work-in-progress previews. Vita hardware compatibility and the latest runtime changes still need in-game confirmation. All screenshots here are <strong>PS3 / RPCS3 captures</strong>.</p><p>Join Discord for test builds. Reports of missing text, overflow, menu problems, and battle paging issues are especially useful.</p>`, links: [['Project & guides','https://github.com/mlastes1987/SRTHD-En'],['Get test builds','https://discord.gg/DwR2jxj5b'],['Report a bug','https://github.com/mlastes1987/SRTHD-En/issues']] },
  emerald: { title: 'Emerald Earth Fire', body: `<p>A Pokémon Emerald decompilation ROM hack based on RHH’s <strong>pokeemerald-expansion 1.17.0</strong>.</p><h3>The adventure</h3><p>The intended journey covers Hoenn’s eight badges and Elite Four, then Kanto’s eight badges and Elite Four. The development build includes a post-Hoenn-League Lilycove–Vermilion crossing, a Kanto starter gift, separate regional badge flags, and access to the Sevii Islands.</p><h3>Development status</h3><p>The local Emerald build and focused save, trainer-data, and progression checks pass. <strong>Full in-game progression remains unverified.</strong> The public repository may trail local development.</p><p>The card is project artwork. Gameplay screenshots will be added when available.</p><p>Credit to RHH, pokeemerald-expansion contributors, and pret’s Pokémon Emerald decompilation.</p>`, links: [['Project source','https://github.com/mlastes1987/EmeraldEarthFire'],['Upstream engine','https://github.com/rh-hideout/pokeemerald-expansion']] },
};
const galleries = {
  odysselya: { title:'Shinseiki Odysselya',pixel:true,shots:[['odysselya-dialogue.png','Koror and Kyle in the sanctuary. English dialogue from a work-in-progress SNES build.'],['odysselya-battle.png','English battle dialogue against a moonlit backdrop. Work in progress.'],['odysselya-exploration.png','Exploring a snowy landscape in the development build.'],['odysselya-equipment.png','English equipment and party menus. Layout and text remain subject to polish.']] },
  srw: { title:'Super Robot Wars HD',pixel:false,shots:[['srw-prelude.png','Translated prelude. Authentic PS3 / RPCS3 capture, not a Vita screenshot.'],['srw-title-screen.png','English logo and faithful menu artwork. PS3 / RPCS3 capture approved November 4, 2026.'],['srw-episode-briefing.png','Episode title and English briefing. PS3 / RPCS3 development capture.']] },
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
  document.querySelector('#notes-content').innerHTML=`<h2 id="notes-title">${project.title}</h2>${project.body}<div class="note-links">${project.links.map(([label,url])=>`<a href="${url}">${label} ↗</a>`).join('')}</div><p class="note-date">Project snapshot · November 5, 2026</p>`;
  notesDialog.showModal();
}));
for(const dialog of [galleryDialog,notesDialog]){
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{const bounds=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close();});
  dialog.addEventListener('close',()=>lastTrigger?.focus());
}
