import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from '../information/timer';
import { Board } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  private cellsPerRow: number = 0; //find a way to get this
  private mines: number = 0; //fint a way to get this
  private board: Board = new Board(this.cellsPerRow, this.mines); //Board object for the component
  private subscription: Subscription = new Subscription(); //used to loop a method
  private timer: Timer = new Timer(); //Timer object for the component

  constructor() {
  }

  public getTimer(): Timer { //getter method for timer
      return this.timer;
  }

  public getBoard(): Board { //getter method for board
    return this.board;
  }

  ngOnInit(): void { //runs on initialization
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.loop());
  }

  private loop(): void { //runs every second
    //display cells and image on top (if displayed)
    if (this.board.getInteract()) {
      //if cell is clicked, run here
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}
 