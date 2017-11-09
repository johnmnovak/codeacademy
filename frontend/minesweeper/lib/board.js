'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
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
            if (this._playerBoard[rowIndex][columnIndex] != ' ' && this._playerBoard[rowIndex][columnIndex] != 'F') {
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
        key: 'flagTile',
        value: function flagTile(rowIndex, columnIndex) {
            if (this._playerBoard[rowIndex][columnIndex] == ' ') {
                this._playerBoard[rowIndex][columnIndex] = 'F';
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
            console.log('Current Board: ');
            console.log('|' + this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('|\n'));
            console.log('|');
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