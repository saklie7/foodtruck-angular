import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Review } from '../_models/review.model';
import { Member } from '../_models/member.model';


@Injectable()
export class ReviewService {

  private reviewUrl: string = "http://localhost:8080/reviews";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private session: string;
  private member: Member;


  constructor(private http: Http) {
    this.session = sessionStorage.getItem('member');
    if (this.session !== null) {
      this.member = JSON.parse(this.session);
    }
    console.log('review service # constructor # session =' + this.session);
  }

  //내가 등록한 리뷰를 가져온다.
  getMyReview(): Observable<Review[]> {
    var email = this.member.memail;
    var url = `${this.reviewUrl}/member/${email}`;
    console.log('review url='+url);
    return this.http.get(url)
      .map(this.extractData)
      ._catch(this.handleError);
  }

  private extractDataForObject(res: Response) {
    let json = res.text();
    console.log('review service=' + json);
    json = JSON.parse(json);
    return json || {};
  }

  private extractData(res: Response) {
    let json = res.text();
    console.log('review service=' + json);
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }

}
