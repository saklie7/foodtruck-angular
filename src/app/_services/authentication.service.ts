import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Member } from '../_models/member.model';

@Injectable()
export class AuthenticationService {
  private member: Member;

  private loginUrl: string = "http://localhost:8080/members";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private loggedIn = new Subject<boolean>();
  private session :string;

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.session = sessionStorage.getItem('member');
  }

  login(email: string, password: string): Observable<Member> {
    const url = `${this.loginUrl}/login`;
    let headers = new Headers({ 'Content-Type': 'application/json;  charset=utf-8', 'Accept': 'application/json' })
    let options = new RequestOptions({ headers: headers });
    let member = { "mEmail": email, "mPassword": password }

    return this.http.post(url, JSON.stringify(member), options)
      .map(res => {
        var json = res.text();
        console.log('service login# json(res.text)=' + json);
        json = JSON.parse(json);
        return json || {};
      })
      ._catch(this.handleError);
  }

  logout() {
    const url = `${this.loginUrl}/logout`;
    return this.http.post(url, {})
      .map(res => {
        console.log(res)
        this.loggedIn.next(false);
        return res;
      })
      ._catch(this.handleError)
  }

  isLoggedIn(): Observable<any>{
    if(this.session === null) {
      console.log(this.session);
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }

}
