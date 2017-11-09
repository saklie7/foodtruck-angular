import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/subject';

import { AuthenticationService } from '../_services/authentication.service';

import { Member } from '../_models/member.model';

@Injectable()
export class MemberService {

  memberUrl: string = "http://localhost:8080/members";
  message: string;

  constructor(
    private http: Http,
    private authService: AuthenticationService) {
  }

  getMember(memail: string): Observable<Member> {
    var url = this.memberUrl + "/" + sessionStorage.getItem('member');
    return this.http.get(url)
      .map(this.extractDataForObject)
      ._catch(this.handleError);
  }

  addMember(email: string, password: string, nickname: string, registype:number): Observable<Member> {
    let url = `${this.memberUrl}/regist`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "mEmail": email, "mPassword": password, "mNickname": nickname, "mRegistype": registype };
    console.log('member = ' + JSON.stringify(member));

    return this.http.post(url, JSON.stringify(member), options)
      .map(this.extractDataForObject)
      .catch(this.handleError);
  }

  modifyMember(member:Member): Observable<Member> {
    let url = `${this.memberUrl}/update/${member.memail}`;
    console.log("rrrr = "+url);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // let member = { "mEmail": email, "mPassword": password, "mNickname": nickname };
    console.log('member = ' + JSON.stringify(member));

    return this.http.post(url, JSON.stringify(member), options)
      .map(this.extractDataForObject)
      .catch(this.handleError);
  }

  private extractDataForObject(res: Response) {
    let json = res.text();
    console.log(json);
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
