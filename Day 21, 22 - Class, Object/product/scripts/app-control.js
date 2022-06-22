class ProductApp {
    constructor() {
        this._productFormInputs = {
            name: document.getElementById('product-name'),
            brand: document.getElementById('product-brand'),
            price: document.getElementById('product-price'),
            description: document.getElementById('product-description')
        };
        this._products = [];
        this._formBtn = document.getElementById('form-btn');
        this._requiredVisible = false;
        this.clearInputs();
        this.renderProducts();
        document.getElementById('form-btn').addEventListener('click', this.formSubmit);
    }

    //getter
    get productFormInputs () {
        return this._productFormInputs;
    }
    get products() {
        return this._products;
    }
    get formBtn () {
        return this._formBtn;
    }
    get requiredVisible () {
        return this._requiredVisible;
    }
    //setter
    set products(products) {
        this._products = products;
    }
    set formBtn(btn) {
        this._formBtn = btn;
    }
    set requiredVisible(bool){
        this._requiredVisible = bool;
    }

    isValidToSubmit = () => {
        let result = true;
        for(let [key, item] of Object.entries(this.productFormInputs)){
            if(key == 'name' || key == 'brand'){
                if(item.value == '') {
                    result &= false;
                    break;
                } else {
                    result &= true;
                }
            } else if(key == 'price') {
                if(item.value == ''){
                    result &= false;
                } else if(isNaN(item.value)){
                    result &= false;
                } else {
                    result &= true;
                }
            }
        }
        return result;
    };

    toggleRequiredVisible = () => {
        this.requiredVisible = !this.requiredVisible;
        if(this.requiredVisible) {
            for(const [key, ele] of Object.entries(this.productFormInputs)) {
                if(key != 'description'){
                    ele.parentNode.lastElementChild.style.visibility = 'visible';
                } else {
                    break;
                }
            }
        } else {
            for(const [key, ele] of Object.entries(this.productFormInputs)) {
                if(key != 'description'){
                    ele.parentNode.lastElementChild.style.visibility = 'hidden';
                } else {
                    break;
                }
            }
        }
    };

    formSubmit = (event) => {
        const self = event.currentTarget;
        if(self.textContent == 'Add') {
            this.addProduct();
        } else {
            if(this.updateProduct()){
                self.innerText = 'Add';
                document.getElementById('form-cap').innerHTML = `Add new product`;
            }
        }
    };

    displayInfoOnProductForm = (event, index) => {
        const product = this.products[index];
        this.productFormInputs.name.focus();
        this.productFormInputs.name.value = product.name;
        this.productFormInputs.brand.value = product.brand;
        this.productFormInputs.price.value = product.price;
        this.productFormInputs.description.value = product.description;
        document.getElementById('form-btn').innerText = 'Update';
        document.getElementById('form-cap').innerHTML = `${product.name}'s Info`;
    };

    updateProduct = () => {
        let finishedUpdate = false;
        if(this.isValidToSubmit()) {
            if(this.requiredVisible == true) this.toggleRequiredVisible();
            const tempProduct = new Product(this.productFormInputs.name.value,
                                    this.productFormInputs.brand.value,
                                    +this.productFormInputs.price.value,
                                    this.productFormInputs.description.value);
            this.products.forEach(product => {
                if(product.name == document.getElementById('form-cap').textContent.split("'s ")[0]) {
                    if(!product.isEqual(tempProduct)) {
                        for(const key of Object.keys(product)) {
                            product[key] = tempProduct[key];
                        }
                        finishedUpdate = true;
                        this.clearInputs();
                        this.renderProducts();
                    } else {
                        alert(`You need to change something in form before submit!`);            
                    }
                }
            });            
        } else {
            if(this.requiredVisible == false) this.toggleRequiredVisible();
        }
        return finishedUpdate;
    };

    addProduct = () => {
        let finishedAddNewProduct = false;
        if(this.isValidToSubmit()) {
            if(this.requiredVisible == true) this.toggleRequiredVisible();
            const name = this.productFormInputs.name.value;
            const brand = this.productFormInputs.brand.value;
            const price = +this.productFormInputs.price.value;
            const description = this.productFormInputs.description.value;
            const newProduct = new Product(name, brand, price, description);
            if(this.products.filter(product => product.name == name).length == 0) {
                this.products.push(newProduct);
                this.clearInputs();
                this.renderProducts();
                finishedAddNewProduct = true;
            } else {
                alert(`We already had ${name}`);
            }            
        } else {
            if(this.requiredVisible == false) this.toggleRequiredVisible();
        }
        return finishedAddNewProduct;
    };

    removeProduct = (index) => {
        if(confirm(`Do you really want to delete ${this.products[index].name} ?`)) {
            this.products.splice(index, 1);
        }
        if(document.getElementById('form-btn').textContent == 'Update') {
            document.getElementById('form-btn').innerText = 'Add';
            document.getElementById('form-cap').innerHTML = `Add new product`;
        }
        this.clearInputs();
        this.renderProducts();
    };

    clearInputs = () => {
        for(const input of Object.values(this.productFormInputs)) {
            input.value = '';
        }
    };

    productDetail = (event, index) => {
        const product = this.products[index];
        const currentCell = event.currentTarget;
        const detailTable = document.createElement('table');
        detailTable.id = 'detail-container';
        for(const [key, value] of Object.entries(product)){
            
            if(key != '_name') {
                const row = document.createElement('tr');
                const label = document.createElement('td');
                label.innerText = key.split('').map((c, i) => {
                    return i == 0 ? '' : i == 1 ? c.toUpperCase() : c;
                }).join('');

                const content = document.createElement('td');
                content.innerText = key == '_price' ? `${value}$` : value;
                row.append(label);
                row.append(content);
                detailTable.append(row);
            }
        }
        currentCell.append(detailTable);
    };

    removeProductDetail = (event) => {
        const self = event.currentTarget;
        self.removeChild(document.getElementById('detail-container'));
    };

    renderProducts = () => {
        const display = document.getElementById('products-display');
        display.innerText = '';
        const productsCount = document.getElementById('products-count');
        productsCount.innerText = this.products.length > 1 ? `${this.products.length} products` : `${this.products.length} product`;
        if(this.products.length > 0) {
            for(let i = 0; i < this.products.length; i++){
                const row = document.createElement('tr');
                row.classList.add('product');

                const countCell = document.createElement('td');
                countCell.innerText = i + 1;

                const productCell = document.createElement('td');
                productCell.innerText = this.products[i].name;
                productCell.classList.add('detail-proc');
                productCell.addEventListener('mouseenter', (event) => {
                    this.productDetail(event, i);
                });
                productCell.addEventListener('mouseleave', this.removeProductDetail);

                const buttonCell = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.innerText = 'Edit';
                editBtn.addEventListener('click', (event) => {
                    this.displayInfoOnProductForm(event, i);
                });

                const removeBtn = document.createElement('button');
                removeBtn.innerText = 'Remove';
                removeBtn.addEventListener('click', () => {this.removeProduct(i);});

                buttonCell.append(editBtn);
                buttonCell.append(removeBtn);

                row.append(countCell);
                row.append(productCell);
                row.append(buttonCell);
                display.append(row);
            }
        }
    };
};