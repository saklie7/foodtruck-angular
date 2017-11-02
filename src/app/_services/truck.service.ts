import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TruckService {

  trucks2: object[] = [
  ];

  private subject = new Subject<any>();
  private trucksUrl: string = "http://localhost:8080/trucks";

  constructor(private http2: Http) { }

  // truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File) {
  truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File, email:string) {
    const url = `${this.trucksUrl}/post`;
    let formdata: FormData = new FormData();
    let address: string;
    // let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    this.http2.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
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

        return this.http2.post(url, formdata).subscribe();
      })

  }

  truckgetAll(): Observable<any> {
    const url = `${this.trucksUrl}/getalltrucks`;
    return this.http2.get(url)
  }

  keyFind(key: string): Observable<any> {
    console.log(key);
    const url = `${this.trucksUrl}/find/${key}`;
    console.log(url);
    return this.http2.get(url);
  }
}
