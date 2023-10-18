
var moreInfoEl = document.getElementById("more-info");

function showInfo() {
 
  moreInfoEl.removeAttribute("hidden");
}

document.getElementById("infoButton").addEventListener("click", function() {
   showInfo();

}); 