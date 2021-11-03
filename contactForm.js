// TODO : fix error message duplication after several clicks on submit.

/////////////////////////////
// Form fields validation //
///////////////////////////

function fieldsValiation() {

    // Check if the first name is valid

    let firstName = document.getElementById("first-name");
    if (firstName.value =="") {
        // Add a custom error message
        firstName.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un nom.</span>`);
        // Add red border to the invalid field
        firstName.parentNode.setAttribute('data-error-visible', 'true');
    }
    else if (firstName.value.length < 2) {
        // Add a custom error message
        firstName.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Votre nom doit contenir au moins deux caractères.</span>`);
        // Add red border to the invalid field
        firstName.parentNode.setAttribute('data-error-visible', 'true');
    }

    // Check if the last name is valid

    let lastName = document.getElementById("last-name");
    if (lastName.value =="") {
        // Add a custom error message
        lastName.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un nom de famille.</span>`);
        // Add red border to the invalid field
        lastName.parentNode.setAttribute('data-error-visible', 'true');
    }
    else if (lastName.value.length < 2) {
        // Add a custom error message
        lastName.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Votre nom de famille doit contenir au moins deux caractères.</span>`);
        // Add red border to the invalid field
        lastName.parentNode.setAttribute('data-error-visible', 'true');
    }

    // Check if the e-mail address is valid

    let email = document.getElementById("email");
    if (email.value =="") {
        // Add a custom error message
        email.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre courriel.</span>`);
        // Add red border to the invalid field
        email.parentNode.setAttribute('data-error-visible', 'true');
    }

    // Check if the birthdate is valid

    let birthDate = document.getElementById("birthdate");
    if (birthDate.value =="") {
        // Add a custom error message
        birthDate.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre date de naissance.</span>`);
        // Add red border to the invalid field
        birthDate.parentNode.setAttribute('data-error-visible', 'true');
    }

    // Check if the tournament-quantity is valid
    // TODO : if the quantity is greater than 0, check if a radio box is checked.

    let tournamentQuantity = document.getElementById("tournament-quantity");
    if (tournamentQuantity.value =="") {
        // Add a custom error message
        tournamentQuantity.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir une valeur.</span>`);
        // Add red border to the invalid field
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    }

    // Check if the "condition term" are checked
    // TODO : fix the uncheckable checkbox after error message

    let acceptTerm = document.getElementById("checkbox1");
    console.log(acceptTerm);
    if (! acceptTerm.checked) {
        // Add a custom error message
        acceptTerm.insertAdjacentHTML('afterend', `<span class="error-message">Vous devez accepter les conditions d'utilisation.</span>`);
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
        return false;
    }
}