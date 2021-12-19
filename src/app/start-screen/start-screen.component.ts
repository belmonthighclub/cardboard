import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOPS_PER_SECOND = 1;

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})

export class StartScreenComponent implements OnInit, OnDestroy {
  private cellsPerRow: number = 7;
  private mines: number = 7;
  private playing: boolean = false;
  private victory: boolean | null = null;
  private subscription: Subscription = new Subscription(); //used to loop a method
  
  public getPlaying(): boolean { //getter for start
    return this.playing;
  }

  public getVictory(): boolean | null {
    return this.victory;
  }
  
  public getCellsPerRow(): number { //getter for cellsPerRow
    return this.cellsPerRow;
  }
  
  public setCellsPerRow(newCellsPerRow: number): void { //setter for cellsPerRow
    this.cellsPerRow = newCellsPerRow;
  }

  public setCellsPerRowEvent(event: Event): void { //setter for cellsPerRow (event)
    this.cellsPerRow = Number((event.target as HTMLInputElement).value);
  }

  public getMines(): number { //getter for mines
    return this.mines;
  }

  public setMines(newMines: number): void { //setter for mines
    this.mines = newMines;
  }

  public setMinesEvent(event: Event): void { //setter for mines (event)
    this.mines = Number((event.target as HTMLInputElement).value);
  }

  constructor() {
  }

  ngOnInit(): void {
    const source = interval(1000/LOOPS_PER_SECOND);
    this.subscription = source.subscribe(val => this.loop());
  }

  private loop(): void {

  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public processEmit(event: number): void {
    if (event != 0) {
      this.playing = false;
    }
    if (event == 1) {
      this.victory = true;
    }
    else if (event == -1) {
      this.victory = false;
    }
  }

  public submission(): void {
    this.playing = true;
  }
}
