export class PauseButton {
    private paused: boolean = false;
    private pauseImage: string = "";
    private playImage: string = "";
    
    public togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            //set image to playImage
        }
        else {
            //set image to pauseImage
        }
    }
    public getPaused(): boolean {
        return this.paused;
    }
}