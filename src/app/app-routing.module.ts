import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminLogInComponent } from './components/admin-log-in/admin-log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLogInComponent } from './components/user-log-in/user-log-in.component';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';
import { CompareComponent } from './components/compare/compare.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'main' , component:MainwindowComponent, canActivate:[AuthGuard] },
  {path: '', redirectTo:'LogIn', pathMatch:'full'},
  {path: 'DashBoard' , component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'LogIn' , component:UserLogInComponent},
  {path: 'LogIn-Admin', component:AdminLogInComponent},
  {path: 'Register', component:RegistrationComponent},
  {path: 'compare', component:CompareComponent, canActivate:[AuthGuard]},
  {path: 'data-form', component:DataFormComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
