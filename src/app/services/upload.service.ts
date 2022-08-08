import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private http : HttpClient) {

  }
  baseUrl = "https://localhost:7038/api/"
  uploadform(upload : Array<String>) {
  return this.http.post(this.baseUrl + "UploadData/UploadData",{
   country:upload[0],
   area:upload[1],
   typeOfHouse:upload[2],
   sizeOfHouse:upload[3],
   costOfHouse:upload[4],
   rent:upload[5],
  rentTenure:upload[6]



  },{responseType: 'text'});
 }
}
