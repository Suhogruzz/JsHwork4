function getPasswordChecker(password) {
    return function checkPassword(userpassword) {
        switch(true) {
            case userpassword == password:
                return true;
            case userpassword != password:
                return false;    
        };
    };
};

const correctPass = getPasswordChecker(123);
const userPass1 = correctPass(123);
const userPass2 = correctPass("password");
const userPass3 = correctPass(321);

console.log(userPass1);
console.log(userPass2); 
console.log(userPass3);