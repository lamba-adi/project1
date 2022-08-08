import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Login } from 'src/app/services/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {

  usercred:Login=new Login('','');
  constructor(private _EmployeeServices:EmployeeService, private _Router:Router) { }

  data=this._EmployeeServices.data;

  loginForm = new FormGroup ({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

onSubmitLoginForm() {
  this.usercred.EmpEmail=this.loginForm.controls['email'].value;
  this.usercred.EmpPassword=this.loginForm.controls['password'].value;

  this._EmployeeServices.userLogin(this.usercred).subscribe(
    (response)=>{
      if(response=="failure")
        alert("invalid Email/Password")
        
      else{
        this._EmployeeServices.setUserToken(response);
        window.location.reload();
        this._Router.navigate(['/main']);
      }
        
    },
    (error)=>{
      console.log(error)
    }
  )
}

get f(){
    return this.loginForm.controls;
  }
  

  ngOnInit(): void {
    this._EmployeeServices.loadCurrentUser();
    this.data=this._EmployeeServices.data;
    if(this.data!=null)
      this._Router.navigate(['/main']);
  }

}
