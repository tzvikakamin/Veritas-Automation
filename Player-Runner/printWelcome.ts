const prompt = require('prompt-sync')();

const validChoice = ['1', '2']

const printWelcome = (): string => {

    console.log("Welcome to the Player Runner\n");
    console.log("What would you like to do?\n");

    console.log("1. Run existing candidate in the player");
    console.log("2. Create new candidate and run it in the player\n")

    return askForChoice()
}

function askForChoice() {
    const choice = prompt("Enter your choice and press enter: ");
    
    if (!validChoice.includes(choice)) {
        console.log('invalid choice')
        console.log('try again\n');
        return askForChoice()
    }
    
    console.log('\n');
    return choice
}

export default printWelcome