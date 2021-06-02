import { Request, Response } from 'express';
import {
  openWeatherProvider,
  weatherbitProvider,
  visualCrossingProvider,
} from '../config';
import { WeatherDataMapper } from '../util';
import { ProviderType } from '../interfaces/weather';
import {
  getOpenWeatherData,
  getWeatherbitData,
  getVisualCrossingData,
} from './providerCalls';

export async function currentWeatherByCity(req: Request, res: Response) {
  const city = req.query.city;
  if (!city) res.status(400).send('Bad request');

  try {
    const requestOne = getOpenWeatherData({
      type: 'city',
      value: city,
      provider: openWeatherProvider,
    });

    const requestTwo = getWeatherbitData({
      type: 'city',
      value: city,
      provider: weatherbitProvider,
    });

    const requestThree = getVisualCrossingData({
      type: 'city',
      value: city,
      provider: visualCrossingProvider,
    });

    if (!requestOne || !requestTwo || !requestThree) res.status(404);

    Promise.all([requestOne, requestTwo, requestThree])
      .then(getResponses)
      .catch(catchError);

    function getResponses(results: Array<any>) {
      const result = getResult(results);
      console.log('result:', result);
      if (result === undefined) res.sendStatus(404);

      res.status(200).send(result);
    }
  } catch (error) {
    catchError(error);
  }

  function catchError(error: Error) {
    console.log({ error });
    res.status(400).send('Bad request');
  }
}

export async function currentWeatherByCoords(req: Request, res: Response) {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) res.status(400).send('Bad request');

  try {
    const requestOne = getOpenWeatherData({
      type: 'coordinates',
      value: { lat, lon },
      provider: openWeatherProvider,
    });

    const requestTwo = getWeatherbitData({
      type: 'coordinates',
      value: { lat, lon },
      provider: weatherbitProvider,
    });

    const requestThree = getVisualCrossingData({
      type: 'coordinates',
      value: { lat, lon },
      provider: visualCrossingProvider,
    });

    if (!requestOne || !requestTwo || !requestThree) res.status(404);

    Promise.all([requestOne, requestTwo, requestThree])
      .then(getResponses)
      .catch(catchError);

    function getResponses(results: Array<any>) {
      const result = getResult(results);
      if (result === undefined) res.sendStatus(404);
      res.status(200).send(result);
    }
  } catch (error) {
    catchError(error);
  }

  function catchError(error: Error) {
    console.error({ error });
    res.status(400).send('Bad request');
  }
}

export function getResult(responses: Array<any>) {
  if (responses.length === 0) return undefined;
  if (responses.length !== 3) return undefined;

  const dataMapper = new WeatherDataMapper();

  const responseOne = responses[0].data;
  const responseTwo = responses[1].data.data[0];
  const responseThree = responses[2].data;

  return {
    currentWeather: {
      openWeatherProvider: dataMapper.transformData(
        responseOne,
        ProviderType.openWeather,
      ),
      weatherbitProvider: dataMapper.transformData(
        responseTwo,
        ProviderType.weatherbit,
      ),
      visualCrossingProvider: dataMapper.transformData(
        responseThree,
        ProviderType.visualCrossing,
      ),
    },
  };
}
