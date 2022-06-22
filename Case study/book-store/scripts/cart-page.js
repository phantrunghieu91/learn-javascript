class CartPage {
    constructor() {
    }
    render = () => {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        
        const container = document.createElement('div');
        container.style.width = '80%';
        container.style.height = '100%';
        container.classList.add('container');

        const h3Title = document.createElement('h3');
        h3Title.style.textAlign = 'left';
        h3Title.innerText = 'Giỏ hàng của bạn';

        const cartContainer = document.createElement('div');
        cartContainer.classList.add('cart-container');
        
        if(bookStore.currentUser.cart.cartItems.length == 0) {
            cartContainer.style.height = '100%';
            cartContainer.style.width = '100%';
            const emptyCartAnnouce = document.createElement('p');
            const linkToHomepage = document.createElement('a');
            linkToHomepage.innerText = "cửa hàng";
            linkToHomepage.addEventListener('click', () => {
                bookStore.changePage('Trang chủ');
            });
            emptyCartAnnouce.append(`Không có sản phẩm nào trong giỏ hàng. Quay lại `, linkToHomepage, ` để tiếp tục mua sắm.`);
            cartContainer.append(emptyCartAnnouce);
            container.append(h3Title, cartContainer);
        } else {
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
                const bookAtCartItem = booksList[cartItem.bookIndex];
                row.id = `book-${cartItem.bookIndex}`;
                for(let [key, value] of Object.entries(cartItem)) {
                    const cell = document.createElement('td');
                    if (typeof (value) == 'function') {
                        continue;
                    }
                    else if(key == 'bookIndex') {
                        cell.innerText = bookAtCartItem.title;
                    } else if(key == 'quantity') {
                        const quantityInput = document.createElement('input');
                        quantityInput.type = 'number';
                        quantityInput.value = +value;
                        quantityInput.max = bookAtCartItem.quantity;
                        cell.append(quantityInput);
                        quantityInput.addEventListener('input', (event) => {
                            const self = event.currentTarget;
                            if(self.value == '') {
                                self.value = 1;
                            } else if(self.value == 0) {
                                if(confirm(`Bạn có muốn bỏ '${bookAtCartItem.title}' khỏi giỏ hàng không ?`)) {
                                    bookStore.currentUser.cart.cartItems.splice(index, 1);
                                    bookStore.currentUser.cart.totalAllItems = 0;
                                    this.render();
                                } else {
                                    self.value = 1;
                                }
                            } else if(self.value > 0) {
                                cartItem.quantity = +self.value;
                                cartItem.calcTotal();
                                document.querySelector(`#book-${cartItem.bookIndex}`).children[3].innerText = bookStore.addDotToPriceDisplay(`${cartItem.total * 1000}`) + 'đ';
                                bookStore.currentUser.cart.calculateTotal();
                                document.getElementById('total-all').innerText = bookStore.addDotToPriceDisplay(`${bookStore.currentUser.cart.totalAllItems * 1000}`) + 'đ';
                            }
                        });
                    } else if(key == 'total') {
                        cell.style.color = `var(--light-orange)`;
                        cell.innerText = bookStore.addDotToPriceDisplay((value * 1000).toString()) + `đ`;
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
                bookStore.changePage('Trang chủ');
            });
            const paymentBtn = document.createElement('button');
            paymentBtn.innerText = 'Tiến hành thanh toán';
            paymentBtn.addEventListener('click', () => {
                document.body.style.overflow = 'hidden';
                bookStore.changePage('Thanh toán');
            });
            buttonContainer.append(backToHomePageBtn, paymentBtn);

            container.append(h3Title, cartContainer, buttonContainer);
        }
        
        mainContainer.append(container);
    };
};