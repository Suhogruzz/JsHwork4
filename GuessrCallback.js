const readline = require('node:readline');
const { stdin:input, stdout:output } = require('node:process');
const rl = readline.createInterface({input, output});
const fs = require('fs');

let randomNumber = Math.floor(Math.random() * 10);
let counter = 1;

function guessANumber (callback) {
    rl.question('Введите число от 0 до 9: ', (input) =>{
        let userGuess = +input;
        
        switch(true) {
            case isNaN(userGuess) || userGuess < 0 || userGuess > 9:
                callback(`Введено неправильное число или вообще не число`);
                GuessANumber(callback);
            case userGuess === randomNumber:
                callback(`Вы угадали число ${randomNumber}! У вас ушло попыток: ${counter} `);
                rl.close();
                return;
            case userGuess > randomNumber:
                callback(`Больше... Попытка ${counter}`)
                counter++;
                break
            case userGuess < randomNumber:
                callback(`Меньше... Попытка ${counter}`)
                counter++;
                break
        };
        rl.pause();
        guessANumber(callback);
    })
};

function logger(path) {
    if (path) {
        fs.writeFileSync(path, "");
    }
    return function appendLine(line) {
        if (path) {
            fs.appendFile(path, line+'\r\n', 'utf-8', (err) => {
                if (err) {
                    console.error('Ошибка')
                };
            });
        };
        console.log(line);
    }
};

guessANumber(logger('./logs'));
