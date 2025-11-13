import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import Footer from "../../components/footer/footer";
import Contacts from "../../components/contacts/contacts";
import "./style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

function AboutPage() {
  const [news, setNews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/news?page[limit]=2")
      .then((res) => {
        setNews(res?.data?.data);
        console.log(res.data.data, "DATA");
      })
      .catch((err) => console.error("News error:", err));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <div className="about container">
        {/* ==== ABOUT COMPANY ==== */}
        <section className="about__company">
          <h2>О компании «Totem-Service»</h2>
          <p>
            ООО «Totem-Service» — надёжный поставщик противопожарного и
            охранного оборудования, работающий на рынке с 2011 года.
          </p>
          <p>
            За годы деятельности компания зарекомендовала себя как стабильный
            партнёр, которому доверяют предприятия, организации и частные
            клиенты по всей стране. Мы специализируемся на продаже
            сертифицированного оборудования противопожарного и охранного
            назначения — от систем оповещения и сигнализации до полного
            комплекса решений для защиты объектов любой сложности.
          </p>
          <p>
            Главная цель «Totem-Service» — обеспечить безопасность наших
            клиентов, предлагая только качественную продукцию и высокий уровень
            обслуживания. Мы понимаем, что каждый объект требует индивидуального
            подхода, поэтому подбираем оборудование с учётом особенностей и
            потребностей заказчика.
          </p>

          <div className="about__main-img">
            <img src="/about/img1.png" alt="fireman" />
          </div>

          <div className="about__gallery">
            <img src="/about/img2.png" alt="" />
            <img src="/about/img3.png" alt="" />
            <img src="/about/img4.png" alt="" />
            <img src="/about/img5.png" alt="" />
          </div>
        </section>

        {/* ==== OUR APPROACH ==== */}
        <section className="about__work">
          <h2>Наш подход к работе</h2>
          <p>
            Мы строим сотрудничество на честности и профессионализме. Для нас
            важно не просто продать оборудование, а помочь клиенту создать
            систему, которая действительно работает — эффективно, стабильно и
            долго.
          </p>
          <p>
            Поэтому мы тщательно проверяем качество поставляемой продукции,
            работаем только с проверенными производителями и всегда соблюдаем
            сроки. Особое внимание уделяем индивидуальным запросам. Если
            стандартные решения недостаточны — организуем поставку под заказ или
            из-за рубежа.
          </p>
          <p>
            Каждый клиент получает персональное внимание и поддержку на всех
            этапах — от подбора оборудования до оформления сделки и доставки.
          </p>
        </section>

        {/* ==== WHY TRUST US ==== */}
        <section className="about__trust">
          <h2>Почему нам доверяют</h2>
          <p>
            «Totem-Service» ценит долгосрочные отношения. Многие клиенты
            сотрудничают с нами годами, потому что знают: мы всегда выполняем
            обязательства, предлагаем разумные цены и не отказываемся от сложных
            задач.
          </p>
          <p>
            Мы стремимся быть компанией, с которой приятно работать — надёжной,
            гибкой и внимательной к деталям.
          </p>
        </section>

        {/* ==== INSTEAD OF CONCLUSION ==== */}
        <section className="about__final">
          <h2>Вместо вывода</h2>
          <p>
            С 2011 года «Totem-Service» помогает создавать безопасную среду для
            бизнеса и людей. Мы верим, что качественная защита — это не просто
            оборудование, а результат опыта, доверия и ответственного подхода.
          </p>
          <p>
            Именно поэтому каждый наш проект — это не просто поставка, а вклад в
            безопасность будущего.
          </p>

          <div className="about__cards">
            {news.length > 0 ? (
              news.map((item) => (
                <div className="about__card" key={item._id}>
                  <img
                    src={item?.image[0]?.url}
                    alt={item[`name_ru`] || "news"}
                  />
                  <h3>
                    {item[`name_ru`]} {item[0]?.image?.url}
                  </h3>
                  <div className="about__meta">
                    <span>{item[0]?.createdAt?.split("T")[0]}</span>
                    <span className="flex items-center gap-2">
                      <Eye size={16} />
                      {item?.views || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>Новостей пока нет...</p>
            )}
          </div>

          <button className="blog-btn" onClick={() => navigate("/news")}>
            Перейти в блог
          </button>
        </section>
      </div>

      <Contacts />
      <Footer />
    </>
  );
}

export default AboutPage;
