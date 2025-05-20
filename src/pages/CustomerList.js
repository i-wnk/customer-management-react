import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import "./CustomerList.css";

function CustomerList() {
  const [name, setName] = useState("");
  const [kana, setKana] = useState("");
  const [gender, setGender] = useState("");
  const [birthdayStart, setBirthdayStart] = useState("");
  const [birthdayEnd, setBirthdayEnd] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  const navigate = useNavigate();


  // 初回：会社一覧取得
  useEffect(() => {
    fetch(`${API_BASE_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("会社一覧取得エラー:", err));
  }, []);

  // 検索処理
  const fetchCustomers = (pageParam = page, sortCol = sortColumn, sortOrd = sortOrder) => {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (kana) params.append("kana", kana);
    if (gender !== "") params.append("gender", gender);
    if (birthdayStart) params.append("birthday_start", birthdayStart);
    if (birthdayEnd) params.append("birthday_end", birthdayEnd);
    if (companyId) params.append("company_id", companyId);

    params.append("page", pageParam);
    params.append("per_page", perPage);
    params.append("sort_column", sortCol);
    params.append("sort_order", sortOrd);

    fetch(`${API_BASE_URL}/customers?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.customers || data); // Laravelの構成に応じて調整
        setTotal(data.total || data.length || 0);
        setPage(pageParam);
        setSortColumn(sortCol);
        setSortOrder(sortOrd);
      })
      .catch((err) => {
        console.error("検索エラー:", err);
        alert("検索に失敗しました！");
      });
  };

  // フォーム送信
  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers(1); // 新規検索時は1ページ目に
  };

  // ページ番号表示
  const renderPagination = () => {
    const totalPages = Math.ceil(total / perPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
      <button
        key={p}
        onClick={() => fetchCustomers(p)}
        className="page-btn"
        disabled={p === page}
      >
        {p}
      </button>
    ));
  };

  // ソート切り替え
  const toggleSort = (column) => {
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    fetchCustomers(1, column, newOrder);
  };

  return (
    <>
      <section className="search">
        <h2 className="search-ttl">顧客検索・一覧</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <label className="search-form-list">
            顧客名
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="苗字名前" />
          </label>
          <label className="search-form-list">
            コキャクメイ
            <input value={kana} onChange={(e) => setKana(e.target.value)} placeholder="ミョウジナマエ" />
          </label>
          <label className="search-form-list">
            性別
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">すべて</option>
              <option value="m">男</option>
              <option value="f">女</option>
            </select>
          </label>
          <label className="search-form-list">
            生年月日（開始）
            <input type="date" value={birthdayStart} onChange={(e) => setBirthdayStart(e.target.value)} />
          </label>
          <label className="search-form-list">
            生年月日（終了）
            <input type="date" value={birthdayEnd} onChange={(e) => setBirthdayEnd(e.target.value)} />
          </label>
          <label className="search-form-list">
            所属会社
            <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
              <option value="">会社を選択</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <button className="search-form-btn" type="submit">
            検索
          </button>
        </form>

        <label className="perPage" htmlFor="perPage">
          表示件数：
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              fetchCustomers(1); // 件数変更時は1ページ目から
            }}
          >
            <option value={10}>10件</option>
            <option value={20}>20件</option>
          </select>
        </label>
      </section>

      <section className="catalogue">
        <table className="catalogue-tabel">
          <thead className="catalogue-tabel-head">
            <tr>
              <th id="sortById" onClick={() => toggleSort("id")}>
                顧客ID
                <span id="sortIconId">{sortColumn === "id" ? (sortOrder === "ASC" ? "▲" : "▼") : ""}</span>
              </th>
              <th>顧客名</th>
              <th>コキャクメイ</th>
              <th>メールアドレス</th>
              <th>電話番号</th>
              <th>所属会社</th>
              <th>新規登録日時</th>
              <th id="sortByUpdatedAt" onClick={() => toggleSort("updated_at")}>
                最終更新日時
                <span id="sortIconUpdatedAt">
                  {sortColumn === "updated_at" ? (sortOrder === "ASC" ? "▲" : "▼") : ""}
                </span>
              </th>
              <th>編集</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody className="catalogue-tabel-body">
            {results.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td>{cust.kana}</td>
                <td>{cust.email}</td>
                <td>{cust.tel}</td>
                <td>{cust.company_name || "未所属"}</td>
                <td>{cust.created_at}</td>
                <td>{cust.updated_at}</td>
                <td>
                  <button className="catalogue-tabel-body-btn edit-btn" onClick={() => navigate(`/customer-edit/${cust.id}`)}>編集</button>
                </td>
                <td>
                  <button className="catalogue-tabel-body-btn delete-btn" onClick={() => showDeleteCustomerModal(cust.id, cust.name)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="pagination" className="pagination">
          {renderPagination()}
        </div>

        <Link to="/" className="return-btn">
          トップへ戻る
        </Link>
      </section>
      <div className="modal-overlay" id="modal-overlay" style={{ display: "none" }}>
        <div className="modal-box">
          <h3 className="modal-title" id="modal-title">ここにタイトル</h3>
          <div className="modal-content" id="modal-content"></div>
          <div className="modal-buttons" id="modal-buttons"></div>
        </div>
      </div>

    </>
  );

  function showDeleteCustomerModal(customerId, customerName) {
  document.getElementById("modal-title").textContent = "削除確認";
  document.getElementById("modal-content").innerHTML = `「<strong>${customerName}</strong>」を削除してもよろしいですか？`;

  const buttons = document.getElementById("modal-buttons");
  buttons.innerHTML = "";

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "削除する";
  confirmBtn.className = "modal-btn confirm";
  confirmBtn.addEventListener("click", () => {
    deleteCustomer(customerId);
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "キャンセル";
  cancelBtn.className = "modal-btn cancel";
  cancelBtn.addEventListener("click", closeModal);

  buttons.appendChild(confirmBtn);
  buttons.appendChild(cancelBtn);

  document.getElementById("modal-overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}


function deleteCustomer(customerId) {
  fetch(`${API_BASE_URL}/customer/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: customerId })
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        closeModal();
        showDeletedCustomerModal(customerId);
        fetchCustomers(1); // ← 一覧を再取得して更新！
      } else {
        alert("削除に失敗：" + result.message);
      }
    })
    .catch((err) => {
      console.error("削除エラー:", err);
      alert("通信エラーが発生しました！");
    });
}

function showDeletedCustomerModal(name) {
  document.getElementById("modal-title").textContent = "削除完了";
  document.getElementById("modal-content").innerHTML = "削除が完了しました。";

  document.getElementById("modal-buttons").innerHTML = `
    <button class="modal-btn confirm" onclick="document.getElementById('modal-overlay').style.display = 'none'">OK</button>
  `;

  document.getElementById("modal-overlay").style.display = "flex";
}




}

export default CustomerList;
