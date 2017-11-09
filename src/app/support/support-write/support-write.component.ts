import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SupportService } from '../../_services/support.service';

import{Member} from '../../_models/member.model'

@Component({
  selector: 'app-support-write',
  templateUrl: './support-write.component.html',
  styleUrls: ['./support-write.component.css']
})
export class SupportWriteComponent implements OnInit {
  session: string;
  member:Member;
  email: string;
  sid:string;


  constructor(
    private supportService: SupportService,
    private router: Router) { }

  ngOnInit() {
    this.session = sessionStorage.getItem('member');
    if(this.session !== null) {
      this.member = JSON.parse(this.session);
      this.email = this.member.memail;
    }
  }

  onSubmit(f) {
    console.log(f.value)
    this.supportService.addSupport(f.value, this.member);

    this.supportService.getObservable().subscribe(message=>{
      if(message.result=='ok'){
          this.supportService.getList();
          this.router.navigate(['/support'])
      }
    })
  }
}
