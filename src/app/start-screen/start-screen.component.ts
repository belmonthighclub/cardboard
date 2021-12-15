import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  private playing: boolean = true;
  private subscription: Subscription = new Subscription(); //used to loop a method
  
  public getPlaying(): boolean { //getter for start
    return this.playing;
  }
  
  public getCellsPerRow(): number { //getter for cellsPerRow
    return this.cellsPerRow;
  }
  
  public getMines(): number { //getter for mines
    return this.mines;
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
}
