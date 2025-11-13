import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.scss";

const Contacts = () => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("Введите имя и номер!");

    try {
      setLoading(true);
      await axios.post("https://back.totemservice.uz/contacts", form);
      setSent(true);
      setForm({ name: "", phone: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Error sending form:", err);
      alert("Ошибка при отправке!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacts">
      <div className="contacts__wrapper">
        <h2 className="contacts__title">
          Заказать оборудование по Узбекистану <br /> прямо сейчас
        </h2>
        <p className="contacts__subtitle">
          Заполните форму и мы перезвоним вам в течение 15 минут, чтобы
          рассчитать стоимость оборудования.
        </p>

        {sent ? (
          <p className="contacts__success">✅ Заявка успешно отправлена!</p>
        ) : (
          <form className="contacts__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Введите имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="contacts__input"
            />

            <PhoneInput
              country={"uz"}
              value={form.phone}
              onChange={(phone) => setForm({ ...form, phone })}
              inputClass="contacts__phone"
              buttonClass="contacts__flag"
              placeholder="+998 (00) 000-00-00"
            />

            <button type="submit" className="contacts__btn" disabled={loading}>
              {loading ? "Отправка..." : "Заказать звонок"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contacts;
