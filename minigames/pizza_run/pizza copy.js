//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;
var imgRatio = 0.5;

let freddyWidth = 100;
let freddyHeight = 150;


class Sprite {

    constructor(spritePath, width, height) {
        this.src = spritePath;
        this.width = width;
        this.height = height;
        this.image = new Image();
       
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
        };

        this.image.src = spritePath;
    }

    draw(context, x, y) {
        console.log("sprite.draw");
        console.log(this.loaded);
        if (this.loaded) {
            context.drawImage(this.image, x, y, this.width, this.height);
        }
    }
}




//Pizzas
let randomNumber = parseInt(Math.round(Math.random() * 2) + Math.random() + 1);
let pizzaArray = ["/photos/pepPizza.png", "/photos/skinke.png"]; 
let pizzaHeight = 70;
let pizzaWidth = 70;
let pizzaX = boardWidth/randomNumber;
let pizzaY = boardHeight/randomNumber;
let pizzaImg;
let antallPizza = 6;

let pizza = {
    x : pizzaX,
    y : pizzaY,
    width : pizzaWidth,
    height : pizzaHeight
}

function randomPizza() {
    let randomPizzaIndex = Math.floor(Math.random() * pizzaArray.length);
    let randomPizzaUrl = pizzaArray[randomPizzaIndex];
    return randomPizzaUrl;
}


//physics
let velocityX = 0; 
let velocityY = 0;
let velocityXP = 0;
let velocityYP = 0;
let gameOver = false;
let score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas


    //Freddy
    let freddy = new Sprite("/photos/freddy.png", freddyWidth, freddyHeight);
    console.log(freddy);
    freddy.image.onload = () => {
        freddy.draw(context, 50, board.height/2)
    };
    

    //Plum Freddy
    let freddyP = new Sprite("/photos/freddyP.png", freddyWidth, freddyHeight);



    //Pizza generator
    for (let i = 0; i < antallPizza; i++) {
        let randomPizza = Math.floor(Math.random() * 4);
        
    }

    function spawn(sprite, x, y) {
        console.log("Sprite executed");
        context.drawImage(sprite.img, x, y, sprite.width * imgRatio, sprite.height * imgRatio);
    }

    // //Pizzas
    // function pizzaSpawner() {
        
    //     let x = Math.floor(Math.random() * board.width);
    //     let y = Math.floor(Math.random() * board.height);

    //     for (let index = 0; index < 5; index++) {
    //         let pizzaNum = Math.floor(Math.random() * 3);
    //         console.log(pizzaNum);
    //         let p = context.drawImage("pizza" + pizzaNum + ".png")
    //         if (!x - p.width)
    //             x = x - p.width;
    //         }

    //         if (!y < p.height) {
    //             y = y - p.height;
    //         }
    //         if (!detectCollision()) {
                
    //         }
    // }

    // function pizzaSpawn() {
    //     pizzaImg = new Image();
    // pizzaImg.src = randomPizza();
    // pizzaImg.onload = function(){
    //     context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);

    // }
    // }
    // pizzaSpawn()


    function stopMoving() {
            velocityY = 0;
            velocityX = 0;
            velocityYP = 0;
            velocityXP = 0;
    }
    requestAnimationFrame(update);
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', stopMoving);

}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Freddy
    freddy.y += velocityY;
    freddy.y = Math.max(freddy.y + velocityY, 0);
    freddy.y = Math.min(freddy.y + velocityY, 890)
    freddy.x += velocityX;
    freddy.x = Math.max(freddy.x + velocityX, 0);
    freddy.x = Math.min(freddy.x + velocityX, 1860);
    context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    //Freddy P
    freddyP.y += velocityYP;
    freddyP.y = Math.max(freddyP.y + velocityYP, 0);
    freddyP.y = Math.min(freddyP.y + velocityYP, 890)
    freddyP.x += velocityXP;
    freddyP.x = Math.max(freddyP.x + velocityXP, 0);
    freddyP.x = Math.min(freddyP.x + velocityXP, 1860);
    context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    // Draw pizza only if not collided
    if (!detectCollision(freddy, pizza)) {
        context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
    } else {
        // Increment score and regenerate pizza
        score += 1;
        pizza.x = Math.random() * (boardWidth - pizzaWidth);
        pizza.y = Math.random() * (boardHeight - pizzaHeight);
    }

    //Freddy P colision
    if (detectCollision(freddyP, freddy)) {
        gameOver = true;
    } else if (detectCollision(freddyP, pizza)) {
        pizza.x = Math.random() * (boardWidth - pizzaWidth);
        pizza.y = Math.random() * (boardHeight - pizzaHeight);
    }

    // Draw score
    context.font = "70px Arial";
    context.fillStyle = "maroon";
    context.fillText(score, 40, 80);

    if (gameOver) {
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        document.getElementById("board").style.backgroundImage = "url('black.jpg')"
        context.fillStyle = "red";
        context.fillText("GAME OVER", 600, 400);
        context.fillText("Press R to restart", 550, 500);
    }
}


//Character movement
function keyPressed(event) {
    switch (event.key) {
        case "w":
            //Move upwards
            velocityY = -2;
            break;
        
        case "s":
            //Move downwards
            velocityY = 2;
            break;

        case "a":
            velocityX = -2;
            break;

        case "d":
            velocityX = 2;
            break;
        
        case "ArrowUp":
            velocityYP = -1;
            break;

        case "ArrowDown":
            velocityYP = 1;
            break;

        case "ArrowLeft":
            velocityXP = -1;
            break;

        case "ArrowRight":
            velocityXP = 1;
            break;
        
        case "r":
            location.reload();
        //reset game
        // if (gameOver) {
        //     freddy.y = freddyY;
        //     freddy.x = freddyX;
        //     freddyP.x = freddyPX;
        //     freddyP.y = freddyPY;
        //     score = 0;
        //     gameOver = false;
        // }
        break;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
} 