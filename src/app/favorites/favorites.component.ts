import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { HotlistService } from '../_services/hotlist.service';

import { Hotlist } from '../_models/hotlist.model';
import { Member } from '../_models/member.model';
import { HotlistDetail } from '../_models/hotlistdetail.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  // hotlist: Hotlist[];
  hotlistDetail: HotlistDetail[];
  // trucks: Truck[];

  member: Member;
  session: string;
  errorMessage: string;
  message: string;

  constructor(private hotlistService: HotlistService, private http: Http, private router:Router) {
    this.session = sessionStorage.getItem('member');
  }

  ngOnInit() {
    this.getHotlistDetail();
  }

  getHotlistDetail() {
    if (this.session !== null) {
      this.member = JSON.parse(this.session);
    }
    this.hotlistService.getHotlistDetail()
      .subscribe(result => {
        // console.log('hotlist detail='+result);
        this.hotlistDetail = result;
      });
  }

  removeHotlist(hotlistdetail: HotlistDetail) {
    this.hotlistService.removeHotlist(hotlistdetail)
      .subscribe(result => {
        console.log('hotlist remove = '+ result);
        this.message = result;
        this.getHotlistDetail();
      });
  }

  getFoodTruck(tid: string) {
    console.log(tid);
    this.router.navigate(["truck-info", tid]);
  }

}
