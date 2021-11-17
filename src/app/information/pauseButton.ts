const pauseImage: string = "../../assets/pauseImage.png"; //image address for pause button image
const playImage: string = "../../assets/playImage.png"; //image address for play button image

export class PauseButton {
    private paused: boolean = false; //is the game paused
    private x: number = 0; //x value for button
    private y: number = 0; //y value for button
    private width: number = 0; //width of button
    private height: number = 0; //height of button

    public togglePause(): void { //toggles pause button image and paused
        this.paused = !this.paused;
        if (this.paused) {
            this.setImage(playImage);
        }
        else {
            this.setImage(pauseImage);
        }
    }

    private setImage(image: string): void { //displays button image; only used in togglePause()

    }

    public getPaused(): boolean { //getter method for paused
        return this.paused;
    }
}