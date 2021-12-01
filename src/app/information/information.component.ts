import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { FlagsLeft } from './flagsLeft';
import { PauseButton } from './pauseButton';
import { Timer } from './timer';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})

export class InformationComponent implements OnInit, OnDestroy {
  @Input() public timer?: Timer; //Timer object for the component; recieved from BoardComponent
  private subscription: Subscription = new Subscription(); //used to loop a method
  @Input() public board?: Board; //Board object for the component; recieved from BoardComponent
  private flagCount!: FlagsLeft; //FlagsLeft object for the component
  private pauseButton: PauseButton = new PauseButton(); //PauseButton object for the component

  constructor() {
  }

  ngOnInit(): void { //runs on initialization
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.loop());
    if (this.board) {
      this.flagCount = new FlagsLeft(this.board.getMines());
    }
    else {
      this.flagCount = new FlagsLeft(5);
    }
  }
  
  private loop(): void { //runs every second
    //print out timer and flagCount
    this.timer?.increment();
    let gameWon: boolean = false;
    this.board?.getCells().forEach(row => {
      row.forEach(cell => {
        if (!cell.getWasMarked() && cell.getIsMarked() && this.flagCount.getFlagsLeft() > 0) {
          this.flagCount.decrement();
          cell.setWasMarked(true);
        }
        else if (cell.getWasMarked() && !cell.getIsMarked()) {
          this.flagCount.increment();
          cell.setWasMarked(false);
        }
      });
  });
    if (gameWon) {
      //gameWon();
      this.timer?.stopTimer();
    }
    else if (this.pauseButton.getPaused()) {
      this.timer?.setIsPaused(true);
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }
}
