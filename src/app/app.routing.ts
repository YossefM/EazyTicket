import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './Home/Home.component';
import {UserComponent} from './User/user.component';

import { AuthGuard } from './auth/auth.guard';
import { CommentComponent } from './Comment/comment.component';
import { EventComponent } from './Event/event.component';
import { PerformerComponent } from './Performer/performer.component';

import { StandupComponent } from './Standup/standup.component';
import { MusicComponent } from './Music/music.component';
import { AppComponent } from './app.component';

import { AboutComponent } from './About/about.component';
const appRoutes: Routes= [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'Home',
        component: HomeComponent
    },
    {
        path:'user',
        component:UserComponent,
     canActivate: [AuthGuard]
    },
     {
        path:'comment',
        component:CommentComponent,
        canActivate: [AuthGuard]
    },
     {
        path:'event',
        component:EventComponent,
        canActivate: [AuthGuard]
    },
      {
        path:'pefrormer',
        component:PerformerComponent,
        canActivate: [AuthGuard]
    },
      {
        path:'standup',
        component:StandupComponent,
        canActivate: [AuthGuard]
    },
      {
        path:'music',
        component:MusicComponent,
        canActivate: [AuthGuard]
    },
     
      {
        path:'about',
        component:AboutComponent,
        canActivate: [AuthGuard]
    },

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);