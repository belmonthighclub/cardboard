import { Cell } from "./cells";

export class Board {
    public size: number = 0;
    public mines: number = 0;
    public time: number = 0;
    constructor (size: number, mines: number, time: number) {
        this.mines = mines;
        this.size = size;
        this.time = time;
    }
    public createCells(): void {
        for (let x = 0; x < this.mines; x++) {
            let mineX = Math.random() * this.size;
            let mineY = Math.random() * this.size;
        }
    }
}