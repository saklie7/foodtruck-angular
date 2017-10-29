import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UploadFileService {

  private subject = new Subject<any>();

  fileUploadNames: Observable<any>;

  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File, progress: {percentage: number},foodName:string) {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('foodName', foodName);

    const req = new HttpRequest('POST', '/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    this.http.request(req).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   progress.percentage = Math.round(100 * event.loaded / event.total);
      //     this.subject.next({upload:'ok'});
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
    });



  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();
  }
}
