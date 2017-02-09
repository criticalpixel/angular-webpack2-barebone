import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title:string = "Angular Webpack JIT/AOT - Barebone";

  	ngOnInit(): void {
  	}
}
