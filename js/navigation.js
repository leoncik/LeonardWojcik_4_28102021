// Launch hamburger menu on click
const menuIcon = document.getElementsByClassName("icon");
menuIcon[0].addEventListener('click', (e) => {
  editNav();
}, false)

// Hamburger menu behaviour
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}