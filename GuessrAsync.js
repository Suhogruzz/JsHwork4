const readline = require('node:readline');
const { stdin:input, stdout:output } = require('node:process');
const rl = readline.createInterface({input, output});
const fs = require('fs');

const randomNumber = Math.floor(Math.random() * 10);
let counter = 1;

async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        rl.question('Введите число от 0 до 9: ', (input) =>{
            let userInput = input;
            rl.pause();
            return resolve(userInput);
        })
    })
    return promise;
};

async function guessANumber() {
    while(true) {
        let userInput = await getUserInput();
        let userGuess = +userInput;
        switch(true) {
            case isNaN(userGuess) || userGuess < 0 || userGuess > 9:
                var msg = `Введено неправильное число или вообще не число`;
                appendToFile(msg);
                break;
            case userGuess === randomNumber:
                var msg =`Вы угадали число ${randomNumber}! У вас ушло попыток: ${counter} `;
                appendToFile(msg);
                return;
            case userGuess > randomNumber:
                var msg =`Ваше число больше... Попытка ${counter}`;
                appendToFile(msg);
                counter++;
                break
            case userGuess < randomNumber:
                var msg =`Ваше число меньше... Попытка ${counter}`;
                appendToFile(msg);
                counter++;
                break
        };
    };
 };

function appendToFile(msg) {
    console.log(msg);
    fs.promises.appendFile("./log", msg+'\r\n', {encoding: 'utf8'});
};

guessANumber();