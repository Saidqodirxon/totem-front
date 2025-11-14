import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { useCart } from "../../context/CartContext";
import logo from "/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { openCart, getTotalItems } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const homeRef = useRef(null);
  const catalogRef = useRef(null);

  const cartItemCount = getTotalItems();

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/categories")
      .then((res) => setCategories(res.data?.data || []))
      .catch((err) => console.error("Kategoriya olishda xatolik:", err));
  }, []);

  // Outside click
  useEffect(() => {
    const handler = (e) => {
      if (homeRef.current && !homeRef.current.contains(e.target))
        setHomeOpen(false);
      if (catalogRef.current && !catalogRef.current.contains(e.target))
        setCatalogOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAnchorClick = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full text-white font-sans">
      {/* ===================== TOP BAR ===================== */}
      <div
        className="max-w-[1600px] mx-auto bg-white text-black py-4 px-6 
                      flex items-center justify-between md:flex-row relative"
      >
        {/* LEFT — LOGO ONLY (MOBILE), LOGO + CONTACTS (DESKTOP) */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Totem Service" className="w-[150px]" />
          </Link>

          {/* DESKTOP CONTACT ICONS (MOBILEDA YO'Q) */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://t.me/totemservice" target="_blank">
              <img src="/telegram.svg" alt="" className="rounded-full" />
            </a>
            <a href="https://wa.me/998951948888" target="_blank">
              <img src="/whatsapp.svg" alt="" className="rounded-full" />
            </a>
            <div className="text-xs leading-tight">
              <Link to="mailto:totem-service@mail.ru">
                totem-service@mail.ru
              </Link>
              <p>Понедельник - Суббота 09:00 – 20:00</p>
            </div>
          </div>
        </div>

        {/* CENTER — PHONE NUMBERS (DESKTOP) */}
        <div className="hidden md:block text-sm text-center">
          <Link to="tel:+998712775291">+998 71 277 52 91</Link> /{" "}
          <Link to="tel:+998712770574">+998 71 277 05 74</Link>
          <br />
          <Link to="tel:+998951948888">+998 95 194 88 88</Link> /{" "}
          <Link to="tel:+998903466516">+998 90 346 65 16</Link>
        </div>

        {/* RIGHT — ADDRESS + BUTTON (DESKTOP) */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-3">
          <p className="text-sm max-w-[300px]">
            Ташкент, Чиланзар 2 квартал, дом 39 квартира ул.Арнасай | TEKLED
          </p>
          <button
            onClick={openCart}
            className="bg-[#F28B50] text-white px-5 py-2 rounded-md hover:bg-[#e37334] transition relative"
          >
            Заказать звонок
            {cartItemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                               rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE BURGER ICON */}
        <button
          className="md:hidden absolute right-5 top-5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* ===================== MENU SECTION DESKTOP ===================== */}
      <nav className="bg-[#2b2b2b]">
        <ul
          className="hidden md:flex justify-center items-center max-w-[1600px] mx-auto py-4
                       text-sm font-medium text-[#979797]"
        >
          <li className="px-8 border-r border-[#979797]">
            <Link to="/" className="hover:text-[#F28B50]">
              Главная
            </Link>
          </li>

          <li className="px-8 border-r border-[#979797]">
            <button
              onClick={() => handleAnchorClick("calc")}
              className="hover:text-[#F28B50]"
            >
              Расчет стоимости
            </button>
          </li>

          <li
            ref={catalogRef}
            className="px-8 border-r border-[#979797] relative"
          >
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="flex items-center gap-1 hover:text-[#F28B50]"
            >
              Каталог <BiChevronDown />
            </button>

            {catalogOpen && (
              <div className="absolute bg-white text-black w-56 top-8 left-0 rounded shadow-md z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/catalog?categoryId=${cat._id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setCatalogOpen(false)}
                  >
                    {cat.name_ru || cat.name_uz}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li className="px-8 border-r border-[#979797]">
            <Link to="/advantages" className="hover:text-[#F28B50]">
              Преимущества
            </Link>
          </li>

          <li className="px-8 border-r border-[#979797]">
            <button
              onClick={() => handleAnchorClick("algoritm")}
              className="hover:text-[#F28B50]"
            >
              Алгоритм работы
            </button>
          </li>

          <li className="px-8 border-r border-[#979797]">
            <Link to="/news" className="hover:text-[#F28B50]">
              Блог
            </Link>
          </li>

          <li className="px-8">
            <Link to="/about" className="hover:text-[#F28B50]">
              О нас
            </Link>
          </li>
        </ul>

        {/* ===================== MOBILE MENU ===================== */}
        {menuOpen && (
          <div className="md:hidden bg-[#2b2b2b] text-white flex flex-col px-6 pb-6">
            {/* Mobile contact section */}
            <div className="py-4 border-b border-gray-700">
              <a
                href="https://t.me/totemservice"
                className="flex items-center gap-3 py-1 "
              >
                <img src="/telegram.svg" className="rounded-full" /> Telegram
              </a>
              <a
                href="https://wa.me/998951948888"
                className="flex items-center gap-3 py-1 rounded-full"
              >
                <img src="/whatsapp.svg" className="rounded-full" /> WhatsApp
              </a>
              <Link to="mailto:totem-service@mail.ru" className="block py-1">
                Email: totem-service@mail.ru
              </Link>
              <p className="text-sm mt-2">Пн-Сб 09:00 – 20:00</p>
            </div>

            {/* Phones */}
            <div className="py-4 border-b border-gray-700">
              <Link to="tel:+998712775291" className="block py-1">
                +998 71 277 52 91
              </Link>
              <Link to="tel:+998712770574" className="block py-1">
                +998 71 277 05 74
              </Link>
              <Link to="tel:+998951948888" className="block py-1">
                +998 95 194 88 88
              </Link>
              <Link to="tel:+998903466516" className="block py-1">
                +998 90 346 65 16
              </Link>
            </div>

            {/* Address */}
            <div className="py-4 border-b border-gray-700">
              <p className="text-sm">
                Ташкент, Чиланзар 2 квартал, дом 39, ул.Арнасай | TEKLED
              </p>
            </div>

            {/* Menu items */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-gray-700"
            >
              Главная
            </Link>

            <button
              onClick={() => {
                handleAnchorClick("calc");
                setMenuOpen(false);
              }}
              className="py-3 border-b border-gray-700 text-left"
            >
              Расчет стоимости
            </button>

            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="py-3 flex justify-between items-center border-b border-gray-700"
            >
              Каталог <BiChevronDown />
            </button>

            {catalogOpen && (
              <div className="pl-4 py-2 bg-[#333] text-sm">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/catalog?categoryId=${cat._id}`}
                    className="block py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.name_ru}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/advantages" className="py-3 border-b border-gray-700">
              Преимущества
            </Link>

            <button
              onClick={() => {
                handleAnchorClick("algoritm");
                setMenuOpen(false);
              }}
              className="py-3 border-b border-gray-700 text-left"
            >
              Алгоритм работы
            </button>

            <Link to="/news" className="py-3 border-b border-gray-700">
              Блог
            </Link>

            <Link to="/about" className="py-3">
              О нас
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
