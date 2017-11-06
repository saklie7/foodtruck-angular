import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { TruckService } from '../_services/truck.service'

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {

  trucks: object[] = [
  ];

  currentFileUpload: File

  constructor(
    private truckService: TruckService,
    private router: Router) { }

  ngOnInit() {
    this.truckService.truckgetAll().subscribe(res => {
      console.log(res.json());
      this.trucks = res.json()
    });
  }

  search(f) {
    console.log(f.value.key)
    this.truckService.keyFind(f.value.key).subscribe(res => {
      console.log(res.json());
      // this.trucks=res.json();
    });
  }

  getFoodTruck(tid: string) {
    console.log(tid);
    this.router.navigate(["truck-info", tid]);
  }
}
