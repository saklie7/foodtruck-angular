import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from '../_services/food.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input('tid') tid: string;

  foods: object[] = [];

  name: string;
  price: string;
  description: string;

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getObservable().subscribe(
      messege => {
        if (messege.result = 'ok') {
          this.foodService.getAllfoods(this.tid).subscribe(res => {
            console.log(res.json())
            this.foods = res.json();
          });
        }
      })
    // this.foodServiceService.getAllfoods().subscribe(res => {
    //   console.log(res.json())
    //   this.foods = res.json();
    // });
    this.foodService.getAllfoods(this.tid).subscribe(res => {
      console.log(res.json())
      this.foods = res.json();
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSubmit(f) {
    f.value.file = this.selectedFiles.item(0);
    console.log(f.value.file)
    console.log(f.value);
    this.foodService.foodRegist(f.value.name, f.value.price, f.value.description, f.value.file, this.tid);
  }

}
