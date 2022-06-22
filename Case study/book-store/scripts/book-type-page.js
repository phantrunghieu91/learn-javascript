class BookTypePage {
    constructor(type) {
        this.type = type;
        this.bookPerGroup = 9;
        this.booksOfType = type == 'tổng hợp' ? booksList : booksList.filter(book => book.type === type);
        this.currentGroup = 0;
        this.groupCount = (() => {
            if((this.booksOfType.length / this.bookPerGroup != 0 && this.booksOfType % this.bookPerGroup != 0)){
                return Math.floor(this.booksOfType.length / this.bookPerGroup) + 1;
            } else {
                return 1;
            }
        })();
        this.currentIndex = 0;
    }

    render = () => {
        if(this.booksOfType.length == 0) {
            bookStore.changePage('Trang chủ');
            return;
        }
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        const container = document.createElement('div');
        container.classList.add('category-container');
        const title = document.createElement('h3');
        title.innerText = `Sách ${this.type}`;
        
        const booksContainer = document.createElement('div');
        booksContainer.classList.add('books-container');        

        // Navigator
        const pageList = document.createElement('ul');
        pageList.classList.add('page-list');
        // Previous page button
        if(this.currentGroup > 0) {
            const prevBtn = document.createElement('li');
            prevBtn.classList.add('page-list-item');
            prevBtn.innerText = '<';
            prevBtn.addEventListener('click', () => {
                this.currentGroup--;
                this.currentIndex = this.currentGroup * this.bookPerGroup;
                this.render();
            });
            pageList.append(prevBtn);
        }
        for(let i = 0; i < this.groupCount; i++) {
            const pageLi = document.createElement('li');
            pageLi.classList.add('page-list-item');
            pageLi.setAttribute('data', `${this.currentGroup + i}, ${this.currentIndex + i * this.bookPerGroup}`);
            pageLi.innerText = i + 1;
            pageLi.addEventListener('click', () => {
                this.currentGroup = i;
                this.currentIndex = this.currentGroup * this.bookPerGroup;
                this.render();
            });
            if(i == this.currentGroup) pageLi.classList.add('active');
            else pageLi.classList.remove('active');
            pageList.append(pageLi);
        }
        // Next page button
        if(this.currentGroup == 0 && this.currentGroup + 1 < this.groupCount 
            || this.currentGroup + 1 < this.groupCount) {
            const nextBtn = document.createElement('li');
            nextBtn.classList.add('page-list-item');
            nextBtn.innerText = '>';
            nextBtn.addEventListener('click', () => {
                this.currentGroup++;
                this.currentIndex = this.currentGroup * this.bookPerGroup;
                this.render();
            });
            pageList.append(nextBtn);
        }
        // Render books
        for(let i = this.currentIndex; i < this.booksOfType.length; i++) {
            if(i == (this.currentGroup + 1) * this.bookPerGroup) {
                break;
            }
            const book = this.booksOfType[i];
            const bookContainer = document.createElement('div');
            bookContainer.classList.add('book');
            const bookThumbnail = document.createElement('div');
            bookThumbnail.classList.add('book-thumbnail');
            const bookImg = document.createElement('img');
            bookImg.src = `${book.imgSrc}`;
            bookImg.alt = `${book.title}`;
            bookThumbnail.append(bookImg);

            const bookInfo = document.createElement('div');
            bookInfo.classList.add('book-info');
            const bookName = document.createElement('h3');
            bookName.classList.add('book-name');
            bookName.innerText = book.title;
            const bookPrice = document.createElement('span');
            bookPrice.classList.add('book-price');
            bookPrice.innerText = bookStore.addDotToPriceDisplay(`${book.price * 1000}`) + "₫";
            bookInfo.append(bookName, bookPrice);

            const hiddenContainer = document.createElement('div');
                hiddenContainer.classList.add('hidden-container');
                const viewDetailBtn = document.createElement('button');
                viewDetailBtn.innerText = 'Xem chi tiết';
                viewDetailBtn.addEventListener('click', () => {
                    bookStore.homePage.showDetail(book);
                });
                hiddenContainer.append(viewDetailBtn);
                if(bookStore.currentUser != undefined && bookStore.currentUser.email == 'admin') {
                    const editBtn = document.createElement('button');
                    editBtn.innerText = 'Sửa';
                    editBtn.addEventListener('click', () => {
                        bookStore.editBook(book.title);
                    });
                    const removeBtn = document.createElement('button');
                    removeBtn.innerText = 'Xóa';
                    removeBtn.addEventListener('click', () => {
                        bookStore.removeBook(book.title);
                    });
                    hiddenContainer.append(editBtn, removeBtn);
                }

            bookContainer.append(bookThumbnail, bookInfo, hiddenContainer);
            booksContainer.append(bookContainer);
        }
        
        container.append(title, booksContainer, pageList);
        mainContainer.append(container);
    };
};