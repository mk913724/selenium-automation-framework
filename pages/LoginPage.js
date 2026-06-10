const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.id("username");
    this.passwordInput = By.id("password");
    this.signInButton = By.id("signInBtn");
    this.productCards = By.css(".card"); 
  }

  async login(username, password) {
    await this.actions.type(this.usernameInput, username, "username input");
    await this.actions.type(this.passwordInput, password, "password input");
    await this.actions.click(this.signInButton, "sign in button");
  }

 
  async waitForSuccessfulLogin() {
    await this.driver.wait(async () => {
      const currentUrl = await this.driver.getCurrentUrl();
      return currentUrl.includes("shop");
    }, 20000);
    await this.wait.forElements(this.productCards);
    return this.driver.getCurrentUrl();
  }
}

module.exports = LoginPage;
