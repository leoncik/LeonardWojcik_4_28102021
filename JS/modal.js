// DOM Elements
const MODAL_BG = document.querySelector(".modal");
const MODAL_BTN = document.querySelectorAll(".modal-btn");
const FORM_DATA = document.querySelectorAll(".formData");
const CLOSE_BUTTON = document.querySelector(".close")

// launch modal event
MODAL_BTN.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  MODAL_BG.style.display = "block";
}

// Close the modal after clicking on the "x" icon.
CLOSE_BUTTON.onclick = function() {
  MODAL_BG.style.display = "none";
}

/**
* * Close the modal if the user clicks outside of the modal.
window.onclick = function(event) {
  if (event.target == MODAL_BG) {
    MODAL_BG.style.display = "none";
  }
} 
*/