import { Component, Input } from '@angular/core';
import { CitiesService } from '../../services/cities.service';

import { NormalizeService } from '../../services/normalize.service';

@Component({
    moduleId: module.id,
    selector: 'week',
    templateUrl: 'week.component.html',
    styleUrls: ['week.component.css']
})
export class WeekComponent {
    @Input() city: any;

    activeDay: any;

    constructor(private normalize: NormalizeService) {}

    select(day: any) {
        if (this.activeDay === day) {
            this.activeDay = undefined;
            return;
        }
        if (!day.alreadyParsed) {
            day.alreadyParsed = true;
            this.normalize.dayDetail(day);
        }
        this.activeDay = day;
    }

    ngOnChanges() {
        this.activeDay = undefined;
    }
}
