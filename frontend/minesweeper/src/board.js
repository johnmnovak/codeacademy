export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = (numberOfRows * numberOfColumns);
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    get playerBoard() {
        return this._playerBoard;
    }
    
    flipTile(rowIndex, columnIndex) {
        let numberNeighborBombs;
        //console.log(this._playerBoard);
        if (this._playerBoard[rowIndex][columnIndex] != ' ' && this._playerBoard[rowIndex][columnIndex] != 'F') {
            //console.log('This tile has already been flipped!');
            return;
        }
        else if(this._bombBoard[rowIndex][columnIndex] == 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        
        }
        else {
            numberNeighborBombs = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            this._playerBoard[rowIndex][columnIndex] = numberNeighborBombs;
        }
        this._numberOfTiles--;
        
        if (numberNeighborBombs == 0) {
            this.flipAllNeighbors(rowIndex, columnIndex);
        }
    }
    
    flagTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] == ' ') {
            this._playerBoard[rowIndex][columnIndex] = 'F';
        }
    }
    
    flipAllNeighbors(rowIndex, columnIndex) {
        let rowBound = this.numberOfRows-1;
        let colBound = this.numberOfColumns-1;
        
        // TOP LEFT CORNER
        if (rowIndex == 0 && columnIndex == 0) {
            this.flipTile(rowIndex+1, columnIndex);
            this.flipTile(rowIndex, columnIndex+1);
            this.flipTile(rowIndex+1, columnIndex+1);
        }
        // BOTTOM LEFT CORNER
        else if(rowIndex == 0 && columnIndex == colBound) {
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex, columnIndex+1);
            this.flipTile(rowIndex-1, columnIndex+1);
        }
        // TOP RIGHT CORNER
        else if(rowIndex == rowBound && columnIndex == 0) {
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex+1, columnIndex);
            this.flipTile(rowIndex+1, columnIndex-1);
        }
        // BOTTOM RIGHT CORNER
        else if (rowIndex == rowBound && columnIndex == colBound) {
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex-1, columnIndex-1);
        }
        // TOP ROW
        else if (rowIndex == 0) {
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex, columnIndex+1);
            this.flipTile(rowIndex+1, columnIndex);
            this.flipTile(rowIndex+1, columnIndex-1);
            this.flipTile(rowIndex+1, columnIndex+1);
        }
        // BOTTOM ROW
        else if (rowIndex == rowBound) {
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex, columnIndex+1);
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex-1, columnIndex-1);
            this.flipTile(rowIndex-1, columnIndex+1);
        }
        // LEFT SIDE
        else if (columnIndex == 0) {
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex+1, columnIndex);
            this.flipTile(rowIndex-1, columnIndex+1);
            this.flipTile(rowIndex, columnIndex +1);
            this.flipTile(rowIndex+1, columnIndex+1);
        }
        // RIGHT SIDE
        else if (columnIndex == colBound) {
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex-1, columnIndex-1);
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex+1, columnIndex-1);
            this.flipTile(rowIndex+1, columnIndex);
        }
        else {
            this.flipTile(rowIndex-1, columnIndex);
            this.flipTile(rowIndex-1, columnIndex-1);
            this.flipTile(rowIndex, columnIndex-1);
            this.flipTile(rowIndex+1, columnIndex-1);
            this.flipTIle(rowIndex+1, columnIndex);
            this.flipTile(rowIndex+1, columnIndex+1);
            this.flipTile(rowIndex, columnIndex+1);
            this.flipTile(rowIndex-1, columnIndex+1);
        }
    }
    
    
    
    
    getNumberOfNeighborBombs(rowIndex, columnIndex) {
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
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        let numberOfBombs = 0;
        neighborOffsets.forEach(offset => {
            //console.log('offset: ' + offset);
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            //console.log('neighborRowIndex: ' + neighborRowIndex);
            //console.log('neighborColumnIndex: ' + neighborColumnIndex);
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    }
    
    hasSafeTiles() {
        return(this._numberOfTiles == this._numberOfBombs);
    }
    
    print() {
        console.log('Current Board: ');
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
    
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
}