 // Event listener to handle "Submit" for "Search for Recipes" functionality
 document.getElementById("searchButton").addEventListener("click", function () {
    // retrieve selected ingredients from localstorage
    var ingredientList = JSON.parse(localStorage.getItem("selectedIngredients"))

    // console.log(ingredientList)
    // Call the function to search for recipes by food
    getRecipesByIngredients(ingredientList);
});

document.getElementById("searchButton2").addEventListener("click", function () {
    // Get the food query from the input field
    var foodQuery = document.getElementById("query").value;

    // Call the function to search for recipes by food
    searchRecipesByFood(foodQuery);
});