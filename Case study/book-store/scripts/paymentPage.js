class PaymentPage {
    constructor(){

    }
    render = () => {
        const currentUser = bookStore.currentUser;
        const totalTemp = currentUser.cart.totalAllItems;
        const transportFeePrice = 0;
        const paymentContainer = document.createElement('div');
        paymentContainer.classList.add('payment-container');
        
        // CUSTOMER INFO SECTION
        const customerInfoContainer = document.createElement('div');
        customerInfoContainer.classList.add('customer-info-container');
        const storeLogoContainer = document.createElement('div');
        storeLogoContainer.classList.add('logo-container');
        storeLogoContainer.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            bookStore.changePage('Trang chủ');
            document.body.removeChild(document.querySelector('div.payment-container'));
        });
        const storeLogo = document.createElement('img');
        storeLogo.src = 'imgs/logo.jpg';
        storeLogoContainer.append(storeLogo);
        
        const customerInfoContent = document.createElement('div');
        customerInfoContent.classList.add('customer-info-content');
        const customerInfo = document.createElement('div');
        customerInfo.classList.add('customer-info');
        const customerInfoHeader = document.createElement('div');
        customerInfoHeader.innerHTML = `<h2>Thông tin nhận hàng</h2>`;
        const customerInfoInputs = document.createElement('div');
        customerInfoInputs.classList.add('customer-info-form');
        const fullNameInputContainer = document.createElement('div');
        fullNameInputContainer.classList.add('input-container');
        fullNameInputContainer.innerHTML = `<label for='fullname'>Họ và tên</label>`;
        fullNameInputContainer.innerHTML += `<input type='text' placeholder='Họ và tên' id='fullname' value='${currentUser.fullName}'>`;
        const phoneNumberContainer = document.createElement('div');
        phoneNumberContainer.classList.add('input-container');
        phoneNumberContainer.innerHTML = `<label for='phone-number'>Số điện thoại</label>`;
        phoneNumberContainer.innerHTML += `<input type='text' id='phone-number' placeholder='Tùy chọn'>`;
        const addressInputContainer = document.createElement('div');
        addressInputContainer.classList.add('input-container');
        addressInputContainer.innerHTML = `<label for='address'>Địa chỉ</label>`;
        addressInputContainer.innerHTML += `<input type='text' id='address' placeholder='Tùy chọn'>`;
        const cityContainer = document.createElement('div');
        cityContainer.classList.add('input-container');
        cityContainer.innerHTML = `<label for='city'>Tỉnh thành</label>`;
        const cityInput = document.createElement('input');
        cityInput.id = 'city';
        cityInput.setAttribute('list', 'city-list');
        // cityInput.addEventListener('input', (e) => {
        cityInput.oninput = (e) => {
            const inputValue = e.currentTarget.value;
            console.log(inputValue);
            citiesList.find((city, index) => {
                if(index >= 0 && index < 21) transportFeePrice = 20;
                else if(index >= 20 && index < 42) transportFeePrice = 30;
                else if(index >= 42 && index < 63) transportFeePrice = 40;
                else transportFeePrice = 0;
                console.log(city, transportFeePrice);
                document.querySelector('#transport-fee').innerText = `${bookStore.addDotToPriceDisplay((transportFeePrice * 1000).toString())}đ`;
            });
        }
        // );
        cityContainer.append(cityInput);
        
        let citiesDataList = `<datalist id='city-list'>`;
        for(let i = 0; i < citiesList.length; i++) {
            citiesDataList += `<option value='${citiesList[i]}'>${citiesList[i]}</option>`;
        }
        citiesDataList += `</datalist>`;
        cityContainer.innerHTML += citiesDataList;
        const noteContainer = document.createElement('div');
        noteContainer.classList.add('input-container');
        noteContainer.innerHTML = `<label for='note'>Ghi chú</label>`;
        noteContainer.innerHTML += `<textarea id='note' rows='5' placeholder='Tùy chọn'></textarea>`;

        customerInfoInputs.append(fullNameInputContainer, phoneNumberContainer, addressInputContainer, cityContainer, noteContainer);

        // const transportInfo = document.createElement('div');
        // transportInfo.classList.add("transport-info");
        // const transportInfoHeader = document.createElement('div');
        // transportInfoHeader.innerHTML = '<h2>Vận chuyển</h2>';
        // transportInfo.append(transportInfoHeader);

        customerInfo.append(customerInfoHeader, customerInfoInputs);
        customerInfoContent.append(customerInfo)//, transportInfo);
        customerInfoContainer.append(storeLogoContainer, customerInfoContent);

        // ORDER INFO SECTION
        const orderInfoContainer = document.createElement('div');
        orderInfoContainer.classList.add('order-info-container');
        const orderInfoHeader = document.createElement('div');
        orderInfoHeader.classList.add('order-info-header');
        orderInfoHeader.innerHTML = `<h2>Đơn hàng của bạn (${currentUser.cart.cartItems.length} sản phẩm)<h2>`;

        const orderInfoContent = document.createElement('div');
        orderInfoContent.classList.add('order-info-content');
        const orderedBookListContainer = document.createElement('div');
        orderedBookListContainer.classList.add('ordered-book-list-container');
        const bookListContainer = document.createElement('div');
        bookListContainer.classList.add('cart-items-list');
        for(const cartItem of currentUser.cart.cartItems) {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');
            const img = document.createElement('img');
            img.src = cartItem.book.imgSrc;
            imgContainer.append(img);
            const bookTitleAndQuantityContainer = document.createElement('div');
            bookTitleAndQuantityContainer.classList.add('book-title-and-quantity');
            bookTitleAndQuantityContainer.innerHTML = `<span>${cartItem.book.title} (${cartItem.quantity} quyển)</span>`;
            const itemTotal = document.createElement('div');
            itemTotal.classList.add('item-total');
            itemTotal.innerHTML = `<span>${bookStore.addDotToPriceDisplay((cartItem.total * 1000).toString())}đ</span>`;
            item.append(imgContainer, bookTitleAndQuantityContainer, itemTotal);
            bookListContainer.append(item);
        }
        const discountCodeContainer = document.createElement('div');
        discountCodeContainer.classList.add('discount-code-container');
        const discountCodeInput = document.createElement('input');
        discountCodeInput.type = 'text';
        discountCodeInput.placeholder = 'Nhập mã giảm giá';
        discountCodeInput.id = 'discount-code';
        const codeApply = document.createElement('button');
        codeApply.innerText = 'Áp dụng';
        codeApply.addEventListener('click', () => {
            const code = document.querySelector('#discount-code').value.toLowerCase();
            const totalPrice = transportFeePrice + totalTemp;
            let result;
            for(let discountCode of discountCodeList) {
                if(Object.keys(discountCode) == code) {
                    result = discountCode[code];
                    break;
                } else {
                    result = 0;
                }
            }
            const afterCalc = (totalPrice - (totalPrice * result)/100) * 1000;
            document.querySelector('div.total-price-container').children[1].innerText = bookStore.addDotToPriceDisplay(afterCalc.toString()) + 'đ';
        });

        const tempTotalContainer = document.createElement('div');
        tempTotalContainer.classList.add('temperal-total-container');
        const tempTotal = document.createElement('div');
        tempTotal.innerHTML += `<span>Tạm tính:</span>`;
        tempTotal.innerHTML += `<span id='temp-total'>${bookStore.addDotToPriceDisplay((totalTemp * 1000).toString())}đ</span>`;
        const transportFee = document.createElement('div');
        transportFee.innerHTML += `<span>Phí vận chuyển: </span>`;
        transportFee.innerHTML += `<span id='transport-fee'>${bookStore.addDotToPriceDisplay((transportFeePrice * 1000).toString())}đ</span>`;
        tempTotalContainer.append(tempTotal, transportFee);
        
        const totalContainer = document.createElement('div');
        totalContainer.classList.add('total-price-container');
        totalContainer.innerHTML += `<span>Tổng cộng:</span>`;
        totalContainer.innerHTML += `<span style="color: #2a9dcc;">${bookStore.addDotToPriceDisplay(((totalTemp + transportFeePrice) * 1000).toString())}đ</span>`;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const backToCart = document.createElement('a');
        backToCart.addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            document.body.removeChild(document.querySelector('div.payment-container'));
            bookStore.changePage('Giỏ hàng');
        });
        backToCart.innerText = 'Quay lại giỏ hàng';
        const orderButton = document.createElement('button');
        orderButton.innerText = 'Đặt hàng';
        orderButton.addEventListener('click', () => {
            alert('Still working!');
        });
        buttonContainer.append(backToCart, orderButton);

        discountCodeContainer.append(discountCodeInput, codeApply);
        orderedBookListContainer.append(bookListContainer);
        orderInfoContent.append(orderedBookListContainer, discountCodeContainer, tempTotalContainer, totalContainer, buttonContainer);
        orderInfoContainer.append(orderInfoHeader, orderInfoContent);
        paymentContainer.append(customerInfoContainer, orderInfoContainer);
        document.body.append(paymentContainer);
    };
};