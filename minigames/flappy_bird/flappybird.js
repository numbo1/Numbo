//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//austronaut
let austronautWidth = 60;
let austronautHeight = 150;
let austronautX = boardWidth/9;
let austronautY = boardHeight/2
let austronautImg;

let austronaut = {
    x : austronautX,
    y : austronautY,
    width : austronautWidth,
    height : austronautHeight

}
//Interval
let intervalNumber = 2000;
let shipPlacementInterval = setInterval(placeShips, 2000); // Initial interval

//Spaceships
let shipArray = [];
let shipWidth = 80;
let shipHeight = 380;
let shipX = boardWidth;
let shipY = 0;

let topShipImg;
let bottomShipImg; 

//physics
let velocityX = -2; //ships moving left speed
let velocityY = 0;
let speedIncrease = 0.2;
let speedSlower = -0.2;
//let gravity = 0.4;

let gameOver = false;
let score = 0;

function getRandomImage() {
    var randomImage = new Array();

    randomImage[0] = "/minigames/flappy_bird/photos/sattelite_pixel.png";
    randomImage[1] = "/minigames/flappy_bird/photos/sattelite_thing.png";
    randomImage[2] = "/minigames/flappy_bird/photos/sat_piece.png"
    randomImage[3] = "/minigames/flappy_bird/photos/sat_thing2.png"

    var number = Math.floor(Math.random()*randomImage.length);
    return randomImage[number];
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas


    //load the images
    austronautImg = new Image();
    austronautImg.src = "/minigames/flappy_bird/photos/austronaut_fixed.png";
    austronautImg.onload = function(){
        context.drawImage(austronautImg, austronaut.x, austronaut.y, austronaut.width, austronaut.height);

    }

    topShipImg = new Image()
    topShipImg.src = getRandomImage();

    bottomShipImg = new Image()
    bottomShipImg.src = getRandomImage();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveAustronaut);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //austronaut
    austronaut.y += velocityY;
    // austronaut.y += velocityY;
    austronaut.y = Math.max(austronaut.y + velocityY, 0); //apply gravity to curren austronaut.y, limit austronaut.y to top of the canvas.
    context.drawImage(austronautImg, austronaut.x, austronaut.y, austronaut.width, austronaut.height);

    if (austronaut.y > board.height) {
        gameOver = true;
    }

    //ships
    for (let i = 0; i < shipArray.length; i++) {
        let ship = shipArray[i];
        ship.x += velocityX; 
        context.drawImage(ship.img, ship.x, ship.y, ship.width, ship.height);
        // if (ship.passed == true) {
        //     velocityX += -0.005;

        // }

        if (!ship.passed && austronaut.x > ship.x + ship.width) {
            score += 0.5;
            ship.passed = true;
        }

        if (detectCollision(austronaut, ship)) {
            gameOver = true;
        }
        
        if (gameOver) {
            velocityX = -2;
        }

    }

    //clear ships
    while (shipArray.length > 0 && shipArray[0].x < -shipWidth) {
        shipArray.shift(); //removing the first ship from the array
    }

    //score
    context.fillStyle = "white";
    context.font = "80px sans-serif"
    context.fillText(score, 20, 90);
    

    if (gameOver) {
        context.clearRect(0, 0, board.width, board.height);
        context.font = "100px Arial"
        context.fillStyle = "red";
        context.textAlign = "center";
        context.fillText("GAME OVER", boardWidth/2, 300);
        context.fillStyle = "white";
        context.font = "80px sans-serif"
        context.fillText("Score: " + score, boardWidth/2, 400);
        context.fillStyle = "#18F071";
        context.fillText("Press R to restart",boardWidth/2, 500);
    }
}

function placeShips(){
    if (gameOver) {
        return;
    }

    /*random obstacles, which is optional if you change the width and 
    height to width : (this function) and the same with height but multiply it by 4.75*/
    function randomWidth() {
        randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < 50) {
            randomNumber = 50;
        } else if (randomNumber > 100) {
            randomNumber = 100;
        }
        return randomNumber;
    }

    let topShipImg = new Image();
    topShipImg.src = getRandomImage();

    let bottomShipImg = new Image();
    bottomShipImg.src = getRandomImage();

    let randomShipY = shipY - shipHeight/4 - Math.random()*(shipHeight/2);
    let openingSpace = austronautHeight * 2;

    let topShip = {
       img :  topShipImg,
       x : shipX,
       y : randomShipY,
       width : shipWidth,
       height : shipHeight,
       passed : false
    }
    shipArray.push(topShip);
    let bottomShip = {
        img : bottomShipImg,
        x : shipX,
        y : randomShipY + shipHeight + openingSpace,
        width : shipWidth,
        height : shipHeight,
        passed : false
    }
    velocityX -= 0.3;
    shipArray.push(bottomShip);
    

    if (score >= 8) {
        clearInterval(shipPlacementInterval);
        shipPlacementInterval = setInterval(placeShips, 1000);
        
    }
    if (score >= 20) {
        clearInterval(shipPlacementInterval);
        shipPlacementInterval = setInterval(placeShips, 500);
        
    }
    if (score >= 30) {
        clearInterval(shipPlacementInterval);
        shipPlacementInterval = setInterval(placeShips, 300);
        
    }
}

function moveAustronaut(e) {
    // if (e.code == "87" || e.code == "ArrowUp") {
    //     //Go upwards
    //     velocityY = -6;
    // } else if (e.code = "S" || e.code == "ArrowDown") {
    //     //Go downvards
    //     velocityY = 6;
    // }
    switch (e.key) {
        case "w":
            //Move upwards
            velocityY = -2.5;
            break;
        
        case "s":
            //Move downwards
            velocityY = 2.5;  
            break;

        case "d":
            velocityX += velocityX * speedIncrease;
            break;

        case "a":
            velocityX += velocityX * speedSlower;
            break;

        case "r":
            //reset game
            // if (gameOver) {
            //     austronaut.y = austronautY;
            //     shipArray = [];
            //     score = 0;
            //     gameOver = false;
            // }
            location.reload();
            break;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}   
