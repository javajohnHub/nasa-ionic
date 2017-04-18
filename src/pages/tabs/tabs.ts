import { Component } from '@angular/core';

import {ApodComponent} from "../nasa/apod.component";
import {MarsComponent} from "../nasa/mars.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ApodComponent;
  tab2Root = MarsComponent;

  constructor() {

  }
}
