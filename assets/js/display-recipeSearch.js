// APi to display recipe search results

function getRecipeApi() {

  var requestURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=251762f82c2f4947978e9c9e7007612f&query=pasta&ingredients=number=16"

  fetch(requestURL)
    .then(function (response) {
      console.log(response)
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i< data.length; i++) {
        console.log(data[i].id)
      }
    });

}

getRecipeApi();