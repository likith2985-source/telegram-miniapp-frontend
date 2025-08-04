// ======= CONSTANTS & INITIALIZATION =======
const BASE_URL = "https://telegram-miniapp-backend-x5no.onrender.com"; // Backend URL
const tg = window.Telegram.WebApp; // Telegram WebApp object
tg.expand(); // Make app fullscreen

const user = tg.initDataUnsafe?.user || {};
const botUsername = tg.initDataUnsafe?.bot?.username || "";

// ======= MAIN ENTRY: On Load =======
window.onload = async () => {
  // Register user with backend
  if (user && user.id) {
    await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: user.id,
        name: user.first_name,
        username: user.username
      })
    });
  }
  displayUserProfile();
  goHome();
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

// ======= NAVIGATION FUNCTIONS =======
function goHome() {
  document.getElementById("content").innerHTML = `
    <h3>📺 Watch Ads & Earn</h3>
    <button id="watchAdBtn">Watch Ad</button>
  `;
  // Attach event handler
  const watchBtn = document.getElementById("watchAdBtn");
  if (watchBtn) watchBtn.addEventListener("click", watchAdProcess);
}

function showWithdrawals() {
  document.getElementById("content").innerHTML = `
    <h3>💰 Withdrawal</h3>
    <p>Invite 5 friends before withdrawing.</p>
    <button onclick="requestWithdrawal()">Request Withdrawal</button>
  `;
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

// ======= MAIN ACTIONS =======
async function watchAdProcess() {
  // Replace this line with your Monetag ad or rewarded ad logic
  show_9666357().then(async () => {
    // Reward the user after ad is completed
    const res = await fetch(`${BASE_URL}/add-earning`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        amount: 1 // reward amount
      })
    });

    const data = await res.json();
    alert(`You've earned 1 coin! Total: ${data.totalEarnings}`);
  }).catch(() => {
    alert("Ad was skipped or failed.");
  });
}

function requestWithdrawal() {
  alert("💸 Withdrawal request sent (mock).");
  // Implement real withdrawal API call if needed
}

// ======= TASKS RENDERING =======
function renderTasks(user) {
  const taskContainer = document.getElementById('taskContainer');
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

// ======= FETCH USER DATA AND RENDER INFO & TASKS =======
// Replace 'your-backend-url.onrender.com' and ensure userId is defined in scope!
fetch('https://telegram-miniapp-backend-x5no.onrender.com/get-user?id=' + userId)
  .then(res => res.json())
  .then(user => {
    renderUserInfo(user); // Make sure renderUserInfo is defined elsewhere
    renderTasks(user);
  });
