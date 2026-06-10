const fs = require("fs");
const path = require("path");

async function captureScreenshot(driver, testTitle) {
  const screenshotsDir = path.join(process.cwd(), "reports", "screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const sanitizedName = testTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const filePath = path.join(screenshotsDir, `${sanitizedName}.png`);
  const image = await driver.takeScreenshot();
  fs.writeFileSync(filePath, image, "base64");

  return filePath;
}

module.exports = { captureScreenshot };
