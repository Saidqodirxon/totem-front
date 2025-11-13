import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.scss";

const CatalogMain = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // Kategoriyalarni olish
  useEffect(() => {
    axios
      .get("https://back.totemservice.uz/categories?page[limit]=5")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Kategoriya yuklashda xatolik:", err));
  }, []);

  // Mahsulotlarni olish (kategoriya bo‘yicha)
  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `https://back.totemservice.uz/products?categoryId=${categoryId}&page[limit]=6`
        : "https://back.totemservice.uz/products?page[limit]=6";

      const res = await axios.get(url);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Mahsulot yuklashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  // Boshlang‘ich yuklash
  useEffect(() => {
    fetchProducts();
  }, []);

  // Kategoriya tanlash
  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    if (id === "all") fetchProducts();
    else fetchProducts(id);
  };

  return (
    <div className="products-page">
      <div className="container">
        <h2 className="products-title">
          <span> Поставляем противопожарное и охранное оборудование</span> по
          Узбекистану с доставкой в день заказа
        </h2>

        {/* Kategoriya tugmalari */}
        <div className="categories">
          <button
            className={`category-btn ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("all")}
          >
            Все
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`category-btn ${
                selectedCategory === cat._id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(cat._id)}
            >
              {cat.name_ru}
            </button>
          ))}
        </div>

        {/* Mahsulotlar */}
        {loading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <div className="product-card" key={item._id}>
                <div className="product-image">
                  {item.image && item.image.length > 1 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      loop
                      className="product-swiper"
                    >
                      {item.image.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img src={img.url} alt={item.name_ru} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      src={
                        item.image?.[0]?.url ||
                        "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={item.name_ru}
                    />
                  )}
                </div>

                <div className="product-body">
                  <h4 className="product-name">{item.name_uz}</h4>
                  <div className="product-specs">
                    <p>{item.description_uz}</p>
                  </div>
                  <div className="product-prices">
                    <span className="current">{item.price} сум</span>
                    <span className="old">{item.original_price} сум</span>
                  </div>
                  <div className="product-buttons">
                    <button className="buy-btn">Заказать</button>
                    <button className="details-btn">Подробнее</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogMain;
