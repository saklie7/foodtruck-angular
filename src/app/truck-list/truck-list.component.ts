import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
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

  constructor(private truckService: TruckService) { }

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
}
