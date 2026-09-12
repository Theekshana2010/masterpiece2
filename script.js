const series=[
{name:"Breaking Bad",year:2008,rating:9.5,votes:"2.3M",genres:["Crime","Drama"],poster:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80",desc:"A chemistry teacher turns to a dangerous new life, creating consequences that grow far beyond his control."},
{name:"Stranger Things",year:2016,rating:8.6,votes:"1.4M",genres:["Sci-Fi","Drama"],poster:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",desc:"A group of friends uncover extraordinary mysteries in their small town."},
{name:"The Last of Us",year:2023,rating:8.7,votes:"700K",genres:["Drama","Action"],poster:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80",desc:"A survivor and a teenager travel through a changed world on a dangerous journey."},
{name:"Dark",year:2017,rating:8.7,votes:"430K",genres:["Sci-Fi","Mystery"],poster:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80",desc:"A missing child exposes secrets spanning generations in a mysterious town."},
{name:"The Boys",year:2019,rating:8.6,votes:"720K",genres:["Action","Comedy"],poster:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",desc:"A rebellious team takes on powerful celebrities with extraordinary abilities."},
{name:"Peaky Blinders",year:2013,rating:8.7,votes:"720K",genres:["Crime","Drama"],poster:"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=700&q=80",desc:"A formidable family builds its influence in post-war Birmingham."},
{name:"Sherlock",year:2010,rating:9.1,votes:"1.1M",genres:["Mystery","Crime"],poster:"https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80",desc:"A brilliant detective and his companion solve extraordinary cases."},
{name:"Better Call Saul",year:2015,rating:9.0,votes:"650K",genres:["Crime","Drama"],poster:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80",desc:"A small-time lawyer gradually becomes the man known for a very different kind of legal work."}
];
const genres=[...new Set(series.flatMap(s=>s.genres)),"Horror","Thriller","Comedy","Fantasy","Adventure","Historical"];
let favorites=JSON.parse(localStorage.getItem("serieshub-favs")||"[]");
const $=s=>document.querySelector(s);
function card(s,i){return `<article class="card" onclick="openModal('${s.name.replaceAll("'","\\'")}')"><div class="poster" style="background-image:url('${s.poster}')"><b class="rank">#${i+1}</b><button class="fav" onclick="event.stopPropagation();toggleFav('${s.name.replaceAll("'","\\'")}')">${favorites.includes(s.name)?"♥":"♡"}</button></div><div class="card-body"><h3>${s.name}</h3><div class="meta">${s.year} • ${s.genres.join(" • ")}</div><div class="rating">★ ${s.rating} <span>${s.votes} votes</span></div><div class="tags">${s.genres.map(g=>`<span class="tag">${g}</span>`).join("")}</div></div></article>`}
function render(list=series){let sorted=[...list].sort((a,b)=>b.rating-a.rating);$("#seriesCards").innerHTML=sorted.map((s,i)=>card(s,i)).join("");$("#trendingCards").innerHTML=series.slice(0,4).map((s,i)=>card(s,i)).join("");$("#favCount").textContent=favorites.length}
function renderGenres(){genres.forEach(g=>$("#genreGrid").insertAdjacentHTML("beforeend",`<button class="genre" onclick="filterGenre('${g}')">${g} ›</button>`))}
function toggleFav(n){favorites=favorites.includes(n)?favorites.filter(x=>x!==n):[...favorites,n];localStorage.setItem("serieshub-favs",JSON.stringify(favorites));render()}
function openModal(n){const s=series.find(x=>x.name===n);$("#modalBody").innerHTML=`<p class="eyebrow">${s.genres.join(" • ")}</p><h2 class="modal-title">${s.name}</h2><div class="meta">${s.year} • ${s.votes} votes</div><div class="modal-rating">★ ${s.rating} / 10</div><p class="modal-text">${s.desc}</p><div class="tags">${s.genres.map(g=>`<span class="tag">${g}</span>`).join("")}</div>`;$("#modal").classList.add("show")}
function filterGenre(g){$("#search").value=g;render(series.filter(s=>s.genres.includes(g)))}
$("#search").addEventListener("input",e=>{let q=e.target.value.toLowerCase();render(series.filter(s=>`${s.name} ${s.year} ${s.genres.join(" ")}`.toLowerCase().includes(q)))});
$("#sort").addEventListener("change",e=>{let q=$("#search").value.toLowerCase();let list=series.filter(s=>`${s.name} ${s.year} ${s.genres.join(" ")}`.toLowerCase().includes(q));if(e.target.value==="year")list.sort((a,b)=>b.year-a.year);if(e.target.value==="name")list.sort((a,b)=>a.name.localeCompare(b.name));render(list)});
$("#close").onclick=()=>$("#modal").classList.remove("show");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("show")};
$("#randomBtn").onclick=()=>openModal(series[Math.floor(Math.random()*series.length)].name);
$("#favBtn").onclick=()=>render(series.filter(s=>favorites.includes(s.name)));
$("#themeBtn").onclick=()=>document.body.classList.toggle("light");
render();renderGenres();
