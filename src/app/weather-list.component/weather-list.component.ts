import {Component} from '@angular/core';

import {CitiesService} from '../services/cities.service';

@Component({
  moduleId: module.id,
  selector: 'weather-list',
  templateUrl: 'weather-list.component.html',
  styleUrls: ['weather-list.component.less']
})
export class WeatherListComponent {
  cities: Object[];

  constructor(private citiesService: CitiesService) {
    this.cities = this.citiesService.getCities();
  }

  public getTemperature(temp): number {
    return Math.ceil(temp);
  }
}
