import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { artist, preloader } from "../content";
import "../styles/preloader.css";

/* Заставка: счёт «5 · 6 · 7 · 8», как перед началом танца, —
   каждая цифра вспыхивает в такт, на «8» появляется имя и экран уезжает вверх. */
function Preloader({ onReveal }) {
  const root = useRef(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion()) {
      setGone(true);
      onReveal();
      return;
    }
    document.documentElement.classList.add("no-scroll");
    const ctx = gsap.context(() => {
      const beat = 0.42;
      const tl = gsap.timeline({ delay: 0.3 });
      gsap.utils.toArray(".pre__num").forEach((n, i) => {
        tl.fromTo(n, { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: beat * 0.5, ease: "power4.out" }, i * beat)
          .to(n, { opacity: 0, scale: 0.85, duration: beat * 0.4, ease: "power2.in" }, i * beat + beat * 0.6)
          .fromTo(".pre__flash", { opacity: 0.5 }, { opacity: 0, duration: beat * 0.8 }, i * beat);
      });
      tl.from(".pre__name .split-char", { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.04 }, preloader.count.length * beat)
        .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut", onStart: onReveal }, "+=0.35")
        .add(() => {
          document.documentElement.classList.remove("no-scroll");
          setGone(true);
        });
    }, root);
    return () => {
      ctx.revert();
      document.documentElement.classList.remove("no-scroll");
    };
  }, [onReveal]);

  if (gone) return null;

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__flash" />
      <div className="pre__count display">
        {preloader.count.map((n) => (
          <span className="pre__num" key={n}>
            {n}
          </span>
        ))}
      </div>
      <div className="pre__name display">
        {[...artist.logo].map((c, i) => (
          <span className="split-char" key={i}>
            {c}
          </span>
        ))}
      </div>
      <span className="pre__meta small">{artist.role}</span>
    </div>
  );
}

export default Preloader;
