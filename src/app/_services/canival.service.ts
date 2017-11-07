import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanivalService {

  private canivalListUrl: string = "http://localhost:8080/canival";

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

  postCanival(
    cTitle: string,
    cContent: string,
    cSdate: string,
    cEdate: string,
    cImage: File
  ) {
    const url = `${this.canivalListUrl}/post`;
    let formdata: FormData = new FormData();

    formdata.append('title', cTitle)
    formdata.append('content', cContent)
    formdata.append('sdate', cSdate)
    formdata.append('edate', cEdate)
    formdata.append('image', cImage)

    return this.http.post(url, formdata);
  }


}
