class GameControl {  
    constructor() {
        this.X_CLASS = 'x';
        this.O_CLASS = 'o';
        this.winningCondition = 0;
        this.player1 = new Player(document.getElementById("player1").value, this.X_CLASS);
        this.player2 = new Player(document.getElementById("player2").value, this.O_CLASS);
        this.board = [];
        this.currentPlayer = Math.round(Math.random()) == 1 ? this.player1 : this.player2;
        this.restartBtn = document.getElementById("restartBtn");
        this.changePlayer1NameBtn = document.getElementById("changePlayer1Name");
        this.changePlayer2NameBtn = document.getElementById("changePlayer2Name");
        this.init();
    }
    init() {
        this.restartBtn.addEventListener("click", this.newGame);
        this.changePlayer1NameBtn.addEventListener('click', () => {
            this.toggleDisabled(document.getElementById("player1"));
        });
        this.changePlayer2NameBtn.addEventListener('click', () => {
            this.toggleDisabled(document.getElementById("player2"));
        });
    }

    toggleDisabled = (player) => {
        player.disabled = !player.disabled;
        player.focus();
        this.player1.setName(document.getElementById("player1").value);
        this.player2.setName(document.getElementById("player2").value);
    };

    newGame = () => {
        let winningCon;
        do {
            winningCon = +prompt("Điều kiện thắng: ", 5);
            if(winningCon < 3) alert("Điều kiện thắng phải lớn hơn hoặc bằng 3!");
        } while(winningCon < 3);
        this.winningCondition = winningCon;
        let boardSize;
        do {
            boardSize = +prompt("Kích thước bàn cờ: ", 20);
            if(boardSize < 10) alert("Kích thước phải lớn hơn bằng 10 hoặc nhỏ hơn bằng 40!");
        } while(boardSize < 10 && boardSize > 40);
        this.board = new Board(boardSize);
        this.setBoardHoverClass();
        document.getElementById("winningMessage").classList.remove("show");
        this.board.cellElements.forEach(cell => {
            cell.classList.remove(this.O_CLASS);
            cell.classList.remove(this.X_CLASS);
            cell.removeEventListener("click", this.handleClick);
            cell.addEventListener("click", this.handleClick, {once: true});
        });
    };

    setBoardHoverClass = () => {
        this.board.boardDisplay.classList.add(this.currentPlayer.getMark());
    };

    handleClick = (event) => {
        const cell = event.target;
        this.placeMark(cell);
        this.isWinner(cell, this.currentPlayer.getMark());
        this.switchPlayer();
    };

    placeMark = (cell) => {
        cell.classList.add(this.currentPlayer.getMark());
        let currentPos = cell.getAttribute("data-cell").split(",").map(e => e = +e);
        this.board.boardArr[currentPos[0]][currentPos[1]] = this.currentPlayer.getMark();
    };

    switchPlayer = () => {
        this.board.boardDisplay.classList.remove(this.currentPlayer.getMark());
        this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
        this.board.boardDisplay.classList.add(this.currentPlayer.getMark());
    };

    winnerAnnounce = () => {
        let winningMessage = document.getElementById("winningMessage");
        winningMessage.children[0].innerText = this.currentPlayer.getName() + " is Winner!";
        winningMessage.classList.add("show");
    };

    isWinner = (currentCell, currentPlayer) => {
        let currentPos = currentCell.getAttribute("data-cell").split(",").map(e => e = +e);
        let playerMoved = [];
        for(let i = 0; i < this.board.boardArr.length; i++){
            for(let j = 0; j < this.board.boardArr[i].length; j++){
                if(this.board.boardArr[i][j] == currentPlayer) playerMoved.push([i,j]);
            }
        }

        if(playerMoved.length >= this.winningCondition){
            let row = playerMoved.filter(el => el[0] == currentPos[0]);
            let col = playerMoved.filter(el => el[1] == currentPos[1]);
            let diagonal = playerMoved.filter(pos => Math.abs(pos[0] - currentPos[0]) == Math.abs(pos[1] - currentPos[1]));
            if(row.length >= this.winningCondition){
                // console.log(row);
                let count = 0;
                for(let index = 0; index < row.length - 1;) {
                    let first = row[index][1];
                    let next = row[index+1][1];
                    if(first + 1 == next) {
                        index++;
                        count++
                        if(count == this.winningCondition - 1) {
                            this.winnerAnnounce();
                            break;
                        }
                    } else {
                        ++index;
                        count = 0;
                        continue;
                    }
                }
            } else if (col.length >= this.winningCondition) {
                // console.log(`Col: ${col}`);
                let count = 0;
                for(let index = 0; index < col.length - 1;) {
                    let first = col[index][0];
                    let next = col[index+1][0];
                    if(first + 1 == next) {
                        index++;
                        count++
                        if(count == this.winningCondition - 1) {
                            this.winnerAnnounce();
                            break;
                        }
                    } else {
                        ++index;
                        count = 0;
                        continue;
                    }
                }
            } else if(diagonal.length >= this.winningCondition) {
                // console.log(`Diagonal: ${diagonal}`);
                let count = 0;
                for(let index = 0; index < diagonal.length - 1;) {
                    let xMinusX = Math.abs(diagonal[index][0] - diagonal[index + 1][0]);
                    let yMinusY = Math.abs(diagonal[index][1] - diagonal[index + 1][1]);
                    if(xMinusX == 1 || yMinusY == 1) {
                        index++;
                        count++
                        if(count == this.winningCondition - 1) {
                            this.winnerAnnounce();
                            break;
                        }
                    } else {
                        ++index;
                        count = 0;
                        continue;
                    }
                }
            }
        }
    };
};