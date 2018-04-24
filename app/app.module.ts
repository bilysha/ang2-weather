import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component/app.component';
import { DeveloperInfoComponent } from './app.component/developer-info.component/developer-info.component';
import { WeatherListComponent } from './app.component/weather-list.component/weather-list.component';
import { AboutPageComponent } from './app.component/about-page.component/about-page.component';
import { WeatherItemComponent } from './app.component/weather-list.component/weather-item.component/weather-item.component';
import { WeatherDetailInfoComponent } from './app.component/detail-info.component/detail-info.component';
import { WeekComponent } from './app.component/detail-info.component/week.component/week.component';

import { OopsComponent } from './app.component/oops.component/oops.component';

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
        WeekComponent
    ],
    providers: [CitiesService, NormalizeService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
