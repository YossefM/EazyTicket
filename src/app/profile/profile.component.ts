
import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
 profile: any;
 email: string;
 Name:string;
  role: boolean;
Comment:string;
Issue:string;

  constructor(public auth: Auth,public router: Router,public http : Http) { 
        

    this.email = localStorage.getItem("email");
    if (this.email == "yoniyasso@gmail.com"||this.email == "juzefma@gmail.com") {
      this.role = false;
    }
  }
  clickHandlerPost() {
    const body = {
     Name:this.Name, Issue: this.Issue, Comments: this.Comment
    };
    let req = this.http.post("http://localhost:52708/api/comment", body);
    req.subscribe(rsp => {
      if (rsp.status == 201) {
        console.log("success : " + rsp,);
           
      }
      else { console.log("server responded error : " + rsp,); }
    },
      (err) => {
        console.log("error : " + err);
      }
    );
  }
  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}