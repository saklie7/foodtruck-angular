import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';

//review star rating
import { BarRatingModule } from "ngx-bar-rating";

//pagination : npm install ngx-pagination --save
import {NgxPaginationModule} from 'ngx-pagination';


//component
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TruckInfoComponent } from './truck-info/truck-info.component';
import { TruckReviewsComponent } from './truck-reviews/truck-reviews.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { TruckRegistComponent } from './truck-regist/truck-regist.component';
import { SupportDetailComponent } from './support/support-detail/support-detail.component';
import { SupportWriteComponent } from './support/support-write/support-write.component';
import { CanivalDetailComponent } from './canival/canival-detail/canival-detail.component';
import { CanivalViewComponent } from './canival/canival-view/canival-view.component';
import { CanivalWriteComponent } from './canival/canival-write/canival-write.component';

//service
import { AuthenticationService } from './_services/authentication.service';
import { MemberService } from './_services/member.service';
import { HotlistService } from './_services/hotlist.service';
import { ReviewService } from './_services/review.service';
import { GoogleMapService } from './_services/google-map.service';
import { TruckService } from './_services/truck.service';
import { UploadFileService } from './_services/file-upload.service';
import { FoodService } from './_services/food.service';
import { SupportService } from './_services/support.service';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { CanivalService } from './_services/canival.service';



@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    MainHomeComponent,
    LoginPageComponent,
    JoinPageComponent,
    TopNavComponent,
    TruckListComponent,
    SupportComponent,
    FavoritesComponent,
    ReviewsComponent,
    TruckInfoComponent,
    TruckReviewsComponent,
    MenuListComponent,
    TruckRegistComponent,
    SupportDetailComponent,
    SupportWriteComponent,
    MemberProfileComponent,
    CanivalDetailComponent,
    CanivalViewComponent,
    CanivalWriteComponent,
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
    //pagination
    NgxPaginationModule,
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
    ReviewService,
    GoogleMapService,
    TruckService,
    UploadFileService,
    FoodService,
    SupportService,
    CanivalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
