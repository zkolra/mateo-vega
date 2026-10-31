import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { Lines } from "../lib/Split";
import { intro } from "../content";
import "../styles/intro.css";

/* Артист: фото открывается «шторкой» и плывёт, цифры считаются от нуля. */
function Intro() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".intro__media", { clipPath: "inset(100% 0% 0% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".intro__media", start: "top 80%" },
      });
      gsap.fromTo(".intro__media img", { scale: 1.3, yPercent: -8 }, {
        scale: 1.05,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".intro__media", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray(".stat__num b").forEach((el) => {
        const c = { v: 0 };
        gsap.to(c, {
          v: +el.dataset.value,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(c.v)),
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="intro" id="artist" ref={root}>
      <span className="label">
        <b>01</b> / {intro.label}
      </span>
      <h2 className="intro__title display js-lines">
        <Lines text={intro.title.join("\n")} />
      </h2>

      <div className="intro__grid">
        <figure className="intro__media">
          <img src={intro.image} alt="" loading="lazy" />
        </figure>
        <div className="intro__copy">
          {intro.text.map((t, i) => (
            <p className="js-fade" key={i}>
              {t}
            </p>
          ))}
          <div className="intro__stats">
            {intro.stats.map((s) => (
              <div className="stat js-fade" key={s.label}>
                <span className="stat__num display">
                  <b data-value={s.value}>{s.value}</b>
                  <em>{s.suffix}</em>
                </span>
                <span className="small">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
