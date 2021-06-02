# WeatherApi

## How to start the project

First of all, install [docker](https://docs.docker.com/engine/install/)

Secondly, install [docker-compose](https://docs.docker.com/compose/install/) if you are Linux user. In case of MacOS or Windows users there is no need to take this step.

After that, go to the main directory and start docker-compose by typing in terminal:

**docker-compose up**

## Package manager

[Yarn](https://yarnpkg.com/getting-started) is the choice for package - manager.

To install new packages type:

**yarn add** <name of package>

to remove:

**yarn remove** <name of package>

To start project when natively packages type:

**yarn start**

## API

### Resources

Our resource in Weather API is **weather**

### Endpoints

Our API have the following endpoints:

**GET:** <u>/weather/current/city/?city=<name of city></u>

**GET:** <u>/weather/current/coords/?lat=<lattitude>&lon=<longitude></u>

First endpoint is responsible for showing us data about current weather by choosing **city**

Second one is responsible also for current weather but instead of city we provide **coordinates**

### Providers

Provider is external provider about the weather. We are calling external API of chosen provider to gather data.

Weather is provided by the following providers:

- OpenWeather
- Weatherbit
- VisualCrossing

### Data Format

For each of provider there is the same data format:

{

​ temp: **Temperature**,

​ feels_like: '**Feels like' temperature**,

​ pressure: **Pressure**,

​ humidity: **Humidity**,

​ wind: {

​ wind_spd: **wind speed**,

​ wind_dir: **wind direction**

​ },

​ coord: **Coordinates of place**

​ description: **Short weather description**

}

Some of the fields may be not consistent in case of used unit, for example temperature may be showed as Kelvin,Celsius or Farenheit. For more info about provider visit following sites:

- [OpenWeather](https://openweathermap.org/current)
- [Weatherbit](https://www.weatherbit.io/api/weather-current)
- [VisualCrossing](https://www.visualcrossing.com/resources/documentation/weather-api/weather-api-documentation/)

## How to stop the project

In terminal you should type '

**docker-compose stop**

or by clicking **CTRL-C** in active terminal window with docker composer running.

## How to clean containers/ destroy the app

In main directory of project you should type:

**docker-compose down**
