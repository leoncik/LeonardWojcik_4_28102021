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
        elt.parentNode.setAttribute('data-error', 'Veuillez saisir un ${key}.');        
        //elt.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir un ${key}.</span>`);
        // Add red border to the invalid field
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else if (elt.value.length < 2) {
        // Add a custom error message
        elt.parentNode.setAttribute('data-error', 'Votre ${key} doit contenir au moins deux caractères.'); 
        //elt.insertAdjacentHTML('afterend', `<span class="error-message">Votre ${key} doit contenir au moins deux caractères.</span>`);
        // Add red border to the invalid field
        elt.parentNode.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        elt.parentNode.setAttribute('data-error-visible', 'false');
    }
    return true;
}

// Mail regex (Needs improvements)

let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Check if the e-mail address is valid

const checkEmail = () => {
    if (email.value =="") {
    // Add a custom error message
    email.parentNode.setAttribute('data-error', 'Veuillez saisir votre courriel.');
    // Add red border to the invalid field
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


// Check if the birthdate is valid (OPTIONAL)

let now = Date.now();

const checkBirthday = () => {
    // Get the year of the selected birthdate and convert the string to integrate
    let birthDateYear = parseInt(birthDate.value.substring(0,4));
    if (birthDate.value =="") {
    // Add a custom error message
    birthDate.parentNode.setAttribute('data-error', 'Veuillez saisir votre date de naissance.');
    // Add red border to the invalid field
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
    //tournamentQuantity.insertAdjacentHTML('afterend', `<span class="error-message">Veuillez saisir une valeur.</span>`);
    // Add red border to the invalid field
    tournamentQuantity.parentNode.setAttribute('data-error-visible', 'true');
    return false;
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
        tournamentQuantity.parentNode.setAttribute('data-error', 'Veuillez sélectionner une ville.');
        return false;
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

////////////////////////////
// Form submit validation //
///////////////////////////

// Submit if the form is valid, else displays error message.

contactForm.addEventListener("submit", (e) => {
    // prevent validation if the form is not complete.
    e.preventDefault();
    resetErrorMessages();
    fieldValidation();
    if (fieldValidationIsValid()) {
        submitedForm();
    }
}, false);

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