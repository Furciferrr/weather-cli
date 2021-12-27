import axios from "axios";
import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";


export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error(
      "key not set, you should set api key with -t[API_KEY], for show all commands enter -h"
    );
  }
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "en",
        units: "metric",
      },
    }
  );
  return data;
  /* const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("lang", "en");
  url.searchParams.append("units", "metric");
  https.get(url, (response) => {
    let res = "";
    response.on("data", (chunk) => {
      res += chunk;
    });

    response.on("end", () => {
      console.log(res);
    });
  }); */
};
