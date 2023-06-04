import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  title: string;
  icon: string;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  humidity: number;
}
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'a11452ef1536492882b231208230306';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<WeatherData> {
    const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;
    return this.http.get(url).pipe(
      map((data: any) => {
        /*  const weatherData: WeatherData = {
          location: data.location.name + ', ' + data.location.country,
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          title: data.current.condition.title,
          icon: data.current.condition.icon.replace(
            '//cdn.weatherapi.com',
            'https://cdn.weatherapi.com'
          ),
          windSpeed: data.current.wind_kph,
          windDirection: data.current.wind_dir,
          pressure: data.current.pressure_mb,
          humidity: data.current.humidity,
        }; */
        console.log('data', data);
        return data;
      })
    );
  }
}
