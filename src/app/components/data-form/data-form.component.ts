import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
// import { FileUploadService } from './file-upload.service';
// import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})



export class DataFormComponent implements OnInit {
 public progress : number = 0;
 public message : string = '';

  // files : File = null;
  files : any[] = []
  @Output() public onUploadFinished = new EventEmitter();


  constructor(private http : HttpClient,private  _uploadService : UploadService, private _employeeService:EmployeeService) { }

  user=this._employeeService.data;

  approvedata:any;

  approveddata:any;

  approvedatalength:number=0;
  
  approveddatalength:number=0;

  isopening :boolean= false;

  ngOnInit(): void {
    console.log(this.user)
    this.getsingleuserdata()
  }

  public uploadData = (files:any) =>{
    if(files.length === 0){
      return;
    }
    this.isopening=true;
    let fileUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileUpload,fileUpload.name);
    formData.append('ID',this.user.id);


    this.http.post('https://localhost:7038/api/UploadData/uploadFile',formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          Swal.fire({
            // title: 'Success!',
            text: 'Uploaded Successfully',
            icon: 'success',
            // confirmButtonText: 'Cool'
            position : 'top',
            width : '200',
            showConfirmButton : false,

            // height : "1rem",
            timer : 1500
            // timer : 1200
          })
          this.onUploadFinished.emit(event.body);
          this.isopening=false;
          this.getsingleuserdata();
          console.log(event);
          Swal.fire({
            // title: 'Error!',
            text: 'Your File is Uploaded Successfully',
            icon: 'success',
            position : 'bottom-end',
            width : '400',
            showConfirmButton : false,
            timer : 2000
          })
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  HousingForm = new FormGroup({
    // employeeId : new FormControl('', [Validators.required]),
    Empid:new FormControl(''),
    country : new FormControl('',
    [Validators.required,
      Validators.minLength(3)]),
    city : new FormControl('',
    [Validators.required,
      Validators.minLength(3)]),
    typeOfHouse : new FormControl('',
    Validators.required),
    sizeOfHouse : new FormControl('', Validators.required),
    costOfHouse  : new FormControl('',Validators.required),
    rent  : new FormControl('', Validators.required),
    rentTenure  : new FormControl('', Validators.required)
  });

  //validators
  get Country() : FormControl{
    return this.HousingForm.get("country") as FormControl;
  }
  get City() : FormControl{
    return this.HousingForm.get("city") as FormControl;
  }
  get TypeOFHouse() : FormControl{
    return this.HousingForm.get("typeOfHouse") as FormControl;
  }
  get SizeOfHouse() : FormControl{
    return this.HousingForm.get("sizeOfHouse") as FormControl;
  }
  get CostOfHouse() : FormControl{
    return this.HousingForm.get("costOfHouse") as FormControl;
  }
  get Rent() : FormControl{
    return this.HousingForm.get("rent") as FormControl;
  }
  get Tenure() : FormControl{
    return this.HousingForm.get("rentTenure") as FormControl;
  }


  onSubmitHousingForm() {
    console.log(this.HousingForm.value)

    this._uploadService.uploadform([

      this.HousingForm.value.country,
      this.HousingForm.value.city,
      this.HousingForm.value.typeOfHouse,
      this.HousingForm.value.sizeOfHouse,
      this.HousingForm.value.costOfHouse,
      this.HousingForm.value.rent,
      this.HousingForm.value.rentTenure
    ]).subscribe(res =>{
      if(res == "Success") {
        // this.displayMsg = "Account Created Successfully!";
        
        console.log(res);
        // console.log(res)


      }
    })
    this.HousingForm.reset()
    this.getsingleuserdata()

  }


  getsingleuserdata(){
    this._uploadService.getSingleEmpApprovalData(this.user.id).subscribe(response =>{
      this.approvedata=response;
      this.approvedatalength=Object.keys(this.approvedata).length;
      
    });
    

    this._uploadService.getSingleEmpApprovedData(this.user.id).subscribe(response =>{
      this.approveddata=response;
      this.approveddatalength=Object.keys(this.approveddata).length;
      console.log(this.approveddata)
    });

  }

}
