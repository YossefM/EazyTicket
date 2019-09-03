import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  arComments: any[];
  comment: any;
 Issue:string;
 Comment:string;
  email: any;
  role: boolean = false;
  loadOk= false;
  constructor(private http: Http, private auth: Auth) {
        
    try {
 
    this.auth.authenticated();
    this.email = localStorage.getItem("email");
    if (this.email == "yoniyasso@gmail.com"||this.email == "juzefma@gmail.com") 
    {
      this.role = true;
    }
   this.auth.getAllUsers(this.email);
    this.auth.getAdmin();
    console.log("avraham" + this.email);  
    } catch (error) {
      console.log(error);
      
    }
    let req = this.http.get("http://localhost:52708/api/comment");
    req.subscribe(rsp => {
      this.arComments = rsp.json();
      console.log("success : " + rsp);
    }
      ,
      (err) => {
        console.log("error : " + err);
      })
  }

    Delete(itemToDelete) {
    let index = this.arComments.indexOf(itemToDelete);
    this.arComments.splice(index, 1);
    console.log(itemToDelete);
    console.log(itemToDelete.Id);
    let url = "http://localhost:52708/api/performer";
    let req = this.http.delete(url + '/' + itemToDelete.Id);
    req.subscribe(rsp => {
      this.comment = rsp.json();
      console.log("success : " + rsp);
      console.log(this.arComments);
    }
      ,
      (err) => {
        console.log("error : " + err);
      })
  }

  ngOnInit() {
  }

}
