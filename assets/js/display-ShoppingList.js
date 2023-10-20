var shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
var link = 'https://api.spoonacular.com/recipes/informationBulk?ids=';
shoppinglist = [715538,716429];
for(x=0; x<shoppingList; x++){
    link += shoppingList[x] + ',';
}

console.log(link);