import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { Lines } from "../lib/Split";
import { schedule } from "../content";
import "../styles/schedule.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* Расписание недели. Сегодняшний класс подсвечен красным и мигает «Today»,
   строки выезжают по очереди, при наведении строка заливается тёмным. */
function Schedule() {
  const root = useRef(null);
  const today = DAYS[new Date().getDay()];

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".slot", { yPercent: 60, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: ".schedule__list", start: "top 85%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="schedule" id="schedule" ref={root}>
      <div className="schedule__head">
        <span className="label">
          <b>06</b> / {schedule.label}
        </span>
        <p className="js-fade">{schedule.text}</p>
      </div>
      <h2 className="schedule__title display js-lines">
        <Lines text={schedule.title.join("\n")} />
      </h2>

      <ol className="schedule__list">
        {schedule.items.map((s, i) => (
          <li className={`slot${s.day === today ? " is-today" : ""}`} key={s.day + s.time}>
            <span className="slot__num small">{String(i + 1).padStart(2, "0")}</span>
            <span className="slot__day display">{s.day}</span>
            <span className="slot__time">{s.time}</span>
            <h3 className="slot__title display">{s.title}</h3>
            <span className="slot__level small">{s.day === today ? "● Today" : s.level}</span>
          </li>
        ))}
      </ol>

      <div className="schedule__foot">
        <p className="js-fade">{schedule.note}</p>
        <a className="pill" href="#booking">
          {schedule.button} →
        </a>
      </div>
    </section>
  );
}

export default Schedule;
