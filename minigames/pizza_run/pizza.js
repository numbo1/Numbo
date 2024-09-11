//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//sound
let bgMusic = new Audio('/minigames/pizza_run/music/music.mp3');

//Walls

//left wall
let leftWallImg;
let leftWall = {
    x : 0,
    y : 100,
    width : 100,
    height : boardHeight - 200
}

//right wall
let rightWallImg;
let rightWall = {
    x : boardWidth - 100,
    y : 100,
    width : 100,
    height : boardHeight - 200
}

//top wall
let topWallImg;
let topWall = {
    x : 100,
    y : 0,
    width : boardWidth - 200,
    height : 100
}

//bottom wall
let bottomWallImg;
let bottomWall = {
    x : 100,
    y : boardHeight - 100,
    width : boardWidth - 200,
    height : 100
}

//corner up left
let upLeftImg;
let upLeft = {
    x : 0,
    y : 0,
    width : 100,
    height : 100
}

//corner up right
let upRightImg;
let upRight = {
    x : boardWidth - 100,
    y : 0,
    width : 100,
    height : 100
}

//corner bottom left
let bottomLeftImg;
let bottomLeft = {
    x : 0,
    y : boardHeight - 100,
    width : 100,
    height : 100
}

//corner bottom right
let bottomRightImg;
let bottomRight = {
    x : boardWidth - 100,
    y : boardHeight - 100,
    width : 100,
    height : 100
}

//Freddy
let freddyWidth = 70;
let freddyHeight = 105;
let freddyX = boardWidth/12;
let freddyY = boardHeight/2
let freddyImg;

let freddy = {
    x : freddyX,
    y : freddyY,
    width : freddyWidth,
    height : freddyHeight

}

//Plum Freddy
let freddyPWidth = 70;
let freddyPHeight = 105;
let freddyPX = boardWidth/1.15;
let freddyPY = boardHeight/2
let freddyPImg;

let freddyP = {
    x : freddyPX,
    y : freddyPY,
    width : freddyPWidth,
    height : freddyPHeight
}



//Pizzas
let randomNumber = Math.floor(Math.random() * 100)
let pizzaArray = ["/minigames/pizza_run/photos/pizza1.png", "/minigames/pizza_run/photos/pizza2.png", "/minigames/pizza_run/photos/pizza3.png"]; 
var pizzaHeight = 60;
var pizzaWidth = 60;
var pizzaOffset = 150;
let pizzaImg;

function pizzaX() {
    let x = Math.floor(Math.random() * (boardWidth - pizzaOffset*2)) + pizzaOffset;
    return x;
}

function pizzaY() {
    let y = Math.floor(Math.random() * (boardHeight - pizzaOffset*2)) + pizzaOffset;
    return y;
}

let pizza = {
    x : pizzaX(),
    y : pizzaY(),
    width : pizzaWidth,
    height : pizzaHeight
}

//Pizza 1
let pizza1Array = ["/minigames/pizza_run/photos/pizza4.png", "/minigames/pizza_run/photos/pizza5.png", "/minigames/pizza_run/photos/pizza6.png"]
let pizza1 = {
    x : pizzaX(),
    y : pizzaY(),
    width : 40,
    height : 40
}
let pizza1Img;

// Pizza 2
let pizza2Array = ["/minigames/pizza_run/photos/poison_pizza.png"]
let pizza2 = {
    x : pizzaX(),
    y : pizzaY(),
    width : pizzaWidth,
    height : pizzaHeight
}
let pizza2Img;

//Pizza 3
let pizza3Array = ["/minigames/pizza_run/photos/pizza4.png", "/minigames/pizza_run/photos/pizza5.png", "/minigames/pizza_run/photos/pizza6.png"]
let pizza3 = {
    x : pizzaX(),
    y : pizzaY(),
    width : 40,
    height : 40
}
let pizza3Img;

function randomPizza() {
    let randomPizzaIndex = Math.floor(Math.random() * pizzaArray.length);
    let randomPizzaUrl = pizzaArray[randomPizzaIndex];
    return randomPizzaUrl;
}
function randomPizza1() {
    let randomPizzaIndex = Math.floor(Math.random() * pizza1Array.length);
    let randomPizzaUrl = pizza1Array[randomPizzaIndex];
    return randomPizzaUrl;
}
function randomPizza2() {
    let randomPizzaIndex = Math.floor(Math.random() * pizza2Array.length);
    let randomPizzaUrl = pizza2Array[randomPizzaIndex];
    return randomPizzaUrl;
}


//physics
let velocityX = 0; 
let velocityY = 0;
let velocityXP = 0;
let velocityYP = 0;
let gameOver = false;
let win = false;
let score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas
    bgMusic.play()
    //load the images

    //Walls

    //left wall
    leftWallImg = new Image();
    leftWallImg.src = "/minigames/pizza_run/photos/5x1_xxl_wall.png";
    leftWallImg.onload = function(){
        context.drawImage(leftWallImg, leftWall.x, leftWall.y, leftWall.width, leftWall.height);

    }

    //right wall
    rightWallImg = new Image();
    rightWallImg.src = "/minigames/pizza_run/photos/5x1_xxl_right_wall.png";
    rightWallImg.onload = function(){
        context.drawImage(rightWallImg, rightWall.x, rightWall.y, rightWall.width, rightWall.height);

    }

    //top wall
    topWallImg = new Image();
    topWallImg.src = "/minigames/pizza_run/photos/1x10_top.png";
    topWallImg.onload = function(){
        context.drawImage(topWallImg, topWall.x, topWall.y, topWall.width, topWall.height);

    }

    //bottom wall
    bottomWallImg = new Image();
    bottomWallImg.src = "/minigames/pizza_run/photos/1x10_bottom.png";
    bottomWallImg.onload = function(){
        context.drawImage(bottomWallImg, bottomWall.x, bottomWall.y, bottomWall.width, bottomWall.height);

    }

    //upLeft
    upLeftImg = new Image();
    upLeftImg.src = "/minigames/pizza_run/photos/1x1_corner.png";
    upLeftImg.onload = function(){
        context.drawImage(upLeftImg, upLeft.x, upLeft.y, upLeft.width, upLeft.height);

    }

    //upRight
    upRightImg = new Image();
    upRightImg.src = "/minigames/pizza_run/photos/1x1_right_top.png";
    upRightImg.onload = function(){
        context.drawImage(upRightImg, upRight.x, upRight.y, upRight.width, upRight.height);

    }

    //bottomLeft
    bottomLeftImg = new Image();
    bottomLeftImg.src = "/minigames/pizza_run/photos/1x1_left_bottom.png";
    bottomLeftImg.onload = function(){
        context.drawImage(bottomLeftImg, bottomLeft.x, bottomLeft.y, bottomLeft.width, bottomLeft.height);

    }

    //bottomRight
    bottomRightImg = new Image();
    bottomRightImg.src = "/minigames/pizza_run/photos/1x1_right_bottom.png";
    bottomRightImg.onload = function(){
        context.drawImage(bottomRightImg, bottomRight.x, bottomRight.y, bottomRight.width, bottomRight.height);

    }

    //Freddy
    freddyImg = new Image();
    freddyImg.src = "/minigames/pizza_run/photos/freddy.png";
    freddyImg.onload = function(){
        context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    }

    //Freddy P
    freddyPImg = new Image();
    freddyPImg.src = "/minigames/pizza_run/photos/freddyP.png";
    freddyPImg.onload = function(){
        context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    }

    //Pizzas
    function pizzaSpawn() {
        pizzaImg = new Image();
        pizzaImg.src = randomPizza();
        requestAnimationFrame(update);
        pizzaImg.onload = function(){
            context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
        }
    }
    function pizza1Spawn() {
        pizza1Img = new Image();
        pizza1Img.src = randomPizza1();
        requestAnimationFrame(update);
        pizza1Img.onload = function(){
            context.drawImage(pizza1Img, pizza1.x, pizza1.y, pizza1.width, pizza1.height);
        }
    }
    function pizza2Spawn() {
        pizza2Img = new Image();
        pizza2Img.src = randomPizza2();
        requestAnimationFrame(update);
        pizza2Img.onload = function(){
            context.drawImage(pizza2Img, pizza2.x, pizza2.y, pizza2.width, pizza2.height);
        }
    }
    function pizza3Spawn() {
        pizza3Img = new Image();
        pizza3Img.src = randomPizza1();
        requestAnimationFrame(update);
        pizza3Img.onload = function(){
            context.drawImage(pizza3Img, pizza3.x, pizza3.y, pizza3.width, pizza3.height);
        }
    }
    pizzaSpawn();
    pizza1Spawn();
    pizza2Spawn();
    pizza3Spawn();


    // function stopMoving() {
    //         velocityY = 0;
    //         velocityX = 0;
    //         velocityYP = 0;
    //         velocityXP = 0;
    // }
    requestAnimationFrame(update);
    document.addEventListener('keydown', keyPressed);
    // document.addEventListener('Space', stopMoving);

}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        bgMusic.pause()
        // let mySound = new Audio('/music/game_over3.mp3')
        // mySound.play()
        return;
    }

    if (win) {
        bgMusic.pause()
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Walls
    context.drawImage(leftWallImg, leftWall.x, leftWall.y, leftWall.width, leftWall.height);
    context.drawImage(rightWallImg, rightWall.x, rightWall.y, rightWall.width, rightWall.height);
    context.drawImage(topWallImg, topWall.x, topWall.y, topWall.width, topWall.height);
    context.drawImage(bottomWallImg, bottomWall.x, bottomWall.y, bottomWall.width, bottomWall.height);

    //corners
    context.drawImage(upLeftImg, upLeft.x, upLeft.y, upLeft.width, upLeft.height);
    context.drawImage(upRightImg, upRight.x, upRight.y, upRight.width, upRight.height);
    context.drawImage(bottomLeftImg, bottomLeft.x, bottomLeft.y, bottomLeft.width, bottomLeft.height);
    context.drawImage(bottomRightImg, bottomRight.x, bottomRight.y, bottomRight.width, bottomRight.height);


    //Freddy
    let boardAreaBottom = boardHeight - 100 - freddyHeight;
    let freddyRightLimit = boardWidth - 100 - freddyWidth;

    freddy.y += velocityY;
    freddy.y = Math.min(Math.max(freddy.y + velocityY, 100), boardAreaBottom);
    freddy.x += velocityX;
    freddy.x = Math.min(Math.max(freddy.x + velocityX, 100), freddyRightLimit);
    context.drawImage(freddyImg, freddy.x, freddy.y, freddy.width, freddy.height);

    //Freddy P
    freddyP.y += velocityYP;
    freddyP.y = Math.min(Math.max(freddyP.y + velocityYP, 100), boardAreaBottom);
    freddyP.x += velocityXP;
    freddyP.x = Math.min(Math.max(freddyP.x + velocityXP, 100), freddyRightLimit);
    context.drawImage(freddyPImg, freddyP.x, freddyP.y, freddyP.width, freddyP.height);

    // Draw pizza only if not collided
    if (!detectCollision(freddy, pizza) && !detectCollision(freddy, pizza1) && !detectCollision(freddy, pizza2) && !detectCollision(freddy, pizza3)) {
        context.drawImage(pizzaImg, pizza.x, pizza.y, pizza.width, pizza.height);
        context.drawImage(pizza1Img, pizza1.x, pizza1.y, pizza1.width, pizza1.height);
        context.drawImage(pizza2Img, pizza2.x, pizza2.y, pizza2.width, pizza2.height);
        context.drawImage(pizza3Img, pizza3.x, pizza3.y, pizza3.width, pizza3.height);

    } else if (detectCollision(freddy, pizza)) {
        score += 2;
        pizza.x = pizzaX();
        pizza.y = pizzaY();
    } else if (detectCollision(freddy, pizza1)) {
        score += 1;
        pizza1.x = pizzaX();
        pizza1.y = pizzaY();
    } else if (detectCollision(freddy, pizza2)) {
        gameOver = true;
    } else if (detectCollision(freddy, pizza3)) {
        score += 1;
        pizza3.x = pizzaX();
        pizza3.y = pizzaY();
    }
    

    //Freddy P collision
    if (detectCollision(freddyP, freddy)) {
        gameOver = true;
    } else if (detectCollision(freddyP, pizza)) {
        score -= 1;
        pizza.x = pizzaX();
        pizza.y = pizzaY();
    } else if (detectCollision(freddyP, pizza1)) {
        pizza1.x = pizzaX();
        pizza1.y = pizzaY();
    } else if (detectCollision(freddyP, pizza2)) {
        velocityXP *= 1.5;
        velocityYP *= 1.5;
        pizza2.x = pizzaX();
        pizza2.y = pizzaY();
    } else if (detectCollision(freddyP, pizza3)) {
        pizza3.x = pizzaX();
        pizza3.y = pizzaY();
    };

    // Draw score
    context.font = "70px Arial";
    context.fillStyle = "maroon";
    context.fillText(score, 20, 60);

    if (score >= 20) {
        win = true;
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        document.getElementById("board").style.backgroundImage = "url('/minigames/black.jpg')"
        context.fillStyle = "#90EE90";
        context.textAlign = "center";
        context.fillText("You win!", boardWidth/2, 400);
        context.fillStyle = "white";
        context.fillText("Press R to restart",boardWidth/2, 500);
    } else if (score <= -5) {
        gameOver = true;
    }

    if (gameOver) {
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        document.getElementById("board").style.backgroundImage = "url('/minigames/black.jpg')"
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", boardWidth/2, 400);
        context.fillText("Press R to restart",boardWidth/2, 500);
    }

}


//Character movement
function keyPressed(event) {
    switch (event.key) {
        case "w":
            //Move upwards
            velocityY = -0.6;
            break;
        
        case "s":
            //Move downwards
            velocityY = 0.6;
            break;

        case "a":
            velocityX = -0.6;
            break;

        case "d":
            velocityX = 0.6;
            break;
        
        case "ArrowUp":
            velocityYP = -0.3;
            break;

        case "ArrowDown":
            velocityYP = 0.3;
            break;

        case "ArrowLeft":
            velocityXP = -0.3;
            break;

        case "ArrowRight":
            velocityXP = 0.3;
            break;
        
        case "Space":
            velocityXP = 0;
            velocityYP = 0;
            velocityY = 0;
            velocityX = 0;
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