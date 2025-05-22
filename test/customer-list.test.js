const { Builder, By } = require("selenium-webdriver");
require("chromedriver");

(async function testCustomerList() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Reactの顧客一覧画面にアクセス
    await driver.get("http://localhost:3000/customer-list");

    // ページタイトル（h2）を取得して確認
    const title = await driver.findElement(By.css(".search-ttl")).getText();

    if (title.includes("顧客検索")) {
      console.log("✅ 顧客一覧ページの表示に成功！");
    } else {
      console.error("❌ タイトルが違います！");
    }
  } catch (error) {
    console.error("🚨 テスト中にエラー発生:", error);
  } finally {
    await driver.quit();
  }
})();
