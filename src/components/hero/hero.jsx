import { Link } from "react-router-dom";
import heroImg from "/hero.png";

const Hero = () => {
  return (
    <section
      className="w-full bg-gradient-to-r from-[#1E1E1E] to-[#5A3012] text-white flex flex-col
     md:flex-row items-center md:items-end justify-between overflow-hidden"
    >
      {/* LEFT CONTENT */}
      <div
        className="flex flex-col md:w-[1900px] w-full md:items-start items-center text-center md:text-left 
      px-[6vw] py-20 md:py-28 z-10"
      >
        <h1 className="text-3xl md:text-[48px] font-[700] mb-6 leading-snug">
          Продажа <span className="text-[#E6E6E6]">противопожарного</span> и{" "}
          <span className="text-[#9BA38D]">охранного оборудования</span>
          <br />
          <span className="text-[#C0C0C0]">по всему Узбекистану</span>
        </h1>

        <ul className="text-gray-300 text-base md:text-[18px] space-y-2 mb-8">
          <li>Всё оборудование сертифицировано</li>
          <li>Возможность заказа под размеры и комплектацию</li>
          <li>Индивидуальный подход</li>
        </ul>

        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/calc"
            className="border border-white text-white px-6 py-3 rounded-md text-sm
             md:text-base hover:bg-white hover:text-black transition"
          >
            Рассчитать стоимость
          </Link>
          <Link
            to="/catalog"
            className="border border-white text-white px-6 py-3 rounded-md text-sm md:text-base
             hover:bg-white hover:text-black transition"
          >
            Посмотреть каталог
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE (bottom aligned) */}
      <div className="md:w-1/2 w-full flex justify-center md:justify-end relative">
        <img
          src={heroImg}
          alt="Firefighter"
          className="w-auto md:max-w-[480px] max-w-[320px] object-contain absolute bottom-0 right-[6vw]"
        />
      </div>
    </section>
  );
};

export default Hero;
