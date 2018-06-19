import { Component } from '@angular/core';

import { CitiesService } from '../services/cities.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'weather-list',
  templateUrl: 'weather-list.component.html',
  styleUrls: ['weather-list.component.css']
})
export class WeatherListComponent {
  cities: Object[];

  constructor(private citiesService: CitiesService,
              private router: Router) {
    this.cities = this.citiesService.getCities();
  }

  select(timezone: String) {
    this.router.navigate(['detail', timezone]);
  }
}
