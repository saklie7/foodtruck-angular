import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { ReviewService } from '../_services/review.service';

//npm install --save ngx-bar-rating 인스톨

import { Member } from '../_models/member.model';
import { Review } from '../_models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  member: Member;
  myReviews: Review[];

  message: string;

  constructor(private http: Http, private router:Router, private reviewService: ReviewService) {
    var session = sessionStorage.getItem('member');
    if (session !== null) {
      this.member = JSON.parse(session);
    }
  }

  ngOnInit() {
    this.getMyReview();
  }

  getMyReview() {
    this.reviewService.getMyReview()
      .subscribe(result => {
        // console.log('reviewService myReviews='+result);
        this.myReviews = result;
      });
  }

  onSubmit(f) {
    if (f.valid) {
      var r = f.value;
      this.addReview(r.comment, r.image, r.score, this.member.memail, r.truck);
    }
  }

  //실제로 리뷰를 등록할 때는 해당 트럭의 트럭정보에 가서 리뷰를 입력.
  //따라서 실제 서비스를 할 때 트럭아이디ㄴ는 아땋게 가져오나?
  addReview(comment:string, image:string, score:number, email:string, truck:string) {
    this.reviewService.addReview(comment, image, score, email, truck)
      .subscribe(res => {
        console.log('addReview = '+res);
          // this.message = res;
          this.getMyReview();
      });
  }

  removeReview(review:Review) {
    this.reviewService.removeReview(review)
      .subscribe(result => {
        // this.message = result;
        alert(result);
        this.getMyReview();
      }
    );
  }


}
