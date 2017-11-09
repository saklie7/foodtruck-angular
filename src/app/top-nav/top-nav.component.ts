import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Member } from '../_models/member.model';
import { AuthenticationService } from '../_services/authentication.service';
import { TruckService } from '../_services/truck.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  session: string;
  member: Member;
  email: string;
  registype: number;
  check:string;
  tid: string;


  constructor(private authService: AuthenticationService, private router: Router, private truckService: TruckService) {
    this.session = sessionStorage.getItem('member');
    console.log('top#component# constructor session=' + this.session);
    if(this.session !== null) {
      let member = JSON.parse(this.session) as Member;
      this.email = member.memail;
      this.registype = member.mregistype;
      console.log('check='+this.check)
    }
  }

  ngOnInit() {
    // console.log('top#component# ngOnInit() session=' + this.session);
    //동적으로 top-nav의 session 적용
    console.log('top ngOnInit() work')
    this.authService.getObservable().subscribe(
      massege=>{
        if(massege.login='true'){
          this.session = sessionStorage.getItem('member');
          if(this.session !== null){
            let member = JSON.parse(this.session) as Member;
            // console.log('topnav='+member.memail);
            this.email = member.memail;
            this.registype = member.mregistype;
          }
        }
      }
    );
    this.authService.getObservable2().subscribe(
      message=>{
        if(message.check === '0') {
          this.check = message.check;
        } else {
          this.check = '1';
          this.tid =JSON.parse(message.check).tid;
          console.log(this.tid);
        }
    });
    // this.truckService.getObservable().subscribe(
    //   message => {
    //     console.log(message.check);
    //   }
    // );
    this.authService.checkTruck(this.email);
  }

  check2(){
    if(this.check === '0' && this.registype===2){
      return true;
    } else{
      return false;
    }
  }

  check3(){
    if(this.tid !== undefined){
      // console.log(this.tid)
      return true;
    } else{
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('member');
    this.session = null;
  }

}
