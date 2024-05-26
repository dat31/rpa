const puppeteer = require("puppeteer");
const fs = require("node:fs");
const formatDate = require("../format-date");

(async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://finance.yahoo.co.jp/search/qi/?ids=2050&page=4", {
      waitUntil: "networkidle0",
    });
    const header = await page.$("._1WbkBLD0");
    await header.screenshot({ path: "financial/hel.png" });

    await page.goto("https://finance.yahoo.co.jp/quote/1814.T/chart", {
      waitUntil: "networkidle0",
    });
    const body = await page.$("._1FaO9vZ4");
    await body.screenshot({ path: "financial/hel2.png" });

    await browser.close();

    const logStream = fs.createWriteStream("financial/success.txt", {
      flags: "a",
    });
    logStream.write(`${formatDate()}\n`);
    logStream.end();
  } catch (e) {
    const logStream = fs.createWriteStream("financial/errors.txt", {
      flags: "a",
    });
    logStream.write(`${formatDate()}_${e}\n`);
    logStream.end();
    process.exit(1);
  }
})();
