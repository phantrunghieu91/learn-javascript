class RegisterPage {
    constructor(){
    }

    render = () => {
        const mainContainer = document.getElementById('main-container');
        mainContainer.innerHTML = '';

        const container = document.createElement('div');
        container.classList.add('container');
        const formContainer = document.createElement('div');
        formContainer.classList.add('form-container');

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('form-item');
        const title = document.createElement('h2');
        title.innerText = 'Đăng ký tài khoản';
        const accountError = document.createElement('span');
        accountError.classList.add('error-message');
        titleContainer.append(title, accountError);

        const nameInputContainer = document.createElement('div');
        nameInputContainer.classList.add('form-item');
        const fullNameInput = document.createElement('input');
        fullNameInput.id = 'fullname';
        fullNameInput.type = 'text';
        fullNameInput.placeholder = 'Họ và tên';
        fullNameInput.pattern = '[A-Za-z]{2,}';
        const nameError = document.createElement('span');
        nameError.classList.add('error-message');
        nameInputContainer.append(fullNameInput, nameError);

        const emailInputContainer = document.createElement('div');
        emailInputContainer.classList.add('form-item');
        const emailInput = document.createElement('input');
        emailInput.id = 'email';
        emailInput.type = 'email';
        emailInput.placeholder = 'Email';
        const emailError = document.createElement('span');
        emailError.classList.add('error-message');
        emailInputContainer.append(emailInput, emailError);

        const pwInputContainer = document.createElement('div');
        pwInputContainer.classList.add('form-item');
        const pwInput = document.createElement('input');
        pwInput.id = 'password';
        pwInput.type = 'password';
        pwInput.placeholder = 'Mật khẩu';
        const pwError = document.createElement('span');
        pwError.classList.add('error-message');
        pwInputContainer.append(pwInput, pwError);
        const registerBtn = document.createElement('button');
        registerBtn.innerText = 'Đăng ký';
        registerBtn.addEventListener('click', () => {
            const fullName = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const newUser = new User(fullName, email, password);
            this.registerSubmit(newUser);
        });

        formContainer.append(titleContainer, nameInputContainer, emailInputContainer, pwInputContainer, registerBtn);
        container.append(formContainer);
        mainContainer.append(container);
    };

    isEmailExist = (email) => {
        return usersList.findIndex(user => user.email === email) == -1 ? false : true;
    };

    isEmailValid = (email) => {
        const isHadWhiteSpaceAndSymbol = /[\s]+[^A-Za-z0-9\_\@\.]+/g;
        const isHadAtSign = /[\@]{1}[a-z]+/g;
        const isHadDot = /[\.]{1}[a-z]+/g;
        if(isHadWhiteSpaceAndSymbol.test(email)) {
            return false;
        }else {
            if(isHadAtSign.test(email) && isHadDot.test(email)) {
                if(email.match(isHadAtSign) > 1 || email.match(isHadAtSign) <= 0 ||
                email.match(isHadDot) > 1 || email.match(isHadDot) <= 0) return false;
                else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };

    isPasswordValid = (pw) => {
        const lengthCondition = pw.length >= 5;
        return lengthCondition;
    };

    isNameValid = (fname) => {
        const condition = /[A-Za-z]+/g;
        return condition.test(fname);
    };

    registerSubmit = (user) => {
        const errorMessages = document.querySelectorAll('span.error-message');
        errorMessages.forEach(e => e.innerText = '');
        if(!this.isEmailValid(user.email)) {
            errorMessages[2].innerText = 'Email không hợp lệ';
        }
        if(!this.isNameValid(user.fullName)) {
            errorMessages[1].innerText = 'Tên không hợp lệ';
        }
        if(!this.isPasswordValid(user.password)) {
            errorMessages[3].innerText = 'Mật khẩu không hợp lệ';
        }
        if(this.isEmailValid(user.email) && this.isNameValid(user.fullName) && this.isPasswordValid(user.password)){
            if(!this.isEmailExist(user.email)) {
                usersList.push(user);
                bookStore.currentUser = user;
                bookStore.changePage('Trang chủ');
            } else {
                errorMessages[0].innerText = 'Email đã tồn tại';
            }
        }
    };
};