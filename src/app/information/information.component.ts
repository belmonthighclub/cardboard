import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { Cell } from '../board/cells';
import { MinesLeft } from './minesLeft';
import { Timer } from './timer';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {
  private timer: Timer;
  private subscription: Subscription = new Subscription();
  private intervalId: number = 0;
  private mineCount: MinesLeft;
  private board: Board;
  constructor(board: Board) {
    this.timer = new Timer(board);
    this.mineCount = new MinesLeft(board);
    this.board = board;
  }

  ngOnInit(): void { //start method
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.ngOnLoop());
  }
  
  public ngOnLoop() {
    //print out timer and mineCount
    this.timer.decrement();
    this.board.getCells().forEach(cell => {
      if (cell.getIsMine() && !cell.getWasMine() && cell.getIsRevealed()) {
        this.mineCount.decrement();
        cell.setWasMine(true);
      }
    });
    if (this.timer.getTimeLeft() <= 0) {
      //gameOver();
    }
    else if (this.mineCount.getMinesLeft() == 0) {
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
