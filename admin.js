const API = 'https://your-render-api-url.com'; // replace with actual

async function loadWithdrawals() {
  const res = await fetch(`${API}/withdrawals`);
  const data = await res.json();
  const tbody = document.querySelector("#withdrawal-table tbody");
  tbody.innerHTML = "";
  data.forEach(req => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${req.username}</td>
      <td>${req.amount}</td>
      <td>${req.status}</td>
      <td><button onclick="approve('${req.id}')">Approve</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function approve(id) {
  await fetch(`${API}/withdrawals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "approved" })
  });
  loadWithdrawals();
}

async function sendTask() {
  const task = document.getElementById("task").value;
  if (!task) return alert("Please enter a task.");
  await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  alert("Task sent to users!");
  document.getElementById("task").value = "";
}

loadWithdrawals();
