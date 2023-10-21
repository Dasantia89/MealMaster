console.log("favorites.js - loadFavoritesFromLocalStorage called");
function loadFavoritesFromLocalStorage() {
    var savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
        favoritesList = JSON.parse(savedFavorites);
        displayFavorites();
    }
}

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



console.log("favorites.js - Before calling loadFavoritesFromLocalStorage");
loadFavoritesFromLocalStorage();