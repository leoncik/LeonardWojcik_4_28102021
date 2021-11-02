/////////////////////////////
// Form fields validation //
///////////////////////////

function fieldsValiation() {

    // Check if the first name is valid

    let firstName = document.getElementById("first-name");
    if (firstName.value =="") {
        alert("Veuillez saisir un nom");
    }
    else if (firstName.value.length < 2) {
        alert("Votre nom doit contenir au moins deux caractères");
    }

    // Check if the last name is valid

    let lastName = document.getElementById("last-name");
    if (lastName.value =="") {
        alert("Veuillez saisir un nom de famille");
    }
    else if (lastName.value.length < 2) {
        alert("Votre nom de famille doit contenir au moins deux caractères");
    }

}

////////////////////////////
// Form submit validation //
///////////////////////////

// Retrieve DOM data of the form

let contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    // prevent validation if the form is not complete.
    e.preventDefault();
    fieldsValiation();
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
        // Add red border around the invalid field (TODO : add this border on ALL invalid fields)
        var errorBorder = document.querySelector('.formData');
        errorBorder.setAttribute('data-error-visible', 'true');
        return false;
    }
}