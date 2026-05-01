const accessToken = localStorage.getItem("accessToken");

const createTicketForm = document.getElementById("create-ticket-form");
const createTicketMessage = document.getElementById("create-ticket-message");

if (!accessToken) {
  window.location.href = "index.html";
}

createTicketForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const subject = document.getElementById("ticket-subject").value;
  const description = document.getElementById("ticket-description").value;

  createTicketMessage.textContent = "Creating ticket...";

  try {
    const response = await fetch(`${API_BASE_URL}/tickets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        subject: subject,
        message: description,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessages = Object.values(data).flat().join(" ");
      createTicketMessage.textContent =
        errorMessages || "Could not create ticket.";
      console.log(data);
      return;
    }

    createTicketMessage.textContent = "Ticket created successfully.";

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 800);
  } catch (error) {
    createTicketMessage.textContent = "Connection error while creating ticket.";
    console.log("Create ticket error:", error);
  }
});