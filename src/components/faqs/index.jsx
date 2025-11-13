import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import "./style.scss";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/faqs")
      .then((res) => setFaqs(res.data?.data || []))
      .catch((err) =>
        console.error("FAQ ma'lumotlarini olishda xatolik:", err)
      );
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs">
      <div className="container">
        <div className="faqs__title">
          <div className="faqs__title-texts">
            <h4 className="faqs__title-text-1">
              ОТВЕТЫ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
            </h4>
            <h2 className="faqs__title-text-2">
              Нажмите по вопросу, чтобы получить на него ответ
            </h2>
          </div>
          <button className="faqs__title-btn">Частые вопросы</button>
        </div>

        <div className="faqs-list">
          {faqs.map((item, index) => (
            <div key={item._id} className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.quiz_ru}</span>
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer_ru}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-buttons">
          <a
            href="https://wa.me/998901234567"
            target="_blank"
            rel="noopener noreferrer"
            className="faq-btn whatsapp"
          >
            <FaWhatsapp className="icon" /> Задать свой вопрос в Whatsapp
          </a>

          <a
            href="https://t.me/totemservice"
            target="_blank"
            rel="noopener noreferrer"
            className="faq-btn telegram"
          >
            <FaTelegramPlane className="icon" /> Задать свой вопрос в Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
