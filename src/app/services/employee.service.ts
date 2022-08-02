import { Injectable } from '@angular/core';
import { employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _HttpClient:HttpClient) { }

  getByEmail(email:string){

  }
}
