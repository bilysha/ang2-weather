import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CitiesService} from '../../services/cities.service';

@Component({
  moduleId: module.id,
  selector: 'weather-item',
  templateUrl: 'weather-item.component.html',
  styleUrls: ['weather-item.component.less']
})
export class WeatherItemComponent implements OnInit {
  @Input() city: any;
  isEmpty: Boolean;
  isFlipped: boolean = false;

  constructor(private citiesService: CitiesService, private router: Router) {
    this.isEmpty = true;
  }

  ngOnInit() {
    if (Object.keys(this.city).length === 3) {
      this.citiesService.getRequest(this.city.cords, this.city.id)
        .then(res => this.citiesService.insertCity(res.json(), this.city.id - 1));
    } else {
      this.isEmpty = false;
    }
  }

  public flipCity(): void {
    this.isFlipped = !this.isFlipped;
  }

  public onDetailBtnClick(event: Event): void {
    event.stopPropagation();

    this.router.navigate(['detail', this.city.timezone]);
  }
}
