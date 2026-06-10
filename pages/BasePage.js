const ActionsHelper = require("../utils/actionsHelper");
const WaitHelper = require("../utils/waitHelper");
const logger = require("../utils/logger");

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.actions = new ActionsHelper(driver);
    this.wait = new WaitHelper(driver);
    this.logger = logger;
  }

  async open(url) {
    await this.driver.get(url);
    this.logger.info(`Opened URL: ${url}`);
  }
}

module.exports = BasePage;
