const grid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const playerFilter = document.getElementById("playerFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("gameDialog");
const dialogContent = document.getElementById("dialogContent");
let games = [];

const palettes = [
  ["#e7c59c","#d99d75"],["#d6e77a","#a8bd83"],["#b7d3d0","#8db1aa"],
  ["#e7b8aa","#cf8c82"],["#c8c4e0","#9d9ac7"],["#e5d7a8","#c9b56f"],
  ["#c8d7e9","#91a9c6"],["#e0c8df","#bd9cbd"]
];
const symbols = ["✳","♟","◎","✦","◇","♜","✧","◈"];
function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function placeholder(game,index=0) {
  const p=palettes[index%palettes.length];
  return `<div class="cover-placeholder" style="--cover-a:${p[0]};--cover-b:${p[1]}"><span class="shape">${symbols[index%symbols.length]}</span><strong>${escapeHTML(game.title)}</strong><small>BOARDLAH GAME LIBRARY</small></div>`;
}
function coverMarkup(game,index) {
  if(game.image) return `<div class="cover"><img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.title)} cover" loading="lazy" onerror="this.parentElement.innerHTML='${placeholder(game,index).replace(/'/g,"&#39;")}'"></div>`;
  return `<div class="cover">${placeholder(game,index)}</div>`;
}
function gameCard(game,index) {
  const meta=[game.players?`♟ ${escapeHTML(game.players)} players`:"",game.playtime?`◷ ${escapeHTML(game.playtime)}`:""].filter(Boolean).join("");
  const tags=(game.category||[]).slice(0,2).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join("");
  return `<article class="game-card" tabindex="0" role="button" aria-label="View ${escapeHTML(game.title)} details" data-id="${escapeHTML(game.id)}">
    ${coverMarkup(game,index)}
    <div class="card-info"><h3 class="card-title">${escapeHTML(game.title)}</h3><div class="card-meta">${meta || "<span>Details coming soon</span>"}</div><div class="tag-row">${tags}</div></div>
  </article>`;
}
function populateFilters() {
  const categories=[...new Set(games.flatMap(g=>g.category||[]))].sort((a,b)=>a.localeCompare(b));
  categoryFilter.innerHTML='<option value="">All categories</option>'+categories.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
  const maxPlayers=Math.max(...games.map(g=>g.maxPlayers||0));
  const counts=[...new Set(games.filter(g=>g.minPlayers&&g.maxPlayers).flatMap(g=>[g.minPlayers,g.maxPlayers]))].sort((a,b)=>a-b);
  playerFilter.innerHTML='<option value="">Any player count</option>'+counts.map(n=>`<option value="${n}">${n} players</option>`).join("")+`<option value="10+">10+ players</option>`;
}
function filteredGames() {
  const q=searchInput.value.trim().toLowerCase();
  const p=playerFilter.value, d=difficultyFilter.value, c=categoryFilter.value;
  return games.filter(g=>{
    const searchable=[g.title,g.description,...(g.category||[]),...(g.bestFor||[])].join(" ").toLowerCase();
    const matchSearch=!q||searchable.includes(q);
    const matchPlayers=!p||(p==="10+"?(g.maxPlayers>=10):(g.minPlayers<=Number(p)&&g.maxPlayers>=Number(p)));
    const matchDifficulty=!d||g.difficulty===d;
    const matchCategory=!c||(g.category||[]).includes(c);
    return matchSearch&&matchPlayers&&matchDifficulty&&matchCategory;
  });
}
function render() {
  const results=filteredGames();
  resultCount.textContent=`${results.length} ${results.length===1?"GAME":"GAMES"} IN THE COLLECTION`;
  grid.innerHTML=results.map(g=>gameCard(g,games.indexOf(g))).join("");
  emptyState.hidden=results.length!==0;
}
function openDetails(id) {
  const game=games.find(g=>g.id===id); if(!game)return;
  const index=games.indexOf(game);
  const cover=game.image?`<img src="${escapeHTML(game.image)}" alt="${escapeHTML(game.title)} cover" onerror="this.parentElement.innerHTML='${placeholder(game,index).replace(/'/g,"&#39;")}'">`:placeholder(game,index);
  const categories=(game.category||[]).map(x=>`<span class="tag">${escapeHTML(x)}</span>`).join("")||"<p>Not added yet.</p>";
  const bestFor=(game.bestFor||[]).map(x=>`<span class="tag">${escapeHTML(x)}</span>`).join("")||"<p>Not added yet.</p>";
  dialogContent.innerHTML=`<div class="dialog-layout"><div class="dialog-cover">${cover}</div><div class="dialog-body"><p class="eyebrow">BOARDLAH GAME LIBRARY</p><h2>${escapeHTML(game.title)}</h2><p class="dialog-description">${escapeHTML(game.description||"Game description coming soon.")}</p>
  <div class="detail-list">
    <div class="detail-item"><small>Players</small><strong>${escapeHTML(game.players||"Not added")}</strong></div>
    <div class="detail-item"><small>Playtime</small><strong>${escapeHTML(game.playtime||"Not added")}</strong></div>
    <div class="detail-item"><small>Difficulty</small><strong>${escapeHTML(game.difficulty||"Not added")}</strong></div>
    <div class="detail-item"><small>Collection</small><strong>${game.title.toLowerCase().includes("expansion")?"Expansion":"Board game"}</strong></div>
  </div>
  <div class="detail-group"><h3>Mechanics / category</h3><div class="tag-row">${categories}</div></div>
  <div class="detail-group"><h3>Best for</h3><div class="tag-row">${bestFor}</div></div></div></div>`;
  dialog.showModal();
}
grid.addEventListener("click",e=>{const card=e.target.closest(".game-card");if(card)openDetails(card.dataset.id)});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("game-card")){e.preventDefault();openDetails(e.target.dataset.id)}});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
[searchInput,playerFilter,difficultyFilter,categoryFilter].forEach(el=>el.addEventListener(el===searchInput?"input":"change",render));
document.getElementById("clearFilters").addEventListener("click",()=>{searchInput.value="";playerFilter.value="";difficultyFilter.value="";categoryFilter.value="";render()});
document.getElementById("year").textContent=new Date().getFullYear();

fetch("games.json").then(r=>{if(!r.ok)throw new Error("Could not load games.json");return r.json()}).then(data=>{games=data;populateFilters();render()}).catch(err=>{resultCount.textContent="Could not load the game list";grid.innerHTML="<p>Please make sure games.json is in the same folder as index.html.</p>";console.error(err)});
