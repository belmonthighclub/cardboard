export class Timer {
    private time: number = 0; //amount of time that has passed
    private isPaused: boolean = false; //if the game is paused
    private stoppedTimer: boolean = false; //if the timer is stopped, cannot resume

    public increment(): void { //increases time
        if (!this.isPaused && !this.stoppedTimer) {
            this.time++;
        }
    }

    public getTime(): number { //getter method for time
        return this.time;
    }
    
    public getIsPaused(): boolean { //getter method for isPaused
        return this.isPaused;
    }
    
    public setIsPaused(isPaused: boolean): void { //setter method for isPaused
        this.isPaused = isPaused;
    }
    
    public stopTimer(): void { //stops timer
        this.stoppedTimer = true;
    }

    public restartGame(): void { //resets timer
        this.time = 0;
        this.isPaused = false;
        this.stoppedTimer = false;
    }
}