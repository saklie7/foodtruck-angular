import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Truck } from '../_models/truck.model';

@Injectable()
export class TruckService {

  trucks2: object[] = [
  ];

  private subject = new Subject<any>();
  private truckUrl: string = "http://localhost:8080/trucks";


  constructor(private http: Http) { }


  getObservable(): Observable<any> {
    console.log('getObservable() working');
    return this.subject.asObservable();
  }

  // truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File) {
  truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File, email:string) {
    const url = `${this.truckUrl}/post`;
    let formdata: FormData = new FormData();
    let address: string;
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
    .subscribe(response=>
      {
        // console.log(response.json());
        console.log(response.json().results[0].formatted_address);
        address = response.json().results[0].formatted_address;

        console.log(address);

        formdata.append('name', name);
        formdata.append('open', open);
        formdata.append('close', close);
        formdata.append('lat', lat);
        formdata.append('lng', lng);
        formdata.append('comment', comment);
        formdata.append('file', file);
        formdata.append('address', address);
        formdata.append('email', email);

        console.log(formdata.get('address'));
        console.log(formdata.get('file'));
        console.log(formdata.get('email'));


        return this.http.post(url, formdata).subscribe(()=>{
          this.subject.next({check:'true'})}
        );
      })
  }

  truckgetAll(): Observable<any> {
    const url = `${this.truckUrl}`;
    return this.http.get(url)
  }

  keyFind(key: string): Observable<any> {
    console.log(key);
    const url = `${this.truckUrl}/find/${key}`;
    console.log(url);
    return this.http.get(url);
  }

  getTruckInfo(tid: string):Observable<any> {
    const url = `${this.truckUrl}/${tid}`;
    return this.http.get(url)
    .map(this.extractDataForObject)
    ._catch(this.handleError);
  }


  private extractDataForObject(res: Response) {
    let json = res.text();
    console.log('truck service=' + json);
    json = JSON.parse(json);
    return json || {};
  }

  private extractData(res: Response) {
    let json = res.text();
    console.log('review service=' + json);
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = " + res);
    return Observable.throw(res.json().error || 'Server Down');
  }
}
