import { Injectable } from '@angular/core';
import { Login } from './employee';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  _jwtHelperService = new JwtHelperService();

  constructor(private _HttpClient:HttpClient) { }

  userLogin(usercredentials:Login) {

    return this._HttpClient.post("https://localhost:7033/api/Login/userLogin",{
      EmpEmail:usercredentials.EmpEmail,
      EmpPassword: usercredentials.EmpPassword  
    },
    {
      responseType:'text',
    }
    );
  }
  
  adminLogin(usercredentials:Login) {

    return this._HttpClient.post("https://localhost:7033/api/Login/adminLogin",{
      EmpEmail:usercredentials.EmpEmail,
      EmpPassword: usercredentials.EmpPassword  
    },
    {
      responseType:'text',
    }
    );
  }

  setUserToken(token:string){
    localStorage.setItem("user_access_token",token);
  }

  setAdminToken(token:string){
    localStorage.setItem("admin_access_token",token);
  }

  loadCurrentUser(){
    const token = localStorage.getItem("user_access_token");
    const userInfo = token !=null? this._jwtHelperService.decodeToken(token):null;
    const data = userInfo?{
      id:userInfo.id,
      firstName:userInfo.firstname,
      lastName: userInfo.lastname,
      email: userInfo.email
    }:null;
  }
  loadCurrentAdmin(){
    const token = localStorage.getItem("admin_access_token");
    const userInfo = token !=null? this._jwtHelperService.decodeToken(token):null;
  }

}
