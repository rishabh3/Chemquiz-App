import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PeriodicQuizComponent } from './periodic-quiz/periodic-quiz.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'periodic', component:PeriodicQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
