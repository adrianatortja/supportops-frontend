

const accessToken = localStorage.getItem("accessToken");

const logoutButton = document.getElementById("logout-button");
const ticketsMessage = document.getElementById("tickets-message");
const ticketsList = document.getElementById("tickets-list");

const totalTicketsElement = document.getElementById("total-tickets");
const openTicketsElement = document.getElementById("open-tickets");
const highPriorityTicketsElement = document.getElementById("high-priority-tickets");

if (!accessToken) {
  window.location.href = "index.html";
}

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  window.location.href = "index.html";
});

async function fetchTickets() {
  ticketsMessage.textContent = "Loading tickets...";

  try {
    const response = await fetch(`${API_BASE_URL}/tickets/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      ticketsMessage.textContent = "Could not load tickets.";
      console.log(data);
      return;
    }

    updateDashboardStats(data);
    renderTickets(data);
  } catch (error) {
    ticketsMessage.textContent = "Connection error while loading tickets.";
    console.log("Fetch tickets error:", error);
  }
}

function updateDashboardStats(tickets) {
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(function (ticket) {
    return ticket.status === "open";
  }).length;

  const highPriorityTickets = tickets.filter(function (ticket) {
    return ticket.priority === "high";
  }).length;

  totalTicketsElement.textContent = totalTickets;
  openTicketsElement.textContent = openTickets;
  highPriorityTicketsElement.textContent = highPriorityTickets;
}

function renderTickets(tickets) {
  ticketsList.innerHTML = "";

  if (tickets.length === 0) {
    ticketsMessage.textContent = "No tickets yet.";
    return;
  }

  ticketsMessage.textContent = "";

  tickets.forEach(function (ticket) {
    const ticketCard = document.createElement("article");
    ticketCard.classList.add("ticket-card");

    ticketCard.innerHTML = `
      <div>
        <h3>${ticket.subject}</h3>
        <p>${ticket.message}</p>
      </div>

      <div class="ticket-meta">
        <span>${ticket.status}</span>
        <span>${ticket.category}</span>
        <span>${ticket.priority}</span>
      </div>

      <a class="ticket-link" href="ticket-detail.html?id=${ticket.id}">
        View Details
      </a>
    `;

    ticketsList.appendChild(ticketCard);
  });
}

fetchTickets();
