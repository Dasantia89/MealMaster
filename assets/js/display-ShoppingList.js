// 374e96620480486bb8aa3e7cd6e9f5d0 61d753244a734525ab4952fa41ffd1a7 f3bf041a82fd454387d479cb40dda079
// 8ec091ead8b34a098bfaf34499599384
var apiKey = '994d5186ebf845a4a4d8311b272c6d11';
var link = `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=False&apiKey=${apiKey}&ids=`;
var shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
var fromApi = false;
// site is being loaded from pdf conversion api, so accept query parameters, put them in array,
// and hide the header and footer
if (shoppingList.length === 0) {
    var recipeIds = document.location.search;
    shoppingList = recipeIds.split(",")
    $('#head').hide();
    $('#convertToPdf').hide();
    fromApi = true;
}
// append ingredient id's of the recipe's in shoppinglist to the api link
for (var x = 0; x < shoppingList.length; x++) {
    link = link + shoppingList[x] + ','
}

// reset the values for the shoppinglist and reconstruct the api link with the new values
function init(){
    shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];;
    link = `https://api.spoonacular.com/recipes/informationBulk?includeNutrition=False&apiKey=${apiKey}&ids=`;
    for (var x = 0; x < shoppingList.length; x++) {
        link = link + shoppingList[x] + ','
    }
}
// clear out the main element and retrieve recipe's. then display the data 
getData();
function getData() {
    $('#list').html('');
    fetch(link)
        .then(response => response.json())
        .then(data => {
            if (fromApi) {
                displayPdfFormat(data);
            } else {
                displayShoppingList(data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// pull out the relevent recipe information from the json data and display it
function displayShoppingList(data) {
    for (var y = 0; y < data.length; y++) {
        var card = $(`<div class="card list col-sm-12 col-md-3 d-flex flex-column mt-4 mx-2 p-0 rounded" data-id="${data[y].id}">
    <img class="img-thumbnail rounded-top" src="${data[y].image}"></img>
    <h3 class="title p-1 text-light card-title border-bottom border-top border-3 border-dark text-center">${data[y].title}</h3>
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
        // add a button to delete the recipe from the shopping list
        var delBtn = $('<button class="delBtn">Delete</button>')
        card.append(delBtn);
        $('#list').append(card);
    }
}

// this function runs when the api is called and displays a more printable format
function displayPdfFormat(data) {
    $('#list').removeClass('flex-wrap');
    $('#list').addClass('flex-column');
    $('#list').addClass('align-items-center');

    for (var y = 0; y < data.length; y++) {
        var card = $(`<div class="page card col-12 d-flex flex-column mt-4  h-auto" data-id="${data[y].id}">
    <img class="border-bottom border-3 border-dark card-img img-thumbnail h-50" src="${data[y].image}"></img>
    <h3 class="p-1 text-light card-title border-bottom border-3 border-dark">${data[y].title}</h3>
    <h4 class="p-1 card-title">Ingredients:</h4>
    </div>`);
        var ingredients = $('<ul class="list-group d-flex flex-wrap flex-row col-12 h-auto"></ul>')
        for (var x in data[y].extendedIngredients) {
            var currentIngredient = data[y].extendedIngredients[x];
            var measure = ' ' + currentIngredient.measures.us.amount + ' ' + currentIngredient.measures.us.unitShort;
            var ingredient = `<li class="list-group-item d-flex col-sm-12 col-md-3 ">
        <p class="fs-4">${currentIngredient.name}${measure}</p></li>`;
            ingredients.append(ingredient);
        }
        card.append(ingredients);
        $('#list').append(card);
    }
}

// evenr listener for the convert to pdf button. 
$('footer').on('click', '#convertToPdf', function (event) {
    var apiKey = 'Lf6IUaA2UVRMPeNK1pzQTLuJvMMQulaDnuU40gGp3WiDTGsPHionIgRUvixVVZeo'
    var pdfLink = 'https://dasantia89.github.io/project1/display-ShoppingList.html?q='
    var apiURL = `https://api.html2pdf.app/v1/generate?html=${pdfLink}${shoppingList}&apiKey=${apiKey}&waitFor=5`
    window.open(apiURL, '_blank');

});

// event listener for deleting a recipe from the shopping list
$('main').on('click', '.delBtn', function (event) {
    var id = $(this).parent().attr('data-id');
    var ids = JSON.parse(localStorage.getItem('shoppingList'));
    var name = $(this).parent().children().eq(1)[0].textContent;
    
    for (var x in ids) {
        if (ids[x] == id) {
            ids.splice(x, 1);
        }
    }

    localStorage.setItem('shoppingList', JSON.stringify(ids));
    $('#errorBody').text(name + ' was removed from the ingredient list.')
    $('#errorModal').modal('show');
    init();
    getData();

});