module.exports = async (browser, context) => {
  const page = await browser.newPage();
  await page.goto(context.url);

  await page.click('button');

  await page.close();
};
