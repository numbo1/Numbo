let randomNumber = Math.random();
let pizzaArray = ["/photos/pepPizza.png"]
let pizzaHeight = 70;
let pizzaWidth = 70;
let pizzaX = 100/randomNumber;

console.log(pizzaX);

function randomWidth() {
    randomNumber = Math.floor(Math.random() * 380);
    if (randomNumber < 100) {
        randomNumber = 100;
    } else if (randomNumber > 400) {
        randomNumber = 400;
    }
    return randomNumber;
}

console.log(randomWidth())