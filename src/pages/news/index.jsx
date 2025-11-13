import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./style.scss";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const { i18n } = useTranslation();
  const lang = i18n.language || "uz";

  const truncateHTML = (html, wordLimit = 25) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return html;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        `https://back.totemservice.uz/news?page[limit]=${limit}`
      );
      setNews(res.data?.data || []);
      setTotal(res.data?.pageInfo?.total || 0);
    } catch (err) {
      console.error("Xatolik:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [limit]);

  const loadAll = () => {
    setLimit(total); // bitta so‘rovda hammasini olib keladi
  };

  return (
    <>
      <Navbar />
      <section className="news">
        <h2 className="news__title">
          Блог — комплект совместимого противопожарного оборудования
        </h2>

        <div className="news__grid">
          {news.map((item, index) => (
            <Link
              to={`/news/${item._id}`}
              key={item._id}
              className={`news__card ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="news__image">
                <img
                  src={item.image?.[0]?.url}
                  alt={item[`name_${lang}`]}
                  loading="lazy"
                />
              </div>
              <div className="news__info">
                <h3 className="news__name">{item[`name_${lang}`]}</h3>
                <div
                  className="news__desc"
                  dangerouslySetInnerHTML={{
                    __html: truncateHTML(item[`description_${lang}`] || "", 25),
                  }}
                />
                <div className="news__meta">
                  <span className="news__date">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString(lang)
                      : "01.10.2025"}
                  </span>
                  <span className="news__views">
                    <Eye size={16} /> {item.views || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {news.length < total && (
          <div className="news__loadmore">
            <button onClick={loadAll}>Показать ещё</button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default NewsPage;
