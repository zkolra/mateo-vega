import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { artist, hero } from "../content";
import "../styles/hero.css";

/* Первый экран: на фоне шоурил, поверх — огромное имя.
   Буквы рядом с курсором подпрыгивают и наклоняются, как в танце.
   При прокрутке видео приближается, а буквы имени разъезжаются в стороны. */
function Hero({ ready }) {
  const root = useRef(null);

  // появление
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ready) {
        gsap.set(".hero__name .split-char", { yPercent: 110 });
        gsap.set(".hero__in", { opacity: 0, y: 20 });
        gsap.set(".hero__media", { scale: 1.3 });
        return;
      }
      gsap.timeline()
        .to(".hero__media", { scale: 1, duration: 2.2, ease: "expo.out" }, 0)
        .to(".hero__name .split-char", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: { each: 0.05, from: "center" } }, 0.15)
        .to(".hero__in", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.6);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // прокрутка и мышь
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero__media", { scale: 1.25, yPercent: 10, ease: "none", scrollTrigger: st });
      gsap.utils.toArray(".hero__row").forEach((row, r) => {
        const chars = row.querySelectorAll(".split-char");
        const mid = (chars.length - 1) / 2;
        chars.forEach((c, i) => gsap.to(c, { x: () => (i - mid) * window.innerWidth * 0.035 * (r ? -1 : 1), ease: "none", scrollTrigger: st }));
      });
      gsap.to(".hero__bottom", { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...st, end: "40% top" } });
    }, root);

    // буквы «танцуют» под курсором
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const chars = gsap.utils.toArray(root.current.querySelectorAll(".split-char > i"));
      const setters = chars.map((c) => ({
        el: c,
        y: gsap.quickTo(c, "yPercent", { duration: 0.6, ease: "power3" }),
        r: gsap.quickTo(c, "rotate", { duration: 0.6, ease: "power3" }),
        s: gsap.quickTo(c, "scaleY", { duration: 0.6, ease: "power3" }),
      }));
      const move = (e) => {
        setters.forEach((t) => {
          const b = t.el.getBoundingClientRect();
          const dx = e.clientX - (b.left + b.width / 2);
          const dy = e.clientY - (b.top + b.height / 2);
          const f = Math.max(0, 1 - Math.hypot(dx, dy * 0.6) / 420);
          t.y(-f * 14);
          t.r(f * (dx > 0 ? -6 : 6));
          t.s(1 + f * 0.12);
        });
      };
      const leave = () => setters.forEach((t) => (t.y(0), t.r(0), t.s(1)));
      root.current.addEventListener("pointermove", move);
      root.current.addEventListener("pointerleave", leave);
      return () => {
        root.current?.removeEventListener("pointermove", move);
        root.current?.removeEventListener("pointerleave", leave);
      };
    });
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const row = (word) =>
    [...word].map((c, i) => (
      <span className="split-char" key={i}>
        <i>{c}</i>
      </span>
    ));

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        <video className="hero__video" src={hero.video} poster={hero.poster} autoPlay muted loop playsInline preload="auto" />
      </div>
      <div className="hero__shade" />

      <div className="hero__top small hero__in">
        <span>{hero.meta[0]}</span>
        <span>{hero.meta[1]}</span>
      </div>

      <h1 className="hero__name display" aria-label={`${artist.first} ${artist.last}`}>
        <span className="hero__row">{row(artist.first)}</span>
        <span className="hero__row hero__row--hot">{row(artist.last)}</span>
      </h1>

      <div className="hero__bottom">
        <div className="hero__buttons hero__in">
          {hero.buttons.map((b, i) => (
            <a key={b.href} className={`pill${i ? " pill--hot" : ""}`} href={b.href}>
              {b.label}
            </a>
          ))}
        </div>
        <span className="hero__scroll small hero__in">
          Scroll <i>↓</i>
        </span>
      </div>
    </section>
  );
}

export default Hero;
