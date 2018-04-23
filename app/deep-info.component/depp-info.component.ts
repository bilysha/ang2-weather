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
    items: any;
    labels: any = [];
    dataset: any = [];

    constructor(private service: CitiesService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
            this.cities = this.service.getCities();
    }

    ngOnInit() {
        this.cities = this.service.getCities();
        this.activatedRoute.params.forEach((params) => {
            this.targetCity = this.service.getCity(params['timezone']);
            let that = this;
            let needRequest = true;

            for(let i = 0; i < this.cities.length; i++) {
                if(this.cities[i].timezone === this.targetCity.city) {
                    this.city = this.cities[i];
                    if(!this.city.alreadyParses) {
                        this.normalize();
                        setTimeout(this.display,0, this.city);
                    }
                    needRequest = false;
                }
            }
    
            if(needRequest) {
                this.service.testRequest(this.targetCity.cords, this.targetCity.city)
                .then(function(res) {
                    that.service.insertCity(res.json(), that.targetCity.id - 1);
                    that.city = that.cities[that.service.getIndex(that.targetCity.city)];
                    that.normalize();
                    setTimeout(that.display,0,that.labels, that.dataset);
                })
            }
        });
    }

    normalize() {
        let temperature = Math.floor(parseInt(this.city.daily.summary.match(/\d{1,3}°F/)));
        this.city.daily.summary = this.city.daily.summary.replace(/\d{1,3}°F/, temperature + '°C')
        this.city.alreadyParses = true;
        for(let i = 0; i < this.city.daily.data.length; i++) {
            this.normalizeDay(this.city.daily.data[i])
        }
        for(let i = 0; i < 25; i+= 2) {
            this.city.hourly.data[i].time = new Date(+(this.city.hourly.data[i].time + '000')).toString().slice(16,21);
            this.labels.push(this.city.hourly.data[i].time);
            this.dataset.push(Math.floor(this.city.hourly.data[i].temperature));
        }
        console.log(this.city.hourly);
    }

    normalizeDay(day: any) {
        day.time = new Date(+(day.time + '000'));
        day.time = day.time.toString().slice(0,4).concat(day.time.toString().slice(8,10));
        day.temperatureMax = Math.floor(day.temperatureMax);
        day.temperatureMin = Math.floor(day.temperatureMin);
    }

    change(num: Number) {
        let newIndex = (this.city.id + 3 + num) % 4;
        this.router.navigate(['detail', items[newIndex].city]);
        console.log(this.city);
    }

    display(labels: any, dataset: any) {
        let myChart = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(myChart, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'temperature',
                data: dataset,
                backgroundColor: 'rgba(0, 0, 0,0.2)',
                borderColor: '#282121'
              }]
            },
            options: {}
        });
        console.log(myChart);
    }

}