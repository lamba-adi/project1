import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-user-log-in',
  templateUrl: './user-log-in.component.html',
  styleUrls: ['./user-log-in.component.css']
})
export class UserLogInComponent implements OnInit {

  loginForm = new FormGroup ({
    email : new FormControl(''),
    password : new FormControl('')
  })

onSubmitLoginForm() {
  console.log(this.loginForm.value);
}

  constructor() { }

  ngOnInit(): void {
  }

}
