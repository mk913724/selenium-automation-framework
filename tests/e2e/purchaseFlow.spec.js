const { expect } = require("chai");
const env = require("../../config/env");
const LoginPage = require("../../pages/LoginPage");
const ProductPage = require("../../pages/ProductPage");
const CartPage = require("../../pages/CartPage");
const CheckoutPage = require("../../pages/CheckoutPage");

describe("Rahul Shetty Academy purchase flow", function suite() {
  it("should login, add a dynamic product to cart, and complete the purchase", async function testCase() {
    const { driver } = this;
    const loginPage = new LoginPage(driver);
    const productPage = new ProductPage(driver);
    const cartPage = new CartPage(driver);
    const checkoutPage = new CheckoutPage(driver);
    const targetProduct = "iphone X";

    await loginPage.open(env.baseUrl);
    await loginPage.login(env.username, env.password);

    const currentUrl = await loginPage.waitForSuccessfulLogin();
    expect(currentUrl).to.include("shop");

    const availableProducts = await productPage.getAvailableProducts();
    expect(availableProducts).to.not.be.empty;
    expect(
      availableProducts.map((product) => product.toLowerCase())
    ).to.include(targetProduct.toLowerCase());

    const selectedProduct = await productPage.addProductToCart(targetProduct);
    expect(selectedProduct.toLowerCase()).to.equal(targetProduct.toLowerCase());

    await productPage.goToCart();

    const isProductPresent = await cartPage.isProductInCart(selectedProduct);
    expect(isProductPresent).to.equal(true);

    await cartPage.proceedToCheckout();
    await checkoutPage.completePurchase("India");

    const successMessage = await checkoutPage.getSuccessMessage();
    expect(successMessage).to.include("Success");
    expect(successMessage).to.include("Thank you");
  });
});
