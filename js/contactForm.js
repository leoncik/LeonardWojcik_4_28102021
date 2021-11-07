// TODO : fix error message duplication after several clicks on submit.
// TODO : create functions to reset field error color.

/////////////////////////////
// DOM elements           //
///////////////////////////

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("tournament-quantity");
const acceptTerm = document.getElementById("checkbox1");
const contactForm = document.getElementById("contact-form");
let errorMessages = document.getElementsByClassName("error-message");

/////////////////////////////
// Form fields validation //
///////////////////////////


// Check if the name and surname fields are valid.

const checkInputText = (elt, key) => {
    if (elt.value === '') {
        // Add a custom error message
        elt.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un ${key}.</span>`);
        // Add red border to the invalid field
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else if (elt.value.length < 2) {
        // Add a custom error message
        elt.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Votre ${key} doit contenir au moins deux caractères.</span>`);
        // Add red border to the invalid field
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        elt.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}

// Mail  regex

let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Check if the e-mail address is valid

const checkEmail = () => {
    if (email.value =="") {
    // Add a custom error message
    email.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre courriel.</span>`);
    // Add red border to the invalid field
    email.parentNode.setAttribute('data-error-visible', 'true');
    } else if (! email.value.match(mailformat)) {
        email.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un courriel valide.</span>`);
    } else {
        email.parentNode.setAttribute('data-error-visible', 'false');
    }
}

// Check if the birthdate is valid

const checkBirthday = () => {
    if (birthDate.value =="") {
    // Add a custom error message
    birthDate.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre date de naissance.</span>`);
    // Add red border to the invalid field
    birthDate.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        birthDate.parentNode.setAttribute('data-error-visible', 'false');
    }
}



// Check if the tournament-quantity is valid
// TODO : if the quantity is greater than 0, check if a radio box is checked.

const checkTournamentQuantity = () => {
    if (tournamentQuantity.value =="") {
    // Add a custom error message
    tournamentQuantity.previousElementSibling.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir une valeur.</span>`);
    // Add red border to the invalid field
    tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'false');
    }
}

// Check if the "condition term" are checked

const checkTerm = () => {
    if (! acceptTerm.checked) {
    // Add a custom error message
    acceptTerm.insertAdjacentHTML('afterend', `<span class="error-message">Vous devez accepter les conditions d'utilisation.</span>`);
    }
}

// Check all fields

function fieldValidation() {
    checkInputText(firstName, 'prénom');
    checkInputText(lastName, 'nom');
    checkEmail();
    checkBirthday();
    checkTournamentQuantity();
    checkTerm();
}

const resetErrorMessages = () => {
    while(errorMessages[0]) {
        errorMessages[0].remove();
    }
}

////////////////////////////
// Form submit validation //
///////////////////////////

// Submit if the form is valid, else displays error message.

contactForm.addEventListener("submit", (e) => {
    // prevent validation if the form is not complete.
    e.preventDefault();
    resetErrorMessages();
    fieldValidation();
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
        submitedForm();
        //e.target.submit();
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

// Display submit message after a valid submission

function submitedForm() {
    // Replace all elements inside "form-data-container" and set a custom message.
    document.getElementsByClassName("form-data-container")[0].innerHTML = "Nous vous remercions pour votre inscription";

    // Replace button text
    let modalButton = document.querySelector(".button");
    modalButton.value = "Fermer";

    // Changes the behavior of the button (closes the modal on click)
    modalButton.onclick = function() {
        modalBg.style.display = "none";
      }
}