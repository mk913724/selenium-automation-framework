const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const chromedriver = require("chromedriver");
const os = require("os");
const path = require("path");

const env = require("../config/env");
const logger = require("../utils/logger");

function buildChromeOptions() {
  const options = new chrome.Options();
  const tempProfilePath = path.join(os.tmpdir(), `selenium-profile-${Date.now()}`);
  const chromeBinaryPath =
    process.env.CHROME_BINARY ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  if (process.env.CHROME_BINARY || process.platform === "win32") {
    options.setChromeBinaryPath(chromeBinaryPath);
  }

  options.addArguments("--window-size=1920,1080");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-gpu");
  options.addArguments("--remote-debugging-port=0");
  options.addArguments("--disable-popup-blocking");
  options.addArguments("--incognito");
  options.addArguments(`--user-data-dir=${tempProfilePath}`);

  if (env.headless) {
    options.addArguments("--headless=new");
  }

  return options;
}
async function createDriver() {
  const builder = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(buildChromeOptions());

  if (process.env.USE_SELENIUM_MANAGER !== "true") {
    builder.setChromeService(new chrome.ServiceBuilder(chromedriver.path));
  }

  const driver = await builder.build();

  if (env.implicitTimeout > 0) {
    await driver.manage().setTimeouts({ implicit: env.implicitTimeout });
  }

  logger.info(
    `WebDriver started with browser=chrome, headless=${env.headless}`
  );

  return driver;
}

module.exports = { createDriver };
