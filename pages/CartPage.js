const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.cartItems = By.css("h4.media-heading a");
    this.checkoutButton = By.css(".btn.btn-success");
  }

  async isProductInCart(productName) {
    const items = await this.actions.getElements(this.cartItems);

    for (const item of items) {
      const itemText = await item.getText();
      if (itemText.trim().toLowerCase() === productName.trim().toLowerCase()) {
        this.logger.info(`Verified product in cart: ${itemText}`);
        return true;
      }
    }

    return false;
  }

  async proceedToCheckout() {
    await this.actions.click(this.checkoutButton, "cart checkout button");
  }
}

module.exports = CartPage;
