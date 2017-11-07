import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Review } from '../_models/review.model';
import { Member } from '../_models/member.model';


@Injectable()
export class ReviewService {
  private subject = new Subject<any>();

  private reviewUrl: string = "http://localhost:8080/reviews";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private session: string;
  private member: Member;


  constructor(private http: Http) {
    // console.log('언제실행?')
    this.session = sessionStorage.getItem('member');
    console.log('review service # constructor # session =' + this.session);
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  addReview(comment:string, image:File, score:string, email:string, truck:string) {
    var url = `${this.reviewUrl}/post`;
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    let formdata: FormData = new FormData();

    formdata.append('comment', comment);
    formdata.append('image', image);
    formdata.append('score', score);
    formdata.append('email', email);
    formdata.append('truck', truck);
    // let review = { "rComment":comment, "rImage": image, "rScore":score, "rMember":email, "rTruck":truck };
    // console.log('add review info = ' + JSON.stringify(review.rImage));
    console.log('reivew 1='+formdata.get('comment'));
    console.log('reivew 2='+formdata.get('image'));
    console.log('reivew 3='+formdata.get('score'));
    console.log('reivew 4='+formdata.get('email'));
    console.log('reivew 5='+formdata.get('truck'));

    return this.http.post(url, formdata).subscribe(res => this.subject.next({ result: 'ok' }));
      // .map(res => {
      //   let json = res.text();
      //   console.log('json='+json)
      //   return json || {};
      // })
      // ._catch(this.handleError);
  }


  addReview2(comment:string, score:string, email:string, truck:string): Observable<string> {
    var url = `${this.reviewUrl}/post2`;
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    let formdata: FormData = new FormData();

    formdata.append('comment', comment);
    formdata.append('score', score);
    formdata.append('email', email);
    formdata.append('truck', truck);
    // let review = { "rComment":comment, "rImage": image, "rScore":score, "rMember":email, "rTruck":truck };
    // console.log('add review info = ' + JSON.stringify(review.rImage));
    console.log('reivew 1='+formdata.get('comment'));
    console.log('reivew 3='+formdata.get('score'));
    console.log('reivew 4='+formdata.get('email'));
    console.log('reivew 5='+formdata.get('truck'));

    return this.http.post(url, formdata)
      // .map(this.extractDataForObject)
      .map(res => {
        let json = res.text();
        console.log('json='+json)
        return json || {};
      })
      ._catch(this.handleError);
  }

  removeReview(review:Review): Observable<string> {
    let url = `${this.reviewUrl}/delete/${review.rid}`;
    console.log('review remove url= '+url);
    return this.http.delete(url, {headers:this.headers})
      .map(res => {
        let json = res.text();
        return json || {};
      })
      ._catch(this.handleError);
  }

  //내가 등록한 리뷰를 가져온다.
  getMyReview(): Observable<Review[]> {
    console.log('review service # getMyReview # session =' + this.session);
    if(this.session !== null){
      this.member = JSON.parse(this.session);
    }
    var email = this.member.memail;
    var url = `${this.reviewUrl}/member/${email}`;
    console.log('review url='+url);
    return this.http.get(url)
      .map(this.extractData)
      ._catch(this.handleError);
  }

  getTruckReview(tid:string): Observable<Review[]> {
    var url = `${this.reviewUrl}/truck/${tid}`;
    console.log('review url='+url);
    return this.http.get(url)
      .map(res => {
        let json = res.text();
        console.log(json);
        json = JSON.parse(json);
        return json || [];
      })
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
