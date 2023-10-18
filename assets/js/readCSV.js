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

      // take array and rename object properties to label and value
      return $.map(objects, function (displayArray) {
        return {
          label: displayArray.ingredientName,
          value: displayArray.ingredientID
        }
      });
    });
}

// Usage

readCSV(csvLink)
  .then(objects => {
    // takes ingredients from readCSV function and add them to suggestions
    // Then append them to the results div
    $("#ingredients").autocomplete({

      // The source of the suggestions for the autocomplete array
      source: objects,
      // The minimum number of characters a user has to type before autocomplete displays
      minLength: 3,

      // Function that is run when an item from the autocomplete list is selected
      // ui contains name and id for selected ingredient
      select: function (e, ui) {
        console.log($(e.currentTarget).children())
        console.log(ui)
        var ingredientName = ui.item.label;
        $('#results').append(`<p class='mx-2'>${ingredientName}</p><p class = 'removeIngredient'>X</p>`);
        
        // retrieve selected ingredients from localstorage, or if empty set empty array
        var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients")) || [];
        
        // add current selected ingredient to array and save to localstorage
        ingredientList.push(ingredientName);
        localStorage.setItem("selectedIngredients", JSON.stringify(ingredientList));

        //clear the value from the textbox and stop the event
        $(this).val(''); return false;
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


    document.getElementById("searchButton2").addEventListener("click", function() {
      // Get the food query from the input field
      var foodQuery = document.getElementById("query").value;
      
      // Call the function to search for recipes by food
      searchRecipesByFood(foodQuery);

  });
  

