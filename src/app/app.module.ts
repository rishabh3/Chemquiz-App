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
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { RegisterComponent } from './register/register.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CookieService } from 'ngx-cookie-service';

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
    NotfoundComponent,
    RegisterComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LoginComponent,
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
          // canActivate: [AuthGuard]
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: 'quiz',
          component: QuizComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'periodictable',
          component: PeriodicQuizComponent,
          // canActivate: [AuthGuard]
        },
        {
          path: 'challenge',
          component: ChallengeComponent
        },
        {
          path: 'compound',
          component: CompoundComponent
        },
        {
          path: 'profile',
          component: ProfileComponent,
          // ßcanActivate: [AuthGuard]
        },
        {
          path: '**',
          component: NotfoundComponent
        }
      ]
    )
  ],
  providers: [AuthService, AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
