import { Http } from '@angular/http';import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
export class NewUser {
 private url : string;
 
 Post(body : any) {
this.url = "http://localhost:52708/api/User";    
 return this.http.post(this.url,body)
 }
 constructor(@Inject(Http) private http:Http){
 }
}