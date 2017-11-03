import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Truck } from '../_models/truck.model';

@Injectable()
export class GoogleMapService {

  constructor(private http: HttpClient) { }

  private truckUrl = "http://localhost:8080/trucks";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });


  getTruckAllList(): Observable<Truck[]> {
    return this.http.get(this.truckUrl)
      .map(response => response as Truck[])
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log('res = ' + JSON.stringify(res));
    let json = res.text();
    json = JSON.parse(json);
    return json || [];
  }

  private extractDataForObject(res: Response) {
    console.log('res = ' + JSON.stringify(res));
    let json = res.text();
    json = JSON.parse(json);
    return json || {};
  }

  private handleError(res: Response) {
    console.log(res);
    return Observable.throw(res.json().error || 'Server Down');
  }
}
