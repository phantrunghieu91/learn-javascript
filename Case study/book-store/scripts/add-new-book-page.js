class AddNewPage {
    constructor() {
        this.render();
    }

    render = () => {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';
        const container = document.createElement('div');
        container.classList.add('container');

        const h3Title = document.createElement('h3');
        h3Title.innerText = 'Thêm sách mới';
        
        const formDiv = document.createElement('div');
        formDiv.classList.add('add-new-form');
    
        const vietnameseKey = ['Tựa đề:', 'Nhà xuất bản:', 'Tác giả:', 'Thể loại:', 'Giá:', 'Số lượng:', 'Mô tả:', 'Ảnh nguồn:'];
        let index = 0;
        for(const key of Object.keys(booksList[0])) {
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');
            const label = document.createElement('label');
            label.setAttribute('for', key);
            label.innerText = vietnameseKey[index++];
            let item;
            switch(key){
                case 'description':
                    item = document.createElement('textarea');
                    item.rows = 7;
                    break;
                case 'type':
                    item = document.createElement('input');
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
            item.id = key;
            item.setAttribute('new-book-data', '');
            const errorMessage = document.createElement('span');
            errorMessage.classList.add('error-message');
            formItem.append(label, item, errorMessage);
            formDiv.append(formItem);
        }
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-container');
        const submitBtn = document.createElement('button');
        submitBtn.innerText = 'Xác nhận';
        submitBtn.addEventListener('click', () => {
            if(AddNewPage.isValid('new-book-data')) {
                bookStore.addBook(new Book(document.getElementById('title').value, document.getElementById('publisher').value, document.getElementById('author').value, document.getElementById('type').value, document.getElementById('price').value, document.getElementById('description').value, document.getElementById('imgSrc').value, document.getElementById('quantity').value));
                bookStore.changePage('Trang chủ');
            }
        });

        buttonDiv.append(submitBtn);
        formDiv.append(buttonDiv);
        container.append(h3Title, formDiv);
        mainContainer.append(container);
    };

    static isValid = (dataSelector) => {
        const formInputs = document.querySelectorAll(`[${dataSelector}]`);
        const errorMessagesSpan = document.querySelectorAll('span.error-message');
        for(let i = 0; i < formInputs.length; i++) {
            if(i == 6) continue;
            if(!formInputs[i].value.length == 0) {
                switch (i) {
                    case 5:
                        if(Number.isInteger(+formInputs[i].value)) {
                            formInputs[i].setAttribute('valid', true);
                            errorMessagesSpan[i].innerText = '';
                        } else {
                            errorMessagesSpan[i].innerText = 'Chỉ có thể nhập số tự nhiên';
                            formInputs[i].setAttribute('valid', false);
                        }
                        break;
                    default:
                        formInputs[i].setAttribute('valid', true);
                        errorMessagesSpan[i].innerText = '';
                        break;
                }
            }else {
                errorMessagesSpan[i].innerText = 'Không được để trống';
                formInputs[i].setAttribute('valid', false);
            }
        }
        const validStates = [];
        document.querySelectorAll('[valid]').forEach(n => validStates.push(n.getAttribute('valid')));
        const notvalidEle = validStates.filter(obj => obj == 'false');
        return notvalidEle.length == 0;
    };
};