let boardDisplay = document.getElementById("board");
let boardSize = +prompt("Nhập vào kích thước bàn cờ: ", 10);
let winningCondition = +prompt("Nhập vào điều kiện thắng", 3);
document.documentElement.style.setProperty("--board-size", boardSize);
let boardArr = [];
const O_CLASS = "o";
const X_CLASS = "x";
let currentPlayer;
const restartBtn = document.getElementById("restart-button");
restartBtn.addEventListener("click", startGame);

function drawBoard(){
    for(let i = 0; i < boardSize; i++){         // Hàng
        boardArr[i] = [];
        for(let j = 0; j < boardSize; j++){     // Phần tử trong hàng
            let cell = document.createElement("div");
                    
            cell.className = "cell";
            cell.setAttribute("data-cell", [i, j]);
            
            // Xóa viền bên ngoài bàn cờ
            if(i == 0) cell.style.borderTop = "none";
            else if(i == boardSize - 1) cell.style.borderBottom = "none";
            if(j == 0) cell.style.borderLeft = "none";
            else if(j == boardSize - 1) cell.style.borderRight = "none";

            boardDisplay.appendChild(cell);
        }
    }    
}
drawBoard();
function startGame(){
    let cellList = document.querySelectorAll("[data-cell]");    
    currentPlayer = Math.round(Math.random()) == 1 ? X_CLASS : O_CLASS;
    setBoardHoverClass(currentPlayer);
    document.getElementById("winningMessage").classList.remove("show");
    cellList.forEach(cell => {
        cell.classList.remove(O_CLASS);
        cell.classList.remove(X_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {one: true});
    });
    for(let i = 0; i < boardSize; i++){
        boardArr[i] = [];
        for(let j = 0; j < boardSize; j++){  
            boardArr[i][j] = "";
        }
    }
}

function handleClick(event){
    const cell = event.target;
    placeMark(cell, currentPlayer);
    isWinner(cell, currentPlayer);
    switchClass();
}

function isWinner(currentCell, currentPlayer){
    let currentPos = currentCell.getAttribute("data-cell").split(",").map(e => e = +e);
    let playerMoved = [];
    for(let i = 0; i < boardArr.length; i++){
        for(let j = 0; j < boardArr[i].length; j++){
            if(boardArr[i][j] == currentPlayer) playerMoved.push([i,j]);
        }
    }

    if(playerMoved.length >= winningCondition){
        let row = playerMoved.filter(el => el[0] == currentPos[0]);
        let col = playerMoved.filter(el => el[1] == currentPos[1]);
        let diagonal = playerMoved.filter(pos => Math.abs(pos[0] - currentPos[0]) == Math.abs(pos[1] - currentPos[1]));
        if(row.length >= winningCondition){
            // console.log(row);
            let count = 0;
            for(let index = 0; index < row.length - 1;) {
                let first = row[index][1];
                let next = row[index+1][1];
                if(first + 1 == next) {
                    index++;
                    count++
                    if(count == winningCondition - 1) {
                        winnerAnnounce();
                        break;
                    }
                } else {
                    ++index;
                    count = 0;
                    continue;
                }
            }
        } else if (col.length >= winningCondition) {
            // console.log(`Col: ${col}`);
            let count = 0;
            for(let index = 0; index < col.length - 1;) {
                let first = col[index][0];
                let next = col[index+1][0];
                if(first + 1 == next) {
                    index++;
                    count++
                    if(count == winningCondition - 1) {
                        winnerAnnounce();
                        break;
                    }
                } else {
                    ++index;
                    count = 0;
                    continue;
                }
            }
        } else if(diagonal.length >= winningCondition) {
            // console.log(`Diagonal: ${diagonal}`);
            let count = 0;
            for(let index = 0; index < diagonal.length - 1;) {
                let xMinusX = Math.abs(diagonal[index][0] - diagonal[index + 1][0]);
                let yMinusY = Math.abs(diagonal[index][1] - diagonal[index + 1][1]);
                if(xMinusX == 1 || yMinusY == 1) {
                    index++;
                    count++
                    if(count == winningCondition - 1) {
                        winnerAnnounce();
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
}

function winnerAnnounce() {
    let winningMessage = document.getElementById("winningMessage");
    winningMessage.children[0].innerText = currentPlayer.toUpperCase() + " is Winner!";
    winningMessage.classList.add("show");
}

function switchClass(){
    boardDisplay.classList.remove(currentPlayer);
    currentPlayer = currentPlayer == X_CLASS ? O_CLASS : X_CLASS;
    boardDisplay.classList.add(currentPlayer);
}

function placeMark(cell, currentPlayer){
    cell.classList.add(currentPlayer);
    let currentPos = cell.getAttribute("data-cell").split(",").map(e => e = +e);
    boardArr[currentPos[0]][currentPos[1]] = currentPlayer;
}

function setBoardHoverClass(currentPlayer) {
    document.getElementById("board").classList.add(currentPlayer);
}