import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CanivalService } from '../../_services/canival.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  cMember: string;

  click: boolean = false;
  selectedFiles: FileList;

  constructor(
    private canivalService: CanivalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      this.cId = res.json().cid;
      this.cTitle = res.json().ctitle;
      this.cSdate = res.json().csdate;
      this.cEdate = res.json().cedate;
      this.cContent = res.json().ccontent;
      this.cViewcount = res.json().cviewcnt;
      this.cImage = res.json().cimage;
    });
  }

  // 특정 축제 정보 삭제 메소드
  getDeleteCanival(cId) {
    this.canivalService.getDeleteCanival(cId).subscribe();
    this.router.navigate(['/canival-view']);
  }

  //수정 버튼, 수정 가능 양식으로 변환 해줌.
  updateButton() {
    this.click = !this.click;
  }

  // 특정 축제 정보 수정 메소드
  postUpdateCanival(f) {
    if (f.valid) {
      this.click = !this.click;
      f.value.cImage = this.selectedFiles.item(0);
      f.value.cId = this.cId;
      this.canivalService.postUpdateCanival(
        f.value.cId,
        f.value.cTitle,
        f.value.cContent,
        f.value.cSdate,
        f.value.cEdate,
        f.value.cImage,
      ).subscribe(res => {
        console.log("여기여기여기여기")
        // this.router.navigate(["canival-detail", res.json().cid]);
        this.getCanivalDetail(this.cId);
      });

    }
  }

  // 사진 선택
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // 이전글 이동 메소드
  preview(cId) {
    var key = parseInt(cId) - 1;
    this.getCanivalDetail(key);
  }

  // 다음글 이동 메소드
  next(cId) {
    var key = parseInt(cId) + 1;
    this.getCanivalDetail(key);
  }

}
