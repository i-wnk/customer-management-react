import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./CustomerEntry.css";
import { Link } from "react-router-dom";

function CustomerEntry() {
  const [form, setForm] = useState({
    name: "",
    kana: "",
    email: "",
    tel: "",
    gender: "",
    birthday: "",
    company_id: ""
  });
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    if (!form.name.trim()) {
      alert("顧客名が入力されていません。");
      return;
    }
    if (!form.kana.trim()) {
      alert("コキャクメイが入力されていません。");
      return;
    }
    if (!form.email.trim()) {
      alert("メールアドレスが入力されていません。");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("メールアドレスが正しい形式ではありません。");
      return;
    }
    if (!form.tel.trim()) {
      alert("電話番号が入力されていません。");
      return;
    }
    if (!form.gender) {
      alert("性別が選択されていません。");
      return;
    }
    if (!form.birthday) {
      alert("生年月日が入力されていません。");
      return;
    }

  const company_name = companies.find((c) => c.id == form.company_id)?.name || "";


    showRegisterConfirmModal({ ...form, company_name }, () => {
      fetch(`${API_BASE_URL}/customer/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            showCompleteModal("登録完了", "顧客の登録が完了しました。", () => {
              navigate("/customer-list");
            });
          } else {
            alert("登録に失敗：" + result.message);
          }
        })
        .catch((err) => {
          console.error("通信エラー:", err);
          alert("通信エラーが発生しました。");
        });
    });
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("会社一覧取得エラー:", err));
  }, []);

  return (
    <>
      <section className="entry">
        <h2 className="entry-ttl">顧客登録</h2>
        <form className="entry-form" onSubmit={(e) => e.preventDefault()}>
          <label className="entry-form-list">
            顧客名
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="苗字名前" />
          </label>
          <label className="entry-form-list">
            コキャクメイ
            <input type="text" name="kana" value={form.kana} onChange={handleChange} placeholder="ミョウジナマエ" />
          </label>
          <label className="entry-form-list">
            メールアドレス
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@example.com" />
          </label>
          <label className="entry-form-list">
            電話番号
            <input type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="09012345678" />
          </label>
          <label className="entry-form-list">
            性別
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">すべて</option>
              <option value="m">男</option>
              <option value="f">女</option>
            </select>
          </label>
          <label className="entry-form-list">
            生年月日
            <input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
          </label>
          <label className="entry-form-list">
            所属会社
            <select name="company_id" value={form.company_id} onChange={handleChange} id="company">
              <option value="">会社を選択</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <button className="entry-form-btn" type="button" id="register-btn" onClick={handleRegister}>
            登録
          </button>
        </form>
      </section>

      <button className="return-btn">
        <Link to="/">トップへ戻る</Link>
      </button>

      {/* モーダル */}
      <div className="modal-overlay" id="modal-overlay" style={{ display: "none" }}>
        <div className="modal-box">
          <h3 className="modal-title" id="modal-title">ここにタイトル</h3>
          <div className="modal-content" id="modal-content"></div>
          <div className="modal-buttons" id="modal-buttons"></div>
        </div>
      </div>
    </>
  );

  function showRegisterConfirmModal(data, onConfirm) {
  document.getElementById("modal-title").textContent = "登録確認";
  document.getElementById("modal-content").innerHTML = `
    以下の内容で登録してもよろしいですか？<br><br>
    【顧客名】${data.name}<br>
    【カナ】${data.kana}<br>
    【メール】${data.email}<br>
    【電話番号】${data.tel}<br>
    【性別】${data.gender}<br>
    【生年月日】${data.birthday}<br>
    【所属会社】${data.company_name}
  `;

  const buttons = document.getElementById("modal-buttons");
  buttons.innerHTML = `
    <button class="modal-btn confirm">登録する</button>
    <button class="modal-btn cancel">キャンセル</button>
  `;

  // ★ここで毎回イベント登録
  buttons.querySelector(".confirm").addEventListener("click", () => {
    closeModal();
    onConfirm();
  });
  buttons.querySelector(".cancel").addEventListener("click", closeModal);

  document.getElementById("modal-overlay").style.display = "flex";
}


function showCompleteModal(title, message, onClose) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-content").innerHTML = message;
  document.getElementById("modal-buttons").innerHTML = `
    <button class="modal-btn confirm">OK</button>
  `;
  document.querySelector(".modal-btn.confirm").addEventListener("click", () => {
    closeModal();
    if (onClose) onClose();
  });
  document.getElementById("modal-overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}


}

export default CustomerEntry;
