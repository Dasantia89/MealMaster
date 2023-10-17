
// read existing CSV file, parse according to specified delimiter, create array of objects
function readCSV(csvFileUrl) {
  return fetch(csvFileUrl)
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      const objects = [];
      
        lines.forEach(line => {
          const columns = line.split(';');
          const object = {
            ingredientName: columns[0],
            ingredientID: columns[1]
          };
            objects.push(object);
        });
      
        return objects;
    });
}
      
// Usage
readCSV('./assets/data/spoonacular_top1k_ingredients_20231016.csv')
  .then(objects => {
    console.log(objects);
  })
  .catch(error => {
    console.error(error);
  });      