import { Component, Input, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'chartHTML',
  templateUrl: 'chartHTML.component.html',
  styleUrls: ['chartHTML.component.css']
})
export class ChartHTMLComponent implements OnInit{
  @Input() labels;
  @Input() dataset;

  ngOnInit() {
    this.displayHTMLChart();
  }

  displayHTMLChart() {
    console.log(this.labels, this.dataset);
  }
}
