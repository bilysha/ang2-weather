import { Component, Input, OnChanges } from '@angular/core';

import { NormalizeService } from '../../services/normalize.service';

@Component({
  moduleId: module.id,
  selector: 'week',
  templateUrl: 'week.component.html',
  styleUrls: ['week.component.less']
})
export class WeekComponent implements OnChanges {
    @Input() city: any;
    activeDay: any;

    constructor(private normalize: NormalizeService) {}

    select(day: any) {
      if (this.activeDay === day) {
        return;
      }
      if (!day.alreadyParsed) {
        day.alreadyParsed = true;
        this.normalize.dayDetail(day);
      }
      this.activeDay = day;
    }

    ngOnChanges() {
      this.activeDay = this.city.daily.data[0];
    }
}
