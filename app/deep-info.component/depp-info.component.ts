import { Component } from '@angular/core';

import { CitiesService } from '../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router';

import '../shared/constants'

@Component({
    moduleId: module.id,
    selector: 'deep-info',
    templateUrl: 'deep-info.component.html',
    styleUrls: ['deep-info.component.css']
})
export class WeatherDeepInfoComponent {

    cities: any;
    city: any;
    targetCity: any;

    constructor(private service: CitiesService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
            this.cities = this.service.getCities();
    }

    ngOnInit() {
        console.log('detail   ', this.cities);
        this.activatedRoute.params.forEach((params) => {
            this.targetCity = this.service.getCity(params['timezone']);
            console.log('target city' ,this.targetCity);
            let that = this;
            let needRequest = true;

            for(let i = 0; i < this.cities.length; i++) {
                if(this.cities[i].timezone === this.targetCity.city) {
                    this.city = this.cities[i];
                    if(!this.city.alreadyParses) {
                        this.normalize();
                    }
                    needRequest = false;
                }
            }
    
            if(needRequest) {
                this.service.testRequest(this.targetCity.cords, this.targetCity.city)
                .then(function(res) {
                    that.service.insertCity(res.json(), that.targetCity.id - 1);
                    that.city = that.cities[that.service.getIndex(that.targetCity.city)];
                    console.log(that.city);
                    that.normalize();
                })
            }  

        });
    }

    normalize() {
        let temperature = this.service.convertTemperature(parseInt(this.city.daily.summary.match(/\d{1,3}°F/)));
        this.city.daily.summary = this.city.daily.summary.replace(/\d{1,3}°F/, temperature + '°C')
        this.city.alreadyParses = true;
        for(let i = 0; i < this.city.daily.data.length; i++) {
            this.normalizeDay(this.city.daily.data[i])
        }
    }

    normalizeDay(day: any) {
        day.time = new Date(+(day.time + '000'));
        day.time = day.time.toString().slice(0,4).concat(day.time.toString().slice(8,10));

        day.temperatureMax = this.service.convertTemperature(day.temperatureMax);
        day.temperatureMin = this.service.convertTemperature(day.temperatureMin);
    }

    change(num: Number) {
        let newIndex = (this.city.id + 3 + num) % 4;
        this.router.navigate(['detail', items[newIndex].city]);
    }
}