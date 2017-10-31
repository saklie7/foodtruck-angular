import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app.routing.module';
//review star rating
import { BarRatingModule } from "ngx-bar-rating";

//component
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { CanivalComponent } from './canival/canival.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TruckInfoComponent } from './truck-info/truck-info.component';
import { TruckReviewsComponent } from './truck-reviews/truck-reviews.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { TruckRegistComponent } from './truck-regist/truck-regist.component';

//service
import { UploadFileService } from './service/file-upload.service';
import { AuthenticationService } from './_services/authentication.service';
import { MemberService } from './_services/member.service';
import { HotlistService } from './_services/hotlist.service';
import { ReviewService } from './_services/review.service';


@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    FileUploadComponent,
    MainHomeComponent,
    LoginPageComponent,
    JoinPageComponent,
    TopNavComponent,
    CanivalComponent,
    TruckListComponent,
    SupportComponent,
    FavoritesComponent,
    ReviewsComponent,
    TruckInfoComponent,
    TruckReviewsComponent,
    MenuListComponent,
    TruckRegistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    //review star rating
    BarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFQmGdDApLDMW8Fp3F8VtOv9kwAg1xAUU',
      region: "kr",
      libraries: ["places"],
    })
  ],
  providers: [
    AuthenticationService,
    MemberService,
    HotlistService,
    UploadFileService,
    ReviewService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
