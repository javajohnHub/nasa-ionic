import {Component, OnInit} from '@angular/core';
import {NasaService} from '../../services/nasa';


@Component({
  selector: 'mars-component',
  template: `
    <ion-header text-center><ion-title>Mars Curiosity Rover</ion-title></ion-header><br/>
    <ion-content padding>
      <ion-card padding>
      <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime displayFormat="YYYY-MM-DD"  (ionChange)="getMars(today)" [(ngModel)]="today"></ion-datetime>
      </ion-item>
      </ion-card>
      <h3 text-center *ngIf="mars == 0">No Photos Found!</h3>
      <ion-card *ngFor="let photo of mars">
    <img *ngIf="photo" src="{{photo.img_src}}">
    
        </ion-card>
</ion-content>
`,
})

export class MarsComponent implements OnInit {
  mars: any;
  today;
  constructor(private _nasaService: NasaService,){
    this.mars = 0;
  }
  ngOnInit(){
    this.today = new Date().toISOString().slice(0,10);
    this.getMars(this.today);
  }

  getMars(date: string){
    this._nasaService.getMars(date)
      .subscribe(data => {this.mars = data;console.log(this.mars);})
  }





}
