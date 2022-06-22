class Product {
    constructor(name, brand, price = 0, description = '') {
        this._name = name;
        this._brand = brand;
        this._price = price;
        this._description = description;
    }
    // getter
    get name() {
        return this._name;
    }
    get brand() {
        return this._brand;
    }
    get price() {
        return this._price;
    }
    get description() {
        return this._description;
    }

    // setter
    set name(name) {
        this._name = name;
    }
    set brand(brand) {
        this._brand = brand;
    }
    set price(price) {
        this._price = price;
    }
    set description(description) {
        this._description = description;
    }
    isEqual(anotherProduct) {
        return this.name == anotherProduct.name &&
        this.brand == anotherProduct.brand &&
        this.price == anotherProduct.price &&
        this.description == anotherProduct.description;
    }
};