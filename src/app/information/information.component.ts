import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { MinesLeft } from './minesLeft';
import { PauseButton } from './pauseButton';
import { Timer } from './timer';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {
  private timer: Timer;
  private subscription: Subscription = new Subscription();
  private mineCount: MinesLeft;
  private board: Board;
  private pauseButton: PauseButton = new PauseButton();
  constructor(board: Board) {
    this.timer = new Timer();
    this.mineCount = new MinesLeft(board);
    this.board = board;
  }

  ngOnInit(): void { //start method
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.ngOnLoop());
  }
  
  public ngOnLoop() {
    //print out timer and mineCount
    this.timer.increment();
    this.board.getCells().forEach(cell => {
      if (cell.getIsMine() && !cell.getWasMine() && cell.getIsMarked()) {
        this.mineCount.decrement();
        cell.setWasMine(true);
      }
    });
    if (this.mineCount.getMinesLeft() == 0) {
      //gameWon();
    }
    /*else if (*pause button is clicked*) {
      this.timer.setIsPaused(true);
    }*/
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
