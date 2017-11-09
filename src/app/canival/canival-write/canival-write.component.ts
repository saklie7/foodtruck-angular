import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanivalService } from '../../_services/canival.service';

import { Member } from '../../_models/member.model'

@Component({
  selector: 'app-canival-write',
  templateUrl: './canival-write.component.html',
  styleUrls: ['./canival-write.component.css']
})
export class CanivalWriteComponent implements OnInit {
  session: string;
  member: Member;
  email: string;

  cTitle: string;
  cContent: string;
  cSdate: string;
  cEdate: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
    private canivalService: CanivalService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(f) {
    if (this.selectedFiles == undefined) {
      alert("사진을 첨부해 주십시오.");
    }
    else {
      f.value.cImage = this.selectedFiles.item(0);
      this.canivalService.postAddCanival(
        f.value.cTitle,
        f.value.cContent,
        f.value.cSdate,
        f.value.cEdate,
        f.value.cImage,
      ).subscribe(res => {
        this.router.navigate(["canival-detail", res.json().cid]);
      });
    }
  }
}
