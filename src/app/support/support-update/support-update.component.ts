import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../_services/support.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Support } from '../../_models/support.model';

@Component({
  selector: 'app-support-update',
  templateUrl: './support-update.component.html',
  styleUrls: ['./support-update.component.css']
})
export class SupportUpdateComponent implements OnInit {

  support: object;
  title: string;
  date: string;
  content: string;
  member: string;

  sid: string;
  sub: any;

  click: boolean = false;

  constructor(private supportService: SupportService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.sid = params['sid'];
    });
    this.supportService.getDetail(this.sid).subscribe(res => {
      console.log(res.json());
      this.title = res.json().stitle;
      this.date = res.json().sdate;
      this.content = res.json().scontent;
      this.member = res.json().smember;
    });

  }

  //업데이트할 때, 데이터 보냄.
  onSubmit(f) {
    console.log(f.value)
    if (f.valid) {
      this.updateSupport(f.value.sid, f.value.title, f.value.content);
    }
  }

  updateSupport(sid, stitle, scontent) {
    console.log(sid + "," + stitle + "," + scontent)
    this.supportService.updateSupport(sid, stitle, scontent);
    this.router.navigate(['/support-detail', sid]);
  }

}
