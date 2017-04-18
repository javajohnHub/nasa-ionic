import {Component, OnInit } from '@angular/core';
import {NasaService} from '../../services/nasa';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'apod-component',
  template: `
    <ion-header text-center><ion-title>{{title}}</ion-title></ion-header><br/>
    <ion-content padding>
      <ion-card padding>
          <ion-list>
          <ion-item>
            <ion-label>Date</ion-label>
            <ion-datetime displayFormat="YYYY-MM-DD" min="1995-06-16" #date (ionChange)="getApod(today)" [(ngModel)]="today"></ion-datetime>
          </ion-item>
          </ion-list>
      </ion-card>
          <ion-card>
        <img *ngIf="media_type == 'image'" src="{{hdurl}}"/>
        <div *ngIf="media_type == 'video'" class="video-container">
          <iframe  [src]="videoUrl"
                   width="560" height="315" frameborder="0" allowfullscreen align="middle">
          </iframe>
        </div>
        
        <small><span *ngIf="copyright">{{copyright}}</span></small>
      </ion-card>
      <ion-card><p id="explanation">{{explanation}}</p></ion-card>
    </ion-content>
    

  `,
})

export class ApodComponent implements OnInit {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  title: string;
  url: string;
  videoUrl: any;
  today;

  constructor(private _nasaService: NasaService, private sanitizer: DomSanitizer){


  }
  ngOnInit(){
    this.today = new Date().toISOString().slice(0,10);
    this.getApod(this.today);
  }

  getApod(date: string){
    this._nasaService.getAPOD(date)
      .subscribe(data => {
        this.copyright = data.copyright;
        this.date = data.date;
        this.explanation = data.explanation;
        this.hdurl = data.hdurl;
        this.media_type = data.media_type;
        this.title = data.title;
        this.url = data.url;
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      })
  }



}
