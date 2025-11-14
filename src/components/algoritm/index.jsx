import "./style.scss";

function Algoritm() {
  const advData = [
    {
      title: "Заявка по телефону или с сайта",
      desc: "Оставьте свои контакты и наши менеджеры перезвонят вам в течение 15 минут",
      color: "#FFF4EB",
    },
    {
      title: "Согласование оборудование и маршрута",
      desc: "Обговариваем все детали, подтверждаем заказ.",
      color: "#F8D1B5",
    },
    {
      title: "Оплата и доставка",
      desc: "Оплата любым удобным способом.",
      color: "#E37F38",
    },
  ];

  return (
    <>
      <section className="algoritm" id="algoritm">
        <div className="algoritm__title">
          <h2 className="algoritm__title-text">
            От звонка до разгрузки щебня  на вашем объекте не более 24 часов
          </h2>
          <button className="algoritm__title-btn">Алгоритм работы</button>
        </div>
        <div className="algoritm__wrapper">
          {advData.map((item, index) => (
            <div
              key={index}
              className={`algoritm__wrapper__card`}
              style={{ backgroundColor: item.color }}
            >
              <div className="algoritm__wrapper__card__content">
                <h2 className="algoritm__wrapper__card-title">{item.title}</h2>
                <p className="algoritm__wrapper__card-description">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Algoritm;
