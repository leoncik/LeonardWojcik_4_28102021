// Retrieve DOM data of the form

let contactForm = document.getElementById("contact-form");

// Send an alert message when the form has been completed
contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent validation if the form is not complete.
    alert('Merci pour votre inscription !');
}, false);
