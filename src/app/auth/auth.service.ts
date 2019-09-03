import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth.variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NewUser } from '../NewUser.service';
import { Http, Headers } from '@angular/http';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {


  auth0 = new auth0.WebAuth({
    clientID: 'mf_ySU-G3W0ZtuJpPVKyOSUQDkV_qBgF',
    domain: 'pituach.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:52708/api',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid profile email userinfo read:messages',

  });

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }
  userProfile: any;
  url: any;
  constructor(public router: Router, private http: Http
    , public authHttp: AuthHttp,private service: NewUser) {
  }


 
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        console.log(authResult);
        this.router.navigate(['/Home']);
      } else if (err) {
        this.router.navigate(['/Home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }
  profile: any;

  // private setSession(authResult): void {
  //   // Set the time that the access token will expire at
  //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);

  //   this.getProfile((err, profile) => {
  //     this.profile = profile;
  //     localStorage.setItem('email', this.userProfile.email);
  //   });
  
  // }

 private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.getProfile((err, profile) => {
      this.profile = profile;
      const user = { Email: this.profile.email }
      const req = this.service.Post(user);
      req.subscribe(rsp => {
          console.log("success : " + rsp);
       
      },
        (err) => {
          console.log("error : " + err);
        }
      );
    });
  }

  public login(): void {
    this.auth0.authorize();
  }
  
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
     localStorage.removeItem('email');
    // Go back to the home route
    this.router.navigate(['/']);
  }
    public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  role: boolean;
  public getAdmin(): boolean {
    console.log("role" + this.role)
    return this.role;
  }


  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    console.log('access_token')
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        localStorage.setItem('email', self.userProfile.email);
        console.log(self.userProfile.email)
      }
      cb(err, profile);
    });
  }

  arUser: any;
  name: any;
   
  GetUsers(Email: string) {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    this.url = "http://localhost:52708/api";
    return this.authHttp.get(this.url + "/user?email=" + Email, { headers: myHeader });
  }
 


  getAllUsers(email: string) {
    this.GetUsers(email)
      .subscribe( rsp => {rsp ? this.arUser = rsp.json() : null } );
this.role = this.arUser;
console.log(this.role);
           return this.role;
  
 

  }
}
