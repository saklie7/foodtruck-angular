import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  foodname:string;
  progress: {percentage: number} = {percentage: 0}
  cnt = 1;


  constructor(private uploadService: UploadFileService) {}


  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0)

    this.foodname='라면';
    console.log(this.currentFileUpload.name);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.foodname);

    this.selectedFiles = undefined
  }
}
