class User {
    constructor(fullname, email, password) {
        this.fullName = fullname;
        this.email = email;
        this.password = password;
        this.cart = new Cart();
    }
};