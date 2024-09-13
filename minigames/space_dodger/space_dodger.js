//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;


//Ship
let shipWidth = 500;
let shipHeight = 500;
let shipX = 5;
let shipY = 5;
let shipImg;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

//Interval
let intervalNumber = 5000;
let holePlacementInterval = setInterval(placeHoles, 5000); // Initial interval

//Black holes
let holeArray = [];
let holeWidth = 500;
let holeHeight = 500;
let holeX = boardWidth;
let holeY = boardHeight/2;

let holeImg;

let gameOver = false;
let score = 0;
 
//physics
let velocityX = -2; //ships moving left speed
let velocityY = 0;


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //Drawing on the canvas


    //load the images
    shipImg = new Image();
    shipImg.src = "/minigames/flappy_bird/photos/austronaut_fixed.png";
    shipImg.onload = function(){
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    }
    console.log(shipImg.src);
    console.log(ship.x, ship.y);

    holeImg = new Image()
    holeImg.src = "/minigames/space_dodger/photos/hole.png";


    requestAnimationFrame(update);
    document.addEventListener("keydown", moveShip);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //Ship
    ship.y += velocityY;

    ship.y = Math.max(ship.y + velocityY, 0);
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    if (ship.y > board.height) {
        gameOver = true;
    }

    //Black holes
    for (let i = 0; i < holeArray.length; i++) {
        let hole = holeArray[i];
        hole.x += velocityX; 
        context.drawImage(hole.img, hole.x, hole.y, hole.width, hole.height);


        if (detectCollision(ship, hole)) {
            gameOver = true;
        }
        
        if (gameOver) {
            velocityX = -2;
        }

    }


    //clear holes
    while (holeArray.length > 0 && holeArray[0].x < -holeWidth) {
        holeArray.shift(); //removing the first hole from the array
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

function placeHoles(){
    if (gameOver) {
        return;
    }

    let holeImg = new Image();
    holeImg.src = "/minigames/space_dodger/photos/hole.png";


    let randomholeY = holeY - holeHeight/4 - Math.random()*(holeHeight/2);

    let hole = {
       img :  holeImg,
       x : holeX,
       y : randomholeY,
       width : holeWidth,
       height : holeHeight,
    }

    holeArray.push(hole);
    velocityX -= 0.3;
    

    if (score >= 8) {
        clearInterval(holePlacementInterval);
        holePlacementInterval = setInterval(placeHoles, 1000);
        
    }
    if (score >= 20) {
        clearInterval(holePlacementInterval);
        holePlacementInterval = setInterval(placeHoles, 500);
        
    }
    if (score >= 30) {
        clearInterval(holePlacementInterval);
        holePlacementInterval = setInterval(placeHoles, 300);
        
    }
}
function moveShip(e) {
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
            velocityX = 2.5;
            break;

        case "a":
            velocityX = -2.5;
            break;

        case "r":
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