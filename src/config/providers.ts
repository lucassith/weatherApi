import axios from 'axios';

export const openWeatherProvider = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherbitProvider = axios.create({
  baseURL: 'https://api.weatherbit.io/v2.0/',
});

export const visualCrossingProvider = axios.create({
  baseURL:
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/',
});
