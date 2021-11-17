import { Cell } from "./cells";

const cellSide: number = 0; //SET //length of 1 side of cell
const spaceBetweenCells: number = 0; //SET //length of space between adjacent sides of 2 cells

export class Board {
    private canInteract: boolean = true; //can interact with the board; directly related to pause button
    private size: number; //size of board (size x size)
    private mines: number; //# of mines on the board
    public cells: Cell[] = new Array(); //array of all cells on board //DECLARED IN createCells()
    private boardWidth: number; //width of board

    constructor (size: number, mines: number) {
        this.mines = mines;
        this.size = size;
        this.boardWidth = size * (cellSide + spaceBetweenCells) + spaceBetweenCells;
        this.createCells();
    }
    
    public isLeftClicked(cell: Cell): void { //runs when the cell is left-clicked
        if (cell.getIsMine()) {
            cell.isRevealed = true;
            //gameOver();
        }
        else if (cell.isRevealed) {
            //do nothing, maybe
        }
        else if (cell.getSurroundingMines() == 0) {
            this.zeroClicked(cell);
        }
        else {
            cell.isRevealed = true;
        }
    }

    public isRightClicked(cell: Cell): void { //runs when the cell is right-clicked
        let flagsLeft: boolean = true; //set this
        if (flagsLeft) {
            cell.setIsMarked(true);
        }
    }

    private zeroClicked(cell: Cell): void { //runs when all surrounding cells are not mines; creates ripple effect; only called in isLeftClicked()
        this.cells.forEach(otherCell => {
            if (otherCell.equalsPosition(cell.getX() - 1, cell.getY() - 1) || otherCell.equalsPosition(cell.getX() - 1, cell.getY()) || otherCell.equalsPosition(cell.getX() - 1, cell.getY() + 1) || otherCell.equalsPosition(cell.getX(), cell.getY() - 1) || otherCell.equalsPosition(cell.getX(), cell.getY() + 1) || otherCell.equalsPosition(cell.getX() + 1, cell.getY() - 1) || otherCell.equalsPosition(cell.getX() + 1, cell.getY()) || otherCell.equalsPosition(cell.getX() + 1, cell.getY() + 1)) { //this if finds all 8 surrounding cells and sends them through the isLeftClicked method
                this.isLeftClicked(otherCell);
            }
        });
    }

    public getMines(): number { //getter method for mines
        return this.mines;
    }

    public getInteract(): boolean { //getter method for interact
        return this.canInteract;
    }

    public disable(): void { //called when timer is paused; disables all board interactions
        this.canInteract = false;
    }

    public enable(): void { //called when timer is unpaused; enables all board interactions
        this.canInteract = true;
    }

    private createCells(): void { //creates cell array; only called in constructor
        let mineLocations = new Map<number, number>();
        while (Object.keys(mineLocations).length < this.mines) {
            let mineX: number = Math.random() * this.size;
            let mineY: number  = Math.random() * this.size;
            let repeat: boolean = false;
            for (const pair of mineLocations) {
                if (pair[0] == mineX && pair[1] == mineY) {
                    repeat = true;
                }
            }
            if (repeat) {
                mineLocations.set(mineX, mineY);
            }
        }
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                let nearbyMines: number = 0;
                let isMine: boolean = false;
                for (const pair of mineLocations) {
                    if (pair[0] == x && pair[1] == y) {
                        isMine = true;
                    }
                    else {
                        if (pair[0] == x - 1 && pair[1] == y - 1) {
                        nearbyMines++;
                        }
                        if (pair[0] == x && pair[1] == y - 1) {
                            nearbyMines++;
                        }
                        if (pair[0] == x + 1 && pair[1] == y - 1) {
                            nearbyMines++;
                        }
                        if (pair[0] == x - 1 && pair[1] == y) {
                            nearbyMines++;
                        }
                        if (pair[0] == x + 1 && pair[1] == y) {
                            nearbyMines++;
                        }
                        if (pair[0] == x - 1 && pair[1] == y + 1) {
                            nearbyMines++;
                        }
                        if (pair[0] == x && pair[1] == y + 1) {
                            nearbyMines++;
                        }
                        if (pair[0] == x + 1 && pair[1] == y + 1) {
                            nearbyMines++;
                        }
                    }
                }
                this.cells.push(new Cell(isMine, nearbyMines, x, y));
            }
        }
    }

    public drawCells() { //displays all cells in their correct position
        this.cells.forEach(cell => {
            cell.drawCell(cell.getX() * (spaceBetweenCells + cellSide) + spaceBetweenCells, cell.getY() * (spaceBetweenCells + cellSide) + spaceBetweenCells, cellSide);
        });
    }
}