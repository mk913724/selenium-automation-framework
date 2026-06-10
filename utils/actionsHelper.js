const { Key } = require("selenium-webdriver");
const logger = require("./logger");
const WaitHelper = require("./waitHelper");

class ActionsHelper {
  constructor(driver) {
    this.driver = driver;
    this.wait = new WaitHelper(driver);
  }

  async type(locator, value, elementName = "element") {
    const element = await this.wait.forVisible(locator);
    await element.click();
    await element.sendKeys(Key.chord(Key.CONTROL, "a"), Key.BACK_SPACE);
    await element.clear();
    await element.sendKeys(value);

    await this.driver.wait(async () => {
      const currentValue = await element.getAttribute("value");
      return currentValue === value;
    }, 5000);

    logger.info(`Entered value into ${elementName}.`);
  }

  async click(locator, elementName = "element") {
    const element = await this.wait.forClickable(locator);
    await element.click();
    logger.info(`Clicked ${elementName}.`);
  }

  async getText(locator, elementName = "element") {
    const element = await this.wait.forVisible(locator);
    const text = await element.getText();
    logger.info(`Captured text from ${elementName}: ${text}`);
    return text;
  }

  async getElements(locator) {
    return this.wait.forElements(locator);
  }
}

module.exports = ActionsHelper;
