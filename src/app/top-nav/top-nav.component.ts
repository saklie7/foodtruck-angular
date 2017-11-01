import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Member } from '../_models/member.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  session: string;
  member: Member;
  email: string;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.session = sessionStorage.getItem('member');
    console.log('top#component# constructor session=' + this.session);
    // if(this.session !== null){
    //   this.member = JSON.parse(this.session);
    //   this.email = this.member.memail;
    // }
    // this.email = this.member.memail;
  }

  ngOnInit() {
    // console.log('top#component# ngOnInit() session=' + this.session);
    //동적으로 top-nav의 session 적용
    this.authService.getObservable().subscribe(
      massege=>{
        if(massege.login='true'){
          this.session = sessionStorage.getItem('member');
          if(this.session !== null){
            let member = JSON.parse(this.session) as Member;
            console.log('topnav='+member.memail);
            this.email = member.memail;
          }
        }
      }
    );
  }

  logout() {
    sessionStorage.removeItem('member');
    this.session = null;
    // location.reload();
  }

}
