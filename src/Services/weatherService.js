const API_KEY = "9d9a9fa8c171ff739621c57b50293875";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  const params = new URLSearchParams(searchParams);
  params.append("appid", API_KEY);
  url.search = params;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

export default getWeatherData;
