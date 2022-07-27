import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  employee: any[]=[
    {
      admnno:12314,org:"Student1",country:"India",area:"Delhi",costOfHouse:13512,typeOfHouse:"2BHK",rent:200,tenure:"6 months"
    },
    {
      admnno:123123,org:"Student2",country:"India",area:"Mumbai",costOfHouse:123512,typeOfHouse:"2BHK",rent:200,tenure:"6 months"
    },
    {
      admnno:123124,org:"Student3",country:"India",area:"Delhi",costOfHouse:123123,typeOfHouse:"2BHK",rent:100,tenure:"6 months"
    },
    {
      admnno:123125,org:"Student4",country:"India",area:"Mumbai",costOfHouse:22134,typeOfHouse:"2BHK",rent:800,tenure:"6 months"
    },
    {
      admnno:123126,org:"Student5",country:"India",area:"Delhi",costOfHouse:23423424,typeOfHouse:"2BHK",rent:1200,tenure:"6 months"
    }
  ]
  ngOnInit(): void {
  }

}
