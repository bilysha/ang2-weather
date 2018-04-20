import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { AppComponent } from './app.component/app.component';
import { DeveloperInfoComponent } from './developer-info.component/developer-info.component';
import { WeatherListComponent } from './weather-list.component/weather-list.component';
import { AboutPageComponent } from './about-page.component/about-page.component';
import { WeatherItemComponent } from './weather-item.component/weather-item.component';
import { WeatherDeepInfoComponent } from './deep-info.component/depp-info.component';
import { WeekComponent } from './deep-info.component/week.component/week.component';

import { OopsComponent } from './oops.component/oops.component';

import { CitiesService } from './services/cities.service';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'home', component: WeatherListComponent},
            {path: 'detail', component: WeatherDeepInfoComponent},
            {path: 'detail/:timezone', component: WeatherDeepInfoComponent},
            {path: 'developer', component: DeveloperInfoComponent},
            {path: 'about', component: AboutPageComponent},
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: '**', component: OopsComponent}
        ]),
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        DeveloperInfoComponent,
        WeatherListComponent,
        AboutPageComponent,
        WeatherItemComponent,
        WeatherDeepInfoComponent,
        OopsComponent,
        WeekComponent
    ],
    providers: [CitiesService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
