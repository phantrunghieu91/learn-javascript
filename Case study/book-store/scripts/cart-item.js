class CartItem {
    constructor(bookIndex, book, quantity) {
        this.bookIndex = bookIndex;
        this.book = book;
        this.quantity = quantity;
        this.total = (this.quantity * this.book.price);
    }

    calcTotal = () => {
        this.total = (this.quantity * this.book.price);
    };
};