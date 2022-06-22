class Character {
    constructor(canvas){
        this.speed = 50;
        this.image = new Image();
        this.image.src = "character-image.png";
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.position = {x: 0, y: 0};
        this.size = {w: 100, h: 150};
    }

    init() {
        this.image.onload = () => {
            this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
        };
    }
    
    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    move(direct) {
        this.clear();
        switch(direct) {
            case "up":
                if(this.position.y > 0) this.position.y -= this.speed;
                break;
            case "right":
                if(this.position.x + this.size.w < this.canvas.width) this.position.x += this.speed;
                break;
            case "down":
                if(this.position.y + this.size.h < this.canvas.height) this.position.y += this.speed;
                break;
            case "left":
                if(this.position.x > 0) this.position.x -= this.speed;
        }
        this.draw();
    }
};

function control(key, char){
    switch (key.keyCode) {
        case 37:
            char.move("left");
            break;
        case 38:
            char.move("up");
            break;
        case 39:
            char.move("right");
            break;
        case 40:
            char.move("down");
            break;
    }
}

const gameCanvas = document.getElementById("game");
const zoro = new Character(gameCanvas);
zoro.init();
document.addEventListener("keyup", (e) => control(e, zoro));
