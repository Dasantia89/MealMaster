function showInfo() {
  var moreInfoEl = document.getElementById("more-info")
    moreInfoEl.classList.remove("hidden")
}



document.getElementById("infoButton").addEventListener("click", function() {
  
  showInfo();

 

  document.getElementById("infoButton").innerHTML = "Less Info"

  function hideInfo() {
    moreInfoEl.classList.add("hidden")
  }

    document.getElementById("infoButton").addEventListener("click", function() {
      hideInfo();
    })


});
