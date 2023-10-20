
/*
// API to display recipe search results
var searchBtn2El = document.querySelector("#searchButton2")
var recipeContainerEl = document.querySelector(".recipe-container")
let searchQuery = ""

var baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=251762f82c2f4947978e9c9e7007612f&query=pasta&ingredients=&number=20`

  // Function not working. still needs to be fixed
searchBtn2El.addEventListener("click", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("#query").value;
  console.log(searchQuery)
})

async function fetchRecipeApi() {

  var baseURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=251762f82c2f4947978e9c9e7007612f&query=pasta&number=20`
  var response = await fetch(baseURL)

  console.log(response);

  var data = await response.json();
  displayRecipe(data.results)

  console.log(data);

}

//fetchRecipeApi();

// Function to display recipe search results on cards

function displayRecipe(results) {
  console.log(results);

  var recipeCard = document.createElement("div")
  recipeCard.classList.add("card")

  var resultBody = document.createElement("div")
  recipeCard.classList.add("recipeCard-body")

  recipeCard.append(resultBody)

  var recipeTitleEl = document.createElement("h3")
  recipeTitleEl.textContent = title

  var imageContent = document.createElement("img")
    image.src = image
  imageContent.appendChild(image)
    
}

//displayRecipe();

*/