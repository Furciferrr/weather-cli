import chalk from "chalk";
import dedent from "dedent-js";

const printError = (err) => {
  console.log(chalk.bgRed(" ERROR " + " " + err));
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS " + " " + message));
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
      without parameters - weather output
      -s [CITY] for set city
      -h for output help
      -t [API_KEY] for save token
      `
  );
};

const printWeather = (res) => {
  console.log(
    dedent`${chalk.bgCyanBright(" WEATHER ")} weather in ${res.name}
          ${res.weather[0].description}
          ${chalk.bold.cyan("temperature:")} ${res.main.temp} (${chalk.bold.cyan(
      "feels like:"
    )} ${res.main.feels_like})
          ${chalk.bold.cyan("humidity:")} ${res.main.humidity}
          ${chalk.bold.cyan("wind speed:")} ${res.wind.speed}
          `
  );
};

export { printError, printSuccess, printHelp, printWeather };
