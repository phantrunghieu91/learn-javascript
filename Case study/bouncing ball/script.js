// Chưa có chức năng tính điểm, 
// Chưa có chức năng chơi lại sao khi kết thúc
class GameArea {
    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.interval;
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.frameNo = 0;
    }
    start = function(){
        this.ctx = this.canvas.getContext("2d");
        this.interval  = setInterval(updateGameArea, 20);
        document.getElementById("main").appendChild(this.canvas);
    };
    clear = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    stop = function(){
        clearInterval(this.interval);
    }
};

class Ball {
    constructor(x, y, moveAngle, speed = 1, r = 20, color = "red"){
        this.x = x;
        this.y = y;
        this.movingAngle = moveAngle;
        this.speedX = speed;
        this.speedY = speed;
        this.r = r;
        this.color = color;
    }
    update = () => {
        let ctx = gameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    newPos = () => {
        switch (this.movingAngle) {
            case "NE":
                this.x += this.speedX;
                this.y -= this.speedY;
                break;
            case "SE":
                this.x += this.speedX;
                this.y += this.speedY;
                break;
            case "NW":
                this.x -= this.speedX;
                this.y -= this.speedY;
                break;
            case "SW":
                this.x -= this.speedX;
                this.y += this.speedY;
                break;
        }
    };
    changeAngle = () => {        
        switch(this.isTouchGameAreaBorder()){
            case "left":
                if(this.movingAngle == "NW") this.movingAngle = "NE";
                if(this.movingAngle == "SW") this.movingAngle = "SE";
                break;
            case "top":
                if(this.movingAngle == "NE") this.movingAngle = "SE";
                if(this.movingAngle == "NW") this.movingAngle = "SW";
                break;
            case "right":
                if(this.movingAngle == "NE") this.movingAngle = "NW";
                if(this.movingAngle == "SE") this.movingAngle = "SW";
                break;
        }
    };
    isTouchGameAreaBorder = () => {
        const GAMEAREA_LEFT = 0;
        const GAMEAREA_TOP = 0;
        const GAMEAREA_RIGHT = gameArea.canvas.width;
        const GAMEAREA_BOTTOM = gameArea.canvas.height;
        let isTouchLeft = this.x - this.r <= GAMEAREA_LEFT;
        let isTouchTop = this.y - this.r <= GAMEAREA_TOP;
        let isTouchRight = this.x + this.r >= GAMEAREA_RIGHT;
        let isTouchBottom = this.y + this.r >= GAMEAREA_BOTTOM;
        if(isTouchLeft) return "left";
        else if(isTouchTop) return "top";
        else if(isTouchRight) return "right";
        else if(isTouchBottom) return "bottom";
    };
    isCollided = (obj) => {
        const BAR_LEFT = obj.x;
        const BAR_RIGHT = obj.x + obj.width;
        const BAR_TOP = obj.y;
        const BAR_BOTTOM = obj.y + obj.height;

        let closestPoint = {x: this.x, y: this.y};                                      // Điểm gần nhất của hcn đến hình tròn

        if(this.x < BAR_LEFT) closestPoint.x = BAR_LEFT;                                // Kiểm tra cạnh trái hcn
        else if(this.x > BAR_RIGHT) closestPoint.x = BAR_RIGHT;                         //     "    cạnh phải hcn

        if(this.y < BAR_TOP) closestPoint.y = BAR_TOP;                                  //     "    cạnh trên hcn
        else if(this.y > BAR_BOTTOM) closestPoint.y = BAR_BOTTOM;                       //     "    cạnh dưới hcn

        let distance = {x: (this.x - closestPoint.x), y: (this.y - closestPoint.y)};    // Khoảng cách từ điểm gần nhất đến tâm hình tròn

        if(Math.pow(distance.x, 2) + Math.pow(distance.y, 2) <= Math.pow(this.r, 2)) {
            // console.log(`Toạ độ hình tròn: ${this.x}, ${this.y}`);
            // console.log(`Tọa độ bar: ${obj.x}, ${obj.y}, góc trên bên phải: {${BAR_RIGHT}, ${BAR_TOP}}`);
            // console.log(`Điểm gần nhất của hcn với ht: ${closestPoint.x}, ${closestPoint.y}`);
            // console.log(`Khoảng cách giữa 2 điểm: ${distance.x}, ${distance.y}, ${Math.pow(distance.y, 2)}`);
            if(this.movingAngle == "SW") this.movingAngle = "NW";
            if(this.movingAngle == "SE") this.movingAngle = "NE";
        }
    };
    stop = () => {
        this.speedX = 0;
        this.speedY = 0;
    };
};

class Bar {
    constructor(x, y, width, height = 30, color = "green"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
    }
    newPos = () => { 
        if(this.x >= 0 && this.x <= gameArea.canvas.width - this.width){
            this.x += this.speedX;
        } else if(this.x < 0) {
            this.x = 0;
        } else if(this.x > gameArea.canvas.width - this.width){
            this.x = gameArea.canvas.width - this.width;
        }
    };
    update = () => {
        let ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

class Score {
    constructor(x, y, color = "Black", font = "Consolas", size = "30px"){
        this.x = x;
        this.y = y;
        this.color = color;
        this.font = font;
        this.size = size;
        this.text = "";
    }
    update = () => {
        let ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size} ${this.font}`;
        ctx.fillText(this.text, this.x, this.y);
    };
}

function updateGameArea() {
    if(ball.isTouchGameAreaBorder() == "bottom") {
        gameOver();
    } else {
        gameArea.clear();
        gameArea.frameNo += 1;
        gameScore.text = "Score: " + gameArea.frameNo;
        gameScore.update();
        
        bar.newPos();
        bar.update();

        ball.newPos();
        ball.changeAngle();
        ball.isCollided(bar);
        ball.update();
    }
}

function gameOver(){
    gameArea.stop();
    let winningMessage = document.getElementById("winningMessage");
    winningMessage.children[0].innerText = `Game Over\nYour score: ${gameScore.text.split(" ")[1]}!`;
    document.getElementById("winningMessage").classList.add("show");
    gameArea.frameNo = 0;
}

function controlBar(key){
    switch(key.keyCode){
        case 37:
            moveLeft(bar);
            break;
        case 39:
            moveRight(bar);
            break;
    }
}

moveLeft = (obj) => {
    if(obj.x > 0) obj.speedX = -10;
    else obj.speedX = 0;
};
moveRight = (obj) => {
    if(obj.x + obj.width < gameArea.canvas.width) obj.speedX = 10;
    else obj.speedX = 0;
};
stopMove = (obj) => {
    obj.speedX = 0;
    obj.sppedY = 0;
}

let gameArea = new GameArea(800, 600);
let gameScore;
let bar;
let ball;
let restartBtn = document.getElementById("restart-button");
restartBtn.addEventListener("click", startGame);

function startGame(){
    document.getElementById("winningMessage").classList.remove("show");    
    gameArea.start();
    bar = new Bar((gameArea.canvas.width / 2 - 100), gameArea.canvas.height - 130, 200);
    let randNum = Math.floor(Math.random() * 4);
    let randDirection = randNum == 0 ? "NE" : randNum == 1 ? "NW" : randNum == 2 ? "SE" : "SW";
    console.log(randNum, randDirection);
    ball = new Ball(100, 100, randDirection, 10);
    gameScore = new Score(600, 50);
    document.addEventListener("keydown", controlBar);
    document.addEventListener("keyup", () => {
        stopMove(bar);
    });
}