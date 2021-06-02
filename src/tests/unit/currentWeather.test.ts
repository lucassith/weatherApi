import * as currentWeather from '../../controllers/currentWeather';

describe('Current weather controller tests', currentWeatherControllerTests);

function currentWeatherControllerTests() {
  test(
    'cannot get results when response is empty',
    cannotGetResultsWhenResponseIsEmpty,
  );

  test(
    'cannot get results when response doesnt have three responses',
    cannotGetResultsWhenResponseDoesnthaveThreeResponses,
  );

  function cannotGetResultsWhenResponseDoesnthaveThreeResponses() {
    const onlyTwoResponses: Array<any> = [[], []];
    const result = currentWeather.getResult(onlyTwoResponses);
    expect(result).toBe(undefined);
  }

  function cannotGetResultsWhenResponseIsEmpty() {
    const emptyResponseArray: Array<any> = [];
    const result = currentWeather.getResult(emptyResponseArray);
    expect(result).toBe(undefined);
  }
}
