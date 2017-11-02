import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from '../_models/member.model';
import { MemberService } from '../_services/member.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.css']
})
export class JoinPageComponent implements OnInit {
  model: any = {};
  member: Member;
  errorMessage: string;

  constructor(private memberService: MemberService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f) {
    if (f.valid) {
      var member = f.value;
      this.addMember(member.email, member.password, member.nickname, member.registype)
    }
  }

  addMember(email: string, password: string, nickname: string, registype:number) {
    console.log('registype='+registype)
    this.memberService.addMember(email, password, nickname, registype)
      .subscribe(res => {
        let member = res;
        if(member.merror !== null) {
          this.errorMessage = member.merror;
          console.log(this.errorMessage);
        } else {
          this.router.navigate(['/login-page']);
        }
      }
    );
  }
}
