import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../auth/auth.service';
@Component({
       
    selector: 'event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
})

export class EventComponent {
     url = "http://localhost:52708/api/event";
  GetE() {
 return this.http.get(this.url);
 }
    btnClick1() {
        this.router.navigate(['./music']);
    }
    btnClicK() {
        this.router.navigate(['./standup']);
    }
    constructor(public http: Http,
        public router: Router, public route: ActivatedRoute,
    ) { }
  
}