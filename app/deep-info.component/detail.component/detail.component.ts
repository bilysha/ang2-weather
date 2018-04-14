import { Component, Input } from '@angular/core';

import { CitiesService } from '../../services/cities.service';

@Component({
    moduleId: module.id,
    selector: 'detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['detail.component.css']
})
export class DetailComponent {
    @Input() day: any;

    constructor(private service: CitiesService) {}

    ngOnInit() {
        if(!this.day.alreadyParsed) {
            this.day.alreadyParsed = true;
            this.day.time = new Date(+(this.day.time + '000'));
            this.day.time = this.day.time.toString().slice(4,10);

            this.day.temperatureMax = this.service.convertTemperature(this.day.temperatureMax);
            this.day.temperatureMin = this.service.convertTemperature(this.day.temperatureMin);
        }
    }

}