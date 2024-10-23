// src/services/formSubmit.js
export const sendForm = async (formData) => {
    const response = await fetch("https://formsubmit.co/tu-email@example.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  };
  