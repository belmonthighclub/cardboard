import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOP_SPEED = 1000;

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})

export class StartScreenComponent implements OnInit, OnDestroy {
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
