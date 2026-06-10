const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.cardTitles = By.css(".card-title");
    this.productCards = By.css(".card");
    this.checkoutButton = By.css("a.nav-link.btn.btn-primary");
  }

  async getAvailableProducts() {
    const titleElements = await this.actions.getElements(this.cardTitles);
    const products = [];

    for (const titleElement of titleElements) {
      products.push(await titleElement.getText());
    }

    this.logger.info(`Available products: ${products.join(", ")}`);
    return products;
  }

  async addProductToCart(productName) {
    const cards = await this.actions.getElements(this.productCards);

    for (const card of cards) {
      const name = await card.findElement(By.css(".card-title")).getText();
      if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
        const addButton = await card.findElement(By.css(".card-footer button"));
        await addButton.click();
        this.logger.info(`Added product to cart: ${name}`);
        return name;
      }
    }

    throw new Error(`Product not found in catalog: ${productName}`);
  }

  async goToCart() {
    await this.actions.click(this.checkoutButton, "checkout button");
  }
}

module.exports = ProductPage;
