import { Component, Input, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';

@Component({
  moduleId: module.id,
  selector: 'weather-item',
  templateUrl: 'weather-item.component.html',
  styleUrls: ['weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() city: any;
  isEmpty: Boolean;

  constructor(private citiesService: CitiesService) {
    this.isEmpty = true;
  }

  ngOnInit() {
    if (Object.keys(this.city).length === 3) {
      this.citiesService.getRequest(this.city.cords, this.city.id)
      .then(res => this.citiesService.insertCity(res.json(),this.city.id - 1));
    } else {
      this.isEmpty = false;
    }
  }
}
