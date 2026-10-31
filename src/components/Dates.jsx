import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { Lines } from "../lib/Split";
import { dates } from "../content";
import "../styles/dates.css";

/* Даты: строки-«билеты». При наведении название города прокручивается
   вверх и сменяется красной копией, строка заливается. Фото рядом
   наклоняется вслед за мышью. */
function Dates() {
  const root = useRef(null);
  const photo = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    if (!reducedMotion()) {
      mm.add("(min-width: 0px)", () => {
        gsap.from(".date", { x: -60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".dates__list", start: "top 85%" } });
        gsap.fromTo(".dates__photo", { clipPath: "inset(0% 0% 100% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".dates__photo", start: "top 80%" },
        });
      });
    }
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rx = gsap.quickTo(photo.current, "rotationY", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(photo.current, "rotationX", { duration: 0.8, ease: "power3" });
      const move = (e) => {
        const b = root.current.getBoundingClientRect();
        rx(((e.clientX - b.left) / b.width - 0.5) * 6);
        ry(-((e.clientY - b.top) / b.height - 0.5) * 4);
      };
      root.current.addEventListener("pointermove", move);
      return () => root.current?.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="dates" id="dates" ref={root}>
      <div className="dates__head">
        <span className="label">
          <b>04</b> / {dates.label}
        </span>
        <p className="js-fade">{dates.text}</p>
      </div>
      <div className="dates__grid">
        <div className="dates__left">
        <h2 className="dates__title display js-lines">
          <Lines text={dates.title.join("\n")} />
        </h2>
        <ul className="dates__list">
          {dates.items.map((d) => (
            <li className="date" key={d.city + d.date}>
              <span className="date__when small">{d.date}</span>
              <span className="date__city display">
                <span className="date__roll">
                  <span>{d.city}</span>
                  <span aria-hidden="true">{d.city}</span>
                </span>
              </span>
              <span className="date__event">
                {d.event}
                <small className="small">
                  {d.country} · {d.type}
                </small>
              </span>
              <span className="date__arrow" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ul>
        </div>
        <div className="dates__photo-wrap">
          <figure className="dates__photo" ref={photo}>
            <img src={dates.image} alt="" loading="lazy" />
            <span className="small">On the road / {dates.items.length} cities</span>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Dates;
