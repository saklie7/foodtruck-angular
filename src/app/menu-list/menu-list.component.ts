import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  images:any[] = [
    {url:'/img/character_01.png'},
    {url:'/img/character_02.png'},
    {url:'/img/character_03.png'},
    {url:'/img/character_04.png'},
    {url:'/img/character_05.png'},
    {url:'/img/character_06.png'},
    {url:'/img/character_07.png'},
    {url:'/img/character_08.png'},
    {url:'/img/character_09.png'},
    {url:'/img/character_10.png'},
    {url:'/img/character_11.png'},
    {url:'/img/character_12.png'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
