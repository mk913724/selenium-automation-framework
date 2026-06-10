# Selenium WebDriver Automation Framework

A beginner-friendly end-to-end UI automation framework built with Selenium WebDriver, JavaScript (Node.js), Mocha, Chai, and Page Object Model.

This project automates a complete purchase flow on:
`https://rahulshettyacademy.com/loginpagePractise/`

## Project Overview

Developed a scalable Selenium WebDriver and JavaScript (Node.js) framework using the Page Object Model (POM) pattern to automate complex end-to-end user journeys. Features include decoupled Dotenv configuration management, Winston custom logging, and cross-platform reliability. Fully integrated with GitHub Actions for headless CI/CD test execution and automated Mochawesome HTML report generation

The automated scenario covers:

1. Opening the application
2. Logging in with valid credentials
3. Validating successful login
4. Selecting a product dynamically
5. Adding the product to the cart
6. Verifying the product in the cart
7. Proceeding through checkout
8. Completing the purchase flow
9. Validating the success message

## Tech Stack

- Selenium WebDriver
- JavaScript (Node.js)
- Mocha
- Chai
- dotenv
- Mochawesome
- Winston Logger

## Framework Highlights

- Page Object Model implementation
- Explicit waits for stable test execution
- Dynamic product selection by name
- Reusable helper methods for actions and waits
- Centralized environment configuration
- Screenshot capture on failure
- Logging support for execution tracing
- HTML report generation
- Headless browser execution support
- Clean async/await usage
- Maintainable project structure for scaling
- Chrome-based setup for easier learning and execution

## Project Structure

```text
selenium-js-pom-framework/
|-- config/
|   `-- env.js
|-- drivers/
|   `-- webDriverFactory.js
|-- pages/
|   |-- BasePage.js
|   |-- LoginPage.js
|   |-- ProductPage.js
|   |-- CartPage.js
|   `-- CheckoutPage.js
|-- reports/
|   `-- screenshots/
|-- tests/
|   |-- e2e/
|   |   `-- purchaseFlow.spec.js
|   `-- hooks.js
|-- utils/
|   |-- actionsHelper.js
|   |-- waitHelper.js
|   |-- screenshotHelper.js
|   `-- logger.js
|-- .env.example
|-- .gitignore
|-- .mocharc.js
|-- package.json
`-- README.md
```

## Framework Design

### Page Objects

The framework separates page-level operations into dedicated classes:

- `LoginPage` handles authentication
- `ProductPage` handles product listing and cart actions
- `CartPage` handles cart validation
- `CheckoutPage` handles purchase completion and success validation

### Utilities

Shared helpers are used to reduce duplication and improve maintainability:

- `waitHelper.js` for explicit waits
- `actionsHelper.js` for reusable UI interactions
- `screenshotHelper.js` for failure screenshots
- `logger.js` for execution logging

### Driver Management

Browser setup is centralized in `drivers/webDriverFactory.js`. The project uses Chrome to keep the framework simple and easier to explain in interviews and beginner learning sessions.

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd selenium-js-pom-framework
```

2. Install project dependencies:

```bash
npm install
```

3. Create a local `.env` file from the sample:

```bash
copy .env.example .env
```

## Environment Configuration

Sample `.env`:

```env
BASE_URL=https://rahulshettyacademy.com/loginpagePractise/
APP_USERNAME=rahulshettyacademy
APP_PASSWORD=Learning@830$3mK2
HEADLESS=false
IMPLICIT_TIMEOUT=0
EXPLICIT_TIMEOUT=15000
```

## Run the Tests

Run in normal mode:

```bash
npm test
```

Run in headless mode:

```bash
npm run test:headless
```

Open the HTML report:

```bash
npm run report:open
```

## CI/CD Integration

This project includes a simple GitHub Actions pipeline in:

```text
.github/workflows/ci.yml
```

The pipeline runs automatically when code is pushed to `main` or `master`, when a pull request is opened, or manually from the GitHub Actions tab.

What it does:

1. Checks out the repository
2. Installs Node.js
3. Installs dependencies with `npm ci`
4. Runs Selenium tests in headless Chrome
5. Uploads the Mochawesome report as a workflow artifact

Before running the workflow, add these GitHub repository secrets:

```text
APP_USERNAME=rahulshettyacademy
APP_PASSWORD=Learning@830$3mK2
```

Optional repository variable:

```text
BASE_URL=https://rahulshettyacademy.com/loginpagePractise/
```

CI command used by the pipeline:

```bash
npm run ci:test
```

## Reporting

The framework uses Mochawesome for HTML reporting.

Generated artifacts include:

- HTML execution report
- JSON report data
- Failure screenshots
- Execution logs

Reports are stored in the `reports/` directory.

## Sample Automated Test Flow

The implemented end-to-end test validates the following business flow:

1. Launch application
2. Enter username and password
3. Validate redirect to the shop page
4. Select `iphone X` dynamically from available products
5. Add the selected product to the cart
6. Verify that the product is visible in the cart
7. Complete checkout with country selection
8. Validate purchase success confirmation

## Future Enhancements

- Cross-browser execution improvements
- Data-driven testing support
- Parallel test execution
- Tag-based test runs
- Retry mechanism for unstable environments

## Author

Moniruzzaman  
Software Quality Assurance Engineer
