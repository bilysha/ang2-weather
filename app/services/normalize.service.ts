import { Injectable } from '@angular/core';

@Injectable()
export class NormalizeService {
    
    currently(obj: any) {
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

    daily(obj: any) {
        let temperature = Math.floor(parseInt(obj.daily.summary.match(/\d{1,3}°F/)));
        obj.daily.summary = obj.daily.summary.replace(/\d{1,3}°F/, temperature + '°C')
        obj.alreadyParses = true;
        obj.labels = [];
        obj.dataset = [];
        for(let i = 0; i < obj.daily.data.length; i++) {
            this.day(obj.daily.data[i])
        }
        for(let i = 0; i < 25; i+= 2) {
            obj.hourly.data[i].time = new Date(+(obj.hourly.data[i].time + '000')).toString().slice(16,21);
            obj.labels.push(obj.hourly.data[i].time);
            obj.dataset.push(Math.floor(obj.hourly.data[i].temperature));
        }
    }

    day(day: any) {
        day.time = new Date(+(day.time + '000'));
        day.time = day.time.toString().slice(0,4).concat(day.time.toString().slice(8,10));
        day.temperatureMax = Math.floor(day.temperatureMax);
        day.temperatureMin = Math.floor(day.temperatureMin);
    }

    dayDetail(day: any) {
        day.dewPoint = Math.floor(day.dewPoint);
        day.humidity = Math.floor(day.humidity * 100);
        day.cloudCover = Math.floor(day.cloudCover * 100);

        day.sunriseTime = new Date(+(day.sunriseTime + '000'));
        day.sunriseTime = day.sunriseTime.toString().slice(15,24);

        day.sunsetTime = new Date(+(day.sunsetTime + '000'));
        day.sunsetTime = day.sunsetTime.toString().slice(15,24);

        day.pressure = Math.floor(day.pressure);
    }

}