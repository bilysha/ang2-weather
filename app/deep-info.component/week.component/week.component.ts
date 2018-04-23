import { Component, Input } from '@angular/core';
import { CitiesService } from '../../services/cities.service';

@Component({
    moduleId: module.id,
    selector: 'week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.css']
})
export class WeekComponent {
    @Input() city:any;

    activeDay:any;

    constructor(private service: CitiesService) {}

    normalize(day: any) {
        day.dewPoint = Math.floor(day.dewPoint);
        day.humidity = Math.floor(day.humidity * 100);
        day.cloudCover = Math.floor(day.cloudCover * 100);

        day.sunriseTime = new Date(+(day.sunriseTime + '000'));
        day.sunriseTime = day.sunriseTime.toString().slice(15,24);

        day.sunsetTime = new Date(+(day.sunsetTime + '000'));
        day.sunsetTime = day.sunsetTime.toString().slice(15,24);

        day.pressure = Math.floor(day.pressure);
    }

    select(day: any) {
        if(this.activeDay == day) {
            this.activeDay = undefined;
            return;
        }
        if(!day.alreadyParsed) {
            day.alreadyParsed = true;
            this.normalize(day);
        }
        this.activeDay = day;
        console.log(this.activeDay)
    }

    ngOnChanges() {
        this.activeDay = undefined;
    }
}