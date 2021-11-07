export class Timer {
    private timeLeft: number = 0;
    private isPaused: boolean = false;
    private stoppedTimer: boolean = false;
    public increment() {
        if (!this.isPaused && !this.stoppedTimer) {
            this.timeLeft++;
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
    public stopTimer(): void {
        this.stoppedTimer = true;
    }
}