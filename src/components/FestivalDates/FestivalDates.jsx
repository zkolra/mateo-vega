import "./FestivalDates.css";

const dates = [
  ["18 SEP", "MADRID", "Mambo City Congress"],
  ["04 OCT", "PARIS", "Paris Salsa Weekend"],
  ["22 NOV", "BERLIN", "Mambo Collective"],
  ["16 JAN", "LISBON", "Lisboa Dance Festival"],
];

function FestivalDates() {
  return (
    <section className="festival-dates">
      <div className="festival-dates__heading">
        <span>05 / TOUR DATES</span>
        <h2>ON THE ROAD</h2>
      </div>

      <div className="festival-dates__layout">
        <div className="festival-dates__list">
          {dates.map(([date, city, event]) => (
            <div className="festival-dates__row" key={event}>
              <span>{date}</span>
              <strong>{city}</strong>
              <span>{event}</span>
            </div>
          ))}
        </div>

        <div className="festival-dates__photo">
          PHOTO 10
          <small>FESTIVAL / TRAVEL</small>
        </div>
      </div>
    </section>
  );
}

export default FestivalDates;