// Load favorites from local storage when the page loads
console.log("favorites.js - loadFavoritesFromLocalStorage called");
function loadFavoritesFromLocalStorage() {
    var savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
        favoritesList = JSON.parse(savedFavorites);
        displayFavorites(); 
    }
}

console.log("favorites.js - Before calling loadFavoritesFromLocalStorage");
loadFavoritesFromLocalStorage();