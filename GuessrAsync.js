const readline = require('node:readline');
const { stdin:input, stdout:output } = require('node:process');
const rl = readline.createInterface({input, output});
const fs = require('fs');

let randomNumber = Math.floor(Math.random() * 10);
let counter = 1;

async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        rl.question('Введите число от 0 до 9: ', (input) =>{
            let userInput = input;
            rl.pause();
            return resolve(userInput);
        })
    })
    return await promise;
};

async function guessANumber() {
    while(true) {
        let userInput = await getUserInput();
        let userGuess = +userInput;

        switch(true) {
            case isNaN(userGuess) || userGuess < 0 || userGuess > 9:
                var msg = `Введено неправильное число или вообще не число`;
                console.log(msg);
                appendToFile(msg);
                break;
            case userGuess === randomNumber:
                var msg =`Вы угадали число ${randomNumber}! У вас ушло попыток: ${counter} `;
                console.log(msg);
                appendToFile(msg);
                return;
            case userGuess > randomNumber:
                var msg =`Больше... Попытка ${counter}`;
                console.log(msg);
                appendToFile(msg);
                counter++;
                break
            case userGuess < randomNumber:
                var msg =`Меньше... Попытка ${counter}`;
                console.log(msg);
                appendToFile(msg);
                counter++;
                break
        };
        rl.pause();
        guessANumber();
    }
 };

async function appendToFile(msg) {
    await fs.promises.appendFile("./log", msg+'\r\n', {encoding: 'utf8'});
};

guessANumber();