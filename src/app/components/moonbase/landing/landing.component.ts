import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss', './../moonbase.component.scss', './../intro/intro.component.scss']
})
export class LandingComponent implements OnInit {

  static readonly routeName: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
