const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function customerEditTest() {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    // 顧客検索ページにアクセス
    await driver.get("http://localhost:3000/customer-list");
    await driver.executeScript("window.alert = function(){};");


    // 検索ボタンをクリック
    await driver.findElement(By.css(".search-form-btn")).click();

    // 結果が表示されるまで少し待つ（0.5秒でもOK）
    await driver.sleep(500);

    // 「編集」ボタンを探してクリック
    await driver.wait(until.elementLocated(By.css(".edit-btn")), 5000);
    const editButtons = await driver.findElements(By.css(".edit-btn"));

    if (editButtons.length === 0) {
    throw new Error("編集ボタンが見つかりませんでした！");
    }
    await editButtons[0].click();


    // 編集ページに遷移したか確認
    await driver.wait(until.urlContains("/customer-edit"), 10000);

    // 最初にアラートが出てるかもしれないので事前に閉じる
    try {
    const alert = await driver.switchTo().alert();
    console.warn("⚠ アラート検知（事前）:", await alert.getText());
    await alert.accept();
    } catch (_) {
    // アラートが無ければOK
    }


    // 「顧客名」を変更（元の名前に依存しないように強制上書き）
    const nameInput = await driver.findElement(By.name("name"));
    await nameInput.clear();
    await nameInput.sendKeys("編集テスト太郎");

// companyセレクトボックスが "表示されるまで" locatorで待つ
await driver.wait(until.elementLocated(By.id("company")), 5000);

// elementが表示状態になるのを待つ（←ここ重要！取得せずlocatorのまま）
await driver.wait(until.elementIsVisible(driver.findElement(By.id("company"))), 5000);

// 🔄 ここで新しく要素取得！
const companySelect = await driver.findElement(By.id("company"));

// 安定化のためフォーカス → ちょい待つ → sendKeys
await companySelect.click();
await driver.sleep(1000);
await companySelect.sendKeys("4");




    // 「更新」ボタンを押す（修正済み）
    const updateBtn = await driver.wait(until.elementLocated(By.id("update-btn")), 5000);
    await driver.wait(until.elementIsVisible(updateBtn), 5000);
    await driver.wait(until.elementIsEnabled(updateBtn), 5000);
    await updateBtn.click();



let okBtn; // ← これだけ宣言しておく

// 編集確認モーダル「編集する」クリック
await driver.wait(until.elementLocated(By.css(".modal-btn.confirm")), 5000);
let confirmBtn = await driver.findElement(By.css(".modal-btn.confirm"));
await driver.wait(until.elementIsVisible(confirmBtn), 5000);
await driver.wait(until.elementIsEnabled(confirmBtn), 5000);
await driver.sleep(200);
await confirmBtn.click();

// 完了モーダル「OK」クリック
await driver.wait(until.elementLocated(By.css(".modal-btn.confirm")), 5000);
await driver.sleep(300); // React落ち着かせる！

okBtn = await driver.findElement(By.css(".modal-btn.confirm")); // ← ここは let/const なし！
await driver.wait(until.elementIsVisible(okBtn), 5000);
await driver.wait(until.elementIsEnabled(okBtn), 5000);
await driver.sleep(200);
await okBtn.click();







    // 一覧ページに戻ったことを確認
    await driver.wait(until.urlContains("/customer-list"), 5000);

    console.log("✅ 顧客編集テスト成功！");
  } catch (err) {
    // モーダルで止まってたら閉じる
    try {
      const alert = await driver.switchTo().alert();
      console.warn("⚠ アラート検知 → メッセージ:", await alert.getText());
      await alert.accept();
    } catch (_) {}

    console.error("❌ 顧客編集テスト失敗:", err);
  } finally {
    await driver.quit();
  }
}

customerEditTest();
