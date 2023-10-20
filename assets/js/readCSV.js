var csvLink = './assets/data/spoonacular_top1k_ingredients_20231016.csv';
// read existing CSV file, parse according to specified delimiter, create array of objects
function readCSV(csvFileUrl) {
  return fetch(csvFileUrl)
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      const objects = [];

      lines.forEach(line => {
        const columns = line.split(';');
        const object = {
          ingredientName: columns[0],
          ingredientID: columns[1]
        };
        objects.push(object);
      });

      // take ingredient array and create and pass a new array with object properties renamed to label and value
      return $.map(objects, function (displayArray) {
        return {
          label: displayArray.ingredientName,
          value: displayArray.ingredientID
        }
      });
    });
}

// Clear ingredientSelection on page load
localStorage.setItem("selectedIngredients", JSON.stringify([]));

// Usage

readCSV(csvLink)
  .then(objects => {
    // takes ingredients from readCSV function and add them to suggestions
    // Then append them to the results div
    $("#ingredients").autocomplete({

      // The source of the suggestions for the autocomplete array
      source: objects,
      // The minimum number of characters a user has to type before autocomplete suggestions display
      minLength: 3,

      // Function that is run when an item from the autocomplete list is selected
      // ui contains name and id for selected ingredient
      select: function (e, ui) {
        // every suggested item based on what the user typed
        console.log($(e.currentTarget).children())
        // the item that the user selected 
        console.log(ui)

        var ingredientName = ui.item.label;
        var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients"));
        // check for repeated ingredient 
        var repeat = false;
        if (ingredientList.length > 0) {
          for (var x in ingredientList) {
            if (ingredientList[x] === ingredientName) {
              repeat = true;
              $('#errorBody').text(ingredientName + ' has already been selected as an ingredient.')
              $('#errorModal').modal('show');
            }
          }
        }

        if (!repeat) {
          // Display selected ingredient in results section
          $('#results').append(`<div class= 'd-flex bg-primary text-light p-1 m-1 ingredientHolder'><p class='mb-0 text-capitalize'>
        ${ingredientName}</p><p class = 'removeIngredient  px-1 mb-0 mx-1'>x</p></div>`);

          // retrieve selected ingredients from localstorage, or if empty set empty array
          var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

          // add current selected ingredient to array and save to localstorage
          ingredientList.push(ingredientName);
          localStorage.setItem("selectedIngredients", JSON.stringify(ingredientList));
        }
        //clear the value from the textbox and stop the event
        $(this).val(''); return false;
      },
      // Change the value in the text area based on which item is being focused on by hovering or up/down arrow key
      focus: function (e, ui) {
        $(this).val(ui.item.label)
        return false;
      }
    });
  })
  .catch(error => {
    console.error(error);
  });

// Remove ingredient from the list of selected ingredients on user click
$('#results').on('click', '.ingredientHolder', function (event) {
  var ingredient = $(this).children().eq(0)[0].innerHTML.trim();
  $(this).remove();
  var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients"));
  for (var x in ingredientList) {
    if (ingredientList[x] === ingredient) {
      ingredientList.splice(x, 1);
    }
  }
  localStorage.setItem("selectedIngredients", JSON.stringify(ingredientList));
  $('#errorBody').text(ingredient + ' was removed from the ingredient list.')
  $('#errorModal').modal('show');
});

// Event listener to handle "Submit" for "Search for Recipes" functionality
document.getElementById("searchButton").addEventListener("click", function () {
     // retrieve selected ingredients from localstorage
  var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients"))
  
  // console.log(ingredientList)
  // Call the function to search for recipes by food
  getRecipesByIngredients(ingredientList)
});

function getRecipesByIngredients(ingredientList){
  var API_key = ""
  // recieve input from multientry control
  // take array and convert to comma-delimited string  
  console.log(ingredientList)
  selectedIngredientsString = ingredientList.join(',+')
  var recipesByIngredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +API_key + "&ingredients=" +selectedIngredientsString + "&number=2"// ingredients array seperated by commas
  console.log(API_key)
  console.log(recipesByIngredientsURL)

    fetch(recipesByIngredientsURL)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Handle the JSON data
      console.log(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error(error);
    });  
  
    displayFoodSearchResults(data)
  }

document.addEventListener("DOMContentLoaded", function () {
  var favoritesList = [];
  var data = [];

  document.getElementById("searchButton2").addEventListener("click", function () {
    // Get the food query from the input field
    var foodQuery = document.getElementById("query").value;

    // Call the function to search for recipes by food
    searchRecipesByFood(foodQuery);
  });

  function searchRecipesByFood(foodQuery) {
    var apiKey = '4c29761579484c20945ffe5c44dcac25';

    var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${foodQuery}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => {
        displayFoodSearchResults(responseData.results);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  function displayFoodSearchResults(recipes) {
    console.log(recipes);
    var resultsContainer = document.getElementById("results2");
    resultsContainer.innerHTML = "";

    recipes.forEach(recipe => {
      var recipeCard = document.createElement("div");
      recipeCard.className = "card";
      recipeCard.innerHTML = `
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
              <h5 class="card-title">${recipe.title}</h5>
              <p class="card-text">${recipe.summary}</p>
              <a onclick="fetchRecipeInfoApi()" "displayRecipeInfo()" href="recipe-results.html" class="btn btn-primary" target="_blank">View Recipe</a>
              <button class="btn btn-success save-button" data-recipe-id="${recipe.id}">Save</button><button class="btn btn-info shop-button mx-1 text-light" data-recipe-id="${recipe.id}">Add to shopping list</button>
          </div>
      `;

      resultsContainer.appendChild(recipeCard);
    });

    // Update the event listeners for save buttons
    document.querySelectorAll(".save-button").forEach(button => {
      button.addEventListener("click", function () {
        var recipeId = button.getAttribute("data-recipe-id");

        // Find the selected recipe in the search results
        var selectedRecipe = recipes.find(recipe => recipe.id == recipeId);

        // Check if the recipe is not already in the favorites list
        if (!favoritesList.some(recipe => recipe.id === recipeId)) {
          favoritesList.push(selectedRecipe);

          // Optionally, you can update the button text to indicate that it's saved.
          button.textContent = "Saved";

          // Save the updated favorites list to local storage
          saveFavoritesToLocalStorage();

          // Update the displayed favorites
          displayFavorites();
        }
      });
    });

    // add event listener to shop buttons and add ingredient id to shopping list array
    document.querySelectorAll(".shop-button").forEach(button => {
      button.addEventListener("click", function () {
        var recipeId = button.getAttribute("data-recipe-id");
        console.log(recipeId);
        // Optionally, you can update the button text to indicate that it's saved.
        button.textContent = "Added";
        var shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
        // check for repeated ingredient 
        var repeat = false;
        if (shoppingList.length > 0) {
          for (var x in shoppingList) {
            if (shoppingList[x] === recipeId) {
              repeat = true;
            }
          }
        }
        
        if (!repeat) {
          shoppingList.push(recipeId);
          localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
        }
      }
      );
    });
  }

  console.log("before calling displayFavorites");
  function displayFavorites() {
    console.log("inside calling displayFavorites")
    console.log("The favorites list is:", favoritesList);
    var favoritesContainer = document.getElementById("favorites");
    if (!favoritesContainer) {
      return; // Favorites container not found
    }
    favoritesContainer.innerHTML = ""; // Clear any previous favorites

    favoritesList.forEach(recipe => {
      var favoriteCard = document.createElement("div");
      favoriteCard.className = "card";
      favoriteCard.innerHTML = `
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
            <div class="card-body">
                <h5 class="card-title">${recipe.title}</h5>
                <p class="card-text">${recipe.summary}</p>
                <a href="${recipe.sourceUrl}" class="btn btn-primary" target="_blank">View Recipe</a>
            </div>
        `;

      favoritesContainer.appendChild(favoriteCard);
    });
  }

  // Save favorites to local storage
  function saveFavoritesToLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
    console.log("Favorites saved to local storage");
  }

  // Load favorites from local storage when the page loads
  function loadFavoritesFromLocalStorage() {
    var savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      favoritesList = JSON.parse(savedFavorites);
      displayFavorites(); // Update the displayed favorites
    }
  }

  // Call loadFavoritesFromLocalStorage when the page loads
  loadFavoritesFromLocalStorage();
});