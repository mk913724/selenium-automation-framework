const { until } = require("selenium-webdriver");
const env = require("../config/env");

class WaitHelper {
  constructor(driver, timeout = env.explicitTimeout) {
    this.driver = driver;
    this.timeout = timeout;
  }

  async forVisible(locator, timeout = this.timeout) {
    const element = await this.driver.wait(until.elementLocated(locator), timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    return element;
  }

  async forClickable(locator, timeout = this.timeout) {
    const element = await this.forVisible(locator, timeout);
    await this.driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  }

  async forUrlContains(partialUrl, timeout = this.timeout) {
    await this.driver.wait(until.urlContains(partialUrl), timeout);
  }

  async forElements(locator, timeout = this.timeout) {
    await this.driver.wait(async () => {
      const elements = await this.driver.findElements(locator);
      return elements.length > 0;
    }, timeout);

    return this.driver.findElements(locator);
  }

  async forText(locator, expectedText, timeout = this.timeout) {
    const element = await this.forVisible(locator, timeout);
    await this.driver.wait(async () => {
      const actualText = await element.getText();
      return actualText.includes(expectedText);
    }, timeout);
    return element;
  }
}

module.exports = WaitHelper;
