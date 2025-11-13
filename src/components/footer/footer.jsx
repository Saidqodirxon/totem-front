import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Yuqori chiziq */}
        <div className="footer__line"></div>

        {/* Yuqori flex qator (tugma + ijtimoiy ikonalar) */}
        <div className="footer__topbar">
          <button className="footer__btn">Заказать звонок</button>

          <div className="footer__socials">
            <a href="#">
              <FaTelegramPlane />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Asosiy grid */}
        <div className="footer__grid">
          <div className="footer__col">
            <h4 className="footer__title">Рабочее время</h4>
            <p>Пн - Сб</p>
            <p>09:00 – 20:00</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Адрес</h4>
            <p>Ташкент, пункт 9.</p>
            <p>Чиланзар 2 квартал</p>
            <p>34 дом 39 квартира</p>
            <p>(ул Арнасай) ориентир</p>
            <p>магазин люстр TEKLED</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Контакты</h4>
            <p>+998 (71) 277 52 91</p>
            <p>+998 (71) 277 05 74</p>
            <p>+998 (95) 194 88 88</p>
            <p>+998 (90) 346 65 16</p>
            <p>totem-service@mail.ru</p>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Меню</h4>
            <a href="#">Каталог продукции</a>
            <a href="#">Расчёт стоимости</a>
            <a href="#">Преимущества</a>
            <a href="#">Алгоритм работы</a>
            <a href="#">Частые вопросы</a>
          </div>
        </div>

        {/* Pastki chiziq */}
        <div className="footer__line"></div>

        {/* Pastdagi qism */}
        <div className="footer__bottom">
          <p>
            Авторские права 2025 TotemService. Все права защищены. | Разработано
            в Supersite
          </p>
          <a href="#" className="footer__privacy">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
