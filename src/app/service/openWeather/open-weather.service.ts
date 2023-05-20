import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OpenWeatherMapData } from 'src/app/models/weather.models';
import { AirPollutionData } from 'src/app/models/airpollution.models';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city: string, state: string, country: string): Observable <OpenWeatherMapData> {
    return this.http.get<OpenWeatherMapData>(environment.apiOpenWeatherMapURL, {
      params: new HttpParams()
      .set('q', city+','+state+','+country)
      .set('units', 'metric')
      .set('appid', environment.apiOpenWeatherMapKey)
      .set('mode', 'json')
    })
  }

  getAirPollutionData(lat: string, lon: string): Observable <AirPollutionData> {
    return this.http.get<AirPollutionData>(environment.apiOpenWeatherMapAirPollutionURL, {
      params: new HttpParams()
      .set('lon', lon)
      .set('lat', lat)
      .set('appid', environment.apiOpenWeatherMapKey)
      .set('mode', 'json')
    })
  }
}
