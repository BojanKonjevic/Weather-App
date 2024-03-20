const API_KEY = "d2a58981afc346a292b185438241603";
const BASE_URL = "https://api.weatherapi.com/v1";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}.json`);
  const params = new URLSearchParams(searchParams);
  params.append("key", API_KEY);
  url.search = params;

  return fetch(url)
    .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
  const {
    location: { lat, lon, name, country },
    current: { temp_c, feelslike_c, humidity, wind_kph, condition},
  } = data;

  const { text: details, icon } = condition;

  return {
    lat,
    lon,
    temp: temp_c,
    feels_like: feelslike_c,
    humidity,
    wind_speed: wind_kph,
    details,
    icon,
    name,
    country,
  };
};

const getFormattedWeatherData = async (searchParams) => {
    const currentWeatherData = await getWeatherData("current", searchParams).then(formatCurrentWeather);
    return { ...currentWeatherData};
};

export default getFormattedWeatherData;