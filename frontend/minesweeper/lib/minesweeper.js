'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
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
                console.log('Current Board: ');
                this._board.print();
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {
            var numberNeighborBombs = void 0;
            //console.log(this._playerBoard);
            if (this._playerBoard[rowIndex][columnIndex] != ' ') {
                //console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                numberNeighborBombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
                this._playerBoard[rowIndex][columnIndex] = numberNeighborBombs;
            }
            this._numberOfTiles--;

            if (numberNeighborBombs == 0) {
                this.flipAllNeighbors(rowIndex, columnIndex);
            }
        }
    }, {
        key: 'flipAllNeighbors',
        value: function flipAllNeighbors(rowIndex, columnIndex) {
            var rowBound = this.numberOfRows - 1;
            var colBound = this.numberOfColumns - 1;

            // TOP LEFT CORNER
            if (rowIndex == 0 && columnIndex == 0) {
                this.flipTile(rowIndex + 1, columnIndex);
                this.flipTile(rowIndex, columnIndex + 1);
                this.flipTile(rowIndex + 1, columnIndex + 1);
            }
            // BOTTOM LEFT CORNER
            else if (rowIndex == 0 && columnIndex == colBound) {
                    this.flipTile(rowIndex - 1, columnIndex);
                    this.flipTile(rowIndex, columnIndex + 1);
                    this.flipTile(rowIndex - 1, columnIndex + 1);
                }
                // TOP RIGHT CORNER
                else if (rowIndex == rowBound && columnIndex == 0) {
                        this.flipTile(rowIndex, columnIndex - 1);
                        this.flipTile(rowIndex + 1, columnIndex);
                        this.flipTile(rowIndex + 1, columnIndex - 1);
                    }
                    // BOTTOM RIGHT CORNER
                    else if (rowIndex == rowBound && columnIndex == colBound) {
                            this.flipTile(rowIndex, columnIndex - 1);
                            this.flipTile(rowIndex - 1, columnIndex);
                            this.flipTile(rowIndex - 1, columnIndex - 1);
                        }
                        // TOP ROW
                        else if (rowIndex == 0) {
                                this.flipTile(rowIndex, columnIndex - 1);
                                this.flipTile(rowIndex, columnIndex + 1);
                                this.flipTile(rowIndex + 1, columnIndex);
                                this.flipTile(rowIndex + 1, columnIndex - 1);
                                this.flipTile(rowIndex + 1, columnIndex + 1);
                            }
                            // BOTTOM ROW
                            else if (rowIndex == rowBound) {
                                    this.flipTile(rowIndex, columnIndex - 1);
                                    this.flipTile(rowIndex, columnIndex + 1);
                                    this.flipTile(rowIndex - 1, columnIndex);
                                    this.flipTile(rowIndex - 1, columnIndex - 1);
                                    this.flipTile(rowIndex - 1, columnIndex + 1);
                                }
                                // LEFT SIDE
                                else if (columnIndex == 0) {
                                        this.flipTile(rowIndex - 1, columnIndex);
                                        this.flipTile(rowIndex + 1, columnIndex);
                                        this.flipTile(rowIndex - 1, columnIndex + 1);
                                        this.flipTile(rowIndex, columnIndex + 1);
                                        this.flipTile(rowIndex + 1, columnIndex + 1);
                                    }
                                    // RIGHT SIDE
                                    else if (columnIndex == colBound) {
                                            this.flipTile(rowIndex - 1, columnIndex);
                                            this.flipTile(rowIndex - 1, columnIndex - 1);
                                            this.flipTile(rowIndex, columnIndex - 1);
                                            this.flipTile(rowIndex + 1, columnIndex - 1);
                                            this.flipTile(rowIndex + 1, columnIndex);
                                        } else {
                                            this.flipTile(rowIndex - 1, columnIndex);
                                            this.flipTile(rowIndex - 1, columnIndex - 1);
                                            this.flipTile(rowIndex, columnIndex - 1);
                                            this.flipTile(rowIndex + 1, columnIndex - 1);
                                            this.flipTIle(rowIndex + 1, columnIndex);
                                            this.flipTile(rowIndex + 1, columnIndex + 1);
                                            this.flipTile(rowIndex, columnIndex + 1);
                                            this.flipTile(rowIndex - 1, columnIndex + 1);
                                        }
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;
            neighborOffsets.forEach(function (offset) {
                //console.log('offset: ' + offset);
                var neighborRowIndex = rowIndex + offset[0];
                var neighborColumnIndex = columnIndex + offset[1];
                //console.log('neighborRowIndex: ' + neighborRowIndex);
                //console.log('neighborColumnIndex: ' + neighborColumnIndex);
                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles == this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                var row = [];
                for (var j = 0; j < numberOfColumns; j++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            for (var i = 0; i < numberOfRows; i++) {
                var row = [];
                for (var j = 0; j < numberOfColumns; j++) {
                    row.push(null);
                }
                board.push(row);
            }

            var numberOfBombsPlaced = 0;

            while (numberOfBombsPlaced < numberOfBombs) {
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

                if (board[randomRowIndex][randomColumnIndex] != 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }]);

    return Board;
}();

/*
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }
    
    let numberOfBombsPlaced = 0;
    
    while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        
        if (board[randomRowIndex][randomColumnIndex] != 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;   
        }
    }
    return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
        //console.log('offset: ' + offset);
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        //console.log('neighborRowIndex: ' + neighborRowIndex);
        //console.log('neighborColumnIndex: ' + neighborColumnIndex);
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] != ' ') {
        console.log('This tile has already been flipped!');
        return;
    }
    else if(bombBoard[rowIndex][columnIndex] == 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
        
    }
    else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
}






const printBoard = (board) => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,3);
let numBombs = getNumberOfNeighborBombs(bombBoard, 2, 2);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
//console.log('Number of Bombs: ' + numBombs);
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
*/

var g = new Game(3, 3, 3);
g.playMove(0, 0);