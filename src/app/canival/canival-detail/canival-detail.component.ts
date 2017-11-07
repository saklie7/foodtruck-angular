import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CanivalService } from '../../_services/canival.service';

@Component({
  selector: 'app-canival-detail',
  templateUrl: './canival-detail.component.html',
  styleUrls: ['./canival-detail.component.css']
})
export class CanivalDetailComponent implements OnInit {
  sub: any;
  length: number;

  // 상세보기에 필요한 모든 속성들
  cId: String;
  cTitle: string;
  cSdate: string;
  cEdate: string;
  cContent: string;
  cViewcount: number;
  cImage: string;

  constructor(
    private canivalService: CanivalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // 축제글 배열의 길이 뽑아서 변수에 저장 --> 다음글 메소드에 필요
    this.canivalService.getCanivalsView().subscribe(res => {
      this.length = res.length;
    });

    this.sub = this.activatedRoute.params.subscribe(params => {
      this.cId = params['cid'];
      this.getCanivalDetail(this.cId);
    });
  }

  // 특정 축제 정보 보여주는 메소드
  getCanivalDetail(cId) {
    this.canivalService.getCanivalDetail(cId).subscribe(res => {
      console.log(res.json())
      this.cId = res.json().cId;
      this.cTitle = res.json().ctitle;
      this.cSdate = res.json().csdate;
      this.cEdate = res.json().cedate;
      this.cContent = res.json().ccontent;
      this.cViewcount = res.json().cviewcnt;
      this.cImage = res.json().cimage;
    });
  }

  // 다음글 메소드
  next(f) {
    var key = parseInt(f) + 1;
    console.log(key)
    this.getCanivalDetail(key);
  }

  // 이전글 메소드
  preview(f) {
    var key = parseInt(f) - 1;
    this.getCanivalDetail(key);
  }
}
