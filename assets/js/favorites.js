document.addEventListener("DOMContentLoaded", function () {
    console.log("favorites.js - loadFavoritesFromLocalStorage called");
    var favoritesList = [];

    function loadFavoritesFromLocalStorage() {
        var savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            favoritesList = JSON.parse(savedFavorites);
            displayFavorites();
        }
    }

    function displayFavorites() {
        console.log("inside calling displayFavorites");
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
                    <button class="btn btn-danger remove-button" data-recipe-id="${recipe.id}">Remove</button>
                </div>
            `;

            favoritesContainer.appendChild(favoriteCard);
        });

        // Event delegation to handle remove button clicks
        favoritesContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("remove-button")) {
                var recipeId = event.target.getAttribute("data-recipe-id");
                console.log("Removing recipe with ID:", recipeId);
                removeRecipeFromFavorites(recipeId);
            }
        });
    }

    // Event listener to handle removing a recipe from favorites
    function removeRecipeFromFavorites(recipeId) {
        console.log("Before removal - The favorites list is:", favoritesList);
        favoritesList = favoritesList.filter(recipe => recipe.id !== parseInt(recipeId));
        console.log("After removal - The favorites list is:", favoritesList);
        saveFavoritesToLocalStorage();
        displayFavorites();
    }

    // Function to save the updated favorites list to local storage
    function saveFavoritesToLocalStorage() {
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
        console.log("Favorites saved to local storage");
    }

    console.log("favorites.js - Before calling loadFavoritesFromLocalStorage");
    loadFavoritesFromLocalStorage();
});