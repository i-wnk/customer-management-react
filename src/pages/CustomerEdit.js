import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import "./CustomerEdit.css";

function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    // 顧客情報取得
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

    // 所属会社一覧取得
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

    showEditConfirmModal(customer, () => {
      fetch(`${API_BASE_URL}/customer/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, ...customer })
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            showEditSuccessModal();
          } else {
            alert("更新に失敗：" + result.message);
          }
        })
        .catch((err) => {
          console.error("更新エラー:", err);
          alert("通信エラーが発生しました！");
        });
    });
  };

  return (
    <>
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
              value={customer.company_id}
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

      {/* モーダルHTML（CSS崩さず再現） */}
      <div className="modal-overlay" id="modal-overlay" style={{ display: "none" }}>
        <div className="modal-box">
          <h3 className="modal-title" id="modal-title">ここにタイトル</h3>
          <div className="modal-content" id="modal-content"></div>
          <div className="modal-buttons" id="modal-buttons"></div>
        </div>
      </div>
    </>
  );

  // 編集確認モーダル
  function showEditConfirmModal(data, onConfirm) {
  document.getElementById("modal-title").textContent = "編集確認";
  document.getElementById("modal-content").innerHTML = `
    以下の内容で編集してもよろしいですか？<br><br>
    【顧客名】${data.name}<br>
    【カナ】${data.kana}<br>
    【メール】${data.email}<br>
    【電話番号】${data.tel}<br>
    【性別】${data.gender}<br>
    【生年月日】${data.birthday}<br>
    【所属会社】${document.querySelector('#company')?.selectedOptions[0]?.textContent}
  `;

  const buttons = document.getElementById("modal-buttons");
  buttons.innerHTML = "";

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "編集する";
  confirmBtn.className = "modal-btn confirm";
  confirmBtn.addEventListener("click", () => {
    closeModal();
    onConfirm();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "キャンセル";
  cancelBtn.className = "modal-btn cancel";
  cancelBtn.addEventListener("click", closeModal);

  buttons.appendChild(confirmBtn);
  buttons.appendChild(cancelBtn);

  document.getElementById("modal-overlay").style.display = "flex";
}


  // 編集完了モーダル
  function showEditSuccessModal() {
    document.getElementById("modal-title").textContent = "編集完了";
    document.getElementById("modal-content").innerHTML = `顧客情報の更新が完了しました。`;
    document.getElementById("modal-buttons").innerHTML = `
      <button class="modal-btn confirm">OK</button>
    `;
    document.querySelector(".modal-btn.confirm").addEventListener("click", () => {
      navigate("/customer-list");
    });
    document.getElementById("modal-overlay").style.display = "flex";
  }

  function closeModal() {
    document.getElementById("modal-overlay").style.display = "none";
  }
}

export default CustomerEdit;
