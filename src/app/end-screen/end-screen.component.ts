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
  @Output() public emitter: EventEmitter<boolean> = new EventEmitter<boolean>();


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

  public resetGame(): void {
    this.emitter.emit(true);
  }

  public getNonMines(): number {
    let nonMines: number = 0;
    this.board.getCells().forEach(row => {
      row.forEach(cell => {
        if (cell.getIsRevealed() && !cell.getIsMine()) {
          nonMines++;
        }
      });
    });
    return nonMines;
  }
}
