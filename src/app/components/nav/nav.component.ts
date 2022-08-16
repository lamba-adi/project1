import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserLogInComponent } from '../user-log-in/user-log-in.component';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private _Router:Router, private _EmployeeService:EmployeeService) { }

  data=this._EmployeeService.data;

  dropdown:boolean=false;

  mobilemenu=true;

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
    Swal.fire({
      // title: 'Success!',
      text: 'Logout Successfully',
      icon: 'success',
      // confirmButtonText: 'Cool'
      width : '200',
      position : 'top-end',

      showConfirmButton : false,
      timer : 2000
    })
    this._Router.navigate(["/"]);
  }

  viewdropdownmenu(){
    this.dropdown=!this.dropdown;
  }
}
