import { Board } from "../board/board";

export class FlagsLeft {
    private flagsLeft: number = 0; //number of flags left to place on cells

    constructor(board: Board) {
        this.flagsLeft = board.getMines();
    }

    public decrement(): void { //decrease flagsLeft by 1
        this.flagsLeft--;
    }

    public getFlagsLeft(): number { //getter method for flagsLeft
        return this.flagsLeft;
    }
}