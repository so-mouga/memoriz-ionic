import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
