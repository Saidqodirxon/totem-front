import React from "react";
import "./style.scss";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import Contacts from "../../components/contacts/contacts";
import Footer from "../../components/footer/footer";
import Faqs from "../../components/faqs";
import Advantages from "../../components/adventages/adventages";
import { TiTick } from "react-icons/ti";

const AdvantagesPage = () => {
  const advData = [
    {
      title: "Подберём оборудование под ваши задачи:",
      desc: "от систем пожарной безопасности до охранных решений — для предприятий, офисов и частных объектов.",
    },
    {
      title: "Поможем оформить заказ любым удобным способом:",
      desc: "по безналичному расчёту, банковской карте или наличными.",
    },
    {
      title: "Сопровождаем на всех этапах:",
      desc: "от подбора оборудования до поставки и монтажа.",
    },
    {
      title: "Реализуем индивидуальные заказы:",
      desc: "производство под размеры, комплектацию и поставку из-за рубежа.",
    },
    {
      title: "Гибкая система скидок для постоянных клиентов:",
      desc: "персональные условия и выгодные предложения.",
    },
    {
      title: "Работаем с 2011 года — ",
      desc: "ваш надёжный партнёр в сфере противопожарного и охранного оборудования.",
    },
  ];

  const steps = [
    {
      title: "Заявка или консультация",
      desc: "Клиент оставляет заявку на сайте, по телефону или в офисе. Мы уточняем потребности и задачи объекта.",
    },
    {
      title: "Подбор оборудования",
      desc: "Специалисты подбирают оптимальные решения по противопожарным и охранным системам с учётом бюджета и требований.",
    },
    {
      title: "Коммерческое предложение и согласование",
      desc: "Предоставляем расчёт стоимости и спецификацию. Согласовываем комплектацию, сроки и условия оплаты.",
    },
    {
      title: "Оформление договора и оплата",
      desc: "Заключаем договор поставки. Оплата возможна по безналичному расчёту, картой или наличными.",
    },
    {
      title: "Поставка и передача оборудования",
      desc: "Организуем доставку по адресу клиента или самовывоз. При необходимости оформляем индивидуальный заказ или поставку из-за рубежа.",
    },
    {
      title: "Поддержка и сопровождение",
      desc: "Предоставляем консультации по установке, технические документы и помощь при последующих заказах.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero />

      {/* --- Advantages Section --- */}
      <div className="adv">
        <h2 className="adv-title">Мы не берём лишних наценок!</h2>
        <p className="adv-desc">Цена у нас = Цена производителя</p>

        <div className="adv__cards">
          {advData.map((item, index) => (
            <div key={index} className="adv__cards__card">
              <div className="adv__cards__card__top">
                <span>0{index + 1}</span>
                <img src="/fire.svg" alt="fire" />
              </div>
              <h3 className="adv__cards__card-title">{item.title}</h3>
              <p className="adv__cards__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Algorithm Section --- */}
      <section className="algorithm">
        <div className="algorithm__container">
          <div className="algorithm__left">
            <h2>
              От звонка до разгрузки щебня
              <br />
              <span>на вашем объекте не более 24 часов</span>
            </h2>
            <div className="algorithm__steps">
              {steps.map((item, i) => (
                <div key={i} className="algorithm__step">
                  <div className="algorithm__icon">
                    <TiTick />
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="algorithm__right">
            <div className="algorithm__top-images">
              <img src="/advantages/img11.png" alt="fire extinguisher" />
              <img src="/advantages/img22.png" alt="fire box" />
            </div>

            <div className="algorithm__fire">
              <img src="/noto_fire.svg" alt="fire icon" />
            </div>

            <div className="algorithm__bottom-image">
              <img src="/advantages/img33.png" alt="pipes" />
            </div>
          </div>
        </div>
      </section>

      <Advantages />
      <Faqs />
      <Contacts />
      <Footer />
    </>
  );
};

export default AdvantagesPage;
