import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OpenWeatherService } from './service/openWeather/open-weather.service';
import { CapitalStatesUsaService } from './service/capitalStates/capital-states-usa.service';
import { of } from 'rxjs';
import * as fileMockWeatherData from 'src/app/test/mock/weatherData.mock.json';
import {OpenWeatherMapData} from './models/weather.models'
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapitalData } from './models/capitalstates.models';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let weatherService: OpenWeatherService;
  let capitalStatesService: CapitalStatesUsaService;
  let http: HttpClient
  

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule], 
      providers: [OpenWeatherService, CapitalStatesUsaService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(OpenWeatherService);
    capitalStatesService = TestBed.inject(CapitalStatesUsaService);
  });

  it('should call getWeatherData and set weatherData and weather properties', () => {
    const mockWeatherData = http.get<OpenWeatherMapData>('src/app/test/mock/weatherData.mock.json');
    spyOn(weatherService, 'getWeatherData').and.returnValue(mockWeatherData);

    component.getWeatherData('Albany', 'New York', 'US');

    expect(weatherService.getWeatherData).toHaveBeenCalledWith('Albany', 'New York', 'US');
    //expect(component.weatherData).toEqual(mockWeatherData);
    expect(component.weather).toEqual('Sunny');
  });

  // it('should call getAirPollutionData and set airPollutionData and airPollutionText properties', () => {
  //   const mockAirPollutionData = { list: [{ main: { aqi: 2 } }] };
  //   spyOn(weatherService, 'getAirPollutionData').and.returnValue(of(mockAirPollutionData));

  //   component.getAirPollutionData('42.652843', '-73.757874');

  //   expect(weatherService.getAirPollutionData).toHaveBeenCalledWith('42.652843', '-73.757874');
  //   expect(component.airPollutionData).toEqual(mockAirPollutionData);
  //   expect(component.airPollutionText).toEqual('Fair');
  // });

  it('should call getCapitalState and set capitalStatesList property', () => {
    const mockCapitalStates: CapitalData[] = [
      {
          "contry": "US",
          "state": "Alabama",
          "name": "Montgomery",
          "coord": {
              "lat": "32.377716",
              "lon": "-86.300568"
          }
      }];
    spyOn(capitalStatesService, 'getListCapitalStates').and.returnValue(of(mockCapitalStates));

    component.getCapitalState();

    expect(capitalStatesService.getListCapitalStates).toHaveBeenCalled();
    expect(component.capitalStatesList).toEqual(mockCapitalStates);
  });
});