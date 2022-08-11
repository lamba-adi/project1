import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  editInfo:any;
  entryform:any;

  showPopupForm:boolean=false;

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

  closePopupForm(){
    this.showPopupForm=false
  }

  openEditForm(entry:number){
    this._uploadService.getSingleData(entry).subscribe(response =>{
      this.editInfo=response;
      this.entryform= new FormGroup({
        // employeeId : new FormControl('', [Validators.required]),
        entryID : new FormControl(this.editInfo.result.entryID),
        empID: new FormControl(this.editInfo.result.empID),
        organisation: new FormControl(this.editInfo.result.organisation),
        country : new FormControl(this.editInfo.result.country),
        city : new FormControl(this.editInfo.result.city),
        typeOfHouse : new FormControl(this.editInfo.result.typeOfHouse),
        sizeOfHouse : new FormControl(this.editInfo.result.sizeOfHouse),
        costOfHouse  : new FormControl(this.editInfo.result.costOfHouse),
        rent  : new FormControl(this.editInfo.result.rent),
        tenure  : new FormControl(this.editInfo.result.tenure)
      });
      console.log(response);
      console.log(this.entryform);
    })
    this.showPopupForm=true;

  }
  onEditSubmit(){
    this._uploadService.updateAndPost(this.editInfo.result.entryID, this.entryform.value).subscribe({next :(response) =>{
      console.log(response);
    }});
    this.showPopupForm=false;
  }

  ngOnInit(): void {
    this.getdata();
  }

}
