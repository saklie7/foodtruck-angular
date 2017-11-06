import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from '../_models/member.model';

import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  model: any = {};
  error = '';
  session: string;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  login(f) {
    this.authService.login(this.model.memail, this.model.mpassword)
      .then(result => {
        console.log('login log = '+ result)
        let member = JSON.parse(result) as Member;
        console.log('login member = '+member.memail)
        if(member.merror === null) {
          this.session = sessionStorage.getItem('member');
          this.authService.checkTruck(this.model.memail);
          this.router.navigate(['/']);
        } else {
          this.session = null;
          this.error = member.merror;
        }
        // if(result === "fail") {
        //   this.session = null;
        //   this.error = "login fail";
        // } else {
        //   // console.log("login component  success = " + result);
        //   this.session = sessionStorage.getItem('member');
        //   this.router.navigate(['/']);
        // }
      });

  }



}
