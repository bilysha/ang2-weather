import {Component, Input, OnChanges} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'chartHTML',
  templateUrl: 'chartHTML.component.html',
  styleUrls: ['chartHTML.component.css']
})
export class ChartHTMLComponent implements OnChanges {
  @Input() labels;
  @Input() dataset;
  @Input() icons;

  displayHTMLChart(dataset, labels, icons) {
    //console.log(dataset, labels, icons);
  }

  ngOnChanges() {
    this.displayHTMLChart(this.dataset, this.labels, this.icons);
  }
}
