import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OpenWeatherMapData } from './models/weather.models';
import { AirPollutionData, List } from './models/airpollution.models';
import { CapitalData } from './models/capitalstates.models';
import { OpenWeatherService } from './service/openWeather/open-weather.service';
import { CapitalStatesUsaService } from './service/capitalStates/capital-states-usa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  title = environment.title;
  weatherData?: OpenWeatherMapData
  airPollutionData?: AirPollutionData
  selectCity: string = 'Albany'
  selectState: string = 'New York'
  selectContry: string = 'US'
  selectLon: string = '-73.757874'
  selectLat: string = '42.652843'
  weather?: string
  airPollutionText?: string
  capitalStatesList?: CapitalData[] 
  filterCapital: string = ''

  constructor(private weatherService: OpenWeatherService, private capitalStatesService: CapitalStatesUsaService) {
    this.getCapitalState()
  }

  ngOnInit(): void {
    this.getWeatherData(this.selectCity, this.selectState, this.selectContry)
    this.getAirPollutionData(this.selectLat, this.selectLon)
  }

  submitLocation() {
    this.getWeatherData(this.selectCity, this.selectState, this.selectContry)
    this.getAirPollutionData(this.selectLat, this.selectLon)
  }

  getWeatherData(city: string, state: string, contry: string) {
    this.weatherService.getWeatherData(city, state, contry).subscribe(
      {
        next: (response) => {
          this.weatherData = response
          this.weather = this.weatherData?.weather[0].main
        }
      }
    )
  }

  getAirPollutionData(lat: string, lon: string) {
    this.weatherService.getAirPollutionData(lat, lon).subscribe(
      {
        next: (response) => {
          this.airPollutionData = response

          switch (this.airPollutionData.list[0].main.aqi) {
            case 1:
              this.airPollutionText = 'Good'
              break;
            case 2:
              this.airPollutionText = 'Fair'
              break;
            case 3:
              this.airPollutionText = 'Moderate'
              break;
            case 4:
              this.airPollutionText = 'Poor'
              break;
            case 5:
              this.airPollutionText = 'Very Poor'
              break;
            default:
              break;
          }
        },
      }
    )
  }

  getCapitalState(){
    this.capitalStatesService.getListCapitalStates().subscribe(
      {
        next: (response) => {
          if(this.filterCapital){
            this.capitalStatesList = response.filter( (item) => (
              item.name.toUpperCase().indexOf(this.filterCapital.toUpperCase()) > -1
            )).sort((a,b) => a.name.localeCompare(b.name))
          } else {
            this.capitalStatesList = response.sort((a,b) => a.name.localeCompare(b.name));
          }
        }
      }
    )
  }

}
