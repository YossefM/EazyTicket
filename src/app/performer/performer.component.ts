import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from '../auth/auth.service';
@Component({
  moduleId: module.id,
  selector: 'performer',
  templateUrl: './performer.component.html',
  providers: [Auth],
  styleUrls: ['./performer.component.css']
})

export class PerformerComponent {
  arPerformer: any[];
  performer: any;
  Name: string;
  Genre: string;
  Email: string;
  Country: string;
  Alias: string;
    show: true;
    name:string;
    search = false;
  loadOk = false;
  role: boolean = false;
    email: any;
  constructor(public authHttp: AuthHttp, public http: Http, public auth: Auth) {
       try {
 
    this.auth.authenticated();
    this.email = localStorage.getItem("email");
    if (this.email == "yoniyasso@gmail.com"||this.email == "juzefma@gmail.com") {
      this.role = true;
    }
   this.auth.getAllUsers(this.email);
    this.auth.getAdmin();
    console.log("avraham" + this.email);  
    } catch (error) {
      console.log(error);
      
    }
    let req = this.http.get("http://localhost:52708/api/performer");
    req.subscribe
    (rsp =>
       {
     // this.auth.getRole().subscribe((res)=>{
     // console.log(res); 
     // });
      this.arPerformer = rsp.json();
      console.log("success : " + rsp);
    }
      ,
      (err) => {
        console.log("error : " + err);
      }
    )

  }




    Delete(itemToDelete) {
    let index = this.arPerformer.indexOf(itemToDelete);
    this.arPerformer.splice(index, 1);
    console.log(itemToDelete);
    console.log(itemToDelete.Id);
    let url = "http://localhost:52708/api/performer";
    let req = this.http.delete(url + '/' + itemToDelete.Id);
    req.subscribe(rsp => {
      this.performer = rsp.json();
      console.log("success : " + rsp);
     
    }
      ,
      (err) => {
        console.log("error : " + err);
      })
  }

  clickHandlerPost() {
    const body = {
      Name: this.Name, Email: this.Email, Genre: this.Genre, Country: this.Country,
      Alias: this.Alias
    }
    let req = this.http.post("http://localhost:52708/api/performer", body);
    req.subscribe(rsp => {
      if (rsp.status == 201) {
        console.log("success : " + rsp);
      }
      else { console.log("server responded error : " + rsp); }
    },
      (err) => {
        console.log("error : " + err);
      }
    );
  }
}
