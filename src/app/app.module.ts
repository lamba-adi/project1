import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLogInComponent } from './components/admin-log-in/admin-log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLogInComponent } from './components/user-log-in/user-log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AdminLogInComponent,
    DashboardComponent,
    RegistrationComponent,
    UserLogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
