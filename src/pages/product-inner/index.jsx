import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/navbar";
import Contacts from "../../components/contacts/contacts";
import Footer from "../../components/footer/footer";
import { useCart } from "../../context/CartContext";
import "./style.scss";
import { Copy } from "lucide-react";

const ProductInner = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://back.totemservice.uz/products/${id}`)
      .then((res) => {
        const data = res.data?.data;
        setProduct(data);
        // Set initial quantity to min_buy_quantity if specified
        const minQty = data?.min_buy_quantity || 1;
        setQuantity(minQty);

        if (data?.image?.length >= 4) {
          setMainImage(data.image[3].url);
        } else if (data?.image?.length) {
          setMainImage(data.image[0].url);
        }

        axios
          .get(
            `https://back.totemservice.uz/products?categoryId=${data.categoryId}&page[limit]=3`
          )
          .then((r) => {
            const filtered = r.data?.data?.filter((p) => p._id !== id);
            setRelated(filtered || []);
          })
          .catch(() => {});
      })
      .catch(() => console.error("Mahsulot yuklashda xatolik"));
  }, [id]);

  if (!product) return null;

  const name =
    product[`name_${lang}`] ||
    product.name_uz ||
    product.name_ru ||
    product.name_en;
  const description =
    product[`description_${lang}`] ||
    product.description_uz ||
    product.description_ru ||
    product.description_en;
  const about =
    product[`about_${lang}`] ||
    product.about_uz ||
    product.about_ru ||
    product.about_en;
  const formatPrice = (val) => {
    if (val === undefined || val === null) return "";
    const num = Number(String(val).replace(/\s+/g, ""));
    if (Number.isNaN(num)) return String(val);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const formattedPrice = formatPrice(product.price);
  const formattedOriginal = product.original_price
    ? formatPrice(product.original_price)
    : null;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareMessage = `${name} — ${formattedPrice} сум\n${pageUrl}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    shareMessage
  )}`;
  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(
    pageUrl
  )}&text=${encodeURIComponent(`${name} — ${formattedPrice} сум`)}`;

  return (
    <>
      <Navbar />

      <section className="product-inner">
        <div className="product-inner__container">
          {/* === LEFT GALLERY === */}
          <div className="product-inner__left">
            <div className="thumbs">
              {product.image
                ?.slice(0, Math.min(3, product.image.length))
                .map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={name}
                    className={mainImage === img.url ? "active" : ""}
                    onClick={() => setMainImage(img.url)}
                  />
                ))}
            </div>
            <div className="main-img">
              <img src={mainImage} alt={name} />
            </div>
          </div>

          {/* === RIGHT INFO === */}
          <div className="product-inner__right">
            <h2 className="title">{name}</h2>
            <div className="price-block">
              <span className="price">{formattedPrice} сум</span>
              {product.original_price && (
                <span className="old-price">{formattedOriginal} сум</span>
              )}
            </div>
            <div className="options">
              <div>
                <h4>{t("Цвет")}</h4>
                {product.variants?.map((v, i) => (
                  <label key={i} className="custom-option">
                    <input
                      type="radio"
                      name={`color-${product._id}`}
                      value={v[`color_${lang}`] || v.color_ru}
                      defaultChecked={i === 0}
                    />
                    <span className="custom-radio" />
                    <span className="custom-label-text">
                      {v[`color_${lang}`] || v.color_ru}
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <h4>{t("Размер")}</h4>
                {product.variants?.map((v, i) => (
                  <label key={i} className="custom-option">
                    <input
                      type="radio"
                      name={`size-${product._id}`}
                      value={v.size}
                      defaultChecked={i === 0}
                    />
                    <span className="custom-radio" />
                    <span className="custom-label-text">{v.size}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="quantity-order">
              <div className="quantity">
                <button
                  onClick={() => {
                    const min = product.min_buy_quantity || 1;
                    setQuantity((q) => (q > min ? q - 1 : q));
                  }}
                  disabled={quantity <= (product.min_buy_quantity || 1)}
                >
                  –
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    const max = product.max_buy_quantity || 999;
                    setQuantity((q) => (q < max ? q + 1 : q));
                  }}
                  disabled={quantity >= (product.max_buy_quantity || 999)}
                >
                  +
                </button>
              </div>
              <button
                className="order-btn"
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success(`${name} добавлен в корзину`);
                }}
              >
                {t("В корзину")}
              </button>
            </div>{" "}
          </div>
        </div>

        {/* === SHARE LINKS === */}
        <div className="share-links">
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(pageUrl);
                toast.success("Ссылка скопирована!");
              } catch (err) {
                const input = document.createElement("input");
                input.value = pageUrl;
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                toast.success("Ссылка скопирована!");
                document.body.removeChild(input);
              }
            }}
            className="copy-link"
          >
            <Copy />
            {t("Копировать ссылку на продукт")}
          </button>

          <div className="socials">
            <a
              href={whatsappHref}
              className="whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/whatsapp.svg" alt="whatsapp" />
              {t("Написать в Whatsapp")}
            </a>
            <a
              href={telegramHref}
              className="telegram"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/telegram.svg" alt="telegram" />
              {t("Написать в Telegram")}
            </a>
          </div>
        </div>

        {/* === ABOUT SECTION === */}
        <div className="product-inner__about">
          <h3>{t("Об оборудовании")}</h3>
          <p>{description}</p>
          <h3>{t("Характеристики")}</h3>
          <p>{about}</p>
        </div>
      </section>

      {/* === SET PRODUCTS === */}
      {product.is_set && product.setProducts?.length > 0 && (
        <section className="related set-products">
          <div className="container">
            <h3 className="related__title">{t("Комплектующие продукты")}</h3>
            <div className="related__list">
              {product.setProducts.map((item) => (
                <div key={item._id} className="related__card">
                  <img
                    src={item.image?.[0]?.url}
                    alt={item[`name_${lang}`] || item.name_uz}
                    className="related__img"
                  />
                  <div className="related__content">
                    <h4>{item[`name_${lang}`] || item.name_uz}</h4>
                    <div className="related__price">
                      <span>{item.price?.toLocaleString()} сум</span>
                      {item.original_price && (
                        <span className="old">
                          {item.original_price?.toLocaleString()} сум
                        </span>
                      )}
                    </div>
                    <div className="related__actions">
                      <button onClick={() => addToCart(item, 1)}>
                        {t("Заказать")}
                      </button>
                      <Link to={`/catalog/${item._id}`}>{t("Подробнее")}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === RELATED PRODUCTS === */}
      {related.length > 0 && (
        <section className="related">
          <div className="container">
            <h3 className="related__title">{t("Похожие оборудование")}</h3>
            <div className="related__list">
              {related.map((r) => (
                <div key={r._id} className="related__card">
                  <img
                    src={r.image?.[0]?.url}
                    alt={r[`name_${lang}`] || r.name_uz}
                    className="related__img"
                  />
                  <div className="related__content">
                    <h4>{r[`name_${lang}`] || r.name_uz}</h4>
                    <div className="related__price">
                      <span>{r.price?.toLocaleString()} сум</span>
                      {r.original_price && (
                        <span className="old">
                          {r.original_price?.toLocaleString()} сум
                        </span>
                      )}
                    </div>
                    <div className="related__actions">
                      <button>{t("Заказать")}</button>
                      <Link to={`/catalog/${r._id}`}>{t("Подробнее")}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contacts />
      <Footer />
    </>
  );
};

export default ProductInner;
