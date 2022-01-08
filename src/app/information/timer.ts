export class Timer {
    private time: number = 0; //amount of time that has passed
    private isPaused: boolean = false; //if the game is paused
    private stoppedTimer: boolean = false; //if the timer is stopped, cannot resume
    private lowestTime: number = -1;

    //no constructor because no inputted values

    public increment(): void { //increases time
        if (!this.isPaused && !this.stoppedTimer) {
            this.time++;
        }
    }

    public getTime(): number { //getter method for time
        return Math.floor(this.time/5);
    }
    
    public getLowestTime(): number {
        return this.lowestTime;
    }

    public setLowestTime(): void {
        if (this.lowestTime > this.getExactTime() || this.lowestTime == -1) {
            this.lowestTime = this.getExactTime();
        }
    }

    public getExactTime(): number {
        return this.time/5;
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

    public restartGame(won: boolean): void { //resets timer
        this.isPaused = false;
        this.stoppedTimer = false;
        this.time = 0;
    }

    public getTimeCoeff(): boolean { //basically returns 'second ' when time = 1, and 'seconds' otherwise
        return Math.floor(this.time/5) == 1;
    }
}