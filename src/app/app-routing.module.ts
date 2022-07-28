import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLogInComponent } from './components/admin-log-in/admin-log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLogInComponent } from './components/user-log-in/user-log-in.component';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';

const routes: Routes = [
  {path: '' , component:MainwindowComponent},
  {path: 'DashBoard' , component:DashboardComponent},
  {path: 'LogIn-Admin' , component:UserLogInComponent},
  {path: 'LogIn', component:AdminLogInComponent},
  {path: 'Register', component:RegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
