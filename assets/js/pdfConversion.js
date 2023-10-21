var getRecipeIds = function () {
    // This is coming from the URL search bar in the browser. It is what comes after the `?`.
    var recipeIds = document.location.search;
    
  
    if (repoName) {
      repoNameEl.textContent = repoName;
  
      getRepoIssues(repoName);
    } else {
      // This will run and return to the homepage if there was nothing in the URL query parameter.
      document.location.replace('./index.html');
    }
  };

// var main = localStorage.getItem('shoppingListCards');
// var mainEl = document.getElementById('list')
// mainEl.innerHTML = main;
