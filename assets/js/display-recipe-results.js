// API for recipe information
viewRecipeInfo();
function viewRecipeInfo() {
  var recipeId = localStorage.getItem('recipe');
  // need to replace with variable that reflects the selected recipe id  
    var apiKey = '3fe2e7a85cbe455abfcc13d03019145e'
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
        <div class="recipe-content container">     
          <h2 class="recipe-title text-center">${data.title}<h2>
          <p class="recipe-details">Ready in: ${data.readyInMinutes} minutes, Servings: ${data.servings}</p>
        <br>
          <img src="${data.image}" alt="${data.title}" class="recipe-img row col-6">
        <br>  
          <div class="ingredient-container col-6"> 
            <h4 class="recipe-ingredients">Ingredients:</h4>
              <ul class="ingredient-list">
                <li class="ingredient-item">${ingredient}</li>    
              </ul>
          </div> 
        <br>
          
          <p class="recipe-summary">${data.summary}</p>
            <br>
           
          <p class="recipe-instructions">Instructions:<br>${data.instructions}</p>
      </div>  
      `
    for (var i = 0; i < data.extendedIngredients.length; i++) {
      console.log(data.extendedIngredients[i]);
      var ingredient = data.extendedIngredients[i].original;
      console.log(data.extendedIngredients[i].original);
    }
    
  // Adds newly created elements to recipe info container     
    recipeInfoContainer.appendChild(recipeInfo)
  
  };
