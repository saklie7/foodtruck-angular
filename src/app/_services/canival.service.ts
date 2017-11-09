import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CanivalService {

  private subject = new Subject<any>();
  private canivalListUrl: string = "http://localhost:8080/canival";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: Http) { }

  getCanivalsView(): Observable<any> {
    var url = this.canivalListUrl;
    return this.http.get(url)
      .map(res => {
        let json = res.text();
        json = JSON.parse(json);
        return json || [];
      });
  }

  getCanivalDetail(cId) {
    const url = `${this.canivalListUrl}/view/${cId}`;
    return this.http.get(url);
  }

  getDeleteCanival(cId) {
    const url = `${this.canivalListUrl}/delete/${cId}`;
    return this.http.delete(url, { headers: this.headers });
  }

  postAddCanival(
    cTitle: string,
    cContent: string,
    cSdate: string,
    cEdate: string,
    cImage: File
  ) {
    const url = `${this.canivalListUrl}/post`;
    let formdata: FormData = new FormData();

    formdata.append('cTitle', cTitle)
    formdata.append('cContent', cContent)
    formdata.append('cSdate', cSdate)
    formdata.append('cEdate', cEdate)
    formdata.append('cImage', cImage)

    return this.http.post(url, formdata);
  }

  postUpdateCanival(
    cId: string,
    cTitle: string,
    cContent: string,
    cSdate: string,
    cEdate: string,
    cImage: File
  ) {
    const url = `${this.canivalListUrl}/update/${cId}`;
    let formdata: FormData = new FormData();

    formdata.append('cId', cId)
    formdata.append('cTitle', cTitle)
    formdata.append('cContent', cContent)
    formdata.append('cSdate', cSdate)
    formdata.append('cEdate', cEdate)
    formdata.append('cImage', cImage)

    return this.http.post(url, formdata);
  }

}
