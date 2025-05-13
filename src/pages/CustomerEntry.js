// src/pages/CustomerEntry.js
import "./CustomerEntry.css";
import { Link } from "react-router-dom";

function CustomerEntry() {
  return (
    <section className="entry">
      <h2 className="entry-ttl">顧客登録</h2>
      <form className="entry-form">
        <label className="entry-form-list">
          顧客名
          <input type="text" name="name" id="name" placeholder="苗字名前" />
        </label>
        <label className="entry-form-list">
          コキャクメイ
          <input type="text" name="kana" id="kana" placeholder="ミョウジナマエ" />
        </label>
        <label className="entry-form-list">
          メールアドレス
          <input type="email" name="email" id="email" placeholder="example@example.com" />
        </label>
        <label className="entry-form-list">
          電話番号
          <input type="tel" name="tel" id="tel" placeholder="09012345678" />
        </label>
        <label className="entry-form-list">
          性別
            <select name="gender" id="gender">
                <option value="">すべて</option>
                <option value="m">男</option>
                <option value="f">女</option>
            </select>
        </label>
        <label className="entry-form-list">
          生年月日
          <input type="date" name="birthday" id="birthday" />
        </label>
        <label className="entry-form-list">
          所属会社
          <select name="company" id="company">
            <option value="">会社を選択</option>
          </select>
        </label>
        <button className="entry-form-btn" type="button" id="register-btn">登録</button>
      </form>{/* /.entry-form */}

      <Link to="/" className="return-btn">トップへ戻る</Link>
    </section>// /.entry
  );
}

export default CustomerEntry;