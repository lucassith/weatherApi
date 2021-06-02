import { IWeatherMapper, ProviderType, IWeather } from '../interfaces/weather';

export class WeatherDataMapper implements IWeatherMapper {
  private dataResult: IWeather;

  constructor() {
    this.dataResult = {
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      wind: {
        wind_spd: 0,
        wind_dir: 0,
      },
      coord: {
        lat: 0,
        lon: 0,
      },
      description: '',
    };
  }

  transformData(data: any, client: string): IWeather {
    if (client === ProviderType.openWeather) {
      const weather: IWeather = {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind: {
          wind_spd: data.wind.speed,
          wind_dir: data.wind.deg,
        },
        coord: data.coord,
        description: data.weather[0].description,
      };
      this.setDataResult(weather);
    } else if (client === ProviderType.weatherbit) {
      const weather: IWeather = {
        temp: data.temp,
        feels_like: data.app_temp,
        pressure: data.pres,
        humidity: data.rh,
        wind: {
          wind_spd: data.wind_spd,
          wind_dir: data.wind_dir,
        },
        coord: { lat: data.lat, lon: data.lon },
        description: data.weather.description,
      };
      this.setDataResult(weather);
    } else if (client === ProviderType.visualCrossing) {
      const weather: IWeather = {
        temp: data.days[0].temp,
        feels_like: data.days[0].feelslike,
        pressure: data.days[0].pressure,
        humidity: data.days[0].humidity,
        wind: {
          wind_spd: data.days[0].windspeed,
          wind_dir: data.days[0].winddir,
        },
        coord: { lat: data.latitude, lon: data.longitude },
        description: data.description,
      };
      this.setDataResult(weather);
    }

    return this.getDataResult();
  }

  setDataResult(value: IWeather) {
    if (!value) return;
    this.dataResult = value;
  }

  getDataResult() {
    return this.dataResult;
  }
}
