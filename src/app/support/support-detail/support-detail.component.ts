import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../_services/support.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Support } from '../../_models/support.model';

@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.component.html',
  styleUrls: ['./support-detail.component.css']
})
export class SupportDetailComponent implements OnInit {

  support:object;
  title:string;
  date:string;
  content:string;
  member:string;

  sid:string;
  sub:any;

  click: boolean=false;

  constructor(private supportService:SupportService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.sid = params['sid'];
    this.supportService.getDetail(this.sid).subscribe(res=>{
      console.log(res.json());
      this.title = res.json().stitle;
      this.date = res.json().sdate;
      this.content = res.json().scontent;
      this.member = res.json().smember;
    });
  });
  }

  //로그인한 사람과 글 작성자가 동일 인물인지 체크
  check() {
    let m = JSON.parse(sessionStorage.getItem('member'));
    if(this.member === m.memail) {
      console.log('check'+m.memail);
      return true;
    } else {
      return false;
    }
  }

  //업데이트 버튼을 누르면 수정가능하게 해줌.
  updateButton() {
    this.click = !this.click;
  }

  //업데이트할 때, 데이터 보냄.
  submitForm(f) {
    if(f.valid) {
      this.click = !this.click;
      this.updateSupport(f.value.sid, f.value.title, f.value.content);
    }
  }

  updateSupport(sid, stitle, scontent) {
    console.log(sid+","+ stitle +","+  scontent)
    this.supportService.updateSupport(sid, stitle, scontent);
  }
}
