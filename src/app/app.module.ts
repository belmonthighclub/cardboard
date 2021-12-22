import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { InformationComponent } from './information/information.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { EndScreenComponent } from './end-screen/end-screen.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    InformationComponent,
    StartScreenComponent,
    EndScreenComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
