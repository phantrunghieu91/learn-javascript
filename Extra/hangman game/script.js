class HangManArea {
    constructor(width, height) {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = canvas.getContext("2d");
        this.live = 6;
        this.drawBase = () => {
            // Đế
            this.ctx.fillRect(this.canvas.width / 4, this.canvas.height - 30, (this.canvas.width / 4) * 2, 30);
            // Cột
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(this.canvas.width / 3, this.canvas.height - 30);
            this.ctx.lineTo(this.canvas.width / 3, this.canvas.height / 4);
            this.ctx.stroke();
            this.ctx.closePath();
            // Xà ngang
            this.ctx.beginPath();
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(this.canvas.width / 5, this.canvas.height / 4);
            this.ctx.lineTo((this.canvas.width / 5) * 3, this.canvas.height / 4);
            this.ctx.stroke();
            this.ctx.closePath();
            // Dây
            this.ctx.beginPath();
            this.ctx.lineWidth = 3;
            this.ctx.moveTo(this.canvas.width /2, this.canvas.height / 4);
            this.ctx.lineTo(this.canvas.width /2, (this.canvas.height / 5) * 2);
            this.ctx.stroke();
            this.ctx.closePath();
        };
    }

    drawHangMan = () => {
        switch(this.live) {
            case 6:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.arc(this.canvas.width / 2, ((this.canvas.height / 5) * 2) + 12, 12, 0, 2 * Math.PI);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case 5:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.canvas.width / 2, ((this.canvas.height / 5) * 2) + 24);
                this.ctx.lineTo(this.canvas.width / 2, ((this.canvas.height / 5) * 3) + 20);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case 4:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.canvas.width / 2, ((this.canvas.height / 5) * 3) + 20);
                this.ctx.lineTo(this.canvas.width / 2 - 20, ((this.canvas.height / 5) * 4) + 20);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case 3:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.canvas.width / 2, ((this.canvas.height / 5) * 3) + 20);
                this.ctx.lineTo(this.canvas.width / 2 + 20, ((this.canvas.height / 5) * 4) + 20);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case 2:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
                this.ctx.lineTo(this.canvas.width / 2 - 20, ((this.canvas.height / 5) * 3) + 20);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
            case 1:
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
                this.ctx.lineTo(this.canvas.width / 2 + 20, ((this.canvas.height / 5) * 3) + 20);
                this.ctx.stroke();
                this.ctx.closePath();
                break;
        }   
        this.live--;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
class HangManWord {
    constructor(category, word, hint) {
        this.category = category;
        this.word = word;
        this.hint = hint;
    }
}

function renderAlphabetButtons() {
    for(let i = 65; i <= 90; i++) {
        let char = String.fromCharCode(i);
        let charBtn = document.createElement("button");
        charBtn.classList.add("char-button");
        charBtn.textContent = char;
        document.getElementById("alphabet-btn-container").appendChild(charBtn);
    }
}

function addFunctionForAlphabetBtns() {
    const abcBtns = document.querySelectorAll('button.char-button');
    abcBtns.forEach(btn => {
        btn.addEventListener("click", handleAlphabetClick, {once: true});
    });
}

const handleAlphabetClick = (event) => {
    const self = event.currentTarget;
    const clickedChar = self.textContent.toLowerCase();
    const guessWordArr = guessWord.split("");
    if(guessWordArr.includes(clickedChar)) {
        guessWordArr.forEach((char, index) => {
            if(char == clickedChar) {
                guessChars[index].textContent = char.toUpperCase();
            }
        });
    } else {
        hangManDrawArea.drawHangMan();
    }
    self.setAttribute("disabled", "");
    checkGameOver();
}

function checkGameOver() {
    let guessCharsArr = [];
    guessChars.forEach(e => guessCharsArr.push(e.textContent));
    let winningCondition = !guessCharsArr.includes("_");
    let gameOverCondition = hangManDrawArea.live == 0;
    if(winningCondition || gameOverCondition) {
        if(winningCondition) {
            gameOverAnnouce("You win!");
        } else {
            gameOverAnnouce("You lose!");
        }
    }
}

function gameOverAnnouce(message) {
    let messageDisplay = document.getElementById("message");
    document.getElementById("gameOverMessage").classList.add("show");
    messageDisplay.innerText = message.toUpperCase();
}

function renderCatologiesDropDown(categoriesArr) {
    let categoriesDisplay = document.getElementById("categories");
    for(let category of categoriesArr) {
        let listItem = document.createElement("li");
        listItem.textContent = category.split("").map((c, index) => {
            return index == 0 ? c.toUpperCase() : c;
        }).join("");
        listItem.addEventListener("click", handleCategoriesSelectClick, {once: true});
        categoriesDisplay.appendChild(listItem);
    }
}

function handleCategoriesSelectClick(event) {
    let self = event.currentTarget;
    self.parentNode.parentNode.textContent = `Chosen category is ${self.textContent}`;
    renderWord(self.textContent.toLowerCase());
    guessChars = document.querySelectorAll('.guess');
    addFunctionForAlphabetBtns();
}

function randomValue(arr, category) {
    const chosenCategory = arr.filter(el => {
        if(el.category == category) return el;
    });
    let rndNum = Math.floor(Math.random() * chosenCategory.length);
    return chosenCategory[rndNum].word;
}

function renderWord(arrName) {
    switch (arrName) {
        case 'animals':
            guessWord = randomValue(guessWords, 'animals');
            break;
        case 'cars':
            guessWord = randomValue(guessWords, 'cars');
            break;
        case 'countries':
            guessWord = randomValue(guessWords, 'countries');
            break;
    }

    const wordContainer = document.getElementById("word-container");
    let ul = document.getElementById("guess-word");
    guessWord.split("").forEach(char => {
        let li = document.createElement("li");
        li.classList.add("guess");
        li.textContent = "_";
        ul.appendChild(li);
    });
    wordContainer.appendChild(ul);
}

const hangManDrawArea = new HangManArea(400, 300);
const guessWords = [
                    new HangManWord('animals', 'elephant', 'Biggest animal on land'),
                    new HangManWord('animals', 'penguin', 'Bird that can\'t fly'),
                    new HangManWord('animals', 'whale', 'Biggest animal on earth that still alive'),
                    new HangManWord('cars', 'lamborghini', 'A famous Italia brand'),
                    new HangManWord('cars', 'ferrari', 'A famous Italia brand'),
                    new HangManWord('cars', 'mercedes', 'A famous Germany brand'),
                    new HangManWord('countries', 'vietnam', 'Hanoi is capitalcity'),
                    new HangManWord('countries', 'japan', 'Biggest animes culture in the world'),
                    new HangManWord('countries', 'canada', 'Country had famous kanguru'),
                ];
const categories = ['animals', 'cars', 'countries'];
let guessWord;
let guessChars;
const restartBtn = document.getElementById("restart-button");
const hintBtn = document.getElementById("hint-button");
restartBtn.addEventListener('click', startGame);
hintBtn.addEventListener('click', getHint);

function getHint() {
    let currentGuess = guessWords.filter(obj => obj.word == guessWord).pop();
    let clueMessage = document.getElementById("clue-message");
    clueMessage.innerText = `- ${currentGuess.hint}`;
}

function renderAll() {    
    let categoriesUl = document.getElementById("categories");
    if(categoriesUl == null) {
        categoriesUl = document.createElement("ul");
        categoriesUl.setAttribute('id', 'categories');
        document.getElementById("categories-container").innerText = 'Categories:';
        document.getElementById("categories-container").appendChild(categoriesUl);
    }
    let abcButtonContainer = document.getElementById("alphabet-btn-container");
    if(abcButtonContainer.firstChild == null) {
        renderAlphabetButtons();
    } else {
        abcButtonContainer.innerHTML = ""
        renderAlphabetButtons();
    }
    let baseLi = document.createElement("li");
    baseLi.classList.add("selected");
    baseLi.textContent = "---";
    categoriesUl.appendChild(baseLi);
    renderCatologiesDropDown(categories);
    document.getElementById('clue-message').innerText = "";
    if(document.getElementById("gameOverMessage").classList.contains("show")) document.getElementById("gameOverMessage").classList.remove("show");
}

function startGame() {
    guessWord = '';
    guessChars = null;
    document.getElementById("guess-word").innerHTML = '';
    hangManDrawArea.clear();
    hangManDrawArea.drawBase();
    hangManDrawArea.live = 6;
    renderAll();
}

startGame();