class BookStore {
    constructor() {
        this.currentPage = 'Trang chủ';
        this.currentUser = undefined;//admin;user1;
        this.bookTypes;
        this.homePage;
        this.loginPage;
        this.aboutPage;
        this.registerPage;
        this.addNewPage;
        this.cartPage;
        this.bookTypePage;
        this.loadBookTypes();
        this.paymentPage;
        this.navbarTopOffset = document.getElementById('banner').offsetHeight;
    }

    loadBookTypes = () => {
        this.bookTypes = new Set();
        booksList.forEach(book => {
            if(!this.bookTypes.has(book.type)) {
                this.bookTypes.add(book.type);
            }
        });
    };

    renderCartIcon = () => {
        if(document.querySelector('.navbar > .container').contains(document.querySelector('.cart-icon-container'))) {
            document.querySelector('.navbar > .container').removeChild(document.querySelector('.cart-icon-container'));
        }
        if((bookStore.currentUser != undefined &&
            bookStore.currentUser.email != 'admin') &&
            bookStore.currentPage != 'Giỏ hàng') {
            const currentCart = bookStore.currentUser.cart;

            const cartIconContainer = document.createElement('div');
            cartIconContainer.classList.add('cart-icon-container');
            const cartSpan = document.createElement('span');
            cartSpan.addEventListener('click', () => {
                bookStore.changePage('Giỏ hàng');
            });
            cartSpan.classList.add('cart-icon-span');
            const cartItemsCount = document.createElement('span');
            cartItemsCount.classList.add('cart-item-count-span');
            cartItemsCount.innerText = currentCart.cartItems.length;
            cartSpan.innerText = 'Cart';
            const quickCartViewContainer = document.createElement('div');
            quickCartViewContainer.classList.add('quick-view-cart-container');
            if(currentCart.cartItems.length > 0) {
                const cartItemsUl = document.createElement('ul');
                for(const [index, cartItem] of Object.entries(currentCart.cartItems)) {
                    const cartItemLi = document.createElement('li');
                    cartItemLi.id = `book-${cartItem.bookIndex}`;
                    const bookImg = document.createElement('img');
                    bookImg.src = `${cartItem.book.imgSrc}`;
                    cartItemLi.append(bookImg);
                    const cartItemDetail = document.createElement('div');
                    cartItemDetail.classList.add('cart-item-detail');
                    const bookTitleAndRemoveIconContainer = document.createElement('div');
                    bookTitleAndRemoveIconContainer.classList.add('book-title-and-remove');

                    const bookTitle = document.createElement('span');
                    bookTitle.classList.add('book-title');
                    bookTitle.innerText = cartItem.book.title;
                    const removeIcon = document.createElement('span');
                    removeIcon.innerText = 'x';
                    removeIcon.classList.add('remove-cart-item-icon');
                    removeIcon.addEventListener('click', () => {
                            currentCart.cartItems.splice(index, 1);
                            currentCart.calculateTotal();
                            this.renderCartIcon();
                    });
                    bookTitleAndRemoveIconContainer.append(bookTitle, removeIcon);

                    const cartItemPriceAndQuantity = document.createElement('div');
                    cartItemPriceAndQuantity.classList.add('item-price-and-quantity');
                    const cartItemPrice = document.createElement('span');
                    cartItemPrice.innerText = `${this.addDotToPriceDisplay(cartItem.book.price * 1000 + '')}₫`;
                    const cartItemQuantity = document.createElement('span');
                    cartItemQuantity.innerText = `x${cartItem.quantity}`;
                    cartItemPriceAndQuantity.append(cartItemPrice, cartItemQuantity);

                    cartItemDetail.append(bookTitleAndRemoveIconContainer, cartItemPriceAndQuantity);
                    cartItemLi.append(cartItemDetail);
                    cartItemsUl.append(cartItemLi);
                }

                const totalAll = document.createElement('span');
                totalAll.classList.add('total-all-items');
                totalAll.innerText = `Tổng cộng: ${this.addDotToPriceDisplay(currentCart.totalAllItems * 1000 + '')}₫`;

                const paymentBtn = document.createElement('button');
                paymentBtn.innerText = 'Tiến hành thanh toán';
                paymentBtn.addEventListener('click', () => {
                    document.body.style.overflow = 'hidden';
                    bookStore.changePage('Thanh toán');
                });

                quickCartViewContainer.append(cartItemsUl, totalAll, paymentBtn);
            } else {
                const noBookAnnounce = document.createElement('span');
                noBookAnnounce.style.padding = '1rem';
                noBookAnnounce.innerText = 'Không có sách trong giỏ hàng';
                quickCartViewContainer.append(noBookAnnounce);
            }
            
            cartIconContainer.append(cartSpan, cartItemsCount, quickCartViewContainer);
            document.querySelector('.navbar > .container').append(cartIconContainer);
        }
    };

    renderNavbar = () => {
        let listItems;
        if(this.currentUser != undefined && this.currentUser.email == 'admin') {
            listItems = ['Trang chủ', 'Giới thiệu', 'Thêm sách mới'];
        } else {
            listItems = ['Trang chủ', 'Giới thiệu'];
        }
        const navbarContainer = document.querySelector('.navbar > .container');
        navbarContainer.innerHTML = '';
        this.renderCategory();
        const navList = document.createElement('ul');
        navList.classList.add('nav-menu');
        for(let item of listItems) {
            const listItem = document.createElement('li');
            listItem.classList.add('nav-menu-item');
            if(this.currentPage == item) {
                listItem.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.innerText = item;
            pageLink.addEventListener('click', () => {
                this.changePage(item);
            });

            listItem.append(pageLink);
            navList.append(listItem);
        }
        navbarContainer.append(navList);
        this.renderCartIcon();
    };

    navbarOnScroll = () => {        
        if(window.pageYOffset >= this.navbarTopOffset) {
            navbar.classList.add('move-with-scroll');
        } else {
            navbar.classList.remove('move-with-scroll');
        }
    };

    renderCategory = () => {
        const navbar = document.querySelector('.navbar');
        if(navbar.contains(document.querySelector('.categories-container'))) {
            navbar.removeChild(document.querySelector('.categories-container'));
        }
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = '';
        categoryContainer.classList.add('categories-container');
        const categoryTitle = document.createElement('span');
        categoryTitle.innerText = 'Danh mục sách';

        const categoriesListContainer = document.createElement('ul');
        categoriesListContainer.classList.add('categories-list');

        for(const type of this.bookTypes) {
            const categogyItem = document.createElement('li');
            categogyItem.classList.add('category-item');
            categogyItem.innerText = type;
            categogyItem.addEventListener('click', () => {
                this.changePage('Sách', type);
            });
            categoriesListContainer.append(categogyItem);
        }
        const categogyItem = document.createElement('li');
        categogyItem.classList.add('category-item');
        categogyItem.innerText = 'tổng hợp';
        categogyItem.addEventListener('click', () => {
            this.changePage('Sách', 'tổng hợp');
        });
        categoriesListContainer.append(categogyItem);

        categoryTitle.addEventListener('click', () => {
            if(categoriesListContainer.classList.contains('show')) categoriesListContainer.classList.remove('show');
            else categoriesListContainer.classList.add('show');
        });

        categoryContainer.append(categoryTitle, categoriesListContainer);
        navbar.append(categoryContainer);
    };

    renderFooter = () => {
        let listItems;
        if(this.currentUser != undefined && this.currentUser.email == 'admin') {
            listItems = ['Trang chủ', 'Giới thiệu', 'Thêm sách mới'];
        } else {
            listItems = ['Trang chủ', 'Giới thiệu'];
        }
        const siteInfo = document.getElementById('site-info');
        siteInfo.innerHTML = '';
        const titleh4 = document.createElement('h4');
        titleh4.innerText = 'Thông tin';
        const unorderList = document.createElement('ul');
        listItems.forEach(item => {
            const li = document.createElement('li');
            const aLink = document.createElement('a');
            aLink.innerText = item;
            aLink.addEventListener('click', () => {
                this.changePage(item);
            });
            li.append(aLink);

            unorderList.append(li);
        });

        siteInfo.append(titleh4, unorderList);
    };

    renderAccount = () => {
        const accountDiv = document.querySelector('.account-container');
        accountDiv.innerHTML = '';
        if(this.currentUser == undefined) {
            const registerLink = document.createElement('a');
            registerLink.innerText = 'Đăng ký';
            registerLink.addEventListener('click', () => {this.changePage('Đăng ký')});

            const loginLink = document.createElement('a');
            loginLink.innerText = 'Đăng nhập';
            loginLink.addEventListener('click', () => {this.changePage('Đăng nhập')});

            const span = document.createElement('span');
            span.innerText = 'hoặc';
            span.style.textAlign = 'center';

            const text = document.createElement('span');
            accountDiv.append(registerLink, text, span, loginLink);
        } else {
            const span = document.createElement('span');
            span.innerText = `Xin chào, ${this.currentUser.fullName}`;
            span.style.textShadow = '.1rem .1rem .1rem lightgray';
            const logout = document.createElement('a');
            logout.style.gridColumn = '1/3';
            logout.style.textAlign = 'right';
            logout.style.marginRight = '5rem';
            logout.innerText = 'Đăng xuất';
            logout.addEventListener('click', () => {
                this.currentUser.cart.cartItems = [];
                this.currentUser = undefined;
                this.changePage('Trang chủ');
            });

            accountDiv.append(span);
            accountDiv.innerHTML += `&nbsp;`;
            accountDiv.append(logout);
        }
    };

    changePage = (page, type) => {
        page = page == undefined ? 'Trang chủ' : page;
        this.currentPage = page;
        this.renderAccount();
        this.renderNavbar();
        this.renderFooter();
        switch(page) {
            case 'Trang chủ':
                this.homePage = new HomePage();
                this.homePage.render();
                break;
            case 'Đăng nhập':
                this.loginPage = new LoginPage();
                this.loginPage.render();
                break;
            case 'Giới thiệu':
                this.aboutPage =  new AboutPage();
                this.aboutPage.render();
                break;
            case 'Đăng ký':
                this.registerPage = new RegisterPage();
                this.registerPage.render();
                break;
            case 'Thêm sách mới':
                this.addNewPage = new AddNewPage();
                this.addNewPage.render();
                break;
            case 'Giỏ hàng':
                this.cartPage = new CartPage();
                this.cartPage.render();
                break;
            case 'Sách':
                this.bookTypePage = new BookTypePage(type);
                this.bookTypePage.render();
                break;
            case 'Thanh toán':
                window.scrollTo(0,0);
                this.paymentPage = new PaymentPage();
                this.paymentPage.render();
                break;
        }
    };

    editBook = (title) => {
        const book = booksList.find(book => book.title === title);

        document.body.style.overflow = 'hidden';
        const editBookContainer = document.createElement('div');
        editBookContainer.classList.add('edit-book-container');
        const editFormDiv = document.createElement('div');
        editFormDiv.classList.add('edit-form-container');

        const headerH3 = document.createElement('h3');
        headerH3.innerText = 'Chỉnh sửa';
        const bookTitle = document.createElement('span');
        bookTitle.innerText = book.title;

        const editForm = document.createElement('div');
        editForm.classList.add('edit-form');

        const vietnameseKey = ['Tựa đề:', 'Nhà xuất bản:', 'Tác giả:', 'Thể loại:', 'Giá:', 'Số lượng còn:', 'Mô tả:', 'Ảnh nguồn:'];
        let count = 0;
        for(const [key, value] of Object.entries(book)) {
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');
            const label = document.createElement('label');
            label.setAttribute('for', key);
            label.innerText = vietnameseKey[count++];
            let item;
            switch(key){
                case 'description':
                    item = document.createElement('textarea');
                    item.rows = 7;
                    break;
                case 'type':
                    item = document.createElement('input');
                    item.style.textTransform = 'cappitalize';
                    item.type = 'text';
                    item.name = key;
                    item.setAttribute('list', 'type-list');
                    const suggestList = document.createElement('datalist');
                    suggestList.id = 'type-list';
                    bookStore.bookTypes.forEach((type, i) => {
                        const opt = document.createElement('option');
                        if(i === 0) opt.selected = true;
                        opt.value = type;
                        opt.innerText = type;
                        suggestList.append(opt);
                    });
                    formItem.append(suggestList);
                    break;
                case 'quantity':
                case 'price':
                    item = document.createElement('input');
                    item.type = 'number';
                    break;
                default:
                    item = document.createElement('input');
                    item.type = 'text';
            }
            item.setAttribute('edit-data', '');
            item.id = key;
            item.value = value;
            const errorMessage = document.createElement('span');
            errorMessage.classList.add('error-message');
            formItem.append(label, item, errorMessage);
            editForm.append(formItem);
        }
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');
        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Xác nhận';
        submitBtn.addEventListener('click', () => {
            if(AddNewPage.isValid('edit-data')) {
                alert(`Sửa thành công ${book.title}`);
                const editedData = document.querySelectorAll('[edit-data]');
                const bookKeys = Object.keys(book);
                editedData.forEach((data, index) => {
                    book[bookKeys[index]] = data.value;
                });
                document.body.style.overflow = 'auto';
                document.body.removeChild(document.querySelector('.edit-book-container'));
                this.loadBookTypes();
            }
            if(this.currentPage == 'Sách') {
                this.changePage(this.currentPage, bookStore.bookTypePage.type);
            } else {
                this.changePage(this.currentPage);
            }
        });
        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = 'Hủy bỏ';
        cancelBtn.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            document.body.removeChild(document.querySelector('.edit-book-container'));
        });

        buttonDiv.append(submitBtn, cancelBtn);
        editForm.append(buttonDiv);

        editFormDiv.append(headerH3, bookTitle, editForm);
        editBookContainer.append(editFormDiv);
        document.body.append(editBookContainer);
    };

    removeBook = (title) => {
        const bookIndex = booksList.findIndex(book => book.title === title);
        if(confirm(`Bạn có chắc chắn xóa ${booksList[bookIndex].title} khỏi CSDL hay không?`)){
            booksList.splice(bookIndex, 1);
            this.loadBookTypes();
        }
        if(this.currentPage == 'Sách') {
            this.changePage(this.currentPage, bookStore.bookTypePage.type);
        } else {
            this.changePage(this.currentPage);
        }
    };

    addBook = (newBook) => {
        if(booksList.find(book => book.title === newBook.title) == undefined) {
            booksList.push(newBook);
            alert(`Thành công thêm ${newBook.title}!`);
        }
        else alert(`${newBook.title} đã tồn tại!`);
        this.loadBookTypes();
    };

    addDotToPriceDisplay = (str) => {
        let arr = str.split('');
        for(let i = arr.length - 3; i >= 0; i-=3) {
            if(i == 0) break;
            else arr.splice(i, 0, '.');
        }
        return arr.join('');
    };
};
const bookStore = new BookStore();
// bookStore.currentUser.cart.addNewItemIntoCart(new CartItem(1, booksList[1], 2));
// bookStore.currentUser.cart.addNewItemIntoCart(new CartItem(5, booksList[5], 1));
bookStore.changePage();
window.onscroll = bookStore.navbarOnScroll;