import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = new FormGroup({
    firstName : new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
    confirmPassword  : new FormControl('')
  })
  get f(){
    return this.registerForm.controls;
  }
  onSubmitForm() {
    // TODO: Use EventEmitter with form value
    console.log(this.registerForm.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
