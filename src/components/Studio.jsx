import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { studio, artist } from "../content";
import "../styles/studio.css";

/* Студия (светлый блок): три слова выпрыгивают по очереди,
   видео класса раскрывается из узкой полосы,
   а три фото, сложенные стопкой, раскладываются веером при прокрутке. */
function Studio() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".studio__word", {
        yPercent: 120,
        rotate: (i) => (i % 2 ? 8 : -8),
        duration: 1.1,
        ease: "back.out(1.6)",
        stagger: 0.15,
        scrollTrigger: { trigger: ".studio__title", start: "top 85%" },
      });
      gsap.fromTo(".studio__video", { clipPath: "inset(0% 40% 0% 40% round 300px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        ease: "none",
        scrollTrigger: { trigger: ".studio__video", start: "top 90%", end: "top 25%", scrub: true },
      });
      const cards = gsap.utils.toArray(".studio__photo");
      gsap.fromTo(cards, { xPercent: (i) => (1 - i) * 100, rotate: (i) => (i - 1) * 6, y: 40 }, {
        xPercent: 0,
        rotate: (i) => (i - 1) * 2,
        y: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: ".studio__photos", start: "top 90%", end: "center 55%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="studio is-sand" id="classes" ref={root}>
      <div className="studio__head">
        <span className="label">
          <b>05</b> / {studio.label}
        </span>
        <p className="js-fade">{studio.text}</p>
      </div>

      <div className="studio__titlerow">
        <h2 className="studio__title display">
          {studio.title.map((w, i) => (
            <span className="studio__mask" key={w}>
              <span className={`studio__word${i === 2 ? " is-hot" : ""}`}>{w}</span>
            </span>
          ))}
        </h2>
        <div className="studio__based js-fade">
          <span className="small">Based in</span>
          <strong className="display">{artist.base}</strong>
        </div>
      </div>

      <div className="studio__video" data-cursor="Class">
        <video src={studio.video} poster={studio.poster} autoPlay muted loop playsInline preload="metadata" />
        <span className="small">Mateo Vega Studio / Class in motion</span>
      </div>

      <div className="studio__photos">
        {studio.photos.map((p, i) => (
          <figure className="studio__photo" key={p.caption}>
            <div className="studio__photo-img">
              <img src={p.image} alt={p.caption} loading="lazy" />
            </div>
            <figcaption>
              <span className="small">0{i + 1}</span>
              <span>{p.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Studio;
