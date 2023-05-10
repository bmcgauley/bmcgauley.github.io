document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("send-button");
  
    button.addEventListener("click", async () => {
      try {
        const response = await fetch("/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Send a message to Discord" }),
        });
  
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
        } else {
          alert("Error: " + response.statusText);
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  });
  