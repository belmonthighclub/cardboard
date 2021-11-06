export class Cell {
    private isMine: boolean = false; //is this cell a mine
    private surroundingMines: number = 0; //# of surrounding mines, 1-8
    private x: number = 0; //column # of the cell (column 1 is 0)
    private y: number = 0; //row # of the cell (row 1 is 0)
    //creates Cell object, setting parameters to fields
    private imageAddress: string = ''; //address (i think) to the image for a cell
    constructor(isMine: boolean, surroundingMines: number, x: number, y: number) {
        this.isMine = isMine;
        this.surroundingMines = surroundingMines;
        this.x = x;
        this.y = y;
        if (isMine) {
            this.imageAddress = "././assets/mine.png";
        }
        else if (surroundingMines == 1) {
            this.imageAddress = "././assets/number1.png";
        }
        else if (surroundingMines == 2) {
            this.imageAddress = "././assets/number2.png";
        }
        else if (surroundingMines == 3) {
            this.imageAddress = "././assets/number3.png";
        }
        else if (surroundingMines == 4) {
            this.imageAddress = "././assets/number4.png";
        }
        else if (surroundingMines == 5) {
            this.imageAddress = "././assets/number5.png";
        }
        else if (surroundingMines == 6) {
            this.imageAddress = "././assets/number6.png";
        }
        else if (surroundingMines == 7) {
            this.imageAddress = "././assets/number7.png";
        }
        else if (surroundingMines == 8) {
            this.imageAddress = "././assets/number8.png";
        }
        else if (surroundingMines == 9) {
            this.imageAddress = "././assets/number9.png";
        }
        else if (surroundingMines == 10) {
            this.imageAddress = "././assets/number10.png";
        }
    }
    //if mine clicked
    public isClicked(): void {
        this.display();
        if (this.isMine) {
            //gameOver();
        }
        else if (this.surroundingMines == 0) {
            this.zeroClicked();
        }
    }
    public display(): void {
        //display imageAddress
    }
    public zeroClicked(): void {
        //reveal nearby zero cells and the boundary cells
    }
    public getImageAddress(): string {
        return this.imageAddress;
    }
}