/////////////////////////////
// Form fields validation //
///////////////////////////

let firstName = document.getElementById("first-name");

////////////////////////////
// Form submit validation //
///////////////////////////

// Retrieve DOM data of the form

let contactForm = document.getElementById("contact-form");

// Send an alert message when the form has been completed
contactForm.addEventListener("submit", (e) => {
    // prevent validation if the form is not complete.
    e.preventDefault();
    // retrieve all "input" tags with a "required attribute"
    let fields = document.querySelectorAll("input[required]");
    // this variable will be set to "false" if one field is not valid
    let valid = true;

    // Check validity of every field
    fields.forEach((field) => {
        // If the field is not valid, return false
        if (! validateField(field)){
            valid = false;
        }
    } );
    // If the field is valid, submit form and display message
    if(valid){
        e.target.submit();
        alert('Merci pour votre inscription !');
    }


}, false);

// Check if a field is valid or not.
function validateField(field){
    if (field.checkValidity()){
        return true;
    } else {
        return false;
    }
}