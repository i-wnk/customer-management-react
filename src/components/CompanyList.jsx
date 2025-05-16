import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";
import "../pages/CompanyList";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/companies`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((error) => {
        console.error("通信エラー:", error);
        alert("通信エラーが発生しました！");
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCompanies = companies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(companies.length / perPage);

  // モーダル表示処理（編集）
  const showEditCompanyModal = (companyId, companyName) => {
    document.getElementById("modal-title").textContent = "会社名編集";

    document.getElementById("modal-content").innerHTML = `
      <input type="text" id="edit-company-name" value="${companyName}" style="padding: 10px; width: 80%;" />
    `;

    document.getElementById("modal-buttons").innerHTML = `
      <button class="modal-btn confirm" id="modal-save">編集する</button>
      <button class="modal-btn cancel" onclick="document.getElementById('modal-overlay').style.display='none'">キャンセル</button>
    `;

    document.getElementById("modal-overlay").style.display = "flex";

    setTimeout(() => {
      document.getElementById("modal-save").onclick = () => {
        const newName = document.getElementById("edit-company-name").value;
        fetch(`${API_BASE_URL}/companies/${companyId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              document.getElementById("modal-title").textContent = "更新完了";
              document.getElementById("modal-content").innerHTML = "会社名を更新しました。";
              document.getElementById("modal-buttons").innerHTML = `
                <button class="modal-btn confirm" onclick="document.getElementById('modal-overlay').style.display='none'">OK</button>
              `;
              fetch(`${API_BASE_URL}/companies`)
                .then((res) => res.json())
                .then((data) => setCompanies(data));
            } else {
              alert("更新失敗：" + data.message);
            }
          })
          .catch((err) => {
            console.error(err);
            alert("通信エラーが発生しました！");
          });
      };
    }, 0);
  };

  return (
    <>
      <section className="company">
        <h2 className="company-ttl">所属会社一覧</h2>

        <label className="companyPerPage" htmlFor="perPage">
          表示件数：
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={10}>10件</option>
            <option value={20}>20件</option>
          </select>
        </label>

        <div className="company-tabel-wrap">
          <table className="company-tabel">
            <thead className="company-tabel-head">
              <tr>
                <th>会社ID</th>
                <th>所属会社</th>
                <th>編集</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody className="company-tabel-body" id="company-list">
              {paginatedCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>
                    <button className="edit-btn" onClick={() => showEditCompanyModal(company.id, company.name)}>編集</button>
                  </td>
                  <td>
                    <button className="delete-btn">削除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div id="pagination" className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <Link to="/" className="return-btn">
          トップへ戻る
        </Link>
      </section>

      {/* モーダル（JSで内容を動的に差し込む） */}
      <div className="modal-overlay" id="modal-overlay" style={{ display: "none" }}>
        <div className="modal-box">
          <h3 className="modal-title" id="modal-title">{/* ここにタイトル */}</h3>
          <div className="modal-content" id="modal-content"></div>
          <div className="modal-buttons" id="modal-buttons"></div>
        </div>
      </div>
    </>
  );
}

export default CompanyList;
