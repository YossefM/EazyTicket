import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  // providers : [Auth,AuthGuard]
})
export class UserComponent  {
  arUser: any[];
  profile: any;
  user:any;
  email: string;
  role: boolean;
  Name: string;
  Location: string;
  Length: string;
  Date: string;
  Genre: string;
  show = false;
  loadOk = false;
  constructor(public auth: Auth, public router: Router, public http: Http) {
    let req = this.http.get("http://localhost:52708/api/User");
    req.subscribe(rsp => {
      this.arUser = rsp.json();
      console.log("success : " + rsp);
    }
      ,
      (err) => {
        console.log("error : " + err);
      })

    this.email = localStorage.getItem("email");
    if (this.email == "yoniyasso@gmail.com"||this.email == "juzefma@gmail.com") {
      this.role = false;
    }
  }
  clickHandlerPost() {
    const body = {
      Name: this.Name, Length: this.Length, Location: this.Location,
      Date: this.Date, Genre: this.Genre
    };
    let req = this.http.post("http://localhost:52708/api/Event", body);
    req.subscribe(rsp => {
      if (rsp.status == 201) {
        console.log("success : " + rsp, );

      }
      else { console.log("server responded error : " + rsp, ); }
    },
      (err) => {
        console.log("error : " + err);
      }
    );
  }
  Delete(itemToDelete) {
    let index = this.arUser.indexOf(itemToDelete);
    this.arUser.splice(index, 1);
    console.log(itemToDelete);
    console.log(itemToDelete.Id);
    let url = "http://localhost:52708/api/user";
    let req = this.http.delete(url + '/' + itemToDelete.Id);
    req.subscribe(rsp => {
      this.user = rsp.json();
      console.log("success : " + rsp);
      console.log(this.arUser);
    }
      ,
      (err) => {
        console.log("error : " + err);
      })
  }


}
