import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { camp } from "../content";
import "../styles/camp.css";

function useCountdown(dateStr) {
  const target = new Date(`${dateStr}T10:00:00`).getTime();
  const calc = () => Math.max(0, target - Date.now());
  const [left, setLeft] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(id);
  });
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

/* Кэмп: фото на весь экран «вырастает» из маленького окна, слова наезжают;
   три момента кэмпа плывут с разной скоростью; дальше — дата и
   живой обратный отсчёт до следующего кэмпа. */
function Camp() {
  const root = useRef(null);
  const left = useCountdown(camp.next.date);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".camp__stage", start: "top top", end: "+=120%", pin: true, scrub: 0.6 },
      });
      const small = window.innerWidth < 860 ? "inset(25% 12% 25% 12% round 300px)" : "inset(22% 30% 22% 30% round 400px)";
      tl.fromTo(".camp__window", { clipPath: small }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(".camp__window img", { scale: 1.4 }, { scale: 1, duration: 1 }, 0)
        .fromTo(".camp__line", { xPercent: (i) => (i % 2 ? 40 : -40) }, { xPercent: 0, duration: 1 }, 0)
        .to(".camp__shade", { opacity: 1, duration: 0.5 }, 0.5);

      gsap.utils.toArray(".moment").forEach((m, i) => {
        gsap.fromTo(m, { y: 120 + i * 60 }, { y: -60 - i * 40, ease: "none", scrollTrigger: { trigger: ".camp__moments", start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.fromTo(".next__photo img", { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".next", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="camp" id="camp" ref={root}>
      <div className="camp__stage">
        <div className="camp__window">
          <img src={camp.hero} alt="" loading="lazy" />
          <div className="camp__shade" />
        </div>
        <span className="label camp__label">
          <b>07</b> / {camp.label}
        </span>
        <h2 className="camp__title display">
          {camp.title.map((l, i) => (
            <span className={`camp__line${i === 2 ? " is-hot" : ""}`} key={l}>
              {l}
            </span>
          ))}
        </h2>
      </div>

      <div className="camp__moments">
        <p className="camp__intro">{camp.intro}</p>
        {camp.moments.map((m, i) => (
          <figure className={`moment moment--${i + 1}`} key={m.caption}>
            <img src={m.image} alt={m.caption} loading="lazy" />
            <figcaption className="small">
              0{i + 1} / {m.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="next">
        <figure className="next__photo">
          <img src={camp.next.image} alt="" loading="lazy" />
        </figure>
        <div className="next__info">
          <span className="label">
            <b>●</b> {camp.next.label}
          </span>
          <h3 className="next__date display js-lines">
            {camp.next.title.map((l) => (
              <span className="split-line" key={l}>
                <span>{l}</span>
              </span>
            ))}
          </h3>
          <p className="next__place">{camp.next.place}</p>
          <div className="next__count" aria-label="Countdown">
            {[
              [left.d, "Days"],
              [pad(left.h), "Hours"],
              [pad(left.m), "Min"],
              [pad(left.s), "Sec"],
            ].map(([v, l]) => (
              <div key={l}>
                <b className="display">{v}</b>
                <span className="small">{l}</span>
              </div>
            ))}
          </div>
          <a className="pill pill--hot" href="#booking">
            {camp.next.button} →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Camp;
