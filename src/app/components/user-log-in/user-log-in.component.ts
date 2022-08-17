import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Login } from 'src/app/services/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import Swal from 'sweetalert2';
import { endWith } from 'rxjs';


@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {

  usercred:Login=new Login('','');
  constructor(private _EmployeeServices:EmployeeService, private _Router:Router,private service : NotificationsService) { }

  // onError(msg:string)  {
  //   this.service.error('Error',msg,{
  //     position:['top','left'],
  //     timeOut: 2000,
  //     animate: 'fade',
  //     showProgressBar:true,
  //   })
  // }

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

      if(response=="failure"){
        // this.onError("Invalid Credentials")
        Swal.fire({
          // title: 'Error!',
          text: 'Invalid Credentials',
          icon: 'error',
          position : 'top-end',
          width : '200',
          showConfirmButton : false,
          timer : 2000
        })
        // alert("invalid Email/Password")
        this.loginForm.reset();
      }
      else{


        this._EmployeeServices.setUserToken(response);
        Swal.fire({
          // title: 'Success!',
          text: 'Login Successfully',
          icon: 'success',
          // confirmButtonText: 'Cool'
          position : 'top',
          width : '200',
          showConfirmButton : false,

          // height : "1rem",
          timer : 1500
          // timer : 1200
        })
        setTimeout(() => {
          window.location.reload();
          this._Router.navigate(['/main']);
        }, 1000)


      }

    },
    (error)=>{
      console.log(error)
    }
  )
}
get Email() : FormControl{
  return this.loginForm.get("email") as FormControl;
}


  ngOnInit(): void {
    if(localStorage.getItem("admin_access_token")!=null)
      this._EmployeeServices.loadCurrentAdmin();
    else
      this._EmployeeServices.loadCurrentUser();
    this.data=this._EmployeeServices.data;
    if(this.data!=null)
      this._Router.navigate(['/main']);
  }




}
