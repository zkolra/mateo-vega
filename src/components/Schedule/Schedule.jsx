import "./Schedule.css";

const classes = [
  {
    day: "MON",
    time: "19:00",
    title: "Mambo Fundamentals",
    level: "Open Level",
  },
  {
    day: "TUE",
    time: "20:30",
    title: "Salsa Partnerwork",
    level: "Intermediate",
  },
  {
    day: "WED",
    time: "19:00",
    title: "Mambo Shines",
    level: "Open Level",
  },
  {
    day: "THU",
    time: "20:30",
    title: "Salsa Technique",
    level: "Intermediate",
  },
  {
    day: "SAT",
    time: "12:00",
    title: "Weekend Training",
    level: "All Levels",
  },
];

function Schedule() {
  return (
    <section className="schedule" id="schedule">
      <div className="schedule__top">
        <span className="schedule__label">
          06 / WEEKLY CLASSES
        </span>

        <p className="schedule__intro">
          Weekly Salsa and Mambo training in Madrid.
          Drop in for a class or train regularly with the studio.
        </p>
      </div>

      <div className="schedule__heading">
        <h2>
          <span>THIS WEEK</span>
          <span>IN THE STUDIO</span>
        </h2>

        <div className="schedule__location">
          <span>MADRID</span>
          <span>MON — SAT</span>
        </div>
      </div>

      <div className="schedule__classes">
        {classes.map((item, index) => (
          <article
            className="schedule-class"
            key={`${item.day}-${item.time}`}
          >
            <span className="schedule-class__number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="schedule-class__day">
              {item.day}
            </span>

            <span className="schedule-class__time">
              {item.time}
            </span>

            <h3>{item.title}</h3>

            <span className="schedule-class__level">
              {item.level}
            </span>
          </article>
        ))}
      </div>

      <div className="schedule__bottom">
        <p>
          Classes are taught in small groups with focus on
          technique, musicality and individual development.
        </p>

        <a href="#booking">
          Book a class →
        </a>
      </div>
    </section>
  );
}

export default Schedule;