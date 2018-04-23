import { Http, Response } from '@angular/http';
import { Jsonp } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import '../shared/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Injectable()
export class CitiesService {
    cities: any;
    items = Object.assign([],items);

    constructor(private http: Http, private jsonp: Jsonp) {
        this.cities = [];
    }

    getCities() {
        return this.cities;
    }

    makeRequest() {
        for(let i = 0; i < this.cities.length; i++) {
            for(let j = 0; j < this.items.length; j++) {
                if(this.cities[i].timezone === this.items[j].city) {
                    this.items.splice(j, 1);
                    j--;
                }
            }
        }
        for(let i = 0; i < this.items.length; i++) {
            this.sendRequest(this.items[i].cords, this.items[i].id - 1);
        }
    }

    getCity(timezone: string) {
        for(var i = 0; i < this.items.length; i++) {
            if(this.items[i].city === timezone) {
                return this.items[i];
            }
        }
        return this.items[0];
    }

    getIndex(timezone: String) {
        for(var i = 0; i < this.cities.length; i++) {
            if(this.cities[i].timezone === timezone) {
                return i;
            }
        }
        return 0;
    }

    sendRequest(item: String, index: any) {
        let apiURL = url + token + item + callback;
        this.jsonp.request(apiURL)
        .toPromise()
        .then(res => this.insertCity(res.json(), index))
    }

    convertTemperature(temp: any) {
        return Math.floor((temp - 32) * 5 / 9);
    }

    normalizeCurrently(obj: any) {
        obj.temperature = Math.floor(obj.temperature);
        obj.apparentTemperature = Math.floor(obj.apparentTemperature);
        obj.windSpeed = Math.floor(obj.windSpeed);
        if(obj.visibility) {
            obj.visibility = Math.floor(obj.visibility);
        }
        obj.humidity = Math.floor(obj.humidity * 100);
        obj.dewPoint = Math.floor(obj.dewPoint);
        obj.time = new Date(+(obj.time + '000'));
        obj.pressure = Math.floor(obj.pressure);
    }

    insertCity(obj: any, index: any) {
        obj.timezone = items[index].city;
        obj.id = items[index].id;
        this.normalizeCurrently(obj.currently);
        obj.updated = obj.currently.time.toString().slice(16,21);
        this.cities.push(obj);
    }

    testRequest(item: String, city: String) {
        let apiURL = url + token + item + callback;
        return this.jsonp.request(apiURL)
        .toPromise()
    }

}
