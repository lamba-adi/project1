import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule, HttpResponse, HttpStatusCode} from '@angular/common/http'
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';
// import { ToastrService } from 'ngx-toastr';





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


  constructor(private authService : AuthService, private service : NotificationsService){

  }
  registerForm = new FormGroup({
    firstName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]),
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
          this.onSuccess();
          console.log(res);
          // console.log(res)


        }
        else if(res == "AlreadyRegistered"){
          // this.displayMsg = "Account Already Exists: try Another email.";
          this.onError();
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
  onSuccess(){
    this.service.success('Success',"Account Created Successfully!",{
      position:['top','left'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar:true,

    })

  }
  onError()  {
    this.service.error('Error',"Account Already Exists: try Another email.",{
      position:['top'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar:true,
    })
  }




  ngOnInit(): void {

  }



}
