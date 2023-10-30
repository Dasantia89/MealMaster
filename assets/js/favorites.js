document.addEventListener("DOMContentLoaded", function () {
    var favoritesList = [];

    function loadFavoritesFromLocalStorage() {
        var savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            favoritesList = JSON.parse(savedFavorites);
            displayFavorites();
        }
    }

    function displayFavorites() {
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
                removeRecipeFromFavorites(recipeId);
            } else if (event.target.classList.contains("btn-primary")) {
                var recipeId = event.target.getAttribute("data-recipe-id");
                navigateToRecipeResultsPage(recipeId);
            }
        });
    }

    // Event listener to handle removing a recipe from favorites
    function removeRecipeFromFavorites(recipeId) {
        favoritesList = favoritesList.filter(recipe => recipe.id !== parseInt(recipeId));
        saveFavoritesToLocalStorage();
        displayFavorites();
    }

    // Function to save the updated favorites list to local storage
    function saveFavoritesToLocalStorage() {
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
    }

    function navigateToRecipeResultsPage(recipeId) {
        localStorage.setItem("recipeId", recipeId);
        window.location.href = "./recipe-results.html";
    }

    loadFavoritesFromLocalStorage();
});