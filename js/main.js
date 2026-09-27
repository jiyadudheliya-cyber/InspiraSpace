const currentPage = document.body.dataset.page;

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupTheme();
  setupFooter();
  updateLoginLink();
});

function setupNavigation() {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("mainNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  }

  document.querySelectorAll("#mainNav a").forEach(link => {
    const href = link.getAttribute("href") || "";
    if ((currentPage === "home" && href === "index.html") ||
        (currentPage !== "home" && href.includes(currentPage))) {
      link.classList.add("active");
    }
  });
}

function setupTheme() {
  const savedTheme = localStorage.getItem("inspiraspaceTheme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  const themeBtn = document.getElementById("themeBtn");
  if (themeBtn) {
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const dark = document.body.classList.contains("dark");
      localStorage.setItem("inspiraspaceTheme", dark ? "dark" : "light");
      themeBtn.textContent = dark ? "☀️" : "🌙";
    });
  }
}

function setupFooter() {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-top">
      <div>
        <div class="footer-logo">InspiraSpace</div>
        <p class="footer-text">Interior ideas, materials and design stories for spaces that feel like home.</p>
      </div>
      <div class="footer-links">
        <a href="index.html">Home</a><a href="inspiration.html">Inspiration</a><a href="materials.html">Materials</a><a href="blog.html">Blog</a><a href="about.html">About</a>
      </div>
    </div>
    <div class="footer-bottom"><span>© 2026 InspiraSpace</span><span>Built with HTML • CSS • JavaScript</span></div>`;
}

function updateLoginLink() {
  const link = document.getElementById("loginLink");
  if (!link) return;
  const user = JSON.parse(localStorage.getItem("inspiraspaceCurrentUser") || "null");
  if (user) {
    link.textContent = "Hi, " + user.name.split(" ")[0];
    link.href = "login.html";
    link.title = "Click to manage your account";
  } else {
    link.textContent = "Login";
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2300);
}

function getSavedIds() {
  return JSON.parse(localStorage.getItem("inspiraspaceSaved") || "[]");
}

function setSavedIds(ids) {
  localStorage.setItem("inspiraspaceSaved", JSON.stringify(ids));
}

function isLoggedIn() {
  return !!localStorage.getItem("inspiraspaceCurrentUser");
}

