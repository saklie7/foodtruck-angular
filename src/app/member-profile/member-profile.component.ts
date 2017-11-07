import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

import { Member } from '../_models/member.model';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  private member: Member;

  constructor(
    private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('member')) {
      this.member = JSON.parse(sessionStorage.getItem('member'));
    }
    console.log(this.member);
  }

  pathToMain() {
    this.router.navigate(['main-home']);
  }

  memberModify(f) {
    if (f.valid) {
      console.log(f.value.mnickname);
    }
  }


}
