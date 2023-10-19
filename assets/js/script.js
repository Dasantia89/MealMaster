
// Function to toggle button that displays/ hides more info on recipe card
function infoToggle() {
var moreInfoEl = document.getElementById("more-info")
var infoButton = document.getElementById("info-button")

  if (moreInfoEl.style.display === "none" || moreInfoEl.style.display === "" ) {
    moreInfoEl.style.display = "block"
    infoButton.innerHTML = "Less Info"
  }

  else {
    moreInfoEl.style.display = "none"
    infoButton.innerHTML = "More Info"
  }
  
}