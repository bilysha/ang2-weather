import { Http, Response } from '@angular/http';
import { Jsonp } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import '../shared/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CitiesService {
    cities: any;
    items = items;

    constructor(private http: Http, private jsonp: Jsonp) {
        this.cities = [];
    }

    getCities() {
        if(!this.cities.length) {
            for(let i = 0; i < items.length; i++) {
                this.sendRequest(this.items[i].cords, i);
            }
        }
        return this.cities;
    }

    getCity(id: Number) {
        for(var i = 0; i < this.cities.length; i++) {
            if(this.cities[i].id === id) {
                return this.cities[i];
            }
        }
        return this.cities[0];
    }

    sendRequest(item: String, index: any) {
        this.http.get(url + token + item)
        .toPromise()
        .then(res => this.insertCity(res.json(), index))
        .catch(res => console.error('Request ends with status : ', res.status));
    }

    convertTemperature(temp: any) {
        return Math.floor((temp - 32) * 5 / 9);
    }

    normalizeCurrently(obj: any) {
        obj.temperature = this.convertTemperature(obj.temperature);
        obj.apparentTemperature = this.convertTemperature(obj.apparentTemperature);
        obj.windSpeed = Math.floor(obj.windSpeed);
        if(obj.visibility) {
            obj.visibility = Math.floor(obj.visibility);
        }
        obj.humidity = Math.floor(obj.humidity * 100);
        obj.dewPoint = this.convertTemperature(obj.dewPoint);
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

}
