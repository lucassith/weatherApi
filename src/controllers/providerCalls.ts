import { catchAxiosError } from '../config';
import { IProviderArguments } from '../interfaces/providers';
const { OPEN_WEATHER_API_KEY, WEATHER_BIT_API_KEY, VISUAL_CROSSING_API_KEY } =
  process.env;
import { dateParser } from '../util';

export function getOpenWeatherData(IProviderArguments: IProviderArguments) {
  const { type, value, provider } = IProviderArguments;

  if (type === 'city') {
    return provider
      .get(`weather?q=${value}&appid=${OPEN_WEATHER_API_KEY}`)
      .catch(catchAxiosError);
  } else if (type === 'coordinates') {
    return provider
      .get(
        `weather?lat=${value.lat}&lon=${value.lon}&appid=${OPEN_WEATHER_API_KEY}`,
      )
      .catch(catchAxiosError);
  } else return {};
}

export function getWeatherbitData(IProviderArguments: IProviderArguments) {
  const { type, value, provider } = IProviderArguments;

  if (type === 'city') {
    return provider
      .get(`current?city=${value}&key=${WEATHER_BIT_API_KEY}`)
      .catch(catchAxiosError);
  } else if (type === 'coordinates') {
    return provider
      .get(
        `current?lat=${value.lat}&lon=${value.lon}&key=${WEATHER_BIT_API_KEY}`,
      )
      .catch(catchAxiosError);
  }
}

export function getVisualCrossingData(IProviderArguments: IProviderArguments) {
  const { type, value, provider } = IProviderArguments;
  const { dd, mm, yyyy } = dateParser(new Date());

  if (type === 'city') {
    return provider
      .get(
        `/timeline/${value}/${yyyy}-${mm}-${dd}?key=${VISUAL_CROSSING_API_KEY}`,
      )
      .catch(catchAxiosError);
  } else if (type === 'coordinates') {
    return provider
      .get(
        `/timeline/${value.lat},${value.lon}/${yyyy}-${mm}-${dd}?key=${VISUAL_CROSSING_API_KEY}`,
      )
      .catch(catchAxiosError);
  }
}
