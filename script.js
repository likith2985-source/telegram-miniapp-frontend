const BASE_URL = "https://telegram-miniapp-backend-x5no.onrender.com"; // Your actual URL

const tg = window.Telegram.WebApp;
tg.expand();

const user = {
  id: tg.initDataUnsafe.user.id,
  name: tg.initDataUnsafe.user.first_name,
  username: tg.initDataUnsafe.user.username,
};

// Register user when the app loads
window.onload = async () => {
  await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
};

// Step 5: script.js (Telegram WebApp API Integration & Button Actions)

let tg = window.Telegram.WebApp;
tg.expand(); // Make it fullscreen

const user = tg.initDataUnsafe.user;

// Display user profile
const profileDiv = document.getElementById('profile');
profileDiv.innerHTML = `
  <p><strong>User:</strong> ${user?.first_name || 'Guest'}</p>
  <p><strong>ID:</strong> ${user?.id || 'Unknown'}</p>
`;

// Navigation logic
function goHome() {
  document.getElementById("content").innerHTML = `
    <h3>📺 Watch Ads & Earn</h3>
    <button onclick="watchAd()">Watch Ad</button>
  `;
}

function showWithdrawals() {
  document.getElementById("content").innerHTML = `
    <h3>💰 Withdrawal</h3>
    <p>Invite 5 friends before withdrawing.</p>
    <button onclick="requestWithdrawal()">Request Withdrawal</button>
  `;
}

function showReferrals() {
  const referralLink = `https://t.me/${tg.initDataUnsafe?.bot?.username}?start=${user?.id}`;
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

function watchAd() {
  alert("🪙 Ad watched. Reward will be added (mock).");
  // Later: integrate with Monetag script here
}

function requestWithdrawal() {
  alert("💸 Withdrawal request sent (mock).");
  // Later: send POST to backend API
}

// Load Home on startup
goHome();

