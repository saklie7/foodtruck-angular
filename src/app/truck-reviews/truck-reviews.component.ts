import { Component, OnInit } from '@angular/core';
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
  model: any = {};
  member: Member;
  myReviews: Review[];

  message: string;

  constructor(private http: Http, private router:Router, private reviewService: ReviewService) {
    var session = sessionStorage.getItem('member');
    if (session !== null) {
      this.member = JSON.parse(session) as Member;
    }
  }

  ngOnInit() {
    this.getTruckReview();
  }

  getTruckReview() {
    this.reviewService.getTruckReview()
      .subscribe(result => {
        // console.log('reviewService myReviews='+result);
        this.myReviews = result;
      });
  }

  onSubmit(f) {
    if(f.valid) {
      this.addReview(this.model.comment, this.model.image, this.model.score, this.member.memail, this.model.truck);
    }
  }

  addReview(comment:string, image:string, score:number, email:string, truck:string) {
    this.reviewService.addReview(comment, image, score, email, truck)
      .subscribe(res => {
        console.log('addReview = '+res);
          // this.message = res;
          alert(res);
          this.getTruckReview();
      });
  }

}
