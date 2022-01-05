import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { Timer } from '../information/timer';

const LOOPS_PER_SECOND = 1;

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})

export class StartScreenComponent implements OnInit, OnDestroy {
  public cellsPerRow: number = 9;
  public mines: number = 10;
  public board: Board = new Board(9, 10);
  public timer: Timer = new Timer();
  private playing: boolean = false;
  private victory: boolean | null = null;
  private subscription: Subscription = new Subscription(); //used to loop a method
  
  public getPlaying(): boolean { //getter for start
    return this.playing;
  }

  public getVictory(): boolean | null {
    return this.victory;
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

  public resetMines(): void {
    if (this.mines < this.cellsPerRow) {
      this.mines = this.cellsPerRow;
    }
    else if (this.mines > this.maxMines()) {
      this.mines = this.maxMines();
    }
  }

  public maxMines(): number {
    return this.cellsPerRow ** 2 - 1;
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

  public processEmit2(event: number): void {
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

  public getGameOver(): boolean {
    return this.victory != null;
  }

  public submission(): void {
    this.board = new Board(this.cellsPerRow, this.mines);
    this.playing = true;
  }
}
