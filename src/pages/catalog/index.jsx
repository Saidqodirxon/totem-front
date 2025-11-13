import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Contacts from "../../components/contacts/contacts";
import Faqs from "../../components/faqs";
import "./style.scss";
import { ChevronDown, ChevronUp } from "lucide-react";

const CatalogPage = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [actions, setActions] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const lang = i18n.language || "uz";

  // URL paramlardan o'qish
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId");
    const subcategoryId = params.get("subcategoryId");
    const actionId = params.get("actionId");
    if (categoryId) setSelectedCategory(categoryId);
    if (subcategoryId) setSelectedCategory(subcategoryId);
    if (actionId) setSelectedAction(actionId);
  }, [location.search]);

  // Kategoriyalar va aksiyalarni olish
  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/categories")
      .then((res) => {
        const cats = res.data.data || [];
        setCategories(cats);
        // Har bir kategoriya uchun subcategoriyalarni olib kel
        cats.forEach((cat) => {
          axios
            .get(
              `https://back.totemservice.uz/subcategories?parentId=${cat._id}`
            )
            .then((subRes) => {
              setSubcategories((prev) => ({
                ...prev,
                [cat._id]: subRes.data.data || [],
              }));
            })
            .catch(() => {});
        });
      })
      .catch(() => console.error("Kategoriya olishda xatolik"));

    axios
      .get("https://back.totemservice.uz/actions")
      .then((res) => setActions(res.data.data || []))
      .catch(() => console.error("Aksiya olishda xatolik"));
  }, []);

  // Mahsulotlarni olish
  useEffect(() => {
    let url = "https://back.totemservice.uz/products";

    if (selectedCategory) {
      // Tanlangan categoryni top-level categoryni yoki subcategoryni tekshir
      const isSubcategory =
        categories.length > 0 &&
        !categories.find((cat) => cat._id === selectedCategory);

      if (isSubcategory) {
        url = `https://back.totemservice.uz/products?subcategoryId=${selectedCategory}`;
      } else {
        url = `https://back.totemservice.uz/products?categoryId=${selectedCategory}`;
      }
    }

    if (selectedAction)
      url = `https://back.totemservice.uz/products?actionId=${selectedAction}`;

    axios
      .get(url)
      .then((res) => {
        const all = res.data.data || [];
        setProducts(all);
        setVisibleProducts(all.slice(0, 6)); // 6 tadan boshlansin
        setShowAll(false);
      })
      .catch(() => console.error("Mahsulotlarni olishda xatolik"));
  }, [selectedCategory, selectedAction, categories]);

  // Scroll top tugmasi
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtеrlarni boshqarish
  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    setSelectedAction(null);
    // Tanlangan id top-level categoryni yoki subcategoryni tekshir
    const isSubcategory =
      categories.length > 0 && !categories.find((cat) => cat._id === id);

    if (isSubcategory) {
      navigate(`/catalog?subcategoryId=${id}`);
    } else {
      navigate(`/catalog?categoryId=${id}`);
    }
  };

  const handleActionSelect = (id) => {
    setSelectedAction(id);
    setSelectedCategory(null);
    navigate(`/catalog?actionId=${id}`);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSelectedAction(null);
    navigate("/catalog");
  };

  const handleShowMore = () => {
    setVisibleProducts(products);
    setShowAll(true);
    scrollToTop();
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const getLangValue = (obj, field) =>
    obj?.[`${field}_${lang}`] || obj?.[`${field}_uz`] || "";

  return (
    <>
      <Navbar />
      <section className="catalog">
        <div className="catalog__container">
          <h2 className="catalog__title">
            <strong>
              {t("Поставляем противопожарное и охранное оборудование")}
            </strong>{" "}
            {t("по Узбекистану с доставкой в день заказа")}
          </h2>

          <div className="catalog__wrapper">
            {/* Sidebar */}
            <aside className="catalog__sidebar">
              {/* Kategoriyalar dropdown */}
              <div className="filter-dropdown">
                <div
                  className="filter-dropdown__header"
                  onClick={() => setOpenCategory(!openCategory)}
                >
                  <span>{t("Категории")}</span>
                  {openCategory ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                {openCategory && (
                  <div className="filter-dropdown__body">
                    <ul>
                      <li
                        className={!selectedCategory ? "active" : ""}
                        onClick={handleShowAll}
                      >
                        {t("Все продукты")}
                      </li>
                      {categories.map((cat) => (
                        <div key={cat._id}>
                          <li
                            className={
                              selectedCategory === cat._id ? "active" : ""
                            }
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            <span onClick={() => handleCategorySelect(cat._id)}>
                              {getLangValue(cat, "name")}
                            </span>
                            {subcategories[cat._id]?.length > 0 && (
                              <span
                                onClick={() =>
                                  setExpandedCategories((prev) => ({
                                    ...prev,
                                    [cat._id]: !prev[cat._id],
                                  }))
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {expandedCategories[cat._id] ? (
                                  <ChevronDown size={18} />
                                ) : (
                                  <ChevronUp size={18} />
                                )}
                              </span>
                            )}
                          </li>
                          {expandedCategories[cat._id] &&
                            subcategories[cat._id]?.map((subcat) => (
                              <li
                                key={subcat._id}
                                className={`subcategory ${
                                  selectedCategory === subcat._id
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => handleCategorySelect(subcat._id)}
                                style={{
                                  paddingLeft: "24px",
                                  background: "#f9f9f9",
                                  fontSize: "14px",
                                }}
                              >
                                {getLangValue(subcat, "name")}
                              </li>
                            ))}
                        </div>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Spets taklif dropdown */}
              <div className="filter-dropdown">
                <div
                  className="filter-dropdown__header"
                  onClick={() => setOpenAction(!openAction)}
                >
                  <span>{t("Спец предложение")}</span>
                  {openAction ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>

                {openAction && (
                  <div className="filter-dropdown__body">
                    <ul>
                      {actions.map((act) => (
                        <li
                          key={act._id}
                          className={selectedAction === act._id ? "active" : ""}
                          onClick={() => handleActionSelect(act._id)}
                        >
                          {getLangValue(act, "name")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tozalash tugmasi */}
              {(selectedCategory || selectedAction) && (
                <button className="clear-filter" onClick={handleShowAll}>
                  {t("Сбросить фильтры")}
                </button>
              )}
            </aside>

            {/* Products */}
            <div className="catalog__content">
              <div className="products-grid">
                {visibleProducts.length > 0 ? (
                  visibleProducts.map((p) => (
                    <Link
                      to={`/catalog/${p._id}`}
                      key={p._id}
                      className="product-card"
                    >
                      <div className="product-card__img">
                        <img
                          src={p.image?.[0]?.url}
                          alt={getLangValue(p, "name")}
                        />
                      </div>
                      <div className="product-card__info">
                        <h3>{getLangValue(p, "name")}</h3>
                        <p className="desc">{getLangValue(p, "description")}</p>
                        <div className="product-card__price">
                          <span className="price">{p.price} сум</span>
                          {p.original_price && (
                            <span className="old-price">
                              {p.original_price} сум
                            </span>
                          )}
                        </div>
                        <div className="product-card__buttons">
                          <button>{t("Заказать")}</button>
                          <button className="secondary">
                            {t("Подробнее")}
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="no-data">{t("Нет доступных товаров")}</p>
                )}
              </div>

              <div className="catalog__bottom">
                {!showAll ? (
                  <button className="show-more" onClick={handleShowMore}>
                    {t("Показать ещё")}
                  </button>
                ) : (
                  <button className="scroll-top" onClick={scrollToTop}>
                    <ChevronUp size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Faqs />
      <Contacts />
      <Footer />
    </>
  );
};

export default CatalogPage;
