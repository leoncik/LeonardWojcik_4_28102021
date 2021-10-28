function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.querySelector(".close")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close the modal after clicking on the "x" icon.
closeButton.onclick = function() {
  modalbg.style.display = "none";
}

// Close the modal if the user clicks outside of the modal.
window.onclick = function(event) {
  if (event.target == modalbg) {
    modalbg.style.display = "none";
  }
} 

// TODO : change name of the "bground" to something more explicit (modal).


