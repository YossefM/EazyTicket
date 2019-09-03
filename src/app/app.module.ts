import { NgModule, OnInit, OnDestroy } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Http, RequestOptions,Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//Components and Services
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { NewUser } from './NewUser.service';
import { AboutComponent } from './About/about.component';
import { CommentComponent } from './Comment/comment.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './User/user.component';
import { EventComponent } from './Event/event.component';
import { PerformerComponent } from './Performer/performer.component';
import { StandupComponent } from './Standup/standup.component';
import { MusicComponent } from './Music/music.component';
import { Auth } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LasteventsComponent } from './lastevents/lastevents.component';
import { PolicyComponent } from './policy/policy.component';
import { CartComponent } from './cart/cart.component';
const appRoutes: Routes = [

  { path: 'Home', component: HomeComponent },
  { path: 'music', component: MusicComponent },
    { path: 'profile', component: ProfileComponent },
  { path: 'standup', component: StandupComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
    { path: 'policy', component: PolicyComponent },
  { path: 'User', component: UserComponent , canActivate: [AuthGuard]},
  { path: 'Event', component: EventComponent },
  { path: 'Performer', component: PerformerComponent },
    { path: 'lastevents', component: LasteventsComponent },
  { path: 'Comment', component: CommentComponent },
  { path: 'Cart', component: CartComponent }
];
export function authHttpServiceFactory(http: Http, options: RequestOptions,
auth:Auth) {
  return new AuthHttp(new AuthConfig({
    
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  
  }), http, options);
}

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpModule,
    FormsModule, routing,Ng2SearchPipeModule,],
  declarations: [AppComponent, HomeComponent, AboutComponent,
    CommentComponent, UserComponent, EventComponent,
    PerformerComponent,
    StandupComponent, MusicComponent,ProfileComponent, LasteventsComponent, PolicyComponent, CartComponent

  ],
  bootstrap: [AppComponent],
   
            
      
  providers: [ NewUser,AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    appRoutingProviders,
  //AUTH_PROVIDERS,
    Auth,
    AuthGuard
  ]

})
export class AppModule { }
