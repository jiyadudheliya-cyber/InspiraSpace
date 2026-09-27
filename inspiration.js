const designs = [
  {id:"1",title:"Warm Modern Living",room:"Living Room",style:"Warm",material:"Wood",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",desc:"Soft neutrals, natural wood and comfortable seating."},
  {id:"2",title:"Quiet Bedroom",room:"Bedroom",style:"Minimal",material:"Fabric",image:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",desc:"A calm bedroom with simple forms and warm textures."},
  {id:"3",title:"Modern Kitchen",room:"Kitchen",style:"Modern",material:"Stone",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",desc:"Clean lines, practical storage and a timeless palette."},
  {id:"4",title:"Natural Office",room:"Office",style:"Natural",material:"Wood",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",desc:"A bright work area with greenery and natural textures."},
  {id:"5",title:"Stone Luxury Bath",room:"Bathroom",style:"Luxury",material:"Marble",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",desc:"Stone surfaces and soft lighting create a premium feel."},
  {id:"6",title:"Minimal Kitchen",room:"Kitchen",style:"Minimal",material:"Tiles",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",desc:"Simple cabinets, open space and subtle material contrast."},
  {id:"7",title:"Soft Neutral Bedroom",room:"Bedroom",style:"Warm",material:"Fabric",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",desc:"Layered textiles and neutral colours for a restful room."},
  {id:"8",title:"Elegant Living Space",room:"Living Room",style:"Luxury",material:"Marble",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",desc:"Statement lighting, stone and elegant furniture."},
  {id:"9",title:"Fresh Green Office",room:"Office",style:"Natural",material:"Plants",image:"https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=900&q=80",desc:"Greenery and daylight make a workspace feel fresh."}
];

let selectedRoom = "All";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  selectedRoom = params.get("room") || "All";
  document.getElementById("roomFilter").value = selectedRoom;
  renderDesigns();
  document.getElementById("searchInput").addEventListener("input", renderDesigns);
  document.getElementById("roomFilter").addEventListener("change", e => {
    selectedRoom = e.target.value;
    updatePills();
    renderDesigns();
  });
  document.getElementById("styleFilter").addEventListener("change", renderDesigns);
  document.querySelectorAll(".pill").forEach(pill => pill.addEventListener("click", () => {
    selectedRoom = pill.dataset.room;
    document.getElementById("roomFilter").value = selectedRoom;
    updatePills();
    renderDesigns();
  }));
  updatePills();
});

function renderDesigns() {
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const style = document.getElementById("styleFilter").value;
  const results = designs.filter(d => {
    const text = `${d.title} ${d.room} ${d.style} ${d.material} ${d.desc}`.toLowerCase();
    return (selectedRoom === "All" || d.room === selectedRoom) &&
           (style === "All" || d.style === style) &&
           text.includes(search);
  });
  const grid = document.getElementById("inspirationGrid");
  const empty = document.getElementById("noResults");
  grid.innerHTML = results.map(designCard).join("");
  empty.classList.toggle("hidden", results.length !== 0);
  bindButtons();
}

function designCard(d) {
  const saved = getSavedIds().includes(d.id);
  return `<article class="design-card">
    <div class="design-image"><img src="${d.image}" alt="${d.title}">
      <button class="save-btn ${saved ? "saved" : ""}" data-id="${d.id}">${saved ? "♥" : "♡"}</button>
    </div>
    <div class="design-info"><p class="eyebrow">${d.room} • ${d.style}</p><h3>${d.title}</h3><p>${d.desc}</p><div class="card-meta"><span>Material: ${d.material}</span><span>${saved ? "Saved" : "Save idea"}</span></div></div>
  </article>`;
}

function bindButtons() {
  document.querySelectorAll(".save-btn").forEach(btn => btn.addEventListener("click", () => {
    if (!isLoggedIn()) {
      showToast("Please login to save inspiration.");
      return;
    }
    let ids = getSavedIds();
    const id = btn.dataset.id;
    if (ids.includes(id)) {
      ids = ids.filter(x => x !== id);
      btn.textContent = "♡"; btn.classList.remove("saved"); showToast("Removed from saved.");
    } else {
      ids.push(id);
      btn.textContent = "♥"; btn.classList.add("saved"); showToast("Saved to your collection.");
    }
    setSavedIds(ids);
  }));
}

function updatePills() {
  document.querySelectorAll(".pill").forEach(p => p.classList.toggle("active", p.dataset.room === selectedRoom));
}
