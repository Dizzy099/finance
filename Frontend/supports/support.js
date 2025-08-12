document.addEventListener("DOMContentLoaded", () => {
    const supportForm = document.getElementById("support-form");
    supportForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const query = document.getElementById("query").value.trim();

        if (!name || !email || !query) {
            alert("Please fill out all fields before submitting.");
            return;
        }
        console.log("Form submitted:", { name, email, query });
        alert("Your request has been submitted successfully!");

        // Clear the form
        supportForm.reset();
    });

    const socialLinks = document.querySelectorAll(".social-icon a");
    socialLinks.forEach((link) => {
        link.addEventListener("click", () => {
            console.log(`Navigating to: ${link.href}`);
        });
    });
});

document.getElementById("supportForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) throw new Error("Something went wrong");
  
      const result = await response.json();
      alert("Support request sent successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send support request.");
    }
  });