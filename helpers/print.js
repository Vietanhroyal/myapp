import chalk from "chalk";

class outputType {
  static INFOMATION = "INFOMATION";
  static SUCCESS = "SUCCESS";
  static WARNING = "WARNING";
  static ERROR = "ERROR";
}

function print(message, type) {
  // Đổi tên tham số từ outputType thành type
  switch (type) {
    case outputType.INFOMATION:
      console.log(chalk.white(message));
      break;
    case outputType.SUCCESS:
      console.log(chalk.green(message));
      break;
    case outputType.WARNING:
      console.log(chalk.yellow(message));
      break;
    case outputType.ERROR:
      console.log(chalk.red(message));
      break;
    default:
      console.log(chalk.white(message));
  }
}

export { outputType, print };
