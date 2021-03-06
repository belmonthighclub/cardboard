const flagAddress: string  = "../../assets/flag.png"; //address to flag image

export class Cell {
    private isMine: boolean = false; //is this cell a mine
    private wasMarked: boolean = false; //was marked last iteration (IN INFORMATION.COMPONENT.TS)
    private isRevealed: boolean = false; //is the cell revealed
    private surroundingMines: number = 0; //# of surrounding mines, 1-8
    private x: number = 0; //column # of the cell (column 1 is 0)
    private y: number = 0; //row # of the cell (row 1 is 0)
    private isMarked: boolean = false; //is the cell marked as a mine
    private imageAddress: string; //address to the image for a cell
    private isQuestioned: boolean = false;

    /**
     * Creates cell object
     * @param isMine if this cell is a mine
     * @param surroundingMines how many mines surround the cell, is 0 if the cell is a mine
     * @param x the column the cell is on, starts at 0
     * @param y the row the cell is on, starts at 0
     * !!x and y are based on coordinate plane!!
     */
    constructor(isMine: boolean, surroundingMines: number, x: number, y: number) {
        this.isMine = isMine;
        this.surroundingMines = surroundingMines;
        this.x = x;
        this.y = y;
        switch (surroundingMines) {
            case 1:
                this.imageAddress = "../../assets/number1.png";
                break;
            case 2:
                this.imageAddress = "../../assets/number2.png";
                break;
            case 3:
                this.imageAddress = "../../assets/number3.png";
                break;
            case 4:
                this.imageAddress = "../../assets/number4.png";
                break;
            case 5:
                this.imageAddress = "../../assets/number5.png";
                break;
            case 6:
                this.imageAddress = "../../assets/number6.png";
                break;
            case 7:
                this.imageAddress = "../../assets/number7.png";
                break;
            case 8:
                this.imageAddress = "../../assets/number8.png";
                break;
            default:
                this.imageAddress = "../../assets/number0.png";
                break;
        }
        if (isMine) {
            this.imageAddress = "../../assets/mine.png";
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

    public getIsQuestioned(): boolean { //getter method for isQuestioned
        return this.isQuestioned;
    }

    public setIsQuestioned(isQuestioned: boolean): void { //setter method for isQuestioned
        this.isQuestioned = isQuestioned;
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

    public markedMine(): boolean {
        return this.isMarked && this.isMine;
    }
}