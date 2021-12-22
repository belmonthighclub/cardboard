import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOPS_PER_SECOND = 1;

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})

export class StartScreenComponent implements OnInit, OnDestroy {
  public cellsPerRow: number = 8;
  public mines: number = 10;
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
    return this.cellsPerRow ** 2;
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
