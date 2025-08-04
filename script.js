// ======= CONSTANTS & INITIALIZATION =======
const BASE_URL = "https://telegram-miniapp-backend-x5no.onrender.com"; // Backend URL
const tg = window.Telegram.WebApp; // Telegram WebApp object
tg.expand(); // Make app fullscreen

// ======= USER PROFILE LOGIC =======
const user = tg.initDataUnsafe?.user || {};
const botUsername = tg.initDataUnsafe?.bot?.username || "";

// ======= REGISTER USER ON LOAD & INITIAL DISPLAY =======
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

  // Show profile
  displayUserProfile();
  // Load Home on startup
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

// ======= NAVIGATION SCREENS =======
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
  // Call Monetag/rewarded ad SDK function; simulate with async for now
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
