class HomePage {
    constructor() {
        this.users = usersList;
        this.books = booksList;
        this.bookTypes = bookStore.bookTypes;
    }

    // Turn first character of each word to upper case
    capitalCaseConvert = (str) => {
        return str.split(' ').map(word => {
            return word.split('').map((c, index) => {
                if(index == 0) return c.toUpperCase();
                else return c;
            }).join('');
        }).join(' ');
    };

    render = () => {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        for(let type of this.bookTypes) {
            const oneTypeBooks = this.books.filter(book => {
                if(book.type.trim() === type.trim()) return book;
            });

            const typeSection = document.createElement('section');
            typeSection.classList.add('book-types');
            
            const container = document.createElement('div');
            container.classList.add('container');

            const titleDiv = document.createElement('div');
            titleDiv.classList.add('book-type-title');
            const titleHead = document.createElement('h2');
            titleHead.classList.add('title-head');
            const typeText = document.createElement('span');
            typeText.innerText = `Sách ${this.capitalCaseConvert(type)}`;
            typeText.addEventListener('click', () => {
                bookStore.changePage('Sách', type);
            });
            titleHead.append(typeText);
            titleDiv.append(titleHead);

            if(oneTypeBooks.length > 4) {
                const viewMore = document.createElement('span');
                viewMore.classList.add('view-more');
                viewMore.innerText = 'Xem thêm..';
                viewMore.addEventListener('click', () => {
                    bookStore.changePage('Sách', type);
                });
                titleDiv.append(viewMore);
            }

            const booksDiv = document.createElement('div');
            booksDiv.classList.add('books');

            const loopCondition = oneTypeBooks.length > 4 ? 4 : oneTypeBooks.length;
            for(let i = 0; i < loopCondition; i ++) {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');

                const thumnailDiv = document.createElement('div');
                thumnailDiv.classList.add('book-thumnail');
                const img = document.createElement('img');
                img.src = `${oneTypeBooks[i].imgSrc}`;
                img.alt = `${oneTypeBooks[i].title}`;
                thumnailDiv.append(img);

                const info = document.createElement('div');
                info.classList.add('book-info');
                const bookName = document.createElement('h3');
                bookName.classList.add('book-name');
                bookName.innerText = oneTypeBooks[i].title;
                const bookPrice = document.createElement('span');
                bookPrice.classList.add('book-price');
                bookPrice.innerText = bookStore.addDotToPriceDisplay(`${oneTypeBooks[i].price * 1000}`) + "₫";
                info.append(bookName, bookPrice);

                const hiddenContainer = document.createElement('div');
                hiddenContainer.classList.add('hidden-container');

                const viewDetailBtn = document.createElement('button');
                viewDetailBtn.innerText = 'Xem chi tiết';
                viewDetailBtn.addEventListener('click', () => {
                    this.showDetail(oneTypeBooks[i]);
                });
                hiddenContainer.append(viewDetailBtn);
                if(bookStore.currentUser != undefined && bookStore.currentUser.email == 'admin') {
                    const editBtn = document.createElement('button');
                    editBtn.innerText = 'Sửa';
                    editBtn.addEventListener('click', () => {
                        bookStore.editBook(oneTypeBooks[i].title);
                    });
                    const removeBtn = document.createElement('button');
                    removeBtn.innerText = 'Xóa';
                    removeBtn.addEventListener('click', () => {
                        bookStore.removeBook(oneTypeBooks[i].title);
                    });
                    hiddenContainer.append(editBtn, removeBtn);
                }

                bookDiv.append(thumnailDiv, info, hiddenContainer);
                booksDiv.append(bookDiv);
            }

            container.append(titleDiv, booksDiv);
            typeSection.append(container);
            mainContainer.append(typeSection);
        }
    };

    showDetail = (book) => {
        document.body.style.overflow = 'hidden';
        const detailContainer = document.createElement('div');
        detailContainer.classList.add('view-detail-container');
        const bookDetailDiv = document.createElement('div');
        bookDetailDiv.classList.add('book-detail');

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('book-image-container');
        const bookImage = document.createElement('img');
        bookImage.src = `${book.imgSrc}`;
        imgContainer.append(bookImage);

        const bookInfoDiv = document.createElement('div');
        bookInfoDiv.classList.add('book-info-container');
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('book-title-container');
        const bookTitle = document.createElement('h3');
        bookTitle.innerText = book.title;
        titleContainer.append(bookTitle);

        const bookTypeAndStatusContainer = document.createElement('div');
        bookTypeAndStatusContainer.classList.add('type-status-container');
        const bookTypeSpan = document.createElement('span');
        bookTypeSpan.classList.add('book-type-span');
        bookTypeSpan.innerText = `Thể loại: ${book.type}`;
        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status-span');
        statusSpan.innerText = `${book.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}`;
        statusSpan.style.backgroundColor = `${book.quantity > 0 ? 'var(--status-green)' : 'var(--status-red)'}`;
        bookTypeAndStatusContainer.append(bookTypeSpan, 'Tình trạng:', statusSpan);

        const priceContainer = document.createElement('div');
        priceContainer.classList.add('price-container');
        const priceSpan = document.createElement('span');
        priceSpan.innerText = bookStore.addDotToPriceDisplay(`${book.price * 1000}`) + "đ";
        priceContainer.append(priceSpan);
        
        const bookDescriptionContainer = document.createElement('div');
        bookDescriptionContainer.classList.add('description-container');
        const publisherSpan = document.createElement('span');
        publisherSpan.classList.add('publisher-span');
        publisherSpan.innerText = `Nhà suất bản ${this.capitalCaseConvert(book.publisher)}`;
        const authorSpan = document.createElement('span');
        authorSpan.classList.add('author-span');
        authorSpan.innerText = `Tác giả: ${book.author}`;
        const descriptionSpan = document.createElement('span');
        descriptionSpan.classList.add('description-span');
        descriptionSpan.innerText = `${book.description}`;
        bookDescriptionContainer.append(authorSpan, publisherSpan, `Giới thiệu:`,descriptionSpan);

        bookInfoDiv.append(titleContainer, bookTypeAndStatusContainer, priceContainer, bookDescriptionContainer);
        
        if(bookStore.currentUser == undefined ||
            bookStore.currentUser != undefined && bookStore.currentUser.email != 'admin') {
            if(book.quantity > 0) {
                const addToCartContainer = document.createElement('div');
                addToCartContainer.classList.add('add-to-cart-container');
                const quantityContainer = document.createElement('div');
                quantityContainer.classList.add('quantity-container');
                const minusBtn = document.createElement('a');
                minusBtn.classList.add('left-side');
                minusBtn.innerText = '-';
                minusBtn.addEventListener('click', () => {
                    let quantity = document.getElementById('quantity');
                    if(!isNaN(quantity.value)) {
                        if(quantity.value > 0) {
                            quantity.value -= 1;
                        }
                    }
                });
                const quantityInput = document.createElement('input');
                quantityInput.id = 'quantity';
                quantityInput.max = book.quantity;
                quantityInput.value = book.quantity >= 1 ? 1 : 0;
                const addBtn = document.createElement('a');
                addBtn.classList.add('right-side');
                addBtn.innerText = '+';
                addBtn.addEventListener('click', () => {
                    let quantity = document.getElementById('quantity');
                    if(!isNaN(quantity.value)) {
                        if(+quantity.value < book.quantity) {
                            quantity.value = +quantity.value + 1;
                        }
                    }
                });
                quantityContainer.append(minusBtn, quantityInput, addBtn);
                const addToCartBtn = document.createElement('button');
                addToCartBtn.innerText = 'Thêm vào giở hàng';
                addToCartBtn.addEventListener('click', () => {
                    let quantity = +document.getElementById('quantity').value;
                    if(quantity > 0 && bookStore.currentUser != undefined) {
                        const addCartItemIntoCart = () => {
                            const bookIndex = booksList.findIndex(item => item.title == book.title);
                            const newCartItem = new CartItem(bookIndex, book, quantity);
                            if(bookStore.currentUser.cart.cartItems.length == 0 || 
                                bookStore.currentUser.cart.cartItems.findIndex(item => item.bookIndex == bookIndex) == -1) {
                                bookStore.currentUser.cart.addNewItemIntoCart(newCartItem);   
                            } else {
                                bookStore.currentUser.cart.cartItems.find(item => item.bookIndex == bookIndex).quantity += quantity;
                                bookStore.currentUser.cart.cartItems.find(item => item.bookIndex == bookIndex).calcTotal();
                                bookStore.currentUser.cart.calculateTotal();
                            }
                            document.body.removeChild(document.querySelector('.view-detail-container'));
                            bookStore.renderCartIcon();
                            this.renderPopUpCart(book.title);
                        };
                        if(quantity > book.quantity) {
                            if(confirm(`Hiện tại chúng tôi chỉ có ${book.quantity} quyển "${book.title}", bạn vẫn muốn mua sách này chứ ?`)) {
                                quantity = book.quantity;
                                addCartItemIntoCart();
                            }
                        } else {
                            addCartItemIntoCart();
                        }
                    } else if(quantity > 0 && bookStore.currentUser == undefined){
                        alert("Hãy đăng nhập hoặc đăng ký tài khoản trước khi mua hàng");
                        bookStore.changePage('Đăng nhập');
                        document.body.removeChild(document.querySelector('.view-detail-container'));
                        document.body.style.overflow = 'auto';
                    } else {
                        alert('Hãy nhập vào số lượng!');
                    }
                });

                addToCartContainer.append(quantityContainer, addToCartBtn);
                bookInfoDiv.append(addToCartContainer);
            }
        }

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-button');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(document.querySelector('.view-detail-container'));
            document.body.style.overflow = 'auto';
        });

        imgContainer.append(bookImage);
        bookDetailDiv.append(imgContainer, bookInfoDiv, closeBtn);
        detailContainer.append(bookDetailDiv);
        document.body.append(detailContainer);
    };

    renderPopUpCart = (title) => {
        document.body.style.overflow = 'hidden';
        const popUpCartContainer = document.createElement('div');
        popUpCartContainer.classList.add('pop-up-cart-container');
        popUpCartContainer.innerHTML = '';

        const popUpCartDetail = document.createElement('div');
        popUpCartDetail.classList.add('pop-up-cart-detail');

        const titleCartContainer = document.createElement('div');
        titleCartContainer.classList.add('title-pop-up-cart');
        titleCartContainer.innerHTML = "Bạn đã thêm&nbsp;";
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('cart-item-title');
        titleSpan.innerText = ` ${this.capitalCaseConvert(title)}`;
        titleCartContainer.append(titleSpan);
        titleCartContainer.innerHTML += `&nbsp;vào giỏ hàng!`;

        const h3Title = document.createElement('h3');
        h3Title.innerText = 'Giỏ hàng của bạn';

        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');

        const tableDisplay = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const tableHeaderRow = document.createElement('tr');
        const headerList = ['Tên sách', 'Giá', 'Số lượng', 'Tổng tiền'];
        const tableBody = document.createElement('tbody');
        for(const theader of headerList) {
            const newTh = document.createElement('th');
            newTh.innerText = theader;
            tableHeaderRow.append(newTh);
            tableHeader.append(tableHeaderRow);
        }
        for(const [index, cartItem] of Object.entries(bookStore.currentUser.cart.cartItems)) {
            const row = document.createElement('tr');
            row.id = `cart-book-${cartItem.bookIndex}`;
            for(let [key, value] of Object.entries(cartItem)) {
                const cell = document.createElement('td');
                if (typeof (value) == 'function') {
                    continue;
                }
                else if(key == 'bookIndex') {
                    cell.innerText = cartItem.book.title;
                } else if(key == 'quantity') {
                    const quantityInput = document.createElement('input');
                    quantityInput.type = 'number';
                    quantityInput.value = +value;
                    quantityInput.max = cartItem.book.quantity;
                    cell.append(quantityInput);
                    quantityInput.addEventListener('input', (event) => {
                        const self = event.currentTarget;
                        if(self.value == '') {
                            self.value = 1;
                        } else if(self.value == 0) {
                            if(confirm(`Bạn có muốn bỏ '${cartItem.book.title}' khỏi giỏ hàng không ?`)) {
                                bookStore.currentUser.cart.cartItems.splice(index, 1);
                                bookStore.currentUser.cart.totalAllItems = 0;
                                bookStore.currentUser.cart.calculateTotal();
                                document.body.removeChild(document.querySelector('.pop-up-cart-container'));
                                this.renderPopUpCart(title);
                                bookStore.renderCartIcon();
                            } else {
                                self.value = 1;
                            }
                        } else if(self.value > 0) {
                            cartItem.quantity = +self.value;
                            cartItem.calcTotal();
                            document.querySelector(`#cart-book-${cartItem.bookIndex}`).children[3].innerText = bookStore.addDotToPriceDisplay(`${cartItem.total * 1000}`) + "đ";
                            bookStore.currentUser.cart.calculateTotal();
                            bookStore.renderCartIcon();
                            document.getElementById('total-all').innerText = bookStore.addDotToPriceDisplay(`${bookStore.currentUser.cart.totalAllItems * 1000}`) + "đ";
                        }
                    });
                } else if(key == 'total') {
                    cell.style.color = `var(--light-orange)`;
                    cell.innerText = bookStore.addDotToPriceDisplay(`${+(value * 1000)}`) + `đ`;
                } else if(key == 'book') {
                    cell.style.color = `var(--light-orange)`;
                    cell.innerText = bookStore.addDotToPriceDisplay(`${+(value.price * 1000)}`) + 'đ';
                }
                
                row.append(cell);
            }
            tableBody.append(row);
        }
        const tableFoot = document.createElement('tfoot');
        const tableFootRow = document.createElement('tr');
        const tFootTitle = document.createElement('td');
        tFootTitle.style.textAlign = 'right';
        tFootTitle.colSpan = '3';
        tFootTitle.innerText = 'Tổng tiền thanh toán:';
        const totalAllBooksCell = document.createElement('td');
        totalAllBooksCell.id = 'total-all';
        totalAllBooksCell.style.color = 'var(--light-orange)';
        totalAllBooksCell.innerText = bookStore.addDotToPriceDisplay(`${bookStore.currentUser.cart.totalAllItems * 1000}`) + 'đ';
        tableFootRow.append(tFootTitle, totalAllBooksCell);
        tableFoot.append(tableFootRow);
        tableDisplay.append(tableHeader, tableBody, tableFoot);
        cartContainer.append(tableDisplay);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const backToHomePageBtn = document.createElement('button');
        backToHomePageBtn.innerText = 'Tiếp tục mua hàng';
        backToHomePageBtn.addEventListener('click', () => {
            document.body.removeChild(document.querySelector('.pop-up-cart-container'));
            document.body.style.overflow = 'auto';
        });
        const paymentBtn = document.createElement('button');
        paymentBtn.innerText = 'Tiến hành thanh toán';
        paymentBtn.addEventListener('click', () => {
            bookStore.changePage('Thanh toán');
            document.body.removeChild(document.querySelector('.pop-up-cart-container'));
            // document.body.style.overflow = 'auto';
        });
        buttonContainer.append(backToHomePageBtn, paymentBtn);

        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-button');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(document.querySelector('.pop-up-cart-container'));
            document.body.style.overflow = 'auto';
        });

        popUpCartDetail.append(titleCartContainer, cartContainer, buttonContainer, closeBtn);
        popUpCartContainer.append(popUpCartDetail);
        document.body.append(popUpCartContainer);
    };
};