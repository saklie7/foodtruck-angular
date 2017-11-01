import { Component, OnInit } from '@angular/core';
import { TruckService } from '../_services/truck.service';

import { Member } from '../_models/member.model';

@Component({
  selector: 'app-truck-regist',
  templateUrl: './truck-regist.component.html',
  styleUrls: ['./truck-regist.component.css']
})
export class TruckRegistComponent implements OnInit {

  name: string;
  open: string;
  close: string;
  address: string;
  comment: string;
  lat: number;
  lng: number;

  selectedFiles: FileList;
  currentFileUpload: File;

  //1
  session: string;
  member: Member;

  constructor(private truckService: TruckService) { }

  ngOnInit() {
    //2
    this.session = sessionStorage.getItem('member');
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(f) {
    // f.value.file = this.selectedFiles.item(0);
    //3
    if (this.session !== null) {
      this.member = JSON.parse(this.session);
    }

    f.value.file = null;
    console.log(f.value);
    // this.truckService.truckRegist(f.value.name, f.value.open, f.value.close, f.value.lat, f.value.lng, f.value.comment, f.value.file);
    this.truckService.truckRegist(f.value.name, f.value.open, f.value.close,
      f.value.lat, f.value.lng, f.value.comment, f.value.file, this.member.memail);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
