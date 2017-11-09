/*
*   TO PLAY MINESWEEPER, WE WILL CREATE INSTANCES OF MineSweeperGame IN COMMAND LINE.
*   FOR EXAMPLE:
*   IN THE COMMAND LINE, NAVIGATE TO THE lib DIRECTORY AND RUN 'node'
*   RUN `load game.js` TO LOAD THE CONTENTS OF THIS FILE.
*   THEN CREATE A Game INSTANCE AND RUN COMMANDS LIKE SO:
*   let game = new Game(3, 3, 3);
*   game.playMove(0,1);
*   game.playMove(1,2);
*   
*   WHEN DONE RUN `.exit`
*/

import {Board} from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] == 'B') {
            console.log('Game is Over.');
            this._board.print();
        }
        else if (this._board.hasSafeTiles()) {
            console.log('You win.');
            this._board.print();
        }
        else {
            this._board.print();
        }
    }
    
    flag(rowIndex, columnIndex) {
        this._board.flagTile(rowIndex,columnIndex);
        this._board.print();
    }
}