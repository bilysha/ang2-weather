import { Jsonp, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import '../shared/constants';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { NormalizeService } from './normalize.service';

@Injectable()
export class CitiesService {
    cities: any;
    items = Object.assign([],items);

    constructor(private jsonp: Jsonp,
                private normalize: NormalizeService) {
        this.cities = [];
    }

    getCities() {
        return this.cities;
    }

    getCity(timezone: String) {
        for(var i = 0; i < items.length; i++) {
            if(items[i].city === timezone) {
                return items[i];
            }
        }
        return items[0];
    }

    getIndex(timezone: String) {
        for(var i = 0; i < this.cities.length; i++) {
            if(this.cities[i].timezone === timezone) {
                return i;
            }
        }
        return 0;
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

    sendRequest(item: String, index: any) {
        let apiURL = url + token + item + callback;
        this.jsonp.request(apiURL)
        .toPromise()
        .then(res => this.insertCity(res.json(), index))
    }

    getRequest(item: String, city: String) {
        let apiURL = url + token + item + callback;
        return this.jsonp.request(apiURL)
        .toPromise()
    }

    insertCity(obj: any, index: any) {
        obj.timezone = items[index].city;
        obj.id = items[index].id;
        this.normalize.currently(obj.currently);
        obj.updated = obj.currently.time.toString().slice(16,21);
        this.cities.push(obj);
    }
    
}
