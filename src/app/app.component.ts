import { Component } from '@angular/core';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import * as auth0 from 'auth0-js';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 // providers: [Auth, AuthGuard]
})
export class AppComponent {
  isShrunk: boolean = false;
  name: any;
  email: any;
  role: boolean = false;
  arUser: any[];
  profile: string;
  user: string;


  constructor(zone: NgZone, private auth: Auth, public http: Http) {



    try {
    this.auth.handleAuthentication();
    this.auth.authenticated();
    this.email = localStorage.getItem("email");
    if (this.email == "yoniyasso@gmail.com" || this.email == "juzefma@gmail.com") {
      this.role = true;
    }
   this.auth.getAllUsers(this.email);
    this.auth.getAdmin();
    console.log("avraham" + this.email);  
    } catch (error) {
      console.log(error);
      
    }
    

   // this.auth.getAllUsers(this.user);

    // navbar size
    window.onscroll = () => {
      zone.run(() => {
        if (window.pageYOffset > 0) {
          this.isShrunk = true;
        } else {
          this.isShrunk = false;
        }
      });
    }
  }

   ngOnIt(){
   
   }

}



