document.getElementById("ticketForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const ticket = {};
    formData.forEach((value, key) => ticket[key] = key === "ConcertId" || key === "Quantity" ? parseInt(value) : value);
  
    try {
      const response = await fetch("https://nscc-0490083-ticket-brejegejfzafa6fr.canadacentral-01.azurewebsites.net/api/TicketPurchase", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(ticket)
      });
  
      const statusMessage = document.getElementById("statusMessage");
  
      if (response.ok) {
        statusMessage.textContent = "Ticket purchased successfully!";
        statusMessage.style.color = "green";
        document.getElementById("ticketForm").reset();
      } else {
        const error = await response.text();
        statusMessage.textContent = `Error: ${error}`;
        statusMessage.style.color = "red";
      }
    } catch (err) {
      document.getElementById("statusMessage").textContent = "Failed to connect to server.";
      document.getElementById("statusMessage").style.color = "red";
    }
  });
  