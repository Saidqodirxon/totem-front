import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./style.scss";

const NewsInner = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language || "uz";
  const navigate = useNavigate();

  const [news, setNews] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://back.totemservice.uz/news/${id}`);
        setNews(res.data?.data);
      } catch (err) {
        console.error("Xatolik:", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) {
    return (
      <div className="news-inner-loading">
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  // Translate fields dynamically
  const title = news[`name_${lang}`] || news.name_uz;
  const description = news[`description_${lang}`] || news.description_uz;
  const mainImage = news.image?.[0]?.url;

  const formattedDate = new Date(news.updatedAt).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Navbar />
      <div className="news-inner">
        <h1 className="news-inner__title">{title}</h1>

        <div className="news-inner__meta">
          <span>{formattedDate}</span>
          <span className="views">
            <Eye size={18} />
            {news.views || 0}
          </span>
        </div>

        {mainImage && (
          <div className="news-inner__cover">
            <img src={mainImage} alt={title} />
          </div>
        )}

        <div
          className="news-inner__content"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <button className="news-inner-btn" onClick={() => navigate("/news")}>
          Ortga qaytish
        </button>
      </div>
      <Footer />
    </>
  );
};

export default NewsInner;
