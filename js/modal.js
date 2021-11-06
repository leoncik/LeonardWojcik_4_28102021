// DOM Elements
const modalBg = document.querySelector(".modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// Close the modal after clicking on the "x" icon.
closeButton.onclick = function() {
  modalBg.style.display = "none";
}

/**
* * Close the modal if the user clicks outside of the modal.
window.onclick = function(event) {
  if (event.target == modalBg) {
    modalBg.style.display = "none";
  }
} 
*/