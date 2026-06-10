const dotenv = require("dotenv");
dotenv.config();

const env = {
  baseUrl: process.env.BASE_URL || "https://rahulshettyacademy.com",
  username: process.env.APP_USERNAME || "rahulshettyacademy",
  password: process.env.APP_PASSWORD || "Learning@830$3mK2",
  browser: "chrome",
  headless: String(process.env.HEADLESS || "false").toLowerCase() === "true"
};

module.exports = env;
