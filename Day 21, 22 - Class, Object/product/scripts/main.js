const xiaomi = new Product('Xiaomi Mi 6', 'Xiaomi', 250);
const nokia = new Product('Nokia X6', 'Nokia', 200);
const webApp = new ProductApp();

webApp.products.push(xiaomi);
webApp.products.push(nokia);
webApp.renderProducts();