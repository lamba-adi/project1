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
import { JwtHelperService } from '@auth0/angular-jwt';

import { DataFormComponent } from './components/data-form/data-form.component';
import { HttpClient} from '@angular/common/http';
import { CompareComponent } from './components/compare/compare.component';

// import Swal from 'sweetalert2'

// import {FileUploadModule} from 'primeng/fileupload';




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
    DataFormComponent,
    CompareComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,


    // FileUploadModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
