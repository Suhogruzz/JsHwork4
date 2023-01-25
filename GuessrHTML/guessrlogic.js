const buttonPress = document.querySelectorAll(".number-button");
var counter = 1;

async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        buttonPress.forEach(button => {
            button.addEventListener("click", () => {
            input = button.value;
            return resolve(input);
            }, false);
        })
    })
    return promise;
}


async function guessANumber() {
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    while(true) {
        console.log(randomNumber);
        let userGuess = await getUserInput();
        switch(true) {
                case userGuess == randomNumber:
                    document.getElementById("bg-colors").className = "background-winner";
                    document.querySelector(".title").innerHTML = "Вы угадали!";
                    document.querySelector(".number-wrapper-description").innerHTML = `Заняло попыток: ${counter}`
                    document.querySelector(".number-wrapper-number-container").className = "number-wrapper-number-container hidden";
                    document.querySelector(".restart-button-container").className = "restart-button-container";
                    break;
                case userGuess < randomNumber:
                    document.getElementById("bg-colors").className = "background-higher";
                    document.querySelector(".title").innerHTML = "Загаданное число больше...";
                    document.querySelector(".number-wrapper-description").innerHTML = `Попытка: ${counter}`;
                    counter ++;
                    break;
                case userGuess > randomNumber:
                    document.getElementById("bg-colors").className = "background-lower";
                    document.querySelector(".title").innerHTML = "Загаданное число меньше...";
                    document.querySelector(".number-wrapper-description").innerHTML = `Попытка: ${counter}`;
                    counter ++;
                    break;
        }
    } 
}

function restartGame() {
    window.location.reload(true);
}

guessANumber();