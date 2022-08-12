import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  data:any;
  countryArray1:any;
  cityArray1:any;
  countryArray2:any;
  cityArray2:any;
  selectedCountry1 :string = ''
  selectedCountry2 :string = ''
  selectedCity1 :string = ''
  selectedCity2 :string = ''
  constructor(private _service:UploadService) { }

  ngOnInit(): void {
    this.countryData1();
    this.countryData2();
  }

  countryData1() {
    this._service.getCountryData().subscribe(response =>{
      this.countryArray1 = response;

    })

    console.log(this.countryArray1);
  }

  getCountryData1(event:any) {
    this.selectedCountry1 = event.target.value;
    console.log(this.selectedCountry1);
}
cityData1() {
  this._service.getCityData(this.selectedCountry1).subscribe(response => {
    this.cityArray1 = response;

  })
  console.log(this.cityArray1);
}
  countryData2() {
    this._service.getCountryData().subscribe(response =>{
      this.countryArray2 = response;

    })
    console.log(this.countryArray2);
  }
  getCountryData2(event:any) {
    this.selectedCountry2 = event.target.value;
    console.log(this.selectedCountry2);
}


getCityData1(event:any) {
    this.selectedCity1 = event.target.value
}

getCityData2(event:any) {
  this.selectedCity2 = event.target.value
}

  cityData2() {
    this._service.getCityData(this.selectedCountry2).subscribe(response => {
      this.cityArray2 = response;

    })
    console.log(this.cityArray2);
  }


getCompareData(country1:string, city1:string, country2:string, city2:string){
  this._service.getCompareData(country1, city1, country2, city2).subscribe({
    next: (response)=>{
      this.data=response
      console.log(response)
    }
    

  })
}

}
