import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Board } from '../board/board';
import { Timer } from '../information/timer';

const LOOPS_PER_SECOND: number = 1;

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); //used to loop a method
  @Input() public board!: Board;
  @Input() public timer!: Timer;
  @Output() public emitter: EventEmitter<number> = new EventEmitter<number>();


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

  public sendOutput(): void {
    let num: number = 0;
    if (this.board.checkLossCondition() && !this.board.checkWinCondition()) {
      num = -1;
    }
    else if (this.board.checkWinCondition()) {
      num = 1;
    }
    this.emitter.emit(num);
  }

  public getNonMines() {
    return this.board.getSize() ** 2 - this.board.getMines();
  }
}
