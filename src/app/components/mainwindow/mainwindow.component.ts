import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.css']
})
export class MainwindowComponent implements OnInit {

  constructor(private _employeeService:EmployeeService) { }

  data:any;
  ngOnInit(): void {
    this.data=this._employeeService.data;
  }

}
