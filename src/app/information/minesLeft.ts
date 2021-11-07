import { Board } from "../board/board";
export class MinesLeft {
    private minesLeft: number = 0;
    constructor(board: Board) {
        this.minesLeft = board.getMines();
    }
    public decrement() {
        this.minesLeft--;
    }
    public getMinesLeft(): number {
        return this.minesLeft;
    }
}