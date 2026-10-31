import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { showreel } from "../content";
import "../styles/showreel.css";

/* Шоурил: блок закрепляется, видео из маленькой карточки в центре
   раскрывается на весь экран, огромные слова «IN MOTION» разъезжаются. */
function Showreel() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 0.6 },
      });
      const small = window.innerWidth < 760 ? "inset(32% 14% 32% 14% round 12px)" : "inset(30% 34% 30% 34% round 14px)";
      tl.fromTo(".reel__frame", { clipPath: small }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(".reel__video", { scale: 1.4 }, { scale: 1, duration: 1 }, 0)
        .to(".reel__word--l", { xPercent: -60, duration: 1 }, 0)
        .to(".reel__word--r", { xPercent: 60, duration: 1 }, 0)
        .to(".reel__shade", { opacity: 1, duration: 0.4 }, 0.6)
        .fromTo(".reel__caption", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  const [w1, w2] = showreel.title.split(" ");

  return (
    <section className="reel" id="showreel" ref={root}>
      <div className="reel__words display" aria-hidden="true">
        <span className="reel__word reel__word--l">{w1}</span>
        <span className="reel__word reel__word--r">{w2}</span>
      </div>
      <div className="reel__frame" data-cursor="Showreel">
        <video className="reel__video" src={showreel.video} poster={showreel.poster} autoPlay muted loop playsInline preload="metadata" />
        <div className="reel__shade" />
      </div>
      <span className="label reel__label">
        <b>03</b> / {showreel.label}
      </span>
      <div className="reel__caption">
        <h2 className="display">{showreel.title}</h2>
        <p>{showreel.text}</p>
        <a className="pill pill--hot" href="#booking">
          Book Mateo →
        </a>
      </div>
    </section>
  );
}

export default Showreel;
