import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {SupportService} from '../_services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  supports: object[] = [];

  constructor(private supportService: SupportService,  private router:Router) { }

  ngOnInit() {
    this.supportService.getList().subscribe(res => {
      console.log(res.json());
      this.supports = res.json();
    });
  }
}
