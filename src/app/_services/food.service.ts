import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FoodService {

  private subject = new Subject<any>();
  private foodUrl: string = "http://localhost:8080/foods";

  constructor(private http: Http) { }


  foodRegist(name: string, price: string, description: string, file: File, tid:string) {
    const url = `${this.foodUrl}/post`;
    let formdata: FormData = new FormData();

    formdata.append('name', name);
    formdata.append('price', price);
    formdata.append('description', description);
    formdata.append('file', file);
    formdata.append('tid', tid);

    console.log('FoodService # tid='+formdata.get('tid'));

    return this.http.post(url, formdata).subscribe(res => this.subject.next({ result: 'ok' })
    );

  }

  // getAllfoods() {
  //   const url = `${this.foodUrl}/getAllfoods`;
  //   return this.http.get(url);
  // }
  getAllfoods(tid: string) {
    const url = `${this.foodUrl}/${tid}`;
    return this.http.get(url);
  }
  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

}
