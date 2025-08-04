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
