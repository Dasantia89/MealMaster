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
        $('#results').append(`<div class= 'd-flex bg-primary text-light p-1 m-1 ingredientHolder'><p class='mb-0 text-capitalize'>
        ${ingredientName}</p><p class = 'removeIngredient  px-1 mb-0 mx-1'>x</p></div>`);

        // retrieve selected ingredients from localstorage, or if empty set empty array
        var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients")) || [];

        // add current selected ingredient to array and save to localstorage
        ingredientList.push(ingredientName);
        localStorage.setItem("selectedIngredients", JSON.stringify(ingredientList));

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
})


document.getElementById("searchButton2").addEventListener("click", function () {
  // Get the food query from the input field
  var foodQuery = document.getElementById("query").value;

  // Call the function to search for recipes by food
  searchRecipesByFood(foodQuery);
});

function searchRecipesByFood(foodQuery) {
  var apiKey = '60cdb81ebc7448b1934e0610644d1b3a';

  // Define the API endpoint for searching recipes by food
  var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${foodQuery}`;

  // Make the API request
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Handle the data and display it in the "results2" section
          displayFoodSearchResults(data.results); // Spoonacular API typically has results under 'results' property
      })
      .catch(error => {
          console.error("Error:", error);
      });
}

function displayFoodSearchResults(data) {
  const resultsContainer = document.getElementById("results2");
  resultsContainer.innerHTML = ""; // Clear any previous results

  // Loop through the data and create HTML elements to display the results
  data.forEach(recipe => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "card";
      recipeCard.innerHTML = `
          <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          <div class="card-body">
              <h5 class="card-title">${recipe.title}</h5>
              <p class="card-text">${recipe.summary}</p>
              <a href="${recipe.sourceUrl}" class="btn btn-primary" target="_blank">View Recipe</a>
          </div>
      `;

      resultsContainer.appendChild(recipeCard);
  });
}

// API Request to fetch recipe information

function getRecipeInfo() {
  var id = ``
  var baseURL = 'https://api.spoonacular.com/recipes/{id}/information?apiKey=251762f82c2f4947978e9c9e7007612f'

  fetch(baseURL)
    .then (response => response.json())
    .then (data => {
      displayRecipeInfo (data.results)
    })
    console.log(data)
  }

