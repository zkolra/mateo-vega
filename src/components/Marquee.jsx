import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "../lib/motion";
import { marquee } from "../content";
import "../styles/marquee.css";

/* Две наклонные ленты со словами едут навстречу друг другу.
   Чем быстрее листаешь — тем быстрее они едут и сильнее наклоняются. */
function Marquee() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const tracks = gsap.utils.toArray(root.current.querySelectorAll(".mq__track"));
    const tweens = tracks.map((t, i) =>
      gsap.fromTo(t, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 28, ease: "none", repeat: -1 })
    );
    const skew = gsap.quickTo(tracks, "skewX", { duration: 0.5, ease: "power3" });
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        const speed = 1 + Math.min(4, Math.abs(v) / 400);
        tweens.forEach((tw) => gsap.to(tw, { timeScale: speed * (v < 0 ? -1 : 1), duration: 0.3, overwrite: true }));
        skew(gsap.utils.clamp(-12, 12, v / -150));
      },
      onLeave: () => skew(0),
    });
    let idle;
    const calm = () => {
      clearTimeout(idle);
      idle = setTimeout(() => {
        tweens.forEach((tw) => gsap.to(tw, { timeScale: 1, duration: 0.8 }));
        skew(0);
      }, 150);
    };
    window.addEventListener("scroll", calm, { passive: true });
    return () => {
      tweens.forEach((t) => t.kill());
      st.kill();
      window.removeEventListener("scroll", calm);
    };
  }, []);

  const words = [...marquee, ...marquee];

  return (
    <div className="mq" ref={root} aria-hidden="true">
      {[0, 1].map((row) => (
        <div className={`mq__band${row ? " mq__band--light" : ""}`} key={row}>
          <div className="mq__track display">
            {[...words, ...words].map((w, i) => (
              <span key={i}>
                {w} <i>✦</i>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Marquee;
