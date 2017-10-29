import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { CanivalComponent } from './canival/canival.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TruckInfoComponent } from './truck-info/truck-info.component';
import { TruckReviewsComponent } from './truck-reviews/truck-reviews.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { TruckRegistComponent } from './truck-regist/truck-regist.component';

const routes: Routes = [
  { path: '', component: MainHomeComponent},
  { path: 'truck-map', component: GoogleMapComponent},
  { path: 'login-page', component: LoginPageComponent},
  { path: 'join-page', component: JoinPageComponent},
  { path: 'canival', component: CanivalComponent},
  { path: 'truck-list', component: TruckListComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'support', component: SupportComponent},
  { path: 'reviews', component: ReviewsComponent},
  { path: 'truck-info', component: TruckInfoComponent},
  { path: 'truck-reviews', component: TruckReviewsComponent},
  { path: 'truck-regist', component: TruckRegistComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
