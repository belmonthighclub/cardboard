import { Cell } from "./cells";
const cellSide: number = 0; //SET //length of 1 side of cell
const spaceBetweenCells: number = 0; //SET //length of space between adjacent sides of 2 cells
export class Board {
    private size: number = 0; //size of board (size x size)
    private mines: number = 0; //# of mines on the board
    private time: number = 0; //time left //SET COUNTDOWN
    private cells: Cell[] = new Array(); //array of all cells on board //DECLARED IN createCells()
    constructor (size: number, mines: number, time: number) {
        this.mines = mines;
        this.size = size;
        this.time = time;
    }
    public getMines(): number {
        return this.mines;
    }
    public getTime(): number {
        return this.time;
    }
    public getCells(): Cell[] {
        return this.cells;
    }
    public disable(): void {
        
    }
    public createCells(): void {
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
                this.cells.push(new Cell(isMine, nearbyMines, x, y));
            }
        }
    }
}