document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successBox = document.querySelector(".messenger-box-contact__msg");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      full_name: document.getElementById("full-name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("https://nati-production.up.railway.app/api/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Validation error:", err);
        alert("Failed to send message.");
        return;
      }

      // Success
      successBox.style.display = "block";
      form.reset();
    } catch (error) {
      console.error("Network error:", error);
      alert("Server error. Try again later.");
    }
  });
});
