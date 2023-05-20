import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapitalStatesUsaService } from './capital-states-usa.service';
import { environment } from 'src/environments/environment';
import { CapitalData } from 'src/app/models/capitalstates.models';
import { HttpClient } from '@angular/common/http';

describe('CapitalStatesUsaService', () => {
  let service: CapitalStatesUsaService;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapitalStatesUsaService],
    });
    service = TestBed.inject(CapitalStatesUsaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a list of capital states', () => {
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

    service.getListCapitalStates().subscribe((capitalStates) => {
      expect(capitalStates).toEqual(mockCapitalStates);
    });

    const request = httpMock.expectOne(environment.listCapitalStatusUSA);
    expect(request.request.method).toBe('GET');
    request.flush(mockCapitalStates);
  });
});