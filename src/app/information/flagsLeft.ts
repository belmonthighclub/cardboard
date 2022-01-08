export class FlagsLeft {
    private flagsLeft: number; //number of flags left to place on cells
    private totalFlags: number;

    /**
     * creates counter for flags left to add
     * @param mines how many mines are on the board, default is 0
     */
    constructor(mines: number) {
        this.flagsLeft = mines;
        this.totalFlags = mines;
    }

    public decrement(): void { //decrease flagsLeft by 1
        this.flagsLeft--;
    }

    public increment(): void { //increase flagsLeft by 1
        this.flagsLeft++;
    }

    public getFlagsLeft(): number { //getter method for flagsLeft
        return this.flagsLeft;
    }

    public getFlagCoeff(): boolean { //basically returns 'flag ' when flagsLeft = 1, and 'flags' otherwise
        return this.getFlagsPlaced() == 1;
    }

    public getFlagsPlaced(): number {
        return this.totalFlags - this.flagsLeft;
    }
}