import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Login } from 'src/app/services/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.css']
})
export class AdminLogInComponent implements OnInit {

  

  admincred:Login=new Login('','');
  constructor(private _EmployeeServices:EmployeeService, private _Router:Router) { }

  data= this._EmployeeServices.data;

  adminForm = new FormGroup ({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

onSubmitLoginForm() {
  this.admincred.EmpEmail=this.adminForm.controls['email'].value;
  this.admincred.EmpPassword=this.adminForm.controls['password'].value;
  this._EmployeeServices.adminLogin(this.admincred).subscribe(
    (response)=>{
      if(response=="failure")
        alert("invalid Email/Password")        
      else
      {
        this._EmployeeServices.setAdminToken(response);
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
    return this.adminForm.controls;
  }

  ngOnInit(): void {
    this._EmployeeServices.loadCurrentAdmin();
    this.data=this._EmployeeServices.data;
    if(this.data!=null)
    this._Router.navigate(['/main']);
  }

}
