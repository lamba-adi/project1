import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {

   }
   baseUrl = "https://localhost:7038/api/"
   registerUser(user : Array<String>) {
   return this.http.post(this.baseUrl + "User/CreateUser",{
    firstName:user[0],
    lastName:user[1],
    email:user[2],
    password:user[3]


   },{responseType: 'text'});
  }
}
