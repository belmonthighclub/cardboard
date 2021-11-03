export class Cell {
    public isMine: boolean = false; //is this cell a mine
    public surroundingMines: number = 0; //# of surrounding mines, 1-8
    //creates Cell object, setting parameters to fields
    constructor(isMine: boolean, surroundingMines: number) {
        this.isMine = isMine;
        this.surroundingMines = surroundingMines;
    }
    //if mine clicked
    public isClicked(): void {
        this.display();
        if (this.isMine) {
            //gameOver();
        }
    }
    public display(): void {
        if (this.isMine) {
            //display mine pic
        }
        else {
            //display number
        }
    }
}