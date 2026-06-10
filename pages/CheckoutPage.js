const { By, Key } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.countryInput = By.id("country");
    this.countrySuggestionLink = By.css(".suggestions a");
    this.purchaseButton = By.css(".btn.btn-success.btn-lg");
    this.successAlert = By.css(".alert.alert-success");
  }

  async completePurchase(country = "India") {
    await this.actions.type(this.countryInput, country, "country input");
    await this.wait.forClickable(this.countrySuggestionLink);
    await this.actions.click(this.countrySuggestionLink, "country suggestion");
    await this.actions.click(this.purchaseButton, "purchase button");
  }

  async getSuccessMessage() {
    const alert = await this.wait.forVisible(this.successAlert);
    return alert.getText();
  }
}

module.exports = CheckoutPage;
