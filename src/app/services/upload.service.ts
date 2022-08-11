import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private http : HttpClient, private _employeeService:EmployeeService) {

  }
  baseUrl = "https://localhost:7038/api/"
  uploadform(upload : Array<String>) {
  return this.http.post(this.baseUrl + "UploadData/UploadData",{
   EmpID:this._employeeService.data.id,
   Organisation: "org1",
   Country:upload[0],
   City:upload[1],
   TypeOfHouse:upload[2],
   SizeOfHouse:upload[3],
   CostOfHouse:upload[4],
   Rent:upload[5],
  Tenure:upload[6]



  },{responseType: 'text'});
 }

 getDataforAdmin(){
   return this.http.get(this.baseUrl+"UploadData/approvaldata");
 }

 approvedata(entryid:number){
  return this.http.post(this.baseUrl+"UploadData/Approvedata?entryID="+entryid,
    {
      responseType:'text'
    })
 }
 rejectdata(entryid:number){
  return this.http.delete(this.baseUrl+"UploadData/RejectData?entryID="+entryid,
    {
      responseType:'text'
    })
 }


 getDataFormCompare() {
  return this.http.get(this.baseUrl+"UploadData/Approvedata");
 }
}
