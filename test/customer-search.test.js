const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

(async function customerSearchTest() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // 顧客一覧ページを開く
    await driver.get("http://localhost:3000/customer-list");

    // 顧客名入力
    const nameInput = await driver.findElement(By.css("input[name='name']"));
    await nameInput.sendKeys("顧客"); // 検索したい名前（データに応じて変更してね）

    // 検索ボタンを押す
    const searchButton = await driver.findElement(By.css(".search-form-btn"));
    await searchButton.click();

    // 結果が表示されるまで待つ（tbody に1件以上 tr があるまで）
    await driver.wait(until.elementsLocated(By.css(".catalogue-tabel-body tr")), 5000);

    console.log("✅ 顧客検索テスト成功！");
  } catch (err) {
    console.error("❌ 顧客検索テスト失敗:", err);
  } finally {
    await driver.quit();
  }
})();
