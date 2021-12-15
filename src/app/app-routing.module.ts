import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StartScreenComponent } from "./start-screen/start-screen.component";


const routes: Routes = [
    {path : "path", component: StartScreenComponent},
    // {path : "path", component: board.component},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}