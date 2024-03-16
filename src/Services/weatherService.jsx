import { DateTime } from 'luxon';
const API_KEY = "f4a4fb11226d49f4b4bac9885cb8bd8e";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  const params = new URLSearchParams(searchParams);
  params.append("appid", API_KEY);
  url.search = params;

  return fetch(url)
    .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed }
  } = data;

  const { main: details, icon } = weather[0];

  return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  if (daily && hourly) {
    daily = daily.slice(1, 6).map(d => {
      return {
        title: formatToLocalTime(d.dt, timezone, 'ccc'),
        temp: d.temp.day,
        icon: d.weather[0].icon
      }
    })

    hourly = hourly.slice(1, 6).map(h => {
      return {
        title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
        temp: h.temp.day,
        icon: h.weather[0].icon
      }
    }
    )
  }
  else console.log("No daily or hourly data.")

  return { timezone, daily, hourly };
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);
  const { lat, lon } = formattedCurrentWeather;
  console.log("Units of measurement: " + searchParams.units);
  const formattedForecastWeather = await getWeatherData("onecall", { lat, lon, exclude: 'current, minutely, alerts', units: searchParams.units }).then(formatForecastWeather);
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;