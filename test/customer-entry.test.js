const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function customerEntryTest() {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get("http://localhost:3000/customer-entry");

    // フォーム入力
    await driver.findElement(By.name("name")).sendKeys("テスト太郎");
    await driver.findElement(By.name("kana")).sendKeys("テストタロウ");
    await driver.findElement(By.name("email")).sendKeys(`test${Date.now()}@example.com`);
    await driver.findElement(By.name("tel")).sendKeys("09012345678");

    // 性別選択
    await driver.findElement(By.css("select[name='gender']")).sendKeys("男");

    // 生年月日
    const birthdayInput = await driver.wait(
    until.elementLocated(By.name("birthday")),
    5000
    );
    await driver.wait(until.elementIsVisible(birthdayInput), 5000);

    await driver.executeScript(`
    const input = arguments[0];
    const value = arguments[1];
    const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeSetter.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    `, birthdayInput, "2000-01-01");

    // Tabキーで次のフィールドに移動（フォーカス移動で反応させる）
    await birthdayInput.sendKeys("\uE004"); // "\uE004" = Tabキー

    // Reactに検知させるためにフォーカス外す
    await driver.findElement(By.name("name")).click();


    // 所属会社が選択肢にあれば選ぶ（1番目は空だから2番目から）
    const companySelect = await driver.findElement(By.name("company_id"));
    const options = await companySelect.findElements(By.css("option"));
    if (options.length > 1) {
      await options[1].click();
    }

    // 登録ボタンクリック（モーダルが表示されるきっかけ！）
await driver.findElement(By.id("register-btn")).click();

// 「登録する」ボタンの出現を待ってクリック
await driver.wait(until.elementLocated(By.css(".modal-btn.confirm")), 5000);
const confirmBtn = await driver.findElement(By.css(".modal-btn.confirm"));
await confirmBtn.click();

// 「OK」ボタンが表示されるまで待ってクリック
await driver.wait(async () => {
  const buttons = await driver.findElements(By.css(".modal-btn.confirm"));
  for (const btn of buttons) {
    const text = await btn.getText();
    const visible = await btn.isDisplayed();
    const enabled = await btn.isEnabled();
    if (text.trim() === "OK" && visible && enabled) {
      return true;
    }
  }
  return false;
}, 10000);

// 実際に「OK」と表示されてるボタンを探して押す
const okButtons = await driver.findElements(By.css(".modal-btn.confirm"));
for (const btn of okButtons) {
  const text = await btn.getText();
  if (text.trim() === "OK") {
    await btn.click();
    break;
  }
}

// 一覧ページに遷移したことを確認
await driver.wait(async () => {
  const url = await driver.getCurrentUrl();
  return url.includes("/customer-list"); // ← 遷移後のURLパス
}, 5000);

    console.log("✅ 顧客登録テスト成功！");
  } catch (err) {
    // アラートが出てたら閉じる（重要！！）
    try {
      const alert = await driver.switchTo().alert();
      console.warn("⚠ アラート検知 → メッセージ:", await alert.getText());
      await alert.accept(); // OK押す
    } catch (e) {
      // アラートが無ければ何もしない
    }

    console.error("❌ 顧客登録テスト失敗:", err);
  } finally {
    await driver.quit();
  }
}

customerEntryTest();
