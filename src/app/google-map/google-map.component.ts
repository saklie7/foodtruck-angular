//npm install --save @agm/core 설치필요
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { GoogleMapService } from '../_services/google-map.service';
import { Truck } from '../_models/truck.model';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  public trucks: Truck[] = [];
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public mapTypeId: string;


  public markers: Marker[] = [
    {
      latitude: 37.483038487116616,
      longitude: 126.90061283105024,
    }
  ];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: GoogleMapService,
    private router: Router,
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 16;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.mapTypeId = 'roadmap'; // 'roadmap'|'hybrid'|'satellite'|'terrain'
    //set current position
    this.setCurrentPosition();
    this.getAllTrucks();
    //load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     types: ["geocode"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    //
    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }
    //
    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 16;
    //     });
    //   });
    // });
  }

  private mapClick(event: any) {
    console.log("mapClick called : " + event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  private setCurrentPosition() {
    console.log('set='+ navigator);
    console.log('set='+ navigator.geolocation.getCurrentPosition);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude = position.coords.latitude;
        console.log('lat'+this.latitude)
        this.longitude = position.coords.longitude;
        console.log('lng'+this.longitude)
        this.zoom = 16;
        console.log(position.coords);
      });
    }
  }

  getAllTrucks() {
    this.mapService.getTruckAllList().subscribe(trucks => {
      for (let i = 0; i < trucks.length; i++) {
        this.trucks.push(trucks[i]);
      }
    }
    );
    console.log(this.trucks);
  }


  saveLocal() {
    console.log(navigator.geolocation.getCurrentPosition)
  }

  clickedMarker(marker: Marker, index: number) {
    console.log(marker);
  }

  getFoodTruck(tid: string) {
    console.log(tid);
    this.router.navigate(["truck-info", tid]);
  }
}

// just an interface for type safety.
interface Marker {
  latitude: number;
  longitude: number;
}
