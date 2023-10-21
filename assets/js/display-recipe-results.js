// API for recipe information
viewRecipeInfo();
function viewRecipeInfo() {
  var recipeId = localStorage.getItem('recipe');
  // need to replace with variable that reflects the selected recipe id  
    var apiKey = '35ed7a68b3de4009b425e9690978834b'
    var apiURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    
    fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        displayRecipeInfo(data);
        console.log(data);
      })
      .catch(function (error){
        console.log(error)
      })
  }
  
  // Function that displays fetched recipe information in 
var displayRecipeInfo = (data) => {
    console.log(data)
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

  };
