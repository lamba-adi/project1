import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule, HttpResponse, HttpStatusCode} from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {



  displayMsg : string = '';
  repeatPass : string = 'none'
  isAccountCreated : boolean = false;
  message:any = '';


  // private notifier: NotifierService;


  constructor(private authService : AuthService, private service : NotificationsService, private _Router:Router){

  }
  registerForm = new FormGroup({
    firstName : new FormControl('',
    [Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z].*")]
    ),
    lastName: new FormControl('',[Validators.required,Validators.minLength(2), Validators.pattern('[a-zA-Z].*')]),
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(15)]),
    confirmPassword  : new FormControl('')
  })



  get FirstName() : FormControl{
    return this.registerForm.get("firstName") as FormControl;
  }
  get LastName() : FormControl{
    return this.registerForm.get("lastName") as FormControl;
  }
  get Email() : FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get PWD():FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get CPWD():FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
  onSubmitRegisterForm() {
    // TODO: Use EventEmitter with form value
    if(this.PWD.value ==  this.CPWD.value){
      // console.log(this.registerForm.valid);

      this.authService.registerUser([
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.email,
        this.registerForm.value.password
      ]).subscribe(res => {

        if(res == "Success") {
          // this.displayMsg = "Account Created Successfully!";
          Swal.fire({
            // title: 'Success!',
            text: 'Registered Successfully',
            icon: 'success',
            // confirmButtonText: 'Cool'
            width : '200',

            showConfirmButton : false,
            timer : 2000
          })
          setTimeout(() => {
            // window.location.reload();
            this._Router.navigate(["/LogIn"])
          }, 1000)
          // console.log(res);

          // console.log(res)


        }
        else if(res == "AlreadyRegistered"){
          Swal.fire({
            // title: 'Error!',
            text: 'Already Registered',
            icon: 'error',
            // confirmButtonText: 'Cool'
            width : '200',
            showConfirmButton : false,
            timer : 1500
          })
          // this.displayMsg = "Account Already Exists: try Another email.";


        }
        else {
          this.displayMsg = "Something went Wrong.";
          this.isAccountCreated = false;
        }
      })
      this.registerForm.reset();
    }

    else {
      this.repeatPass = 'inline';

    }

  }


  // msg:string='welcome';





  ngOnInit(): void {

  }



}
