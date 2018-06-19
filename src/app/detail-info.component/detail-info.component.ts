import { Component, OnInit } from '@angular/core';

import { CitiesService } from '../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router';

import { items } from '../shared/constants';

import { NormalizeService } from '../services/normalize.service';

@Component({
  moduleId: module.id,
  selector: 'detail-info',
  templateUrl: 'detail-info.component.html',
  styleUrls: ['detail-info.component.css']
})
export class WeatherDetailInfoComponent implements OnInit {
    cities: any;
    city: any;
    targetCity: any;
    items: any;
    isReadyChart: Boolean = false;

    constructor(private service: CitiesService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private normalize: NormalizeService) {
      this.cities = this.service.getCities();
      this.isReadyChart = false;
      this.items = items;
    }

    ngOnInit() {
      this.cities = this.service.getCities();
      this.activatedRoute.params.forEach((params) => {
        this.targetCity = this.service.getCity(params['timezone']);
        if (this.targetCity === 'not') {
          this.router.navigate(['invalid']);
          return;
        }
        const that = this;
        let needRequest = true;

        for (let i = 0; i < this.cities.length; i++) {
          if (this.cities[i].timezone === this.targetCity.city) {
            this.city = this.cities[i];
            if (!this.city.alreadyParses) {
              this.normalize.daily(this.city);
            }
            this.isReadyChart = true;
            needRequest = false;
          }
        }

        if (needRequest) {
          this.service.getRequest(this.targetCity.cords, this.targetCity.city)
          .then(function(res) {
            that.service.insertCity(res.json(), that.targetCity.id - 1);
            that.city = that.cities[that.service.getIndex(that.targetCity.city)];
            that.normalize.daily(that.city);
            that.isReadyChart = true;
          });
        }
      });
    }

    changeCity(city: string) {
      this.router.navigate(['detail', city]);
    }
}
