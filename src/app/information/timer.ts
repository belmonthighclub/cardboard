import { Board } from "../board/board";
export class Timer {
    private timeLeft: number = 0;
    private isPaused: boolean = false;
    constructor(board: Board) {
        this.timeLeft = board.getTime();
    }
    public decrement() {
        if (!this.isPaused) {
            this.timeLeft--;
        }
    }
    public getTimeLeft(): number {
        return this.timeLeft;
    }
    public setIsPaused(isPaused: boolean): void {
        this.isPaused = isPaused;
    }
    public getIsPaused(): boolean {
        return this.isPaused;
    }
}