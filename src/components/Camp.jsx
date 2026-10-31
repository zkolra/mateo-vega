import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../lib/motion";
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

/* Кэмп — светлая, спокойная часть сайта.
   1) Фото вырастает из овального окна на весь экран.
   2) «День на кэмпе»: слева видео, справа время дня — при прокрутке видео сменяют друг друга.
   3) Цитата и два портрета плывут с разной скоростью.
   4) Следующий кэмп: дата и живой обратный отсчёт. */
function Camp() {
  const root = useRef(null);
  const [step, setStep] = useState(0);
  const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 860);
  const left = useCountdown(camp.next.date);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const small = window.innerWidth < 860 ? "inset(24% 12% 24% 12% round 400px)" : "inset(18% 33% 18% 33% round 600px)";
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".camp__stage", start: "top top", end: "+=130%", pin: true, scrub: 0.6 },
      });
      tl.fromTo(".camp__window", { clipPath: small }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(".camp__window img", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
        .fromTo(".camp__line", { xPercent: (i) => [-30, 30, -20][i] }, { xPercent: 0, duration: 1 }, 0)
        .fromTo(".camp__title", { color: "#2b2825" }, { color: "#f6f2ea", duration: 0.35 }, 0.35)
        .to(".camp__shade", { opacity: 1, duration: 0.4 }, 0.4);

      // смена кадров «дня»
      gsap.utils.toArray(".day__step").forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && setStep(i) });
      });

      gsap.utils.toArray(".people__img").forEach((m, i) => {
        gsap.fromTo(m, { y: 80 + i * 80 }, { y: -40 - i * 60, ease: "none", scrollTrigger: { trigger: ".people", start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.fromTo(".people__quote .split-word", { opacity: 0.15 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: ".people__quote", start: "top 80%", end: "bottom 50%", scrub: true },
      });
      gsap.fromTo(".next__photo img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".next", start: "top bottom", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  // играет только видео активного шага
  useEffect(() => {
    root.current?.querySelectorAll(".day__media video").forEach((v, i) => {
      if (i === step) v.play().catch(() => {});
      else v.pause();
    });
  }, [step]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="camp is-egg" id="camp" ref={root}>
      <div className="camp__stage">
        <div className="camp__window">
          <img src={camp.hero} alt="" loading="lazy" />
          <div className="camp__shade" />
        </div>
        <span className="label camp__label">
          <b>07</b> / {camp.label}
        </span>
        <h2 className="camp__title display">
          {camp.title.map((l) => (
            <span className="camp__line" key={l}>
              {l}
            </span>
          ))}
        </h2>
      </div>

      <p className="camp__intro js-fade">{camp.intro}</p>

      <div className="day">
        <div className="day__media">
          {!mobile && camp.day.map((d, i) => (
            <video
              key={d.title}
              className={i === step ? "is-on" : ""}
              src={d.video}
              poster={d.poster}
              muted
              loop
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              autoPlay={i === 0}
            />
          ))}
          <span className="day__now small">
            {camp.day[step].time} — {camp.day[step].title}
          </span>
        </div>
        <ol className="day__steps">
          <li className="day__head">
            <span className="label">{camp.dayLabel}</span>
          </li>
          {camp.day.map((d, i) => (
            <li className={`day__step${i === step ? " is-on" : ""}`} key={d.title}>
              <span className="day__time display">{d.time}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
              {mobile && <video className="day__mobile" src={d.video} poster={d.poster} muted loop playsInline autoPlay preload="metadata" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="people">
        <figure className="people__img people__img--1">
          <img src={camp.people[0].image} alt={camp.people[0].caption} loading="lazy" />
          <figcaption className="small">{camp.people[0].caption}</figcaption>
        </figure>
        <blockquote className="people__quote">
          {camp.quote.split(" ").map((w, i) => (
            <span className="split-word" key={i}>
              {w}{" "}
            </span>
          ))}
        </blockquote>
        <figure className="people__img people__img--2">
          <img src={camp.people[1].image} alt={camp.people[1].caption} loading="lazy" />
          <figcaption className="small">{camp.people[1].caption}</figcaption>
        </figure>
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
          <ul className="next__facts small">
            {camp.next.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
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
          <a className="pill pill--stone" href="#booking">
            {camp.next.button} →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Camp;
