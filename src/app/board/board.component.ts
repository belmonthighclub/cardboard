import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from '../information/timer';
import { Board } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  @Input() public cellsPerRow: number | null = 5; //change to null once it works
  @Input() public mines: number | null = this.cellsPerRow; //change to null once it works
  public board!: Board; //Board object for the component
  private subscription: Subscription = new Subscription(); //used to loop a method
  private timer: Timer = new Timer(); //Timer object for the component

  constructor() {
  }

  public getTimer(): Timer { //getter method for timer
    return this.timer;
  }

  ngOnInit(): void { //runs on initialization
    if (this.cellsPerRow && this.mines) {
      this.board = new Board(this.cellsPerRow, this.mines);
    }
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.loop());
  }

  private loop(): void { //runs every second
    //this.board.drawCells();
    console.log("hello sir");
    if (this.board.getInteract()) {
      //if cell is clicked, run here
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}