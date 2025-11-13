import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import "./style.scss";

const BOT_TOKEN = "8251599486:AAFOe2IPsCa3tuszVOGDLDqgLmiqX2T9-1E";
const CHAT_ID = "-1003252321840";

const CartModal = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotal,
    closeCart,
    clearCart,
  } = useCart();

  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const formatPrice = (val) => {
    if (val === undefined || val === null) return "";
    const num = Number(String(val).replace(/\s+/g, ""));
    if (Number.isNaN(num)) return String(val);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = async () => {
    if (!phone.trim()) {
      toast.error("Введите номер телефона");
      return;
    }
    if (cart.length === 0) {
      toast.error("Корзина пуста");
      return;
    }

    try {
      setSending(true);

      let message = "🛒 <b>Новый заказ с сайта TotemService</b>\n\n";
      message += "<b>Ваш заказ:</b>\n\n";

      cart.forEach((item, index) => {
        const name = item[`name_${lang}`] || item.name_ru || item.name_uz;
        const price = formatPrice(item.price);
        const subtotal = formatPrice(
          parseFloat(item.price || 0) * item.quantity
        );
        message += `${index + 1}. ${name}\n`;
        message += `   Цена: ${price} сум x ${item.quantity} = ${subtotal} сум\n\n`;
      });

      const total = formatPrice(getTotal());
      message += `\n<b>Сумма: ${total} сумм</b>\n\n`;
      message += `📞 Телефон: ${phone}`;

      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      });

      toast.success("Заказ успешно отправлен!");
      clearCart();
      setPhone("");
      closeCart();
    } catch (err) {
      console.error("Failed to send order:", err);
      toast.error("Не удалось отправить заказ");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={closeCart}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal__header">
          <h2>{t("Ваш заказ")}</h2>
          <button className="cart-modal__close" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-modal__body">
          {cart.length === 0 ? (
            <p className="cart-modal__empty">Корзина пуста</p>
          ) : (
            <div className="cart-modal__items">
              {cart.map((item) => {
                const name =
                  item[`name_${lang}`] || item.name_ru || item.name_uz;
                const price = formatPrice(item.price);
                const min = item.min_buy_quantity || 1;
                const max = item.max_buy_quantity || 999;

                return (
                  <div key={item._id} className="cart-item">
                    <img
                      src={item.image?.[0]?.url || "/placeholder.png"}
                      alt={name}
                      className="cart-item__img"
                    />
                    <div className="cart-item__info">
                      <h4 className="cart-item__name">{name}</h4>
                      <p className="cart-item__price">{price} сум</p>
                    </div>

                    <div className="cart-item__controls">
                      <button
                        className="cart-item__btn"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= min}
                      >
                        –
                      </button>
                      <span className="cart-item__quantity">
                        {item.quantity}
                      </span>
                      <button
                        className="cart-item__btn"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        disabled={item.quantity >= max}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item._id)}
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="cart-modal__total">
            <span>Сумма:</span>
            <span className="cart-modal__total-value">
              {formatPrice(getTotal())} сумм
            </span>
          </div>

          <input
            type="tel"
            placeholder="+998 (00) 000-00-00"
            className="cart-modal__phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            className="cart-modal__submit"
            onClick={handleSubmit}
            disabled={sending || cart.length === 0}
          >
            {sending ? "Отправка..." : "Оформить заказ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
