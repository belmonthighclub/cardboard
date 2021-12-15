import { FlagsLeft } from "../information/flagsLeft";
import { Cell } from "./cells";

const cellSide: number = 0; //SET //length of 1 side of cell
const spaceBetweenCells: number = 0; //SET //length of space between adjacent sides of 2 cells

export class Board {
    private canInteract: boolean = true; //can interact with the board; directly related to pause button
    private size: number; //size of board (size x size)
    private mines: number; //# of mines on the board
    private cells: Cell[][] = []; //2d array of all cells on board //DECLARED IN createCells()
    private boardWidth: number; //can be used?
    private flagCount: FlagsLeft;

    /**
     * Creates board object
     * @param size amount of cells on one side of board
     * @param mines amount of mine cells on the board
     */
    constructor (size: number, mines: number) {
        this.mines = mines;
        this.size = size;
        this.boardWidth = size * (cellSide + spaceBetweenCells) + spaceBetweenCells;
        this.createCells();
        this.flagCount = new FlagsLeft(mines);
    }
    
    /**
     * Runs when the cell is left-clicked
     * @param cell cell object the function is running on
     */
    public isLeftClicked(cell: Cell): void {
        if (!this.canInteract || cell.getIsMarked() || cell.getIsQuestioned()) {
            return;
        }
        if (cell.getIsMine()) {
            cell.setIsRevealed(true);
            //gameOver();
        }
        else if (cell.getIsRevealed()) {

        }
        else if (cell.getSurroundingMines() == 0) {
            cell.setIsRevealed(true);
            this.zeroClicked(cell);
        }
        cell.setIsRevealed(true);
    }

    /**
     * Runs when the cell is right-clicked
     * @param cell cell object the function is running on
     */
    public isRightClicked(cell: Cell): boolean {
        if (this.canInteract) {
            if (cell.getIsMarked()) {
                cell.setIsQuestioned(true);
                cell.setIsMarked(false);
            }
            else if (cell.getIsQuestioned()) {
                cell.setIsQuestioned(false);
            }
            else {
                cell.setIsMarked(true);
            }
        }
        return false;
    }

    
    public getFlagCount(): FlagsLeft {
        return this.flagCount;
    }
    

    /**
     * Runs when all surrounding cells are not mines; creates ripple effect; only called in isLeftClicked()
     * @param cell cell object the function is running on
     */
    private zeroClicked(cell: Cell): void {
        if (cell.getX() != 0 && cell.getY() != 0) {
            this.isLeftClicked(this.cells[cell.getY() - 1][cell.getX() - 1]);
        }
        if (cell.getY() != 0) {
            this.isLeftClicked(this.cells[cell.getY() - 1][cell.getX()]);
        }
        if (cell.getX() != this.size - 1 && cell.getY() != 0) {
            this.isLeftClicked(this.cells[cell.getY() - 1][cell.getX() + 1]);
        }
        if (cell.getX() != 0) {
            this.isLeftClicked(this.cells[cell.getY()][cell.getX() - 1]);
        }
        if (cell.getX() != this.size - 1) {
            this.isLeftClicked(this.cells[cell.getY()][cell.getX() + 1]);
        }
        if (cell.getX() != 0 && cell.getY() != this.size - 1) {
            this.isLeftClicked(this.cells[cell.getY() + 1][cell.getX() - 1]);
        }
        if (cell.getY() != this.size - 1) {
            this.isLeftClicked(this.cells[cell.getY() + 1][cell.getX()]);
        }
        if (cell.getX() != this.size - 1 && cell.getY() != this.size - 1) {
            this.isLeftClicked(this.cells[cell.getY() + 1][cell.getX() + 1]);
        }
    }

    public checkWinCondition(): boolean { //checks if all non-mine cells are revealed
        let isWin: boolean = true;
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (!cell.getIsMine() && !cell.getIsRevealed()) {
                    isWin = false;
                }
            });
        });
        if (isWin) {
            this.canInteract = false;
        }
        return isWin;
    }

    public checkLossCondition(): boolean { //checks if any mines have been revealed
        let isLoss: boolean = false;
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.getIsMine() && cell.getIsRevealed()) {
                    isLoss = true;
                    this.canInteract = false;
                }
            });
        });
        return isLoss;
    }

    public getMines(): number { //getter method for mines
        return this.mines;
    }

    public getCells(): Cell[][] { //getter method for cell array
        return this.cells;
    }

    public getSize(): number {
        return this.size;
    }

    public getInteract(): boolean { //getter method for interact
        return this.canInteract;
    }
    
    public setInteract(newInteract: boolean): void { //setter method for interact
        this.canInteract = newInteract;
    }

    private createCells(): void { //creates cell array; only called in constructor
        let mineLocationsX: number[] = new Array();
        let mineLocationsY: number[] = new Array();
        while (mineLocationsX.length < this.mines) {
            let mineX: number = Math.floor(Math.random() * this.size);
            let mineY: number  = Math.floor(Math.random() * this.size);
            let repeat: boolean = false;
            for (let i = 0; i < mineLocationsX.length; i++) {
                const x = mineLocationsX[i];
                const y = mineLocationsY[i];
                if (x == mineX && y == mineY) {
                    repeat = true;
                }
            }
            if (!repeat) {
                mineLocationsX.push(mineX);
                mineLocationsY.push(mineY);
            }
        }
        for (let y = 0; y < this.size; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.size; x++) {
                let nearbyMines: number = 0;
                let isMine: boolean = false;
                for (let i = 0; i < mineLocationsX.length; i++) {
                    const mineX = mineLocationsX[i];
                    const mineY = mineLocationsY[i];
                    if (mineX == x && mineY == y) {
                        isMine = true;
                    }
                    else {
                        if (mineX == x - 1 && mineY == y - 1) {
                            nearbyMines++;
                        }
                        if (mineX == x && mineY == y - 1) {
                            nearbyMines++;
                        }
                        if (mineX == x + 1 && mineY == y - 1) {
                            nearbyMines++;
                        }
                        if (mineX == x - 1 && mineY == y) {
                            nearbyMines++;
                        }
                        if (mineX == x + 1 && mineY == y) {
                            nearbyMines++;
                        }
                        if (mineX == x - 1 && mineY == y + 1) {
                            nearbyMines++;
                        }
                        if (mineX == x && mineY == y + 1) {
                            nearbyMines++;
                        }
                        if (mineX == x + 1 && mineY == y + 1) {
                            nearbyMines++;
                        }
                    }
                }
                this.cells[y][x] = new Cell(isMine, nearbyMines, x, y); //this.cells[y][x] is the same thing as this.cells[rows][columns], because of my stupid brain
            }
        }
    }
}