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