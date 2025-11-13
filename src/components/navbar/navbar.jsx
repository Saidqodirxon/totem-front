import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTelegramPlane, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import logo from "/logo.png";

const Navbar = () => {
  const { openCart, getTotalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const homeRef = useRef(null);
  const catalogRef = useRef(null);
  const cartItemCount = getTotalItems();

  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/categories")
      .then((res) => setCategories(res.data?.data || []))
      .catch((err) => console.error("Kategoriyalarni olishda xatolik:", err));
  }, []);

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

  return (
    <header className="w-full text-white font-sans">
      {/* ==== TOP SECTION ==== */}
      <div
        className="max-w-[1600px] mx-auto bg-white text-black py-4 px-6 flex flex-col md:flex-row 
      justify-between items-center gap-3 relative"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Totem Service" className="w-[150px]" />
          </Link>
          <a href="#" className="">
            <img src="/telegram.svg" alt="" className="rounded-full" />
            {/* <FaTelegramPlane /> */}
          </a>
          <a href="#" className="">
            <img src="/whatsapp.svg" alt="" className="rounded-full" />
          </a>
          <div className="text-xs leading-tight">
            <p>totem-service@mail.ru</p>
            <p>Понедельник - Суббота 09:00 – 20:00</p>
          </div>
        </div>

        {/* CENTER */}
        <div className="text-sm text-center md:text-left">
          <p>+998 71 277 52 91 / +998 71 277 05 74</p>
          <p>+998 95 194 88 88 / +998 90 346 65 16</p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-center">
          <p className="text-sm max-w-[300px]">
            Ташкент, Чиланзар 2 квартал, дом 39 квартира ул.Арнасай | ориентир
            магазин люстр TEKLED
          </p>
          <button
            className="bg-[#F28B50] text-white px-5 py-2 rounded-md hover:bg-[#e37334] transition relative"
            onClick={openCart}
          >
            Заказать звонок
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE BURGER */}
        <div className="md:hidden absolute right-5 top-5">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes size={22} className="text-black" />
            ) : (
              <FaBars size={22} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* ==== MENU SECTION ==== */}
      <nav className="bg-[#2b2b2b]">
        <ul className="hidden md:flex justify-center items-center max-w-[1600px] mx-auto py-4 text-sm font-medium text-[#979797]">
          {/* Главная dropdown */}
          <li
            ref={homeRef}
            className="relative flex items-center justify-center px-8 border-r border-[#979797]"
          >
            <button
              onClick={() => setHomeOpen(!homeOpen)}
              className="flex items-center gap-1 hover:text-[#F28B50]"
            >
              Главная <BiChevronDown />
            </button>
            {homeOpen && (
              <div className="absolute bg-white text-black w-48 top-8 left-0 rounded shadow-md z-50">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                  Главная секция
                </Link>
                <Link to="/about" className="block px-4 py-2 hover:bg-gray-100">
                  О компании
                </Link>
              </div>
            )}
          </li>

          {/* Расчет стоимости */}
          <li className="flex items-center justify-center px-8 border-r border-[#979797]">
            <Link to="/calc" className="hover:text-[#F28B50]">
              Расчет стоимости
            </Link>
          </li>

          {/* Каталог dropdown */}
          <li
            ref={catalogRef}
            className="relative flex items-center justify-center px-8 border-r border-[#979797]"
          >
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="flex items-center gap-1 hover:text-[#F28B50]"
            >
              Каталог <BiChevronDown />
            </button>
            {catalogOpen && (
              <div className="absolute bg-white text-black w-56 top-8 left-0 rounded shadow-md z-50">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      to={`/catalog?categoryId=${cat._id}`}
                      key={cat._id}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setCatalogOpen(false)}
                    >
                      {cat.name_ru || cat.name_uz || cat.name_en}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500 text-sm">
                    Загрузка категорий...
                  </p>
                )}
              </div>
            )}
          </li>

          {/* Преимущества */}
          <li className="flex items-center justify-center px-8 border-r border-[#979797]">
            <Link to="/advantages" className="hover:text-[#F28B50]">
              Преимущества
            </Link>
          </li>

          {/* Алгоритм работы */}
          <li className="flex items-center justify-center px-8 border-r border-[#979797]">
            <Link to="/algorithm" className="hover:text-[#F28B50]">
              Алгоритм работы
            </Link>
          </li>

          {/* Блог */}
          <li className="flex items-center justify-center px-8 border-r border-[#979797]">
            <Link to="/news" className="hover:text-[#F28B50]">
              Блог
            </Link>
          </li>

          {/* О нас */}
          <li className="flex items-center justify-center px-8">
            <Link to="/about" className="hover:text-[#F28B50]">
              О нас
            </Link>
          </li>
        </ul>

        {/* ==== MOBILE MENU ==== */}
        {menuOpen && (
          <div className="md:hidden bg-[#2b2b2b] text-white flex flex-col px-6 pb-6">
            <button
              onClick={() => setHomeOpen(!homeOpen)}
              className="py-3 flex justify-between items-center border-b border-gray-700"
            >
              Главная <BiChevronDown />
            </button>
            {homeOpen && (
              <div className="pl-4 py-2 text-sm bg-[#333]">
                <Link
                  to="/"
                  className="block py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Главная секция
                </Link>
                <Link
                  to="/about"
                  className="block py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  О компании
                </Link>
              </div>
            )}

            <Link to="/calc" className="py-3 border-b border-gray-700">
              Расчет стоимости
            </Link>

            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="py-3 flex justify-between items-center border-b border-gray-700"
            >
              Каталог <BiChevronDown />
            </button>
            {catalogOpen && (
              <div className="pl-4 py-2 text-sm bg-[#333]">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <Link
                      to={`/catalog?categoryId=${cat._id}`}
                      key={cat._id}
                      className="block py-1"
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat.name_ru || cat.name_uz || cat.name_en}
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 px-2">Загрузка...</p>
                )}
              </div>
            )}

            <Link to="/advantages" className="py-3 border-b border-gray-700">
              Преимущества
            </Link>
            <Link to="/algorithm" className="py-3 border-b border-gray-700">
              Алгоритм работы
            </Link>
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
