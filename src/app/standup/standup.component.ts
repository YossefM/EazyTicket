import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { EventComponent } from '../Event/event.component';
import { PerformerComponent } from '../Performer/performer.component';
import { Auth } from '../auth/auth.service';
@Component({
    moduleId: module.id,
    selector: 'standup',
    templateUrl: `./standup.component.html`,
    styleUrls: ['./standup.component.css'],
    providers: [EventComponent, PerformerComponent]
})


export class StandupComponent {
    arItems: any[];
    archeck: any[];
    loadOk = false;
    search = false;
    selectedEvent() {
        alert("Please call to +972 3-642-42-42 to do your order")
    }
    constructor(private http: Http, public eventComponent: EventComponent,
        public performerComponent: PerformerComponent, private auth: Auth) {
                this.auth.authenticated();
        this.http.get("http://localhost:52708/api/event")
            .subscribe(rsp => {
                if (rsp.status == 200) {
                    this.archeck = rsp.json();
                    console.log(this.archeck)
                    this.arItems = this.archeck.filter(value => value.Genre === 'Standup')
                    console.log(this.arItems)
                    this.loadOk = true;
                }
                else { console.log("server responded error : " + rsp); }
            },
            (err) => {
                console.log("error : " + err);
            });


    }

}











