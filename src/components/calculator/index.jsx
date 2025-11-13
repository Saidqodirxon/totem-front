import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_STEPS = 6;

const initialForm = {
  product: "",
  equipmentKind: [],
  whenNeed: "",
  volume: "",
  delivery: "",
  name: "",
  phone: "",
};

const BOT_TOKEN = "8251599486:AAFOe2IPsCa3tuszVOGDLDqgLmiqX2T9-1E";
const CHAT_ID = "-1003252321840";

function Calculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/products?page[limit]=3")
      .then((res) => setProducts(res.data?.data || []))
      .catch(() => console.error("Mahsulotlarni olishda xatolik"));
  }, []);

  const equipmentKinds = [
    "Противопожарное",
    "Охранное",
    "Система видеонаблюдения",
    "Комплексное решение",
  ];

  const whenNeedOptions = [
    "Сегодня",
    "В течение 3-х дней",
    "В течение 2-х недель",
    "Планируете на будущее",
  ];

  const deliveryOptions = ["Да, доставка нужна", "Нет, вывезу сам"];

  const toggleKind = (kind) => {
    setForm((prev) => {
      const exists = prev.equipmentKind.includes(kind);
      return {
        ...prev,
        equipmentKind: exists
          ? prev.equipmentKind.filter((k) => k !== kind)
          : [...prev.equipmentKind, kind],
      };
    });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!form.product) return "Выберите оборудование.";
        break;
      case 2:
        if (!form.equipmentKind.length) return "Выберите хотя бы один вариант.";
        break;
      case 3:
        if (!form.whenNeed) return "Укажите, когда нужно оборудование.";
        break;
      case 4:
        if (!form.volume.trim())
          return "Введите объем или количество оборудования.";
        break;
      case 5:
        if (!form.delivery) return "Выберите вариант доставки.";
        break;
      case 6:
        if (!form.name.trim()) return "Введите имя.";
        if (!form.phone.trim()) return "Введите телефон.";
        break;
      default:
        break;
    }
    return "";
  };

  const nextStep = async () => {
    const err = validateStep();
    if (err) return setError(err);

    // oxirgi stepda jo‘natamiz
    if (step === TOTAL_STEPS) {
      await sendToTelegram();
      setIsSent(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const sendToTelegram = async () => {
    try {
      setLoading(true);

      const selectedProduct = products.find((p) => p._id === form.product);
      const message = `
🧮 <b>Новая заявка с сайта TotemService</b>

<b>1️⃣ Какое оборудование вас интересует?</b>
${selectedProduct ? selectedProduct.name_ru : "-"}

<b>2️⃣ Какое оборудование вам нужно?</b>
${form.equipmentKind.join(", ") || "-"}

<b>3️⃣ Когда вам нужно оборудование?</b>
${form.whenNeed || "-"}

<b>4️⃣ Объем / количество:</b>
${form.volume || "-"}

<b>5️⃣ Нужна ли доставка?</b>
${form.delivery || "-"}

<b>6️⃣ Контактные данные:</b>
👤 ${form.name}
📞 ${form.phone}
      `;

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      });

      setLoading(false);
    } catch (e) {
      console.error("Telegramga yuborishda xatolik:", e);
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (isSent)
      return (
        <div className="calc__done">
          <h2>Отлично! Заявка отправлена 🎉</h2>
          <p>Наш специалист свяжется с вами в ближайшее время.</p>
        </div>
      );

    switch (step) {
      case 1:
        return (
          <>
            <h2 className="calc__question">
              Какое оборудование вас интересует?
            </h2>
            <div className="calc__grid">
              {products.map((p) => (
                <button
                  key={p._id}
                  className={`calc__card ${
                    form.product === p._id ? "active" : ""
                  }`}
                  onClick={() => handleChange("product", p._id)}
                >
                  <div className="calc__img-wrap">
                    <img
                      src={p.image?.[0]?.url}
                      alt={p.name_ru}
                      className="calc__img"
                      width="150"
                      height="180"
                    />
                  </div>
                  <p>{p.name_ru}</p>
                </button>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="calc__question">Какое оборудование вам нужно?</h2>
            <div className="calc__options">
              {equipmentKinds.map((kind) => (
                <button
                  key={kind}
                  className={`calc__option ${
                    form.equipmentKind.includes(kind) ? "active" : ""
                  }`}
                  onClick={() => toggleKind(kind)}
                >
                  {kind}
                </button>
              ))}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="calc__question">Когда вам нужно оборудование?</h2>
            <div className="calc__options">
              {whenNeedOptions.map((opt) => (
                <button
                  key={opt}
                  className={`calc__option ${
                    form.whenNeed === opt ? "active" : ""
                  }`}
                  onClick={() => handleChange("whenNeed", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="calc__question">
              Какой объем или количество требуется?
            </h2>
            <textarea
              placeholder="Введите ваш ответ..."
              className="calc__textarea"
              value={form.volume}
              onChange={(e) => handleChange("volume", e.target.value)}
            />
          </>
        );
      case 5:
        return (
          <>
            <h2 className="calc__question">Нужна ли вам доставка?</h2>
            <div className="calc__options">
              {deliveryOptions.map((opt) => (
                <button
                  key={opt}
                  className={`calc__option ${
                    form.delivery === opt ? "active" : ""
                  }`}
                  onClick={() => handleChange("delivery", opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="calc__question">Отлично! Остался последний шаг.</h2>
            <p className="calc__desc">
              Укажите контактные данные для расчета стоимости:
            </p>
            <div className="calc__form">
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="tel"
                placeholder="+7 (999) 000-00-00"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <section className="calc">
      <h1 className="calc__title">
        Ответьте на 6 вопросов и получите расчёт стоимости
      </h1>
      <div className="calc__wrapper">
        {/* LEFT SIDE */}
        <div className="calc__expert">
          <div className="calc__expert-card">
            <img
              src="/expert.png"
              alt="expert"
              className="calc__expert-photo"
            />
            <h3>Хамидуллаев Абдуллох</h3>
            <p className="calc__role">Эксперт</p>
            <p>
              Помогу рассчитать стоимость оборудования и доставку до вашего
              объекта.
            </p>
            <p>
              Какое оборудование вас интересует — противопожарное, охранное или
              комплексное решение?
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="calc__content">
          {renderStep()}

          {!isSent && (
            <div className="calc__footer">
              <p>
                Шаг: {step}/{TOTAL_STEPS}
              </p>
              {error && <span className="calc__error">{error}</span>}
              <div className="calc__buttons">
                <button
                  className="calc__btn-outline"
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="calc__btn"
                  onClick={nextStep}
                  disabled={loading}
                >
                  {loading ? (
                    "Отправка..."
                  ) : step === TOTAL_STEPS ? (
                    "Отправить"
                  ) : (
                    <>
                      Далее <ChevronRight />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Calculator;
