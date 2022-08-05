import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

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
    this._EmployeeService.loadCurrentAdmin();
    this._EmployeeService.loadCurrentUser();
    this.data=this._EmployeeService.data;
    console.log(this.data)
  }

  logout(){
    this._EmployeeService.removeUserToken();
    this._Router.navigateByUrl("/LogIn")
  }

  viewdropdownmenu(){
    this.dropdown=!this.dropdown;
  }
}
