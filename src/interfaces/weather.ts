export interface IWeather {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  description: string;
  wind: IWind;
  coord: ICoords;
}

export interface IWind {
  wind_spd: number;
  wind_dir: number;
}

export interface IWeatherMapper {
  transformData: (data: any, ProviderType: string) => IWeather;
}

export enum ProviderType {
  openWeather = 'OPENWEATHER',
  weatherbit = 'WEATHERBIT',
  visualCrossing = 'VISUALCROSSING',
}

export interface ICoords {
  lat: number;
  lon: number;
}
