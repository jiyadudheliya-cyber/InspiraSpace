document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const isLogin = tab.dataset.tab === "login";
    loginForm.classList.toggle("hidden", !isLogin);
    registerForm.classList.toggle("hidden", isLogin);
  }));

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    message.className = "form-message";

    if (!email || !password) {
      return setMessage(message, "Please fill all fields.", "error");
    }
    if (!isValidEmail(email)) {
      return setMessage(message, "Please enter a valid email address.", "error");
    }

    const users = JSON.parse(localStorage.getItem("inspiraspaceUsers") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return setMessage(message, "Email or password is incorrect.", "error");
    }

    localStorage.setItem("inspiraspaceCurrentUser", JSON.stringify({name:user.name,email:user.email}));
    setMessage(message, "Login successful! Opening your home page...", "success");
    setTimeout(() => location.href = "index.html", 800);
  });

  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;
    const message = document.getElementById("registerMessage");
    message.className = "form-message";

    if (!name || !email || !password || !confirm) return setMessage(message, "Please fill all fields.", "error");
    if (name.length < 2) return setMessage(message, "Please enter your full name.", "error");
    if (!isValidEmail(email)) return setMessage(message, "Please enter a valid email address.", "error");
    if (password.length < 6) return setMessage(message, "Password must be at least 6 characters.", "error");
    if (password !== confirm) return setMessage(message, "Passwords do not match.", "error");

    const users = JSON.parse(localStorage.getItem("inspiraspaceUsers") || "[]");
    if (users.some(u => u.email === email)) return setMessage(message, "An account with this email already exists.", "error");

    users.push({name,email,password});
    localStorage.setItem("inspiraspaceUsers", JSON.stringify(users));
    localStorage.setItem("inspiraspaceCurrentUser", JSON.stringify({name,email}));
    setMessage(message, "Account created successfully! Opening your home page...", "success");
    setTimeout(() => location.href = "index.html", 800);
  });

  const current = JSON.parse(localStorage.getItem("inspiraspaceCurrentUser") || "null");
  if (current) {
    const loginForm = document.getElementById("loginForm");
    loginForm.querySelector("h2").textContent = "You are logged in";
    loginForm.querySelector(".form-note").textContent = `Welcome, ${current.name}. You can continue exploring or log out below.`;
    loginForm.querySelector(".btn").textContent = "Logout";
    loginForm.querySelector(".btn").type = "button";
    loginForm.querySelector(".btn").addEventListener("click", () => {
      localStorage.removeItem("inspiraspaceCurrentUser");
      showToast("You have been logged out.");
      setTimeout(() => location.reload(), 600);
    });
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setMessage(element, text, type) {
  element.textContent = text;
  element.classList.add(type);
}
