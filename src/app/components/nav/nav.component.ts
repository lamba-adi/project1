import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserLogInComponent } from '../user-log-in/user-log-in.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _Router:Router, private _EmployeeService:EmployeeService) { }

  data=this._EmployeeService.data;

  dropdown:boolean=false;


  ngOnInit(): void {
    if(localStorage.getItem("admin_access_token")!=null)
      this._EmployeeService.loadCurrentAdmin();
    else
      this._EmployeeService.loadCurrentUser();
    this.data=this._EmployeeService.data;
    console.log(this.data)
  }

  logout(){
    this._EmployeeService.removeUserToken();
    this.data=null;
    this._Router.navigate(["/"]);
  }

  viewdropdownmenu(){
    this.dropdown=!this.dropdown;
  }
}
