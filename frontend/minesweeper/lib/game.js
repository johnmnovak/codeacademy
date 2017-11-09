'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, columnIndex) {
            this._board.flipTile(rowIndex, columnIndex);
            if (this._board.playerBoard[rowIndex][columnIndex] == 'B') {
                console.log('Game is Over.');
                this._board.print();
            } else if (this._board.hasSafeTiles()) {
                console.log('You win.');
                this._board.print();
            } else {
                this._board.print();
            }
        }
    }, {
        key: 'flag',
        value: function flag(rowIndex, columnIndex) {
            this._board.flagTile(rowIndex, columnIndex);
            this._board.print();
        }
    }]);

    return Game;
}();