import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { ReviewService } from '../_services/review.service';

import { Member } from '../_models/member.model';
import { Review } from '../_models/review.model';

@Component({
  selector: 'app-truck-reviews',
  templateUrl: './truck-reviews.component.html',
  styleUrls: ['./truck-reviews.component.css']
})

//나의리뷰와 같은 리뷰이기 때문에 따로 service를 만들지 않고 같은 reviewService를 사용.
export class TruckReviewsComponent implements OnInit {
  //truck-info에서 tid값 가져오기
  @Input('tid') tid : string;

  member: Member;
  truckReviews: Review[];

  message: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  //pagination
  p: number = 1;

  constructor(private http: Http, private router:Router, private reviewService: ReviewService) {
    //로그인한 회원의 정보 구하기
    var session = sessionStorage.getItem('member');
    if (session !== null) {
      this.member = JSON.parse(session) as Member;
    }
  }

  ngOnInit() {
    this.getTruckReview(this.tid);
    this.reviewService.getObservable().subscribe(
      messege => {
        if (messege.result = 'ok') {
          this.reviewService.getTruckReview(this.tid).subscribe(res => {
            console.log(res)
            this.truckReviews = res;
          });
        }
      })
  }

  //사진올리기
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(f) {
    if(this.selectedFiles === undefined){
        this.addReview2(f.value.comment, f.value.score, this.member.memail, this.tid);
    } else {
      f.value.image = this.selectedFiles.item(0);
      console.log(f.value);
      this.addReview(f.value.comment, f.value.image, f.value.score, this.member.memail, this.tid);
    }
  }

  addReview(comment:string, image:File, score:string, email:string, truck:string) {
    this.reviewService.addReview(comment, image, score, email, truck)
  }

  addReview2(comment:string, score:string, email:string, truck:string) {
    this.reviewService.addReview2(comment, score, email, truck)
      .subscribe(res => {
        console.log('addReview = '+res);
        // this.message = res;
        alert(res);
        this.getTruckReview(truck);
      });
  }

  removeReview(review:Review) {
    this.reviewService.removeReview(review)
      .subscribe(result => {
        // this.message = result;
        alert(result);
        this.getTruckReview(this.tid);
      }
    );
  }


  getTruckReview(tid:string) {
    this.reviewService.getTruckReview(tid)
      .subscribe(result => {
        result as Review[];
        result.map(res => {
          if(res.rerror !== null){
            this.message = res.rerror;
          } else {
            this.truckReviews = result;
          }
        });
      });
  }

}
