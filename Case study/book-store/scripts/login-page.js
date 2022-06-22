class LoginPage {
    constructor() {
        this.email;
        this.password;
        this.current;
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
        title.innerText = 'Đăng nhập tài khoản';
        const accountError = document.createElement('span');
        accountError.classList.add('error-message');
        titleContainer.append(title, accountError);
        
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
        const loginBtn = document.createElement('button');
        loginBtn.innerText = 'Đăng nhập';
        loginBtn.addEventListener('click', this.login);
        const regMessage = document.createElement('p');
        regMessage.innerText = 'Chưa có tài khoản đăng ký ';
        const regLink = document.createElement('a');
        regLink.innerText = ' tại đây';
        regLink.addEventListener('click', () => {bookStore.changePage('Đăng ký');});
        regMessage.append(regLink);

        formContainer.append(titleContainer, emailInputContainer, pwInputContainer, loginBtn, regMessage);
        container.append(formContainer);
        mainContainer.append(container);
    };

    isEmailValid = () => {
        const isHadWhiteSpaceAndSymbol = /[\s]+[^A-Za-z0-9\_\@\.]+/g;
        const isHadAtSign = /[\@]{1}[a-z]+/g;
        const isHadDot = /[\.]{1}[a-z]+/g;
        const isAdmin = this.email == 'admin';
        if(isHadWhiteSpaceAndSymbol.test(this.email)) {
            return false;
        } else if(isAdmin) {
            return true;
        }else {
            if(isHadAtSign.test(this.email) && isHadDot.test(this.email)) {
                if(this.email.match(isHadAtSign) > 1 || 
                this.email.match(isHadDot) > 1) return false;
                else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };

    isPasswordValid = () => {
        const lengthCondition = this.password.length >= 5;
        return lengthCondition;
    };

    login = () => {
        this.email = document.getElementById('email').value;
        this.password = document.getElementById('password').value;
        const errorMessages = document.querySelectorAll('span.error-message');
        errorMessages.forEach(e => e.innerText = '');
        if(!this.isEmailValid()) {
            errorMessages[1].innerText = 'Email không hợp lệ';
        } 
        if(!this.isPasswordValid()) {
            errorMessages[2].innerText = 'Mật khẩu phải dài hơn 5 ký tự';
        }
        if(this.isEmailValid() && this.isPasswordValid()) {
            const user = usersList.filter(user => user.email == this.email);
            if(user.length > 0) {
                if(this.password === user[0].password) {
                    bookStore.currentUser = user[0];
                    bookStore.changePage('Trang chủ');
                } else {
                    errorMessages[2].innerText = 'Mật khẩu không chính xác';        
                }
            } else {
                errorMessages[0].innerText = 'Tài khoản không chính xác';
            }
        } 
    };
};