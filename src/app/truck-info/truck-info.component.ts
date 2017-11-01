import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.css']
})
export class TruckInfoComponent implements OnInit {
  name:string;
  open:string;
  close:string;
  address:string;

  id: number;
  private sub: any;

  currentFileUpload: File

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.name='푸드트럭';
    this.open="오픈시간";
    this.close="닫는시간";
    this.address="주소";

    this.sub = this.route.params.subscribe(params => {
       this.id = +params['tid'];
    });
  }
}
