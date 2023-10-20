// 1d730a9aef3546fcafa63496f2f8dd33 ea76c6ba131246a798c43a6d36117dca 35ed7a68b3de4009b425e9690978834b
var apiKey = '1d730a9aef3546fcafa63496f2f8dd33';
var link = `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=False&apiKey=${apiKey}&ids=`;
var shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
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
    for (var y = 0; y < data.length; y++) {
        var card = $(`<div class="card col-3 d-flex flex-column mt-4 mx-2" data-id="${data[y].id}">
    <img class="border-bottom border-3 border-dark" src="${data[y].image}"></img>
    <h3 class="p-1 bg-primary text-light card-title border-bottom border-3 border-dark">${data[y].title}</h3>
    <h4 class="p-1 card-title">Ingredients:</h4>
    </div>`);
        var ingredients = $('<ul class="list-group"></ul>')
        for (var x in data[y].extendedIngredients) {
            var currentIngredient = data[y].extendedIngredients[x];
            var measure = ' ' + currentIngredient.measures.us.amount + ' ' + currentIngredient.measures.us.unitShort;
            var ingredient = `<li class="list-group-item d-flex">
        <p class="fs-4">${currentIngredient.name}${measure}</p></li>`;
            ingredients.append(ingredient);
        }
        card.append(ingredients);

        $('#list').append(card);
    }
}

