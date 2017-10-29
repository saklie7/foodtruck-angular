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
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
      this.session = sessionStorage.getItem('member');
      // this.session = this.authService.isLoggedIn(sessionStorage.getItem('member'));
      console.log('constructor='+this.isLoggedIn$);
  }

  ngOnInit() {
    console.log('nav # ngOnInit # sessionStorage=' + sessionStorage.getItem("member"));
    this.authService.isLoggedIn()
      .subscribe(result => {
        this.isLoggedIn$ = result;
        console.log('result top::'+result);
      });
    console.log('ngOnInit()='+this.isLoggedIn$);
  }

  logout() {
    this.authService.logout();
    // this.authService.logout()
    // .subscribe(success => {
    //   sessionStorage.removeItem("member");
    //   this.session = null;
    // });
  }

}
