const puppeteer = require("puppeteer");
const fs = require("node:fs");
const formatDate = require("../format-date");
(async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://weather.yahoo.co.jp/weather/", {
      waitUntil: "networkidle0",
    });
    const el = await page.$("img");

    await el.screenshot({
      path: "market/market.png",
    });

    await browser.close();

    const logStream = fs.createWriteStream("market/success.txt", {
      flags: "a",
    });
    logStream.write(`${formatDate()}\n`);
    logStream.end();
  } catch (e) {
    const logStream = fs.createWriteStream("market/errors.txt", {
      flags: "a",
    });
    logStream.write(`${formatDate()}_${e}\n`);
    logStream.end();
    process.exit(1);
  }
})();
