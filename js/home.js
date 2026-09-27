const homeDesigns = [
  {id:"1",title:"Warm Modern Living",room:"Living Room",style:"Warm",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",desc:"Soft neutrals, natural wood and comfortable seating."},
  {id:"2",title:"Quiet Bedroom",room:"Bedroom",style:"Minimal",image:"https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",desc:"A calm bedroom with simple forms and warm textures."},
  {id:"3",title:"Modern Kitchen",room:"Kitchen",style:"Modern",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",desc:"Clean lines, practical storage and a timeless palette."}
];

document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("homeCards");
  if (!box) return;
  box.innerHTML = homeDesigns.map(d => designCard(d)).join("");
  bindSaveButtons();
});

function designCard(d) {
  const saved = getSavedIds().includes(d.id);
  return `<article class="design-card">
    <div class="design-image"><img src="${d.image}" alt="${d.title}"><button class="save-btn ${saved ? "saved" : ""}" data-id="${d.id}" aria-label="Save ${d.title}">${saved ? "♥" : "♡"}</button></div>
    <div class="design-info"><p class="eyebrow">${d.room} • ${d.style}</p><h3>${d.title}</h3><p>${d.desc}</p><div class="card-meta"><span>Inspiration</span><span>♥ Save</span></div></div>
  </article>`;
}

function bindSaveButtons() {
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!isLoggedIn()) {
        showToast("Please login to save inspiration.");
        return;
      }
      let ids = getSavedIds();
      const id = btn.dataset.id;
      if (ids.includes(id)) {
        ids = ids.filter(x => x !== id);
        btn.textContent = "♡";
        btn.classList.remove("saved");
        showToast("Removed from saved.");
      } else {
        ids.push(id);
        btn.textContent = "♥";
        btn.classList.add("saved");
        showToast("Saved to your collection.");
      }
      setSavedIds(ids);
    });
  });
}
