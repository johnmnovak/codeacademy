// All code should be written in this file.
let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;

let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;

let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;

let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

const MOVE_TYPES = ['rock', 'paper', 'scissors'];

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
    let valueSum = moveOneValue + moveTwoValue + moveThreeValue;
    
    // CHECKS FOR VALID MOVES AND VALUES
    if (MOVE_TYPES.includes(moveOneType) && MOVE_TYPES.includes(moveTwoType) && MOVE_TYPES.includes(moveThreeType)
        && moveOneValue >= 1 && moveTwoValue >= 1 && moveThreeValue >= 1 && valueSum <=99) {
        
        // STORES FOR EACH PLAYER WHILE CHECKING FOR VALID PLAYER NAMES
        if(player == 'Player One') {
            playerOneMoveOneType = moveOneType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveThreeValue = moveThreeValue;
        }
        else if (player == 'Player Two') {
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveThreeValue = moveThreeValue;
        }    
    }  
}

function getRoundWinner(round) {
    // STORES player, moveType, and moveValue IN ARRAYS
    let p1 = ['Player One'];
    let p2 = ['Player Two'];
    
    // VERIFIES ROUND NUMBER AND SETS CORRECT MOVES/VALUES
    if (round == 1) {
        p1.push(playerOneMoveOneType);
        p1.push(playerOneMoveOneValue);
        
        p2.push(playerTwoMoveOneType);
        p2.push(playerTwoMoveOneValue);
    }
    else if (round == 2) {
        p1.push(playerOneMoveTwoType);
        p1.push(playerOneMoveTwoValue);
        
        p2.push(playerTwoMoveTwoType);
        p2.push(playerTwoMoveTwoValue);
    }
    else if (round == 3) {
        p1.push(playerOneMoveThreeType);
        p1.push(playerOneMoveThreeValue);
        
        p2.push(playerTwoMoveThreeType);
        p2.push(playerTwoMoveThreeValue);
    }
    else return null;
    
    // CHECKS FOR MISSING MOVES/ VALUES *EDGE CASE*
    if(p1.includes(undefined) || p2.includes(undefined)) return null;
    
    // DECIDES WINNER ///////////////////////////////////
    // PROCEDURE FOR SAME TYPE
    if (p1[1] == p2[1]) {
        // IF SAME TYPE AND VALUE
        if (p1[2] == p2[2]) return 'Tie';
        // IF SAME TYPE DIFFERENT VALUE
        else if (p1[2] > p2[2]) return p1[0];
        else return p2[0];
    }
    
    // IF PLAYER ONE HAS ROCK
    if (p1[1] == 'rock') {
        if(p2[1] == 'scissors') return p1[0];
        else if (p2[1] == 'paper') return p2[0];
    }
    // IF PLAYER ONE HAS PAPER
    else if (p1[1] == 'paper'){
        if (p2[1] == 'rock') return p1[0];
        else if (p2[1] == 'scissors') return p2[0];
    }
    // IF PLAYER ONE HAS SCISSORS
    else if (p1[1] == 'scissors') {
        if (p2[1] == 'rock') return p2[0];
        else if (p2[1] == 'paper') return p1[0];
    }
    else return null;
}

function getGameWinner() {
    let p1Points = 0;
    let p2Points = 0;
    for(let i = 1; i < 4; i++) {
        let winner = getRoundWinner(i);
        
        if (winner == 'Player One') p1Points++;
        else if (winner == 'Player Two') p2Points++;
        
        if (p1Points >= 2) return 'Player One';
        else if (p2Points >= 2) return 'Player Two';
    }
    if (p1Points == 1 && p2Points == 1) return 'Tie';
    
    return null;
}

function setComputerMoves() {
    let cpuMoveOneType = MOVE_TYPES[Math.floor(Math.random() * 3)];
    let cpuMoveTwoType = MOVE_TYPES[Math.floor(Math.random() * 3)];
    let cpuMoveThreeType = MOVE_TYPES[Math.floor(Math.random() * 3)];
    
    let cpuMoveOneValue = Math.floor(Math.random() * 97);
    let cpuMoveTwoValue = Math.floor(Math.random() * (99-cpuMoveOneValue));
    let cpuMoveThreeValue = 99- (cpuMoveOneValue + cpuMoveTwoValue);
    
    setPlayerMoves('Player Two', cpuMoveOneType, cpuMoveOneValue, cpuMoveTwoType, cpuMoveTwoValue, cpuMoveThreeType,
                  cpuMoveThreeValue);
}


/*
setPlayerMoves('Player One', 'rock', 10, 'paper', 20, 'scissors', 30);
setPlayerMoves('Player Two', 'scissors', 10, 'scissors', 20, '', 30);

console.log(getRoundWinner(1));
console.log(getRoundWinner(2));
console.log(getRoundWinner(3));
*/

//setComputerMoves();






































