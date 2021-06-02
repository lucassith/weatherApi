import {
  getOpenWeatherData,
  getVisualCrossingData,
  getWeatherbitData,
} from '../../controllers/providerCalls';

import axios from 'axios';
import faker from 'faker';
import { IProviderArguments } from '../../interfaces/providers';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Test calls on external api', currentWeatherControllerTests);

function currentWeatherControllerTests() {
  beforeEach(setUp);

  test(
    'can check if openWeatherData was called',
    canCheckifOpenWeatherDataWasCalled,
  );

  test(
    'can check if weatherBitData was called',
    canCheckifWeatherBitDataWasCalled,
  );

  test(
    'can check if visualCrossingData was called',
    canCheckifVisualCrossingDataWasCalled,
  );

  async function canCheckifWeatherBitDataWasCalled() {
    const currentApi = currentWeatherApi();

    const getOpenWeatherDataSpy = jest.spyOn(currentApi, 'getWeatherbit');

    const cityArguments: IProviderArguments = {
      type: 'city',
      value: 'london',
      provider: mockedAxios,
    };

    await currentApi.getWeatherbit(cityArguments);
    expect(getOpenWeatherDataSpy).toHaveBeenCalledWith(cityArguments);
  }

  async function canCheckifVisualCrossingDataWasCalled() {
    const currentApi = currentWeatherApi();

    const getOpenWeatherDataSpy = jest.spyOn(currentApi, 'getVisualCrossing');

    const cityArguments: IProviderArguments = {
      type: 'city',
      value: 'london',
      provider: mockedAxios,
    };

    await currentApi.getVisualCrossing(cityArguments);
    expect(getOpenWeatherDataSpy).toHaveBeenCalledWith(cityArguments);
  }

  async function canCheckifOpenWeatherDataWasCalled() {
    const currentApi = currentWeatherApi();
    const getOpenWeatherDataSpy = jest.spyOn(currentApi, 'getOpenWeather');

    const cityArguments: IProviderArguments = {
      type: 'city',
      value: 'london',
      provider: mockedAxios,
    };

    const coordsArguments: IProviderArguments = {
      type: 'coordinates',
      value: { lat: faker.datatype.number(), lon: faker.datatype.number() },
      provider: mockedAxios,
    };

    const wrongArguments: IProviderArguments = {
      type: faker.random.word(),
      value: { lat: faker.datatype.number(), lon: faker.datatype.number() },
      provider: mockedAxios,
    };

    // This assertions may be easily moved to equivalent functions for another providers

    await currentApi.getOpenWeather(cityArguments);
    expect(getOpenWeatherDataSpy).toHaveBeenCalledWith(cityArguments);
    await currentApi.getOpenWeather(coordsArguments);
    expect(getOpenWeatherDataSpy).toHaveBeenCalledWith(coordsArguments);

    const result = await currentApi.getOpenWeather(wrongArguments);
    expect(result).toStrictEqual({});
  }

  function currentWeatherApi() {
    return {
      getOpenWeather: getOpenWeatherData,
      getVisualCrossing: getVisualCrossingData,
      getWeatherbit: getWeatherbitData,
    };
  }

  function setUp() {
    mockedAxios.get.mockReturnValue(Promise.resolve({}));
  }
}
