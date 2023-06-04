import { Component } from '@angular/core';
import { WeatherService, WeatherData } from '../service/clima.service';
import { format } from 'path';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app-clima';

  constructor(private weatherService: WeatherService) {}

  weatherCards: any[] = [];
  envioDireccion: any = 'Lima';
  loading: any;
  ngOnInit(): void {
    this.loading = true;
    this.weatherService.getCurrentWeather(this.envioDireccion).subscribe(
      (data: any) => {
        this.loading = false;
        const currentWeather = data.current;
        const C = data.location;
        const weatherCard: any = {
          condition: currentWeather.condition.text,
          icon: currentWeather.condition.icon,
          last_updated: currentWeather.last_updated,
          title: C.name,
          pais: C.country,
          temperature: currentWeather.temp_c,
        };
        this.weatherCards = [weatherCard];
      },
      (error: any) => {
        this.loading = false;

        console.error('Error al obtener los datos del clima', error);
      }
    );
  }
  seteo(event: any) {
    const fecha = '2023-06-03 19:45';
    const fechaObjeto = new Date(event);

    const opcionesFormato: any = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    const fechaFormateada = fechaObjeto.toLocaleDateString(
      'es-ES',
      opcionesFormato
    );
    return fechaFormateada;
  }

  obtenerCodigoPais(pais: string): string {
    const codigoPais: any = {
      Peru: 'PE',
      // Agrega más países y sus respectivos códigos aquí
    };

    return codigoPais[pais] || '';
  }

  searchText: any;
  resultadoEncontrado: boolean = true;

  buscar() {
    this.loading = true;
    this.weatherService.getCurrentWeather(this.searchText).subscribe(
      (data: any) => {
        this.loading = false;
        this.resultadoEncontrado = true;
        const currentWeather = data.current;
        const C = data.location;
        const weatherCard: any = {
          condition: currentWeather.condition.text,
          icon: currentWeather.condition.icon,
          last_updated: currentWeather.last_updated,
          title: C.name,
          pais: C.country,
          temperature: currentWeather.temp_c,
        };
        this.weatherCards = [weatherCard];
      },
      (error: any) => {
        this.loading = false;
        this.resultadoEncontrado = false;
        console.error('Error al obtener los datos del clima', error);
      }
    );
  }
}
