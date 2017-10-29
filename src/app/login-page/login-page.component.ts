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
      .subscribe(result => {
        if (result.merror) {
          console.log('result=' + result.merror)
          this.error = result.merror;
        } else {
          // alert('login success, go to home');
          // localStorage.setItem('member',result.memail);
          sessionStorage.setItem('member', JSON.stringify(result));
          this.session = sessionStorage.getItem('member');
          this.authService.isLoggedIn()
            .subscribe(result => {
              console.log('ressult:::::'+result);
            });
          this.router.navigate(['/']);
        }
      });
  }
}
