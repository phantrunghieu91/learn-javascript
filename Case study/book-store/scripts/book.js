class Book {
    constructor(title, publisher, author, type, price, description, imgSrc, quantity = 50) {
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.imgSrc = imgSrc;
    }
};