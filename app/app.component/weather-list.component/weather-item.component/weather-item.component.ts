import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'weather-item',
    templateUrl: 'weather-item.component.html',
    styleUrls: ['weather-item.component.css']
})
export class WeatherItemComponent {
    @Input() city: Object;
}