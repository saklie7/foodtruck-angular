import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { HotlistService } from '../_services/hotlist.service';

import { Hotlist } from '../_models/hotlist.model';
import { Truck } from '../_models/truck.model';
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
  message: string;

  constructor(private hotlistService: HotlistService, private http: Http, private router:Router) {
    var session = sessionStorage.getItem('member');
    if (session !== null) {
      this.member = JSON.parse(session);
    }
  }

  ngOnInit() {
    this.getHotlistDetail();
  }

  getHotlistDetail() {
    this.hotlistService.getHotlistDetail()
      .subscribe(result => {
        // console.log('hotlist detail='+result);
        this.hotlistDetail = result;
      });
  }

  onSubmit(f) {
    if (f.valid) {
      this.addHotlist(this.member.memail, f.value.htruck);
    }
  }

  addHotlist(hmember: string, htruck: string) {
    this.hotlistService.addHotlist(hmember, htruck)
      .subscribe(result => {
        this.message = result.herror;
      });
  }

  removeHotlist(hotlistdetail: HotlistDetail) {
    var hid = hotlistdetail.hid;
    console.log('hid='+hid);
    this.hotlistService.removeHotlist(hid)
      .subscribe(result => {
        // res.text();
        console.log('hotlist remove = '+ result);
        // this.router.navigate(['/favorites']);

      });
  }

}
