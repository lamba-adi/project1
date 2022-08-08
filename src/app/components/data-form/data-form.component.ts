import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpEventType, HttpErrorResponse} from '@angular/common/http';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl,FormGroup } from '@angular/forms';
// import { FileUploadService } from './file-upload.service';
// import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
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


  constructor(private http : HttpClient,private  _uploadService : UploadService) { }

  ngOnInit(): void {
  }

  public uploadData = (files:any) =>{
    if(files.length === 0){
      return;
    }
    let fileUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileUpload,fileUpload.name);


    this.http.post('https://localhost:7038/api/Upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  HousingForm = new FormGroup({
    // employeeId : new FormControl('', [Validators.required]),
    country : new FormControl(''),
    area : new FormControl(''),
    typeOfHouse : new FormControl(''),
    sizeOfHouse : new FormControl(''),
    costOfHouse  : new FormControl(''),
    rent  : new FormControl(''),
    rentTenure  : new FormControl('')
  });

  onSubmitHousingForm() {
    console.log(this.HousingForm.value)

    this._uploadService.uploadform([
      this.HousingForm.value.country,
      this.HousingForm.value.area,
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


  }

}
