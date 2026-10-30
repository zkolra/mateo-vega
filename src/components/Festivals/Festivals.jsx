import "./Festivals.css";

const dates = [
  {
    date: "18–20 OCT",
    city: "Paris",
    country: "France",
    event: "Paris Mambo Weekend",
    type: "Shows / Workshops",
  },
  {
    date: "08–10 NOV",
    city: "Berlin",
    country: "Germany",
    event: "Berlin Salsa Congress",
    type: "Shows / Workshops",
  },
  {
    date: "29 NOV–01 DEC",
    city: "Milan",
    country: "Italy",
    event: "Mambo City Festival",
    type: "Workshops / Social",
  },
  {
    date: "17–19 JAN",
    city: "London",
    country: "United Kingdom",
    event: "London Latin Weekender",
    type: "Shows / Workshops",
  },
  {
    date: "13–15 FEB",
    city: "Lisbon",
    country: "Portugal",
    event: "Lisbon Salsa Festival",
    type: "Shows / Workshops",
  },
];

function Festivals() {
  return (
    <section className="festivals" id="festivals">
      <div className="festivals__top">
        <span className="festivals__label">
          04 / ON THE ROAD
        </span>

        <p className="festivals__intro">
          Meet Mateo at festivals, congresses and dance events
          around the world.
        </p>
      </div>

      <div className="festivals__heading">
        <h2>UPCOMING DATES</h2>
      </div>

      <div className="festivals__layout">
        <div className="festivals__dates-column">
          <div className="festivals__dates">
            {dates.map((item) => (
              <article
                className="festival-date"
                key={`${item.date}-${item.city}`}
              >
                <div className="festival-date__date">
                  {item.date}
                </div>

                <div className="festival-date__place">
                  <h3>{item.city}</h3>
                  <span>{item.country}</span>
                </div>

                <div className="festival-date__event">
                  <span>{item.event}</span>
                  <small>{item.type}</small>
                </div>
              </article>
            ))}
          </div>

          <a
            href="#festivals"
            className="festivals__schedule-link"
          >
            View full schedule →
          </a>
        </div>

        <div className="festivals__image">
          <img
            src="/images/festival-dates.png"
            alt="Mateo Vega teaching at an international dance festival"
          />

          <span className="festivals__image-caption">
            FESTIVALS / WORKSHOPS / WORLDWIDE
          </span>
        </div>
      </div>
    </section>
  );
}

export default Festivals;