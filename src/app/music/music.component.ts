import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { EventComponent } from '../Event/event.component';
import { PerformerComponent } from '../Performer/performer.component';
import {Auth} from '../auth/auth.service';
@Component({
        moduleId: module.id,
    selector: 'music',
    templateUrl: `./music.component.html`,
    styleUrls: ['./music.component.css'],
    providers: [EventComponent, PerformerComponent]
})


export class MusicComponent {
    arItems: any[];
    arEvents: any[];
    archack: any[];
    loadOk = false;
    search = false;
    url = "http://localhost:52708/api/music";
    
    GetM() {
        return this.http.get(this.url);
    }
     selectedEvent(){
           alert("Please call to +972 3-642-42-42 to do your order") 
    }
    constructor(private http: Http, public eventComponent: EventComponent,
        public performerComponent: PerformerComponent, private auth: Auth) {
                   this.auth.authenticated();
        this.http.get("http://localhost:52708/api/event")

            .subscribe(rsp => {
                if (rsp.status == 200) {
                    this.archack = rsp.json();
                    console.log(this.archack)
                    this.arEvents = this.archack.filter(value => value.Genre === 'Music')
                    console.log(this.arEvents)
                    this.loadOk = true;
                }
                else { console.log("server responded error : " + rsp); }
            },
            (err) => {
                console.log("error : " + err);
            });     
    }

  
}











