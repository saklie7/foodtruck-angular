import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { TruckListComponent } from './truck-list/truck-list.component';
import { SupportComponent } from './support/support.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TruckInfoComponent } from './truck-info/truck-info.component';
import { TruckReviewsComponent } from './truck-reviews/truck-reviews.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { TruckRegistComponent } from './truck-regist/truck-regist.component';
import { SupportWriteComponent } from './support/support-write/support-write.component';
import { SupportDetailComponent } from './support/support-detail/support-detail.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { CanivalDetailComponent } from './canival/canival-detail/canival-detail.component';
import { CanivalViewComponent } from './canival/canival-view/canival-view.component';
import { CanivalWriteComponent } from './canival/canival-write/canival-write.component';



const routes: Routes = [
  { path: '', redirectTo: '/main-home', pathMatch: 'full' },
  { path: 'main-home', component: MainHomeComponent},
  { path: 'truck-map', component: GoogleMapComponent},
  { path: 'login-page', component: LoginPageComponent},
  { path: 'join-page', component: JoinPageComponent},
  { path: 'truck-list', component: TruckListComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'support', component: SupportComponent},
  { path: 'support-detail/:sid', component: SupportDetailComponent},
  { path: 'support/write', component: SupportWriteComponent},
  { path: 'reviews', component: ReviewsComponent},
  { path: 'menu-list', component: MenuListComponent},
  { path: 'truck-info/:tid', component: TruckInfoComponent},
  { path: 'truck-reviews', component: TruckReviewsComponent},
  { path: 'truck-regist', component: TruckRegistComponent},
  { path: 'member-profile', component: MemberProfileComponent},
  { path: 'canival-view', component: CanivalViewComponent},
  { path: 'canival-detail/:cid', component: CanivalDetailComponent},
  { path: 'canival-write', component: CanivalWriteComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
