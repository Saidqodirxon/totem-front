import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/main/main";
import NotFound from "./pages/404page/404";
import CatalogPage from "./pages/catalog";
import AdvantagesPage from "./pages/adv";
import CallButton from "./components/callBtn";
import ProductInner from "./pages/product-inner";
import CartModal from "./components/cart-modal";
import NewsPage from "./pages/news";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/CartContext";
import NewsInner from "./pages/news-inner";
import AboutPage from "./pages/about";

function AppContent() {
  const { isCartOpen } = useCart();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-t-4 border-[#71914B] border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<ProductInner />} />
            <Route path="/advantages" element={<AdvantagesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsInner />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {/* <CallButton /> */}
          {isCartOpen && <CartModal />}
        </>
      )}
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
