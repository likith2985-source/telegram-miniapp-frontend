// ======= CONSTANTS & INITIALIZATION =======
const BASE_URL = "https://telegram-miniapp-backend-x5no.onrender.com"; // Backend URL
const tg = window.Telegram.WebApp; // Telegram WebApp object
tg.expand(); // Make app fullscreen

const user = tg.initDataUnsafe?.user || {};
const botUsername = tg.initDataUnsafe?.bot?.username || "";

// ======= MAIN ENTRY: On Load =======
window.onload = async () => {
  if (user && user.id) {
    await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        name: user.first_name,
        username: user.username
      })
    });
  }

  displayUserProfile();
  fetchUserData();
  goHome(); // Default screen
};

// ======= DISPLAY USER PROFILE =======
function displayUserProfile() {
  const profileDiv = document.getElementById('profile');
  if (profileDiv) {
    profileDiv.innerHTML = `
      <p><strong>User:</strong> ${user?.first_name || 'Guest'}</p>
      <p><strong>ID:</strong> ${user?.id || 'Unknown'}</p>
    `;
  }
}

// ======= FETCH USER DATA & RENDER =======
function fetchUserData() {
  fetch(`${BASE_URL}/get-user?id=${user.id}`)
    .then(res => res.json())
    .then(userData => {
      renderUserInfo(userData); // Define this in HTML
      renderTasks(userData);
    });
}

// ======= TASK RENDERING =======
function renderTasks(user) {
  const taskContainer = document.getElementById('taskContainer');
  if (!taskContainer) return;

  taskContainer.innerHTML = '';

  if (user.tasks && user.tasks.length > 0) {
    user.tasks.forEach((taskObj, index) => {
      const taskEl = document.createElement('div');
      taskEl.className = 'task-box';
      taskEl.innerHTML = `
        <strong>Task ${index + 1}</strong><br>
        ${taskObj.task}<br>
        <small>${new Date(taskObj.time).toLocaleString()}</small>
        <hr>
      `;
      taskContainer.appendChild(taskEl);
    });
  } else {
    taskContainer.innerHTML = '<p>No tasks assigned yet.</p>';
  }
}

// ======= MAIN NAVIGATION =======
function goHome() {
  document.getElementById("content").innerHTML = `
    <h3>📺 Watch Ads & Earn</h3>
    <button id="watchAdBtn">Watch Ad</button>
  `;
  document.getElementById("watchAdBtn").addEventListener("click", watchAdProcess);
}

function showReferrals() {
  const referralLink = user?.id ? `https://t.me/${botUsername}?start=${user.id}` : '';
  document.getElementById("content").innerHTML = `
    <h3>👥 Invite Friends</h3>
    <p>Share your link to earn rewards:</p>
    <input type="text" value="${referralLink}" readonly style="width: 100%; padding: 8px;">
  `;
}

function showProfile() {
  document.getElementById("content").innerHTML = `
    <h3>👤 Your Profile</h3>
    <p>Name: ${user?.first_name}</p>
    <p>ID: ${user?.id}</p>
  `;
}

function showWithdrawals() {
  document.getElementById("content").innerHTML = `
    <h3>💸 Withdraw</h3>
    <button id="withdrawBtn">Request Withdrawal</button>
    <p id="withdrawMessage"></p>
  `;

  document.getElementById('withdrawBtn').addEventListener('click', () => {
    fetch(`${BASE_URL}/withdraw-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => Promise.reject(text));
        return res.text();
      })
      .then(msg => {
        document.getElementById('withdrawMessage').innerText = msg;
      })
      .catch(err => {
        document.getElementById('withdrawMessage').innerText = err;
      });
  });
}

// ======= AD WATCH & REWARD =======
async function watchAdProcess() {
  show_9666357()
    .then(async () => {
      const res = await fetch(`${BASE_URL}/add-earning`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          amount: 1
        })
      });

      const data = await res.json();
      alert(`You've earned 1 coin! Total: ${data.totalEarnings}`);
    })
    .catch(() => {
      alert("Ad was skipped or failed.");
    });
}
