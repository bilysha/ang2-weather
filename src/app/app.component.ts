import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isExpanded: boolean = false;

  public toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }
}
