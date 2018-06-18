import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeveloperInfoComponent } from './developer-info.component/developer-info.component';
import { WeatherListComponent } from './weather-list.component/weather-list.component';
import { AboutPageComponent } from './about-page.component/about-page.component';
import { WeatherItemComponent } from './weather-list.component/weather-item.component/weather-item.component';
import { WeatherDetailInfoComponent } from './detail-info.component/detail-info.component';
import { WeekComponent } from './detail-info.component/week.component/week.component';
import { ChartHTMLComponent } from './detail-info.component/chartHTML.component/chartHTML.component';

import { OopsComponent } from './oops.component/oops.component';

import { CitiesService } from './services/cities.service';
import { NormalizeService } from './services/normalize.service';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'home', component: WeatherListComponent},
            {path: 'detail', component: WeatherDetailInfoComponent},
            {path: 'detail/:timezone', component: WeatherDetailInfoComponent},
            {path: 'developer', component: DeveloperInfoComponent},
            {path: 'about', component: AboutPageComponent},
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: '**', component: OopsComponent}
        ]),
        JsonpModule
    ],
    declarations: [
        AppComponent,
        DeveloperInfoComponent,
        WeatherListComponent,
        AboutPageComponent,
        WeatherItemComponent,
        WeatherDetailInfoComponent,
        OopsComponent,
        WeekComponent,
        ChartHTMLComponent
    ],
    providers: [CitiesService, NormalizeService],
    bootstrap: [AppComponent]
})
export class AppModule {

}

