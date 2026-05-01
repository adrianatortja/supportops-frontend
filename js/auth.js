const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");

loginTab.addEventListener("click", function () {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");

  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");

  loginMessage.textContent = "";
  registerMessage.textContent = "";
});

registerTab.addEventListener("click", function () {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");

  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");

  loginMessage.textContent = "";
  registerMessage.textContent = "";
});

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  registerMessage.textContent = "Creating account...";

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password2: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessages = Object.values(data).flat().join(" ");
      registerMessage.textContent =
        errorMessages || `Registration failed. Status: ${response.status}`;
      return;
    }

    registerMessage.textContent = "Account created successfully. You can now login.";
    registerForm.reset();
  } catch (error) {
    registerMessage.textContent = "Connection error. Check backend, CORS, or API URL.";
    console.log("Fetch error:", error);
  }
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  loginMessage.textContent = "Logging in...";

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      loginMessage.textContent = "Login failed. Check your username and password.";
      console.log(data);
      return;
    }

    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    loginMessage.textContent = "Login successful. Redirecting...";

    window.location.href = "dashboard.html";
  } catch (error) {
    loginMessage.textContent = "Connection error. Check backend, CORS, or API URL.";
    console.log("Fetch error:", error);
  }
});
