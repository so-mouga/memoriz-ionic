import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  applicationName = environment.application_name;
  slideOpts = {
    speed: 900,
  };

  constructor() {}

  ngOnInit() {}

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
}
