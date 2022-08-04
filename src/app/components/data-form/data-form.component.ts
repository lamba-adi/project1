import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpEventType, HttpErrorResponse} from '@angular/common/http'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
