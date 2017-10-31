import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Hotlist } from '../_models/hotlist.model';
import { Truck } from '../_models/truck.model';
import { Member } from '../_models/member.model';
import { HotlistDetail } from '../_models/hotlistdetail.model';

@Injectable()
export class HotlistService {

  private hotlistUrl: string = "http://localhost:8080/hotlist";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private subject = new Subject<any>();

  private session: string;
  private member: Member;

  constructor(private http: Http) {
    this.session = sessionStorage.getItem('member');
    // if(this.session !== null){
    //   this.member = JSON.parse(this.session);
    // }
    console.log('review service # constructor # session =' + this.session);
  }

  getObservable(): Observable<HotlistDetail> {
    return this.subject.asObservable();
  }

  getHotlistDetail(): Observable<HotlistDetail[]> {
    if(this.session !== null){
      this.member = JSON.parse(this.session);
    }
    var email = this.member.memail;
    var url = `${this.hotlistUrl}/${email}`;
    return this.http.get(url)
      .map(this.extractData)
      ._catch(this.handleError);
  }

  addHotlist(member: string, truck: string): Observable<Hotlist> {
    var url = this.hotlistUrl;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let hotlist = { "hId": null, "hMember": member, "hTruck": truck };
    console.log(' add holist info = ' + JSON.stringify(hotlist));

    return this.http.post(url, JSON.stringify(hotlist), options)
      .map(this.extractDataForObject)
      ._catch(this.handleError);
  }

//되는 remove
  removeHotlist(hotlistdetail: HotlistDetail): Observable<string> {
    let url = `${this.hotlistUrl}/${hotlistdetail.hid}`;
    console.log('remove url='+url);
    return this.http.delete(url, {headers:this.headers})
    .map(res => {
      let json = res.text();
      this.subject.next({ json });
      return json || {};
    })
    ._catch(this.handleError);
  }


  private extractDataForObject(res: Response) {
    let json = res.text();
    console.log('hotlist service='+json);
    json = JSON.parse(json);
    return json || {};
  }

  private extractData(res: Response) {
    let json = res.text();
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }
}
