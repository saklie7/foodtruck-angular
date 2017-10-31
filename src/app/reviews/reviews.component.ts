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
        // console.log('hotlist detail='+result);
        this.myReviews = result;
      });
  }

  onSubmit(f) {
    if (f.valid) {
      // this.addHotlist(this.member.memail, f.value.htruck);
    }
  }



}
