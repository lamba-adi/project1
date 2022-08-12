import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  countryArray:any;
  cityArray:any;
  selectedCountry1 :string = ''
  selectedCountry2 :string = ''
  constructor(private _service:UploadService) { }

  ngOnInit(): void {
    this.countryData1();
    this.countryData2();
  }

  countryData1() {
    this._service.getCountryData().subscribe(response =>{
      this.countryArray = response;

    })
    console.log(this.countryArray);
  }

  getCountryData1(event:any) {
    this.selectedCountry1 = event.target.value;
    console.log(this.selectedCountry1);
}
cityData1() {
  this._service.getCityData(this.selectedCountry1).subscribe(response => {
    console.log(response);

  })
  console.log(this.cityArray);
}
  countryData2() {
    this._service.getCountryData().subscribe(response =>{
      this.countryArray = response;

    })
    console.log(this.countryArray);
  }
  getCountryData2(event:any) {
    this.selectedCountry2 = event.target.value;
    console.log(this.selectedCountry2);
}




  cityData2() {
    this._service.getCityData(this.selectedCountry2).subscribe(response => {
      this.cityArray = response;

    })
    console.log(this.cityArray);
  }


}
