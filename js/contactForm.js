/////////////////////////////
// DOM elements           //
///////////////////////////

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("tournament-quantity");
const firstRadioButton = document.getElementById("location1");
const radioButtons = document.querySelectorAll(".radio-collection .checkbox-input");
const checkboxIcons = document.querySelectorAll(".checkbox-icon");
const acceptTerm = document.getElementById("checkbox1");
const contactForm = document.getElementById("contact-form");
let errorMessages = document.getElementsByClassName("error-message");
let validationMessage = document.getElementsByClassName("submission-message");
let modalButton = document.querySelector(".btn-submit");
let formDataFields = document.getElementsByClassName("formData");

/////////////////////////////
// Form fields validation //
///////////////////////////


// Check if the name and surname fields are valid.

const checkInputText = (elt, key) => {
    if (elt.value === '') {
        // Add a custom error message with red border around the input field
        elt.parentNode.setAttribute('data-error', `Veuillez saisir un ${key}.`);        
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else if (elt.value.length < 2) {
        elt.parentNode.setAttribute('data-error', `Votre ${key} doit contenir au moins deux caractères.`); 
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        // Hide error message and set input border to green
        elt.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}

// Mail regex

let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Check if the e-mail address is valid

const checkEmail = () => {
    if (email.value =="") {
    email.parentNode.setAttribute('data-error', 'Veuillez saisir votre courriel.');
    email.parentNode.setAttribute('data-error-visible', 'true');
    return false;
    } else if (! email.value.match(mailformat)) {
        email.parentNode.setAttribute('data-error', 'Veuillez saisir un courriel valide.');
        email.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        email.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}


// Check if the birthdate is valid

let now = Date.now();

const checkBirthday = () => {
    // Get the year of the selected birthdate and convert the string to integrate
    let birthDateYear = parseInt(birthDate.value.substring(0,4));
    if (birthDate.value =="") {
    birthDate.parentNode.setAttribute('data-error', 'Veuillez saisir votre date de naissance.');
    birthDate.parentNode.setAttribute('data-error-visible', 'true');
    return false;
    } else if (birthDate.valueAsNumber > now) {
        birthDate.parentNode.setAttribute('data-error', 'Vous ne pouvez pas venir du futur.');
        birthDate.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else if (birthDateYear < 1905) {
        birthDate.parentNode.setAttribute('data-error', 'Vous ne pouvez pas être plus vieux que la théorie de la relativité restreinte.');
        birthDate.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        birthDate.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}



// Check if the tournament-quantity is valid

const checkTournamentQuantity = () => {
    if (tournamentQuantity.value =="") {
    // Add a custom error message
    tournamentQuantity.parentNode.setAttribute('data-error', 'Veuillez saisir une valeur.');
    tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    return false;
    } else if (tournamentQuantity.value > 99) {
        tournamentQuantity.parentNode.setAttribute('data-error', 'Veuillez saisir une valeur comprise entre 0 et 99.');
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    } else if(tournamentQuantity.value < 0) {
        tournamentQuantity.parentNode.setAttribute('data-error', 'Veuillez saisir une valeur comprise entre 0 et 99.');
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    } else {
        tournamentQuantity.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
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

// Disable location buttons if tournament-quantity < 0 and uncheck checked locations
tournamentQuantity.addEventListener('input', (e) => {
    if(e.target.value) {
        disableLocationButtons();
        uncheckLocationButtons();
    };}, false);

let disableLocationButtons = () => {
    if (tournamentQuantity.value<=0 || tournamentQuantity.value=="" ) {
        for (let i = radioButtons.length; i--;) {
            radioButtons[i].disabled = true;
        }
    } else {
        for (let i = radioButtons.length; i--;) {
            radioButtons[i].disabled = false;              
            }
        }
}

let uncheckLocationButtons = () => {
    if (tournamentQuantity.value<=0 || tournamentQuantity.value=="" ) {
        for (let i = radioButtons.length; i--;) {
            radioButtons[i].checked = false;
        }
    }
}

// Check the location field if tournament-quantity > 0 and <= 99
const checkLocation = () => {
    if (tournamentQuantity.value>0 && tournamentQuantity.value<=99 && isOneLocationChecked() == false) {
        firstRadioButton.parentNode.setAttribute('data-error-visible', 'true');
        firstRadioButton.parentNode.setAttribute('data-error', 'Veuillez sélectionner une ville.');
        for (let i = radioButtons.length; i--;) {
            checkboxIcons[i].classList.add("checkbox-label-error");
        }
        return false;
    } else {
        for (let i = radioButtons.length; i--;) {
            checkboxIcons[i].classList.remove("checkbox-label-error");
        }
        firstRadioButton.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}

// Check if the "condition term" are checked

const checkTerm = () => {
    if (! acceptTerm.checked) {
    // Add a custom error message
    acceptTerm.parentNode.setAttribute('data-error-visible', 'true');
    acceptTerm.parentNode.setAttribute('data-error', 'Vous devez accepter les conditions d\'utilisation.');
    return false;
    } else {
        acceptTerm.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}

// Disable location buttons on landing
disableLocationButtons();

// Check all fields

function fieldValidation() {
    checkInputText(firstName, 'prénom');
    checkInputText(lastName, 'nom');
    checkEmail();
    checkBirthday();
    checkTournamentQuantity();
    checkLocation();
    checkTerm();
}

// Check validity of all fields

function fieldValidationIsValid() {
    if(checkInputText(firstName, 'prénom') &&
    checkInputText(lastName, 'nom') &&
    checkEmail() &&
    checkBirthday() &&
    checkTournamentQuantity() &&
    checkLocation() &&
    checkTerm()) {
    return true
    }
    return false
}

const resetErrorMessages = () => {
    while(errorMessages[0]) {
        errorMessages[0].remove();
    }
}

const resetValidationMessage = () => {
    while(validationMessage[0]) {
        validationMessage[0].remove();
    }
}

////////////////////////////
// Form submit validation //
///////////////////////////

// Reset all fields on landing
resetForm();

// Submit if the form is valid, else displays error message.

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    resetErrorMessages();
    resetValidationMessage();
    fieldValidation();
    if (fieldValidationIsValid()) {
        submitedForm();
        setSubmitButton();
        resetForm();
    }
}, false);

// Display submit message after a valid submission

function submitedForm() {
    // Hide all elements inside "form-data-container" and set a custom message.
    document.getElementsByClassName("form-data-container")[0].style.display = "none";
    contactForm.insertAdjacentHTML("afterbegin", "<span class='submission-message'>Nous vous remercions pour votre inscription</span>");
}

// Reset form after closing the modal

function resetForm() {
    contactForm.reset();
    for (let i = formDataFields.length; i--;) {
        formDataFields[i].setAttribute('data-error-visible', '');
    }
}

// Set the behavior of the submit button

function closeThatModal() {
    modalBg.style.display = "none";
}

const setSubmitButton = () => {
    if (validationMessage[0]) {
        modalButton.value = "Fermer";
        modalButton.addEventListener("click", closeThatModal);
          } else {
            modalButton.value = "C'est parti";
            modalButton.removeEventListener("click", closeThatModal);
            }
        }