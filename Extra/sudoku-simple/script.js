class Sodoku {
    constructor(missingDigit) {
        this.missingDigits = missingDigit;
        this.cellElements = document.querySelectorAll('.cell');
        this.numberBtns = document.querySelectorAll('.number-btn');
        this.size = 9;
        this.squareSize = Math.floor(Math.sqrt(this.size));
        this.removedPosition = [];
        this.board = [];
        this.selectedCell = undefined;
        this.showCorrectNumCheckToggle = false;
        for(let i = 0; i < this.size; i++) {
            this.board[i] = new Array();
            for(let j = 0; j < this.size; j++) {
                this.board[i][j] = 0;
                this.removeSelectedSameRowColSquareClass(this.cellElements[i * 9 + j]);
            }
        }
    }

    generateBoard = () => {
        this.fillDiagonal3By3Square();
        this.fillRemainCells(0, this.squareSize);
        this.removeMissingDigits();
        this.renderBoardAndButtonsEvent();
    };

    removeMissingDigits = () => {
        let count = this.missingDigits;
        while(count > 0) {
            let rndPos = Math.floor(Math.random() * (this.size * this.size));
            let row = Math.floor(rndPos / this.size);
            let col = Math.floor(rndPos % this.size);
            if(!this.removedPosition.some(element => {
                return element[0] == row && element[1] == col;
            })) {
                count--;
                this.removedPosition.push([row, col, this.board[row][col]]);
                this.board[row][col] = 0;
            }
        }
    };

    fillRemainCells = (row, col) => {
        if(row >= this.size && col >= this.size) {
            return true;
        }
        if(row < this.size && col >= this.size) {
            row += 1;
            col = 0;
            
        }
        if(row < this.squareSize) {
            if(col < this.squareSize) {
                col = this.squareSize;
            }
        } else if (row < this.size - this.squareSize) {
            if(col == Math.floor(row / this.squareSize) * this.squareSize) {
                col += this.squareSize;
            }
        } else {
            if(col == (this.size - this.squareSize)) {
                row += 1;
                col = 0;
                
                if(row >= this.size){
                    return true;
                }
            }
        }
        for(let num = 1; num <= this.size; num++) {
            if(this.isNumberSafeToPutInACell(row, col, num)){
                this.board[row][col] = num;
                if(this.fillRemainCells(row, col + 1)){
                    return true;
                }
            } else {
                this.board[row][col] = 0;
            }
        }
        return false;
    };

    fillDiagonal3By3Square = () => {
        for(let i = 0; i < this.size; i += this.squareSize) {
            this.fill3By3Square(i,i);
        }
    };

    fill3By3Square = (row, col) => {
        let tempNum = [1,2,3,4,5,6,7,8,9];
        for(let i = 0; i < this.squareSize; i++) {
            for(let j = 0; j < this.squareSize; j++) {
                while (true) {
                    let rndNum = tempNum[Math.floor(Math.random() * (tempNum.length - 1))];
                    if(!this.isNumberExistIn3By3Square(row, col, rndNum)){
                        this.board[row + i][col + j] = rndNum;
                        tempNum.splice(tempNum.indexOf(rndNum), 1);
                        break;
                    }
                }
                
            }
        }
    };

    isNumberExistIn3By3Square = (rowStart, colStart, num) => {
        for(let i = 0; i < this.squareSize; i++) {
            for(let j = 0; j < this.squareSize; j++) {
                if(this.board[rowStart+i][colStart+j] == num) {
                    return true;
                }
            }
        }
        return false;
    };

    isNumberExistInRow = (row, num) => {
        for(let i = 0; i < this.size; i++){
            if(this.board[row][i] == num) {
                return true;
            }
        }
        return false;
    };

    isNumberExistInColumn = (col, num) => {
        for(let i = 0; i < this.size; i++) {
            if(this.board[i][col] == num) {
                return true;
            } 
        }
        return false;
    };

    isNumberSafeToPutInACell = (row, col, num) => {
        return !this.isNumberExistInRow(row, num) &&
                !this.isNumberExistInColumn(col, num) &&
                !this.isNumberExistIn3By3Square(row - row % this.squareSize, col - col % this.squareSize, num);
    };

    renderBoardAndButtonsEvent = () => {
        this.checkMistakeToggle();
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let cell = this.cellElements[i * 9 + j];
                cell.setAttribute("row", `${i}`);
                cell.setAttribute("col", `${j}`);
                cell.setAttribute('class','cell');
                if(this.board[i][j] == 0) {
                    cell.innerText = '';
                } else {
                    cell.innerText = this.board[i][j];
                    cell.classList.add('cant-change');
                }
                cell.addEventListener("click", this.clickedOnBoardCell);
            }
        }
        for(let i = 0; i < this.numberBtns.length; i++) {
            this.numberBtns[i].addEventListener("click", () => {
                this.addNumberIntoSelectedCell(i + 1);
            });
        }
        document.addEventListener('keyup', (event) => {
            for(let i = 1; i <= 9; i++) {
                if(event.key == i) {
                    this.addNumberIntoSelectedCell(i);
                }
            }
        });
        document.getElementById("erase-btn").addEventListener('click', this.eraseGuessNum);
        document.getElementById("hint-btn").addEventListener("click", this.giveHint);
        document.getElementById('show-mistake-toggle').addEventListener('click', this.checkMistakeToggle);

    };

    addNumberIntoSelectedCell = (number) => {
        if(this.selectedCell == undefined ||
            this.selectedCell.classList.contains("cant-change")) {return}
        else if(this.selectedCell.textContent == '' || !this.selectedCell.classList.contains("guessing")) {
            this.selectedCell.textContent = number;
            this.selectedCell.classList.add('guessing');
        } else if(this.selectedCell.classList.contains("guessing")) {
            this.selectedCell.textContent = number;
        }
        this.showCorrectNumCheck();
        this.board[this.selectedCell.getAttribute('row')][this.selectedCell.getAttribute('col')] = +self.textContent;
        this.addSelectedSameRowColSquareClass();
    };

    clickedOnBoardCell = (event) => {
        this.selectedCell = event.currentTarget;
        this.addSelectedSameRowColSquareClass();
    };

    removeSelectedSameRowColSquareClass = (cell) => {
        if(cell.classList.contains("same-row-col-square")) cell.classList.remove("same-row-col-square");
        else if(cell.classList.contains("same-row-col-square-number")) cell.classList.remove("same-row-col-square-number");
        else if(cell.classList.contains("selected")) cell.classList.remove("selected");
    }

    addSelectedSameRowColSquareClass = () => {
        let currentCellPos = [+this.selectedCell.getAttribute("row"), +this.selectedCell.getAttribute("col")];
        let currentCellNum = this.selectedCell.textContent;
        this.cellElements.forEach(cell => {
            this.removeSelectedSameRowColSquareClass(cell);
            let cellPos = [+cell.getAttribute("row"), +cell.getAttribute("col")];
            let cellNum = cell.textContent;
            let isRowEqual = cellPos[0] == currentCellPos[0];
            let isColEqual = cellPos[1] == currentCellPos[1];
            let isInSameSquare = Math.floor(cellPos[0] / this.squareSize) == Math.floor(currentCellPos[0] / this.squareSize)
                                && Math.floor(cellPos[1] / this.squareSize) == Math.floor(currentCellPos[1] / this.squareSize);
            if(cellPos[0] == currentCellPos[0] && cellPos[1] == currentCellPos[1]){
                this.selectedCell.classList.add("selected");
            } else if(isRowEqual || isColEqual || isInSameSquare) {
                cell.classList.add("same-row-col-square");
            } else if(cellNum == currentCellNum && currentCellNum != '') {
                cell.classList.add("same-row-col-square-number");
            }
        });
    };

    showCorrectNumCheck = () => {
        if(this.showCorrectNumCheckToggle) {
            for(let el of this.removedPosition) {
                let cell = this.cellElements[el[0] * 9 + el[1]];
                if(cell.classList.contains('guessing')){
                    if(+cell.innerText == el[2]){
                        this.addCorrectOrWrongNumberClass(cell, 'correct');
                    } else {
                        this.addCorrectOrWrongNumberClass(cell, 'wrong');
                    }
                }
            }
        } else {
            this.removeWrongOrCorrectClass();
        }
    };

    removeWrongOrCorrectClass = () => {
        this.removedPosition.forEach(el => {
            let cell = this.cellElements[el[0] * 9 + el[1]];
            if(cell.classList.contains('wrong-number') ||
            cell.classList.contains('correct-number')) {
                cell.classList.remove('wrong-number');
                cell.classList.remove('correct-number');
            }
        });
    };

    checkMistakeToggle = () => {
        let self = document.getElementById('show-mistake-toggle');
        if(self.checked == true) {
            this.showCorrectNumCheckToggle = true;    
        } else {
            this.showCorrectNumCheckToggle = false;
        }
        this.showCorrectNumCheck();
    };

    addCorrectOrWrongNumberClass = (cell, status) => {
        cell.classList.remove('correct-number');
        cell.classList.remove('wrong-number');
        switch (status) {
            case 'correct':
                cell.classList.add('correct-number');
                break;
            case 'wrong':
                cell.classList.add('wrong-number');
                break;
        }
    };

    eraseGuessNum = () => {
        if(this.selectedCell != undefined) {
            let selectedRow = +this.selectedCell.getAttribute("row");
            let selectedCol = +this.selectedCell.getAttribute("col");
            if(this.selectedCell.classList.contains('guessing')) {
                this.selectedCell.classList.remove('guessing');
                this.selectedCell.innerText = '';
            }
            this.board[selectedRow][selectedCol] = 0;
        }
    };

    giveHint = () => {
        if(this.removedPosition.length > 0){
            if(this.selectedCell == undefined ||
                (this.selectedCell != undefined && this.selectedCell.classList.contains('cant-change'))){
                let hint = this.removedPosition.shift();
                this.cellElements[(hint[0] * 9) + (hint[1])].innerText = hint[2];
                this.cellElements[(hint[0] * 9) + (hint[1])].classList.add('cant-change');
            }  else if(this.selectedCell != undefined) {
                let selectedRow = +this.selectedCell.getAttribute("row");
                let selectedCol = +this.selectedCell.getAttribute("col");
                for(let i = 0; i < this.removedPosition.length; i++) {
                    if(this.removedPosition[i][0] == selectedRow && this.removedPosition[i][1] == selectedCol) {
                        this.selectedCell.innerText = this.removedPosition[i][2];
                        this.selectedCell.classList.add('cant-change');
                        this.removedPosition.splice(i, 1);
                    }
                }
            }
        }
    };
};
let sudoku;
const newGame = () => {
    sudoku = new Sodoku(45);
    sudoku.generateBoard();
};

newGame();