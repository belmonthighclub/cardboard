import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from '../information/timer';
import { Board } from './board';

const LOOPS_PER_SECOND: number = 1;
const AUTO_SOLVE: boolean = false;
const AUTO_FAIL: boolean = false;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit, OnDestroy {
  @Input() public board!: Board; //Board object for the component
  private subscription: Subscription = new Subscription(); //used to loop a method
  @Input() public timer!: Timer; //Timer object for the component
  @Output() public emitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { //unused
  }

  public getTimer(): Timer { //getter method for timer
    return this.timer;
  }

  public getBoard(): Board { //getter method for board
    return this.board;
  }

  ngOnInit(): void { //runs on initialization
    if (AUTO_SOLVE || AUTO_FAIL) {
      this.board.setInteract(false);
    }
    const source = interval(1000/LOOPS_PER_SECOND);
    this.subscription = source.subscribe(val => this.loop());
  }

  private loop(): void { //runs every second
    if (AUTO_SOLVE) {
      this.autoSolve();
    }
    else if (AUTO_FAIL) {
      this.autoFail();
    }
    if (this.board.checkWinCondition()) {
      //gameWin();
      console.log("You won!");
      this.sendOutput();
    }
    else if (this.board.checkLossCondition()) {
      //gameOver();
      console.log("You lost!");
      this.sendOutput();
    }
    if (this.board.checkLossCondition() || this.board.checkWinCondition()) {
      this.board.getCells().forEach(row => {
        row.forEach(cell => {
          if (cell.getIsMine() && !cell.getIsMarked()) {
            cell.setIsRevealed(true);
          }
          else if (!cell.getIsMine() && cell.getIsMarked()) {
            cell.setIsMarked(false);
          }
        });
      });
      this.timer.stopTimer();
    }
  }

  ngOnDestroy(): void { //runs when destroyed
    this.subscription && this.subscription.unsubscribe();
  }

  private autoSolve(): void { //auto-solves the puzzle, enabled by constant 'AUTO_SOLVE'
    this.board.getCells().forEach(row => {
      row.forEach(cell => {
        if (!cell.getIsMine()) {
          cell.setIsRevealed(true);
        }
      });
    });
  }

  private autoFail(): void { //auto-fails the puzzle, enabled by constant 'AUTO_FAIL', will not run if 'AUTO_SOLVE' is enabled
    this.board.getCells().forEach(row => {
      row.forEach(cell => {
        if (cell.getIsMine()) {
          cell.setIsRevealed(true);
          return;
        }
      });
    });
  }

  public sendOutput(): void {
    let num: number = 0;
    if (this.board.checkLossCondition() && !this.board.checkWinCondition()) {
      num = -1;
    }
    else if (this.board.checkWinCondition()) {
      num = 1;
      this.timer.setLowestTime();
    }
    this.emitter.emit(num);
  }
}
 