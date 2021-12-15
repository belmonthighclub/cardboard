export class FlagsLeft {
    private flagsLeft: number; //number of flags left to place on cells

    /**
     * creates counter for flags left to add
     * @param mines how many mines are on the board, default is 0
     */
    constructor(mines: number) {
        this.flagsLeft = mines;
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
}