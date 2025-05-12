// src/pages/Home.js
import { Link } from "react-router-dom";
import "./Home.css";


function Home() {
  return (
    <section className="top">
        <div className="top-inner">
            <h1 className="top-ttl">顧客管理システム</h1>
            <ul className="top-list">
                <li className="top-list-ttl">
                    <Link to="/customer-list">顧客検索・一覧</Link>
                </li>{/* /.top-list-ttl */}
                <li className="top-list-ttl">
                    <Link to="/customer-entry">顧客登録</Link>
                </li>{/* /.top-list-ttl */}
                <li className="top-list-ttl">
                    <Link to="/company-list">所属会社一覧</Link>
                </li>{/* /.top-list-ttl */}
            </ul>{/* /.top-list */}
        </div>{/* /.top-inner */}
    </section>// /.top
  );
}

export default Home;