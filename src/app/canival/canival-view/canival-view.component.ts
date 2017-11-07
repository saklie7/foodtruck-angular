import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { CanivalService } from '../../_services/canival.service';

import { Canival } from '../../_models/canival.model';

@Component({
  selector: 'app-canival-view',
  templateUrl: './canival-view.component.html',
  styleUrls: ['./canival-view.component.css']
})
export class CanivalViewComponent implements OnInit {
  canival: Canival[];

  constructor(
    private canivalService: CanivalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCanivalsView();
  }

  // 축제 리스트 보여주는 메소드
  getCanivalsView() {
    this.canivalService.getCanivalsView().subscribe(res => {
      this.canival = res;
    });
  }

  // 특정 축제 정보 보여주는 메소드
  getCanivalDetail(cid: string) {
    this.router.navigate(["canival-detail", cid]);
  }
}
