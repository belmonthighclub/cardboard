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
  @Input() private cellsPerRow?: number; //find a way to get this
  @Input() private mines?: number; //find a way to get this
  private board?: Board; //Board object for the component
  private subscription: Subscription = new Subscription(); //used to loop a method
  private timer: Timer = new Timer(); //Timer object for the component

  constructor() { //unused
  }

  public getTimer(): Timer { //getter method for timer
    return this.timer;
  }

  public getBoard(): Board { //getter method for board
    if (this.board) {
      return this.board;
    }
    else {
      return new Board(5, 5);
    }
  }

  ngOnInit(): void { //runs on initialization
    if (this.cellsPerRow && this.mines) {
      this.board = new Board(this.cellsPerRow, this.mines);
    }
    else {
      this.board = new Board(7, 7);
    }
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.loop());
    console.log(this.getBoard().getCells())
  }

  private loop(): void { //runs every second
    //display cells and image on top (if displayed)
    if (this.board?.getInteract()) {
      //if cell is clicked, run here
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}
 