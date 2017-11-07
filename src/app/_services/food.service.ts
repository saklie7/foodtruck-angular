import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Food } from '../_models/food.model'

@Injectable()
export class FoodService {

  private subject = new Subject<any>();

  private foodUrl: string = "http://localhost:8080/foods";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: Http) { }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  foodRegist(name: string, price: string, description: string, file: File, tid: string) {
    const url = `${this.foodUrl}/post`;
    let formdata: FormData = new FormData();

    formdata.append('name', name);
    formdata.append('price', price);
    formdata.append('description', description);
    formdata.append('file', file);
    formdata.append('tid', tid);

    console.log('FoodService # tid=' + formdata.get('tid'));

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

  removeFood(food: Food) {
    let url = `${this.foodUrl}/delete/${food.fid}`;
    console.log('food url='+url);
    return this.http.delete(url, {headers:this.headers})
      .subscribe(res => this.subject.next({ result: 'ok' }))
  }

}
