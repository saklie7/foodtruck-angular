import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {
  session: string;

  constructor() {
    this.session = sessionStorage.getItem('member');
  }

  ngOnInit() {
  }

}
