import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hotlist } from '../_models/hotlist.model';
import { Truck } from '../_models/truck.model';
import { Member } from '../_models/member.model';
import { HotlistDetail } from '../_models/hotlistdetail.model';

@Injectable()
export class HotlistService {

  private hotlistUrl: string = "http://localhost:8080/hotlist";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  private session: string;
  private member: Member;

  constructor(private http: Http) {
    this.session = sessionStorage.getItem('member');
    console.log('hotlist service # constructor # session =' + this.session);
  }

  // getHotlist(): Observable<Hotlist[]> {
  //   if (this.session !== null) {
  //     this.member = JSON.parse(this.session)
  //     var email = this.member.memail;
  //   }
  //   var url = `${this.hotlistUrl}/${email}`
  //   return this.http.get(url)
  //     .map(this.extractData)
  //     ._catch(this.handleError);
  // }

  getHotlistDetail(): Observable<HotlistDetail[]> {
    if (this.session !== null) {
      this.member = JSON.parse(sessionStorage.getItem('member'));
      var email = this.member.memail;
    }
    var url = `${this.hotlistUrl}/${email}`
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

  removeHotlist(id: number): Observable<HotlistDetail> {
    let url = `${this.hotlistUrl}/${id}`;
    console.log('remove url='+url);
    return this.http.delete(url, {headers:this.headers})
    .map(this.extractDataForObject)
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
