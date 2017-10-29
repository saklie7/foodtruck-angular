import { Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

declare var google:any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 16;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.mapTypeId = 'roadmap'; // 'roadmap'|'hybrid'|'satellite'|'terrain'
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
        });
      });
    });
  }

  private mapClick(event: any) {
    console.log("mapClick called : "+event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  saveLocal() {
    console.log(navigator.geolocation.getCurrentPosition)
  }

  clickedMarker(marker:Marker, index:number){
    console.log(marker);
  }
  // clickedMap(event:any) {
  //   this.markers.push( {
  //     latitude: event.coords.lat,
  //     longitude : event.coords.lng,
  //   });
  //   console.log("clickedMap called : " + this.markers);
  // }

}
// just an interface for type safety.
interface Marker {
  latitude: number;
  longitude: number;
}
