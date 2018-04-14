import { Component } from '@angular/core';

import { CitiesService } from '../services/cities.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'deep-info',
    templateUrl: 'deep-info.component.html',
    styleUrls: ['deep-info.component.css']
})
export class WeatherDeepInfoComponent {

    cities: Object[];
    activeCity: any;

    constructor(private service: CitiesService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.cities = [];
    }

    ngOnInit() {
        this.cities = this.service.getCities();
        this.activatedRoute.params.forEach((params) => {
            this.activeCity = this.service.getCity(+params['id']);
        })
        for(var i = 0; i < this.cities.length; i++) {
            this.isActive(this.cities[i]);
        }
    }

    select(id: any) {
        this.router.navigate(['detail', id]);
    }

    isActive(city: any) {
        return city.id === this.activeCity.id;
    }
}