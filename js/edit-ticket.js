const EDIT_API_BASE_URL = "http://127.0.0.1:8000/api";

const token = localStorage.getItem("accessToken");

const editTicketForm = document.getElementById("editTicketForm");
const editMessage = document.getElementById("editMessage");
const logoutButton = document.getElementById("logoutButton");

const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const statusInput = document.getElementById("status");

if (!token) {
  window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get("id");

if (!ticketId) {
  editMessage.textContent = "No ticket ID found. Please go back to the dashboard.";
  editTicketForm.style.display = "none";
}

async function loadTicketForEdit() {
  try {
    const response = await fetch(`${EDIT_API_BASE_URL}/tickets/${ticketId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "index.html";
      return;
    }

    if (!response.ok) {
      editMessage.textContent = "Could not load ticket.";
      console.log("Load ticket for edit error:", response.status);
      return;
    }

    const ticket = await response.json();

    subjectInput.value = ticket.subject;
    messageInput.value = ticket.message;
    statusInput.value = ticket.status;
  } catch (error) {
    editMessage.textContent = "Something went wrong while loading the ticket.";
    console.log("Load ticket for edit error:", error);
  }
}

async function updateTicket(event) {
  event.preventDefault();

  const updatedTicket = {
    subject: subjectInput.value,
    message: messageInput.value,
    status: statusInput.value,
  };

  try {
    const response = await fetch(`${EDIT_API_BASE_URL}/tickets/${ticketId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTicket),
    });

    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "index.html";
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      editMessage.textContent = "Could not update ticket.";
      console.log(data);
      return;
    }

    editMessage.textContent = "Ticket updated successfully.";

    setTimeout(function () {
      window.location.href = `ticket-detail.html?id=${ticketId}`;
    }, 800);
  } catch (error) {
    editMessage.textContent = "Something went wrong while updating the ticket.";
    console.log("Update ticket error:", error);
  }
}

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "index.html";
});

editTicketForm.addEventListener("submit", updateTicket);

if (ticketId) {
  loadTicketForEdit();
}
