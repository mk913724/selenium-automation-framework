const dotenv = require("dotenv");
dotenv.config();

const env = {
  baseUrl: process.env.BASE_URL,
  username: process.env.APP_USERNAME,
  password: process.env.APP_PASSWORD,
  browser: "chrome",
  headless: process.env.HEADLESS === "true", 
  implicitTimeout: 0,                       
  explicitTimeout: 15000                    
};

module.exports = env;
