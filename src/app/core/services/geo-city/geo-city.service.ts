import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CityResponseDtoV1 } from './dtos/city.response.dto.v1';
import { RapidApiResponseDtoV1 } from './dtos/rapid-api-response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class GeoCityService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://wft-geo-db.p.rapidapi.com';
  private readonly rapidApiAuthHeaders = {
    'X-RapidAPI-Key': 'daeecc870dmsh1cf0f709c29df83p101750jsn3b147e6418cc', // Replace with your key
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  };

  getCities(searchTerm: string) {
    return this.http.get<RapidApiResponseDtoV1<CityResponseDtoV1>>(
      `${this.baseUrl}/v1/geo/cities`,
      {
        headers: this.rapidApiAuthHeaders,
        params: {
          namePrefix: searchTerm,
          countryIds: 'US',
          types: 'CITY',
          sort: '-population',
          limit: 10,
        },
      }
    );
  }

  getNextPage(nextPageLink: string) {
    return this.http.get<RapidApiResponseDtoV1<CityResponseDtoV1>>(
      `${this.baseUrl}${nextPageLink}`,
      {
        headers: this.rapidApiAuthHeaders,
      }
    );
  }
}
