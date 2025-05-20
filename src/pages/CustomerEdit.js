import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./CustomerEdit.css";

function CustomerEdit() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: "",
    kana: "",
    email: "",
    tel: "",
    gender: "",
    birthday: "",
    company_id: ""
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // 顧客情報の取得
    fetch(`${API_BASE_URL}/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer({
          name: data.name,
          kana: data.kana,
          email: data.email,
          tel: data.tel,
          gender: data.gender,
          birthday: data.birthday,
          company_id: data.company_id ?? ""
        });
      })
      .catch((err) => {
        console.error("顧客取得エラー:", err.message);
        alert("顧客情報の取得に失敗しました！");
      });

    // 所属会社一覧の取得
    fetch(`${API_BASE_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => {
        console.error("会社一覧取得エラー:", err);
        alert("会社一覧の取得に失敗しました！");
      });
  }, [id]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/customers/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        ...customer
      })
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert("更新しました！");
        } else {
          alert("更新に失敗：" + result.message);
        }
      })
      .catch((err) => {
        console.error("更新エラー:", err);
        alert("通信エラーが発生しました！");
      });
  };

  return (
    <section className="edit">
      <h2 className="edit-ttl">顧客編集</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label className="edit-form-list">
          顧客名
          <input
            type="text"
            name="name"
            id="name"
            value={customer.name}
            onChange={handleChange}
          />
        </label>
        <label className="edit-form-list">
          コキャクメイ
          <input
            type="text"
            name="kana"
            id="kana"
            value={customer.kana}
            onChange={handleChange}
          />
        </label>
        <label className="edit-form-list">
          メールアドレス
          <input
            type="email"
            name="email"
            id="email"
            value={customer.email}
            onChange={handleChange}
          />
        </label>
        <label className="edit-form-list">
          電話番号
          <input
            type="tel"
            name="tel"
            id="tel"
            value={customer.tel}
            onChange={handleChange}
          />
        </label>
        <label className="edit-form-list">
          性別
          <select
            name="gender"
            id="gender"
            value={customer.gender}
            onChange={handleChange}
          >
            <option value="">すべて</option>
            <option value="m">男</option>
            <option value="f">女</option>
          </select>
        </label>
        <label className="edit-form-list">
          生年月日
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={customer.birthday}
            onChange={handleChange}
          />
        </label>
        <label className="edit-form-list">
          所属会社
          <select
            name="company_id"
            id="company"
            value={customer.company_id || ""}
            onChange={handleChange}
          >
            <option value="">会社を選択</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <button className="edit-form-btn" type="submit">
          編集
        </button>
      </form>
    </section>
  );
}

export default CustomerEdit;
