// var getRepoName = function () {
    // // This is coming from the URL search bar in the browser. It is what comes after the `?`.
    // var queryString = document.location.search;
    // var repoName = queryString.split('=')[1];
  
    // if (repoName) {
    //   repoNameEl.textContent = repoName;
  
    //   getRepoIssues(repoName);
    // } else {
    //   // This will run and return to the homepage if there was nothing in the URL query parameter.
    //   document.location.replace('./index.html');
    // }
//   };

var main = localStorage.getItem('shoppingListCards');
var mainEl = document.getElementById('list')
mainEl.innerHTML = main;
