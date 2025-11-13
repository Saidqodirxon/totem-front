import "./style.scss";

function Advantages() {
  const advData = [
    {
      title: "Опыт и надежность",
      desc: "С 2011 года мы успешно работаем на рынке, обеспечивая стабильное качество и профессиональный подход.",
      img: "/advantages/img1.png",
    },
    {
      title: "Конкурентоспособные цены",
      desc: "Наши цены остаются доступными и соответствуют рыночным стандартам.",
      img: "/advantages/img2.png",
    },
    {
      title: "Широкий ассортимент",
      desc: "Специализация на противопожарном и охранном оборудовании гарантирует наличие всего необходимого для вашей безопасности.",
      img: "/advantages/img3.png",
    },
    {
      title: "Индивидуальные скидки",
      desc: "Постоянным клиентам предоставляется гибкая система скидок и персонализированный сервис.",
      img: "/advantages/img4.png",
    },
  ];

  return (
    <>
      <section className="advantages">
        <div className="advantages__title">
          <h2 className="advantages__title-text">
            Предоставляем отличные условия  сотрудничества все своим клиентам
          </h2>
          <button className="advantages__title-btn">Преимущества </button>
        </div>
        <div className="advantages__wrapper">
          {advData.map((item, index) => (
            <div className="advantages__wrapper__card" key={index}>
              <div className="advantages__wrapper__card__content">
                <h2 className="advantages__wrapper__card-title">
                  {item.title}
                </h2>
                <p className="advantages__wrapper__card-description">
                  {item.desc}
                </p>
              </div>
              <div className="advantages__wrapper__card__img">
                <img
                  src={item.img}
                  alt={item.title}
                  className="advantages__wrapper__card__img-img"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Advantages;
