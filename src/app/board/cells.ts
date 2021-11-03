export class Cell {
    public isMine: boolean = false; //is this cell a mine
    public surroundingMines: number = 0; //# of surrounding mines, 1-8
    public x: number = 0; //column # of the cell (column 1 is 0)
    public y: number = 0; //row # of the cell (row 1 is 0)
    //creates Cell object, setting parameters to fields
    constructor(isMine: boolean, surroundingMines: number, x: number, y: number) {
        this.isMine = isMine;
        this.surroundingMines = surroundingMines;
        this.x = x;
        this.y = y;
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
        if (this.isMine) {
            //display mine pic
        }
        else {
            //display number
        }
    }
    public zeroClicked(): void {
        //reveal nearby zero cells and the boundary cells
    }
}