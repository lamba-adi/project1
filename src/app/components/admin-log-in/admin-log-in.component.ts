import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Login } from 'src/app/services/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

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
      if(response=="failure"){

      Swal.fire({
        // title: 'Success!',
        text: 'Invalid Credentials',
        icon: 'error',
        // confirmButtonText: 'Cool'
        showConfirmButton : false,
        position:'top-end',
        width : 200,
        timer : 1500
        // timer : 1200
      })
      this.adminForm.reset();
    }
        // alert("invalid Email/Password")
      else
      {
        this._EmployeeServices.setAdminToken(response);

        Swal.fire({
          // title: 'Success!',
          text: 'Login Successfully',
          icon: 'success',
          // confirmButtonText: 'Cool'
          showConfirmButton : false,
          position:'top-end',
        width : 200,
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
  return this.adminForm.get("email") as FormControl;
}

  ngOnInit(): void {
    this._EmployeeServices.loadCurrentAdmin();
    this.data=this._EmployeeServices.data;
    if(this.data!=null)
    this._Router.navigate(['/main']);
  }

}
