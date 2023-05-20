import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OpenWeatherService } from './service/openWeather/open-weather.service';
import { CapitalStatesUsaService } from './service/capitalStates/capital-states-usa.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CapitalData } from './models/capitalstates.models';
import { AirPollutionData } from './models/airpollution.models'
import { OpenWeatherMapData } from './models/weather.models';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let weatherService: OpenWeatherService;
  let capitalStatesService: CapitalStatesUsaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, FormsModule, AppRoutingModule],
      providers: [OpenWeatherService, CapitalStatesUsaService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(OpenWeatherService);
    capitalStatesService = TestBed.inject(CapitalStatesUsaService);
  });

  it('should call getWeatherData and set weatherData and weather properties', () => {
    const mockWeatherData: OpenWeatherMapData = {
      "coord": {
        "lon": -112.074,
        "lat": 33.4484
      },
      "weather": [
        {
          "id": 801,
          "main": "Sunny",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 294.91,
        "feels_like": 294.55,
        "temp_min": 292.94,
        "temp_max": 296.59,
        "pressure": 1014,
        "humidity": 54
      },
      "visibility": 10000,
      "wind": {
        "speed": 1.26,
        "deg": 349,
        "gust": 1.67
      },
      "clouds": {
        "all": 14
      },
      "dt": 1684576928,
      "sys": {
        "type": 2,
        "id": 2034302,
        "country": "US",
        "sunrise": 1684585500,
        "sunset": 1684635895
      },
      "timezone": -25200,
      "id": 5308655,
      "name": "Phoenix",
      "cod": 200
    };
    spyOn(weatherService, 'getWeatherData').and.returnValue(of(mockWeatherData));

    component.getWeatherData('Albany', 'New York', 'US');

    expect(weatherService.getWeatherData).toHaveBeenCalledWith('Albany', 'New York', 'US');
    expect(component.weatherData).toEqual(mockWeatherData);
    expect(component.weather).toEqual('Sunny');
  });

  it('should call getAirPollutionData and set airPollutionData and airPollutionText properties', () => {
    const mockAirPollutionData: AirPollutionData = {
      "coord": {
        "lon": -112.074,
        "lat": 33.4484
      },
      "list": [
        {
          "main": {
            "aqi": 2
          },
          "components": {
            "co": 253.68,
            "no": 0.04,
            "no2": 12,
            "o3": 20.74,
            "so2": 1.24,
            "pm2_5": 3.84,
            "pm10": 7.44,
            "nh3": 1.79
          },
          "dt": 1684586219
        }
      ]
    };
    spyOn(weatherService, 'getAirPollutionData').and.returnValue(of(mockAirPollutionData));

    component.getAirPollutionData('42.652843', '-73.757874');

    expect(weatherService.getAirPollutionData).toHaveBeenCalledWith('42.652843', '-73.757874');
    expect(component.airPollutionData).toEqual(mockAirPollutionData);
    expect(component.airPollutionText).toEqual('Fair');
  });

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