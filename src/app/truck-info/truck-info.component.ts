import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TruckService } from '../_services/truck.service';
import { ReviewService } from '../_services/review.service';

import { Truck } from '../_models/truck.model';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  // truck: Truck;
  timage: string;
  tname: string;
  tcomment: string;
  tavg: string;
  topen: string;
  tclose: string;
  taddress: string;
  tmember:string;


  tid: string;
  sub: any;

  currentFileUpload: File

  constructor(
    private route: ActivatedRoute,
    private truckService: TruckService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.tid = params['tid'];
    });

    this.reviewService.getObservable().subscribe(
      message => {
        if(message.result === 'ok') {
          this.getTruckInfo(this.tid);
        }
      });

    this.getTruckInfo(this.tid);
  }

  getTruckInfo(tid: string) {
    this.truckService.getTruckInfo(tid)
      .subscribe(result => {
        console.log('this.truck = ' + JSON.stringify(result));
        this.timage = result.timage;
        this.tname = result.tname;
        this.tcomment = result.tcomment;
        this.tavg = result.tavg;
        this.topen = result.topen;
        this.tclose = result.tclose;
        this.taddress = result.taddress;
        this.tmember = result.tmember;
      });
  }
}
