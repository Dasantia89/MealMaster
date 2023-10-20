// var shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
var link = 'https://api.spoonacular.com/recipes/informationBulk?includeNutrition=False&apiKey=78edd369fcca4142972acee0f4fa2117&ids=';
var shoppingList = ['715538', '716429'];
for (x = 0; x < shoppingList.length; x++) {
    link = link + shoppingList[x] + ','
}


fetch(link)
    .then(response => response.json())
    .then(data => {
        displayShoppingList(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

function displayShoppingList(data) {
    // for(var x=0;x<data.length;x++){
    console.log(data[0]);
    console.log(data[0].extendedIngredients);
    console.log(data[0].name)


    // }
    var card = $(`<div class="card"></div>`);
    
}
