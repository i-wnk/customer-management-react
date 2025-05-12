// src/pages/CustomerList.js
import { Link } from "react-router-dom";
import "./CustomerList.css";

function CustomerList() {
  return (
    <>
    <section className="search">
        <h2 className="search-ttl">顧客検索・一覧</h2>
        <form className="search-form">
            <label className="search-form-list">
                顧客名<input type="text" name="name" id="search-name" placeholder="苗字名前"/>
            </label>
            <label className="search-form-list">
                コキャクメイ<input type="text" name="kana" id="search-kana" placeholder="ミョウジナマエ"/>
            </label>
            <label className="search-form-list">
                性別
                <select name="gender" id="search-gender">
                    <option value="">すべて</option>
                    <option value="m">男</option>
                    <option value="f">女</option>
                </select>
            </label>
            <label className="search-form-list">
                生年月日（開始）<input type="date" name="birthday_start" id="search-birthday-start"/>
            </label>
            <label className="search-form-list">
                生年月日（終了）<input type="date" name="birthday_end" id="search-birthday-end"/>
            </label>
            
            <label className="search-form-list" htmlForfor="company">
                所属会社
                <select name="company" id="company">
                    <option value="">会社を選択</option>
                    {/* JSでここに会社一覧を追加する */}
                </select>
            </label>
            <button class="search-form-btn" type="submit" id="search-btn">検索</button>
        </form>{/* /.search-form */}

        {/* 表示件数選択 */}
        <label className="perPage" htmlForfor="perPage">表示件数：
            <select id="perPage">
                <option value="10">10件</option>
                <option value="20">20件</option>
            </select>
        </label>{/* /.perPage */}
        
    </section>{/* /.search */}
    

    <section className="catalogue">
        <table className="catalogue-tabel">
            <thead className="catalogue-tabel-head">
                <tr>
                    <th id="sortById">顧客ID<span id="sortIconId">▲</span></th>
                    <th>顧客名</th>
                    <th>コキャクメイ</th>
                    <th>メールアドレス</th>
                    <th>電話番号</th>
                    <th>所属会社</th>
                    <th>新規登録日時</th>
                    <th id="sortByUpdatedAt">最終更新日時<span id="sortIconUpdatedAt">▲</span></th>
                    <th>編集</th>
                    <th>削除</th>
                </tr>
            </thead>{/* /.catalogue-tabel-head */}
            <tbody className="catalogue-tabel-body" id="customer-table-body">
                {/* <tr>
                    <td>0001</td>
                    <td>苗字名前</td>
                    <td>ミョウジナマエ</td>
                    <td>example@example.com</td>
                    <td>09012345678</td>
                    <td>〇〇株式会社</td>
                    <td>2025/04/01</td>
                    <td>2025/04/09</td>
                    <td><button class="catalogue-tabel-body-btn edit-btn" data-id="${customer.id}">編集</button></td>
                    <td><button class="catalogue-tabel-body-btn delete-btn" data-id="顧客ID" data-name="顧客名">削除</button>
                    </td>
                  </tr> */}
            </tbody>{/* /.catalogue-tabel-body */}
        </table>{/* /.catalogue-tabel */}

        {/* ページャー（ページ番号や次へボタンを入れる場所） */}
        <div id="pagination" className="pagination"></div>
        <Link to="/" className="return-btn">トップへ戻る</Link>
    </section>{/* /.catalogue */}

    </>
  );
}

export default CustomerList;