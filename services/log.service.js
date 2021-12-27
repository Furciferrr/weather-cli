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

export { printError, printSuccess, printHelp };
