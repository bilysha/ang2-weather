import { Component } from '@angular/core';

import { CitiesService } from '../../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router';

import '../../shared/constants'

import { NormalizeService } from '../../services/normalize.service';

@Component({
    moduleId: module.id,
    selector: 'detail-info',
    templateUrl: 'detail-info.component.html',
    styleUrls: ['detail-info.component.css']
})
export class WeatherDetailInfoComponent {

    cities: any;
    city: any;
    targetCity: any;
    items: any;

    constructor(private service: CitiesService, 
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private normalize: NormalizeService) {
        this.cities = this.service.getCities();
    }

    ngOnInit() {
        this.cities = this.service.getCities();
        this.activatedRoute.params.forEach((params) => {
            this.targetCity = this.service.getCity(params['timezone']);
            if(this.targetCity === 'not') {      
                this.router.navigate(['invalid']);
                return;
            }
            let that = this;
            let needRequest = true;

            for(let i = 0; i < this.cities.length; i++) {
                if(this.cities[i].timezone === this.targetCity.city) {
                    this.city = this.cities[i];
                    if(!this.city.alreadyParses) {
                        this.normalize.daily(this.city);
                    }
                    needRequest = false;
                    setTimeout(this.display,0, this.city);
                }
            }
    
            if(needRequest) {
                this.service.getRequest(this.targetCity.cords, this.targetCity.city)
                .then(function(res) {
                    that.service.insertCity(res.json(), that.targetCity.id - 1);
                    that.city = that.cities[that.service.getIndex(that.targetCity.city)];
                    that.normalize.daily(that.city);
                    setTimeout(that.display, 0, that.city);
                })
            }
        });
    }

    changeCity(num: Number) {
        let newIndex = (this.city.id + 3 + num) % 4;
        this.router.navigate(['detail', items[newIndex].city]);
    }

    display(city: any) {

        let canvas: any = document.getElementById('myChart');
        let myChart = canvas.getContext('2d');
        myChart = new Chart(myChart, {
            type: 'bar',
            data: {
              labels: city.labels,
              datasets: [{
                label: 'temperature',
                data: city.dataset,
                backgroundColor: '#c7c7c7',
                hoverBackgroundColor: '#383838',
                borderColor: '#383838'
              }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

}