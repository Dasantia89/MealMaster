// API for recipe information

function viewRecipeInfo() {

  // need to replace with variable that reflects the selected recipe id  
    var recipeId = "716429"
    var apiKey = '35ed7a68b3de4009b425e9690978834b'
    var apiURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    
    fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayRecipeInfo(data.results)
        console.log(data);
      })
  }
  
  // Function that displays fetched recipe information in 
  displayRecipeInfo(data => {
    
    var recipeInfoContainer = document.getElementById("info-container")
    var recipeInfo = document.createElement("div")
      recipeInfo.className = "recipe-info"
      recipeInfo.innerHTML = 
  // Created elements to display specific recipe information    
      `
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
        <div class="recipe-body">
          <h2 class="recipe-title">${recipe.title}<h2>
          <p class="recipe-Summary">${recipe.summary}</p>
          <p class="recipe-details>Preparation Time: ${preparationMinutes} minutes, Ready in: ${recipe.readyInMinutes} minutes, Servings: ${servings}</p>
          <p class="recipe-instructions">Instructions: ${recipe.instructions}</p>
        </div>
      `
  // Adds newly created elements to recipe info container     
    recipeInfoContainer.appendChild(recipeInfo);

  });
