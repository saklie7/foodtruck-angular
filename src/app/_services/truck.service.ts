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
  private membersUrl: string = "http://localhost:8080/trucks";

  constructor(private http2: Http) { }

  // truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File) {
  truckRegist(name: string, open: string, close: string, lat: string, lng: string, comment: string, file: File, email:string) {
    const url = `${this.membersUrl}/post`;
    let formdata: FormData = new FormData();
    let address: string;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http2.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
      .subscribe(response => {

        console.log(response.json());
        console.log(response.json().results[0].formatted_address);
        address = response.json().results[0].formatted_address;
        console.log(address);
        console.log(email);

        formdata.append('address', address);
        formdata.append('name', name);
        formdata.append('open', open);
        formdata.append('close', close);
        formdata.append('lat', lat);
        formdata.append('lng', lng);
        formdata.append('comment', comment);
        formdata.append('file', file);
        formdata.append('email', email);

        return this.http2.post(url, formdata, options).subscribe();
      })

  }

  truckgetAll(): Observable<any> {
    const url = `${this.membersUrl}/getalltrucks`;
    return this.http2.get(url)
  }

  keyFind(key: string): Observable<any> {
    console.log(key);
    const url = `${this.membersUrl}/find/${key}`;
    console.log(url);
    //   this.trucks2=[];
    //   this.http2.get("https://maps.googleapis.com/maps/api/geocode/json?address=+"+f+"&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
    //   .subscribe(res=>{
    //     console.log(res.json().results[0].geometry.location)
    //     var lat = res.json().results[0].geometry.location.lat;
    //     var lng = res.json().results[0].geometry.location.lng;
    //     console.log(lat);
    //     console.log(lng);
    //
    //     let url = `${this.membersUrl}/${lat}/${lng}`;
    //     console.log(url);
    //
    //     this.http2.get(url).subscribe(res=>
    //       {
    //
    //         var result = res.json();
    //         console.log(result)
    //         for(let i=0; i<result.length; i++){
    //           // this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=+"+f.address+"&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
    //           this.http2.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+result[i].tlat+","+result[i].tlng+"&key=AIzaSyAmd6XJpMMk5qA869GC9XXrNmo8Fb1cRYg")
    //           .subscribe(response=>
    //             {
    //               result[i].address = response.json().results[1].formatted_address;
    //             })
    //             this.trucks2.push(result[i]);
    //           }
    //           console.log(this.trucks2)
    //           return this.trucks2;
    //         });
    //   });
    return this.http2.get(url);
  }
}
