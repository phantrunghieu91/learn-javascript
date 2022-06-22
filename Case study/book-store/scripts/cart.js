class Cart {
    constructor() {
        this.cartItems = [];
        this.totalAllItems = 0;
    }

    getcartItems() {
        return this.cartItems;
    }

    addNewItemIntoCart(item) {
        this.cartItems.push(item);
        this.calculateTotal();
    }

    calculateTotal = () => {
        this.totalAllItems = 0;
        for(const item of this.cartItems) {
            item.calcTotal();
            this.totalAllItems += item.total;
        }
    };
}