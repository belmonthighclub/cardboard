import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOP_SPEED: number = 1000;

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
    const source = interval(LOOP_SPEED);
    this.subscription = source.subscribe(val => this.loop());
  }

  private loop(): void {

  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

}
