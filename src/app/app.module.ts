import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PeriodicQuizComponent } from './periodic-quiz/periodic-quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizComponent } from './quiz/quiz.component';
import { CompoundComponent } from './compound/compound.component';
import { ProfileComponent } from './profile/profile.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    PeriodicQuizComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    QuizComponent,
    CompoundComponent,
    ProfileComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'quiz',
          component: QuizComponent
        },
        {
          path: 'periodictable',
          component: PeriodicQuizComponent
        },
        {
          path: 'compound',
          component: CompoundComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: '**',
          component: NotfoundComponent
        }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
