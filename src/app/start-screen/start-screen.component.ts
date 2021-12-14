import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

const LOOPS_PER_SECOND = 1;

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
    const source = interval(1000/LOOPS_PER_SECOND);
    this.subscription = source.subscribe(val => this.loop());
  }
  private loop(): void {

  }
  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }
}
