import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Member } from '../_models/member.model';

@Injectable()
export class AuthenticationService {
  private member: Member;

  private loginUrl: string = "http://localhost:8080/members";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  // private loggedIn = new Subject<boolean>();
  private subject = new Subject<any>();
  private session: string;

  constructor(
    private http: Http,
    private router: Router
  ) { }

  getObservable(): Observable<Member> {
    return this.subject.asObservable();
  }

  login(email: string, password: string): Promise<any> {
    const url = `${this.loginUrl}/login`;
    let headers = new Headers({ 'Content-Type': 'application/json;  charset=utf-8', 'Accept': 'application/json' })
    let options = new RequestOptions({ headers: headers });
    let member = { "mEmail": email, "mPassword": password }
    console.log('member = ' + JSON.stringify(member));

    return this.http.post(url, JSON.stringify(member), options).toPromise().then(
      res => {
        let json = res.text();
        console.log("service login =" + json);
        if(json === "fail") {
          return json || {};
        } else {
          // json = JSON.parse(json);
          sessionStorage.setItem('member', json);
          //이때, top-nav로 가서 처리
          this.subject.next({ json });
          return json || {};
        }

      });
  }

  // logout() {
  //   const url = `${this.loginUrl}/logout`;
  //   return this.http.get(url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  private extractDataForObject(res: Response) {
    console.log('extractDataForObject#res = ' + JSON.stringify(res));
    let json = res.text();
    json = JSON.parse(json);
    return json || {};
  }

  private extractData(res: Response) {
    console.log('extractData#res = ' + JSON.stringify(res));
    let json = res.text();
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }

}
