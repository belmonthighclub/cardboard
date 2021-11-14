import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { BoardComponent } from '../board/board.component';
import { FlagsLeft } from './flagsLeft';
import { PauseButton } from './pauseButton';
import { Timer } from './timer';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit, OnDestroy {
  private boardComponent: BoardComponent = new BoardComponent(); //find a way to get this
  private timer: Timer = this.boardComponent.getTimer(); //Timer object for the component; recieved from BoardComponent
  private subscription: Subscription = new Subscription(); //used to loop a method
  private board: Board = this.boardComponent.getBoard(); //Board object for the component; recieved from BoardComponent
  private flagCount: FlagsLeft = new FlagsLeft(this.board); //FlagsLeft object for the component
  private pauseButton: PauseButton = new PauseButton(); //PauseButton object for the component

  constructor() {
  }

  ngOnInit(): void { //runs on initialization
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.ngOnLoop());
  }
  
  ngOnLoop(): void { //runs every second
    //print out timer and flagCount
    if (!this.timer.getIsPaused()) {
      this.timer.increment();
    }
    let gameWon: boolean = true;
    this.board.getCells().forEach(cell => {
      if (!cell.getWasMarked() && cell.getIsMarked()) {
        this.flagCount.decrement();
        cell.setWasMarked(true);
      }
      if (!cell.getIsRevealed() && !cell.getIsMine) {
        gameWon = false;
      }
    });
    if (gameWon) {
      //gameWon();
    }
    /*else if (pauseButton.getPaused()) {
      this.timer.setIsPaused(true);
    }*/
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}
