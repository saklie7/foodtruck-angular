import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TruckService } from '../_services/truck.service';

import { Truck } from '../_models/truck.model';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  truck: Truck;

  tid: string;
  sub: any;

  currentFileUpload: File

  constructor(private route: ActivatedRoute, private truckService: TruckService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tid = params['tid'];
    });

    this.getTruckInfo(this.tid);
  }

  getTruckInfo(tid: string) {
    this.truckService.getTruckInfo(tid)
      .subscribe(result => {
        console.log('this.truck = ' + JSON.stringify(result));
        this.truck = result;
      });
  }
}
