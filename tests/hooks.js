const { captureScreenshot } = require("../utils/screenshotHelper");
const { createDriver } = require("../drivers/webDriverFactory");
const logger = require("../utils/logger");

exports.mochaHooks = {
  async beforeEach() {
    this.driver = await createDriver();
  },

  async afterEach() {
    if (this.currentTest.state === "failed" && this.driver) {
      const screenshotPath = await captureScreenshot(
        this.driver,
        this.currentTest.fullTitle()
      );
      logger.error(`Screenshot captured for failed test: ${screenshotPath}`);
    }

    if (this.driver) {
      await this.driver.quit();
      logger.info("WebDriver session closed.");
    }
  }
};
