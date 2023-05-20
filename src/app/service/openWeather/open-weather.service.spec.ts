import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpenWeatherService } from './open-weather.service';
import { environment } from 'src/environments/environment';
import { OpenWeatherMapData } from 'src/app/models/weather.models';
import { AirPollutionData } from 'src/app/models/airpollution.models';

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenWeatherService],
    });
    service = TestBed.inject(OpenWeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve weather data', () => {
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

    const city = 'Albany';
    const state = 'New York';
    const country = 'US';

    service.getWeatherData(city, state, country).subscribe((weatherData) => {
      expect(weatherData).toEqual(mockWeatherData);
    });

    const request = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?q=Albany,New%20York,US&units=metric&appid=3847f1a3160306ef1dfe2ca5ca350579&mode=json');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('q')).toBe(`${city},${state},${country}`);
    expect(request.request.params.get('units')).toBe('metric');
    expect(request.request.params.get('appid')).toBe(environment.apiOpenWeatherMapKey);
    expect(request.request.params.get('mode')).toBe('json');
    request.flush(mockWeatherData);
  });

  it('should retrieve air pollution data', () => {
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

    const lat = '42.652843';
    const lon = '-73.757874';

    service.getAirPollutionData(lat, lon).subscribe((airPollutionData) => {
      expect(airPollutionData).toEqual(mockAirPollutionData);
    });

    const request = httpMock.expectOne('http://api.openweathermap.org/data/2.5/air_pollution?lon=-73.757874&lat=42.652843&appid=3847f1a3160306ef1dfe2ca5ca350579&mode=json');
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('lat')).toBe(lat);
    expect(request.request.params.get('lon')).toBe(lon);
    expect(request.request.params.get('appid')).toBe(environment.apiOpenWeatherMapKey);
    expect(request.request.params.get('mode')).toBe('json');
    request.flush(mockAirPollutionData);
  });
});