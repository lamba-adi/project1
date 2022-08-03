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
import { ReactiveFormsModule } from '@angular/forms';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications'
// import { ToastrModule } from 'ngx-toastr';


import { DataFormComponent } from './components/data-form/data-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AdminLogInComponent,
    DashboardComponent,
    RegistrationComponent,
    UserLogInComponent,
    MainwindowComponent,
    DataFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    // ToastrModule.forRoot()


    // ToasterModule.forRoot()
    // ToastrModule.forRoot({
    //   timeOut: 15000, // 15 seconds
    //   closeButton: true,
    //   progressBar: true,
    // }),

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
