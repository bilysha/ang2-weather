import { Component, Input, OnInit, OnChanges } from '@angular/core';

import * as d3 from 'd3';

@Component({
  moduleId: module.id,
  selector: 'chartHTML',
  templateUrl: 'chartHTML.component.html',
  styleUrls: ['chartHTML.component.css']
})
export class ChartHTMLComponent implements OnInit, OnChanges {
  @Input() labels;
  @Input() dataset;
  @Input() icons;

  ngOnInit() {
    setTimeout(this.displayHTMLChart, 0, this.dataset, this.labels, this.icons);
  }

  displayHTMLChart(dataset, labels, icons) {
    document.getElementsByClassName('chart-container')[0].innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dataset.length; i += 2) {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      const data = document.createElement('p');
      data.classList.add('temperature');
      data.innerHTML = '+' + dataset[i] + '°';
      bar.appendChild(data);
      const bottom = document.createElement('div');
      const icon = document.createElement('img');
      icon.src = './assets/weather-icons/dark/' + icons[i] + '.png';
      bottom.appendChild(icon);
      const label = document.createElement('p');
      label.innerHTML = labels[i];
      bottom.appendChild(label);
      bar.appendChild(bottom);
      bar.style.height = dataset[i] * 10 + 'px';
      fragment.appendChild(bar);
    }
    document.getElementsByClassName('chart-container')[0].appendChild(fragment);
  }

  ngOnChanges() {
    this.displayHTMLChart(this.dataset, this.labels, this.icons);
  }
}
