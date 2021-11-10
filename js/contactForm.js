// TODO : replace .error-message CSS with .formData[data-error]::after

/////////////////////////////
// DOM elements           //
///////////////////////////

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("tournament-quantity");
const radioButtons = document.querySelectorAll(".radio-collection .checkbox-input");
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
        elt.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un ${key}.</span>`);
        // Add red border to the invalid field
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else if (elt.value.length < 2) {
        // Add a custom error message
        elt.insertAdjacentHTML('afterend', `<span class="error-message">Votre ${key} doit contenir au moins deux caractères.</span>`);
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
    email.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre courriel.</span>`);
    // Add red border to the invalid field
    email.parentNode.setAttribute('data-error-visible', 'true');
    } else if (! email.value.match(mailformat)) {
        email.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un courriel valide.</span>`);
        email.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        email.parentNode.setAttribute('data-error-visible', 'false');
    }
}


// Check if the birthdate is valid (OPTIONAL)
/* Uncomment this code and add a "required" statement in the HTML to enable birthdate valiation.
const checkBirthday = () => {
    if (birthDate.value =="") {
    // Add a custom error message
    birthDate.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir votre date de naissance.</span>`);
    // Add red border to the invalid field
    birthDate.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        birthDate.parentNode.setAttribute('data-error-visible', 'false');
    }
} */



// Check if the tournament-quantity is valid

const checkTournamentQuantity = () => {
    if (tournamentQuantity.value =="") {
    // Add a custom error message
    tournamentQuantity.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir une valeur.</span>`);
    // Add red border to the invalid field
    tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'false');
    }
}

// Check if at least one location checkbox is checked
const isOneLocationChecked = () => {
    let isChecked = false;
    for(let i = radioButtons.length; i--;) {
        isChecked = radioButtons[i].checked;
        if (isChecked) break;
    }
    return isChecked;
}

// If a tournament quantity greater than 0 is set, add "required" attribute to the radio buttons.
let setToRequired = () => {
    if (tournamentQuantity.value>0) {
        radioButtons[0].required = true;
    }
}

// Disable location buttons if tournament-quantity < 0
tournamentQuantity.addEventListener('input', (e) => {
    if(e.target.value) {
        disableLocationButtons();
    };}, false);

let disableLocationButtons = () => {
    if (tournamentQuantity.value==0 || tournamentQuantity.value=="" ) {
        for (let i = radioButtons.length; i--;) {
            radioButtons[i].disabled = true;
        }
    } else {
        for (let i = radioButtons.length; i--;) {
            radioButtons[i].disabled = false;              
            }
        }
}

// Check the location field if tournament-quantity > 0
const checkLocation = () => {
    if (tournamentQuantity.value>0 && isOneLocationChecked() == false) {
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
        tournamentQuantity.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez sélectionner une ville.</span>`);
    }
}

// Check if the "condition term" are checked

const checkTerm = () => {
    if (! acceptTerm.checked) {
    // Add a custom error message
    acceptTerm.insertAdjacentHTML('afterend', `<span class="error-message">Vous devez accepter les conditions d'utilisation.</span>`);
    }
}

// Disable location buttons on landing
disableLocationButtons();

// Check all fields

function fieldValidation() {
    checkInputText(firstName, 'prénom');
    checkInputText(lastName, 'nom');
    checkEmail();
    //checkBirthday();
    checkTournamentQuantity();
    setToRequired();
    checkLocation();
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
    document.getElementsByClassName("form-data-container")[0].innerHTML = "<span class='submission-message'>Nous vous remercions pour votre inscription</span>";

    // Replace button text
    let modalButton = document.querySelector(".button");
    modalButton.value = "Fermer";

    // Changes the behavior of the button (closes the modal on click)
    modalButton.onclick = function() {
        modalBg.style.display = "none";
      }
}