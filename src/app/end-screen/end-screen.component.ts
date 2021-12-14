import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOPS_PER_SECOND: number = 1;

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); //used to loop a method

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

}
