// src/pages/CompanyList.js
import "./CompanyList.css";
import { Link } from "react-router-dom";

function CompanyList() {
  return (
    <section className="company">
        <h2 className="company-ttl">所属会社一覧</h2>

        <label className="companyPerPage" htmlFor="perPage">表示件数：
            <select id="perPage">
                <option value="10">10件</option>
                <option value="20">20件</option>
            </select>
        </label>{/* /.companyPerPage */}

        <div className="company-tabel-wrap">
          <table className="company-tabel">
                <thead className="company-tabel-head">
                    <tr>
                      <th>会社ID</th>
                      <th>所属会社</th>
                      <th>編集</th>
                      <th>削除</th>
                    </tr>
                </thead>{/* /.company-tabel-head */}
              <tbody className="company-tabel-body" id="company-list">
                    {/* <tr>
                        <td>1</td>
                        <td>〇〇株式会社</td>
                        <td><button className="edit-btn">編集</button></td>
                        <td><button className="delete-btn">削除</button></td>
                    </tr> */}
              </tbody>{/* /.company-tabel-body */}
          </table>{/* /.company-tabel */}
        </div>{/* /.company-tabel-wrap */}

        <div id="pagination" className="pagination"></div>


        <Link to="/" className="return-btn">トップへ戻る</Link>
        
    </section>// /.company
  );
}

export default CompanyList;
