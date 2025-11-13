import "./main.scss";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Hero from "../../components/hero/hero";
import CatalogMain from "../../components/catalog-main";
import Calculator from "../../components/calculator";
import Advantages from "../../components/adventages/adventages";
import Algoritm from "../../components/algoritm";
import Faqs from "../../components/faqs";
import Contacts from "../../components/contacts/contacts";

const Main = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CatalogMain />
      <Calculator />
      <Advantages />
      <Algoritm />
      <Faqs />
      <Contacts />
      <Footer />
    </>
  );
};

export default Main;
