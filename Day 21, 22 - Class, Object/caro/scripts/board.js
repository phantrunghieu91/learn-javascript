class Board {
    constructor(size) {
        this.size = size;
        this.boardArr = [];
        this.boardDisplay = document.getElementById("board");
        this.cellElements = [];
        this.init();
    }
    init() {
        document.documentElement.style.setProperty("--board-size", this.size);
        if(this.size > 20 && this.size <= 30) {
            document.documentElement.style.setProperty("--cell-size", '25px');
        } else if(this.size > 30 && this.size <= 40) {
            document.documentElement.style.setProperty("--cell-size", '20px');
        } else {
            document.documentElement.style.setProperty("--cell-size", '40px');
        }
        this.clearBoard();
        this.drawBoard();
        this.cellElements = document.querySelectorAll("[data-cell]");
        for(let i = 0; i < this.size; i++) {
            this.boardArr[i] = new Array(this.size);
        }
    }

    drawBoard() {
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                let cellDiv = document.createElement("div");
                cellDiv.setAttribute("data-cell", [i, j]);
                cellDiv.classList.add("cell");

                // Xóa viền bên ngoài bàn cờ
                if(i == 0) cellDiv.style.borderTop = 0;
                else if(i == this.size - 1) cellDiv.style.borderBottom = 0;
                if(j == 0) cellDiv.style.borderLeft = 0;
                else if(j == this.size - 1) cellDiv.style.borderRight = 0;

                this.boardDisplay.appendChild(cellDiv);
            }
        }
    }

    clearBoard() {
        this.boardDisplay.innerHTML = "";
    }

    getBoard(){
        return this.boardArr;
    }

    setBoard(board) {
        this.boardArr = board;
    }
};