import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Member } from '../_models/member.model';


@Injectable()
export class SupportService {

  private subject = new Subject<any>();
  private supportUrl: string = "http://localhost:8080/supports";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private http: Http) { }

  addSupport(f, member: Member) {
    const url = `${this.supportUrl}/post`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let support = { 'stitle': f.title, 'scontent': f.content, 'sregistype':member.mregistype,'smember': member.memail };
    this.http.post(url, JSON.stringify(support), options)
      .subscribe(res => this.subject.next({ result: 'ok' }));
  }

  updateSupport(sid: number, stitle: string, scontent: string) {
    const url = `${this.supportUrl}/update`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let support = { 'sid': sid, 'stitle': stitle, 'scontent': scontent };
    console.log(url);
    this.http.post(url, JSON.stringify(support), options)
      .subscribe(res => this.subject.next({ result2: 'ok' }));
  }

  getList() {
    const url = `${this.supportUrl}`;
    return this.http.get(url);
  }

  getDetail(sid: string) {
    console.log(sid);
    const url = `${this.supportUrl}/number/${sid}`;
    console.log(url);
    return this.http.get(url);
  }
}
