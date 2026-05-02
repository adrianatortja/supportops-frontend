const DETAIL_API_BASE_URL = "http://127.0.0.1:8000/api";

const token = localStorage.getItem("accessToken");

const ticketDetail = document.getElementById("ticketDetail");
const suggestedReply = document.getElementById("suggestedReply");
const logoutButton = document.getElementById("logoutButton");
const deleteTicketButton = document.getElementById("deleteTicketButton");

if (!token) {
  window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get("id");

if (!ticketId) {
  ticketDetail.innerHTML = "<p>No ticket ID found. Please go back to the dashboard and click View Details.</p>";
  suggestedReply.innerHTML = "<p>Suggested reply cannot be loaded without a ticket ID.</p>";
}

async function loadTicketDetail() {
  try {
    const response = await fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/`, {
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
      ticketDetail.innerHTML = "<p>Could not load ticket.</p>";
      console.log("Ticket detail response error:", response.status);
      return;
    }

    const ticket = await response.json();

    ticketDetail.innerHTML = `
      <p><strong>Subject:</strong> ${ticket.subject}</p>
      <p><strong>Message:</strong> ${ticket.message}</p>
      <p><strong>Status:</strong> ${ticket.status}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      <p><strong>Priority:</strong> ${ticket.priority}</p>
      <p><strong>Created At:</strong> ${new Date(ticket.created_at).toLocaleString()}</p>
    `;
  } catch (error) {
    ticketDetail.innerHTML = "<p>Something went wrong while loading the ticket.</p>";
    console.log("Load ticket detail error:", error);
  }
}

async function loadSuggestedReply() {
  try {
    const response = await fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/suggested-reply/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      suggestedReply.innerHTML = "<p>Could not load suggested reply.</p>";
      console.log("Suggested reply response error:", response.status);
      return;
    }

    const data = await response.json();

    suggestedReply.innerHTML = `
      <p>${data.suggested_reply}</p>
    `;
  } catch (error) {
    suggestedReply.innerHTML = "<p>Something went wrong while loading the suggested reply.</p>";
    console.log("Load suggested reply error:", error);
  }
}

async function deleteTicket() {
  const confirmDelete = confirm("Are you sure you want to delete this ticket?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${DETAIL_API_BASE_URL}/tickets/${ticketId}/`, {
      method: "DELETE",
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
      alert("Could not delete ticket.");
      console.log("Delete ticket response error:", response.status);
      return;
    }

    alert("Ticket deleted successfully.");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Something went wrong while deleting the ticket.");
    console.log("Delete ticket error:", error);
  }
}

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "index.html";
});

deleteTicketButton.addEventListener("click", deleteTicket);

if (ticketId) {
  loadTicketDetail();
  loadSuggestedReply();
}