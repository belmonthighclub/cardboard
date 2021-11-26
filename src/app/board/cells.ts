const flagAddress: string  = "../../assets/mine.png"; //address to flag image

export class Cell {
    private isMine: boolean = false; //is this cell a mine
    private wasMarked: boolean = false; //was marked last iteration (IN INFORMATION.COMPONENT.TS)
    private isRevealed: boolean = false; //is the cell revealed
    private surroundingMines: number = 0; //# of surrounding mines, 1-8
    private x: number = 0; //column # of the cell (column 1 is 0)
    private y: number = 0; //row # of the cell (row 1 is 0)
    private isMarked: boolean = false; //is the cell marked as a mine
    private imageAddress: string = ""; //address to the image for a cell

    constructor(isMine: boolean, surroundingMines: number, x: number, y: number) {
        this.isMine = isMine;
        this.surroundingMines = surroundingMines;
        this.x = x;
        this.y = y;
        if (isMine) {
            this.imageAddress = "../../assets/mine.png";
        }
        else if (surroundingMines == 1) {
            this.imageAddress = "../../assets/number1.png";
        }
        else if (surroundingMines == 2) {
            this.imageAddress = "../../assets/number2.png";
        }   
        else if (surroundingMines == 3) {
            this.imageAddress = "../../assets/number3.png";
        }
        else if (surroundingMines == 4) {
            this.imageAddress = "../../assets/number4.png";
        }
        else if (surroundingMines == 5) {
            this.imageAddress = "../../assets/number5.png";
        }
        else if (surroundingMines == 6) {
            this.imageAddress = "../../assets/number6.png";
        }
        else if (surroundingMines == 7) {
            this.imageAddress = "../../assets/number7.png";
        }
        else if (surroundingMines == 8) {
            this.imageAddress = "../../assets/number8.png";
        }
    }

    private displayFlag(x: number, y: number, sideLength: number): void { //draws flag if applicable; only used in drawCell()
        //display flag image
    }

    private displayImage(x: number, y: number, sideLength: number): void { //draws imageAddress if applicable; only used in drawCell()
        //display imageAddress image
    }

    public drawCell(x: number, y: number, sideLength: number): void { //draws cell
        //draw cell
        if (this.isRevealed) {
            this.displayImage(x, y, sideLength);
        }
        else if (this.isMarked) {
            this.displayFlag(x, y, sideLength);
        }
    }

    public equals(cell: Cell): boolean { //returns if cell and this are equal
        return cell.getX() == this.x && cell.getY() == this.y;
    }

    public equalsPosition(x: number, y: number): boolean { //returns if this is in location (x,y)
        return this.x == x && this.y == y;
    }

    public getImageAddress(): string { //getter method for imageAddress
        return this.imageAddress;
    }

    public getIsMine(): boolean { //getter method for isMine
        return this.isMine;
    }

    public getX(): number { //getter method for x
        return this.x;
    }

    public getY(): number { //getter method for y
        return this.y;
    }

    public getSurroundingMines(): number { //getter method for surroundingMines
        return this.surroundingMines;
    }

    public getIsRevealed(): boolean { //getter method for isRevealed
        return this.isRevealed;
    }

    public setIsRevealed(isRevealed: boolean): void { //setter method for isRevealed
        this.isRevealed = isRevealed;
    }

    public getWasMarked(): boolean { //getter method for wasMarked
        return this.wasMarked;
    }

    public setWasMarked(wasMarked: boolean): void { //setter method for wasMarked
        this.wasMarked = wasMarked;
    }

    public getIsMarked(): boolean { //getter method for isMarked
        return this.isMarked;
    }

    public setIsMarked(isMarked: boolean): void { //setter method for isMarked
        this.isMarked = isMarked;
    }
}