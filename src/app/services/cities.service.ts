import { Jsonp, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { NormalizeService } from './normalize.service';

import { items, token, callback, url } from '../shared/constants';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CitiesService {
    cities: any;
    items = Object.assign([], items);

    constructor(private jsonp: Jsonp,
                private normalize: NormalizeService) {
        this.cities = JSON.parse(localStorage.getItem('userCities'));
        if(this.cities == null) {
            this.cities = Object.assign([],items);
        }
        console.log(this.cities);
    }

    getCities() {
        return this.cities;
    }

    uploadCities() {
        localStorage.setItem('userCities', JSON.stringify(items));
    }

    getCity(timezone: String) {
        for(var i = 0; i < items.length; i++) {
            if(items[i].city === timezone) {
                return items[i];
            }
        }
        return timezone == undefined ? items[0] : 'not';
    }

    getIndex(timezone: String) {
        for(var i = 0; i < this.cities.length; i++) {
            if(this.cities[i].timezone === timezone) {
                return i;
            }
        }
        return 0;
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
        this.cities.splice(index, 1, obj);
    }

    getData() {
        let xhr = new XMLHttpRequest();

        xhr.open('GET','resourses/city.list.json', false);

        xhr.send();

        if(xhr.status != 200 ) {
            console.log('error')
        }
        else {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            let count = 0;
            let start = Date.now();
            for(let i = 0; i < data.length; i++) {
                if(data[i].country === "RU") {
                    count++;
                }
            }
            console.log(start - Date.now());
            console.log("ru cities -> ", count)
        }
    }
}
