import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { Timer } from './timer';

const LOOP_SPEED: number = 1000;

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit, OnDestroy {
  @Input() public timer!: Timer; //Timer object for the component; recieved from BoardComponent
  private subscription: Subscription = new Subscription(); //used to loop a method
  @Input() public board!: Board; //Board object for the component; recieved from BoardComponent
  private paused: boolean = false;
  private timesLooped: number = 0;

  constructor() {
  }

  ngOnInit(): void { //runs on initialization
    const source = interval(LOOP_SPEED);
    this.subscription = source.subscribe(val => this.loop());
  }

  public getBoard(): Board { //getter method for board
    return this.board;
  }

  public getTimer(): Timer { //getter method for timer
    return this.timer;
  }
  
  private loop(): void { //runs every second
    //print out timer and flagCount
    this.timesLooped++;
    if (this.timesLooped * LOOP_SPEED == 1000) {
      this.timer?.increment();
      this.timesLooped = 0;
    }
    let gameWon: boolean = false;
    this.board?.getCells().forEach(row => {
      row.forEach(cell => {
        if (!cell.getWasMarked() && cell.getIsMarked() && this.board!.getFlagCount().getFlagsLeft() > 0) {
          this.board?.getFlagCount().decrement();
          cell.setWasMarked(true);
        }
        else if (cell.getWasMarked() && !cell.getIsMarked()) {
          this.board?.getFlagCount().increment();
          cell.setWasMarked(false);
        }
      });
  });
    if (gameWon) {
      //gameWon();
      this.timer?.stopTimer();
    }
  }

  public getPaused(): boolean { //getter method for paused
    return this.paused;
  }

  public togglePause(): void { //pause needs to 1.) stop the timer and 2.) stop the player from doing anything
    if (!(this.board.checkLossCondition() || this.board.checkWinCondition())) {
      this.paused = !this.paused;
      this.timer.setIsPaused(this.paused);
      this.board.setInteract(!this.paused);
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}
