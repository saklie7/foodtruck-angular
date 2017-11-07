import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from '../_services/food.service';
import { Member } from '../_models/member.model';
import { Food } from '../_models/food.model';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input('tid') tid: string;
  @Input('tmember') tmember: string;

  foods: object[] = [];

  session: string;
  email: string;

  name: string;
  price: string;
  description: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private foodService: FoodService) {
    this.session = sessionStorage.getItem('member');
    console.log('top#component# constructor session=' + this.session);
    if(this.session !== null) {
      let member = JSON.parse(this.session) as Member;
      this.email = member.memail;
    }
  }

  ngOnInit() {
    this.foodService.getObservable().subscribe(
      messege => {
        if (messege.result = 'ok') {
          this.foodService.getAllfoods(this.tid).subscribe(res => {
            console.log(res)
            this.foods = res.json();
          });
        }
      })
    // this.foodServiceService.getAllfoods().subscribe(res => {
    //   console.log(res.json())
    //   this.foods = res.json();
    // });
    this.foodService.getAllfoods(this.tid).subscribe(res => {
      console.log('foodtruck=='+res.text());
      this.foods = res.json();
      this.check();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(f) {
    if(this.selectedFiles === undefined) {
      alert('사진을 등록하세요');
    } else {
      f.value.file = this.selectedFiles.item(0);
      console.log(f.value.file)
      console.log(f.value);
      this.foodService.foodRegist(f.value.name, f.value.price, f.value.description, f.value.file, this.tid);
    }
  }

  check() {
    //트럭아이디로 주인 이메일을 찾기, 로그인한 아이디와 동일한지 체크
    if(this.email === this.tmember) {
      return true;
    } else {
      return false;
    }
  }

  removeFood(food: Food) {
    console.log('fff='+food.fname);
    this.foodService.removeFood(food);
  }

  // removeHotlist(hotlistdetail: HotlistDetail) {
  //   this.hotlistService.removeHotlist(hotlistdetail)
  //     .subscribe(result => {
  //       console.log('hotlist remove = '+ result);
  //       this.message = result;
  //       this.getHotlistDetail();
  //     });
  // }

  // removeReview(review:Review) {
  //   this.reviewService.removeReview(review)
  //     .subscribe(result => {
  //       // this.message = result;
  //       alert(result);
  //       this.getMyReview();
  //     }
  //   );
  // }

}
