#!/user/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  getKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js";

const saveToken = (token) => {
  if (!token.length) {
    return printError("token not passed");
  }
  try {
    saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    return printError("city not passed");
  }
  try {
    await getWeather(city);
    saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("city saved");
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("city not found");
    } else {
      printError(e.message);
    }
  }
};

const getForecast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(process.env.CITY ?? city);
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("city not found");
    } else if (e?.response?.status == 401) {
      printError("token not correctly");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
};

initCLI();
