import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _employeeService:EmployeeService, private _uploadService:UploadService) { }

  user=this._employeeService.data;

  data: any;

  getdata(){
    this._uploadService.getDataforAdmin().subscribe(response =>{
      this.data=response;
      console.log(response);
    });
    console.log(this.data);
  }

  approveUserData(entry:number){
    console.log(entry)
    this._uploadService.approvedata(entry).subscribe(response =>{
      this.data = this.data.filter(
        (u:any) => u.entryID !== entry
      );
    });
  }

  rejectUserData(entry:number){
    this._uploadService.rejectdata(entry).subscribe(response =>{
      this.data = this.data.filter(
        (u:any) => u.entryID !== entry
      );
    });

  }

  ngOnInit(): void {
    this.getdata();
  }

}
