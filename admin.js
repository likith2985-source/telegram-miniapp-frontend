// admin.js
const API_URL = 'https://telegram-miniapp-backend-x5no.onrender.com'; // Replace with actual Render backend URL

// Load withdrawal requests
window.onload = function () {
  fetch(`${API_URL}/withdrawals`)
    .then(res => res.json())
    .then(data => {
      const table = document.querySelector('#withdrawal-table tbody');
      data.forEach(req => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${req.user}</td>
          <td>${req.amount}</td>
          <td>${req.status}</td>
          <td>
            <button onclick="updateStatus(${req.id}, 'approved')">Approve</button>
            <button onclick="updateStatus(${req.id}, 'rejected')">Reject</button>
          </td>
        `;
        table.appendChild(row);
      });
    });
};

function updateStatus(id, status) {
  fetch(`${API_URL}/withdrawals/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  }).then(() => location.reload());
}

function sendTask() {
  const task = document.getElementById('task').value;
  fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  })
    .then(() => alert('Task sent to all users!'));
}
