const pauseImage: string = "../../assets/pauseImage.png"; //image address for pause button image
const playImage: string = "../../assets/playImage.png"; //image address for play button image
export class PauseButton {
    private paused: boolean = false; //is the game paused
    
    public togglePause(): void { //toggles pause button image and paused
        this.paused = !this.paused;
        if (this.paused) {
            this.setImage(playImage);
        }
        else {
            this.setImage(pauseImage);
        }
    }

    public setImage(image: string): void { //displays button image

    }

    public getPaused(): boolean { //getter method for paused
        return this.paused;
    }
}