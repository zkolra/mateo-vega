import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { Lines } from "../lib/Split";
import { shows } from "../content";
import "../styles/shows.css";

/* Шоу: блок закрепляется, карточки едут вбок. Чем быстрее листаешь —
   тем сильнее карточки наклоняются, как в движении танца.
   На телефоне — обычный вертикальный список. */
function Shows() {
  const root = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 861px)", () => {
      const cards = gsap.utils.toArray(".show");
      const skew = gsap.quickTo(cards, "skewX", { duration: 0.5, ease: "power3" });
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => skew(gsap.utils.clamp(-10, 10, self.getVelocity() / -200)),
          onScrubComplete: () => skew(0),
        },
      });
      cards.forEach((card) => {
        gsap.fromTo(card.querySelector("img"), { xPercent: -10, scale: 1.25 }, {
          xPercent: 10,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
        });
        gsap.from(card.querySelector(".show__num"), {
          yPercent: 100,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 95%", end: "left 55%", scrub: true },
        });
      });
    });
    mm.add("(max-width: 860px)", () => {
      gsap.utils.toArray(".show").forEach((card) => {
        gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="shows" id="shows" ref={root}>
      <div className="shows__track" ref={track}>
        <div className="shows__head">
          <span className="label">
            <b>02</b> / {shows.label}
          </span>
          <h2 className="shows__title display">
            <Lines text={shows.title.join("\n")} />
          </h2>
          <p>{shows.text}</p>
          <span className="small shows__hint">Keep scrolling →</span>
        </div>

        {shows.items.map((s, i) => (
          <article className="show" key={s.title} data-cursor="Show">
            <figure className="show__media">
              <img src={s.image} alt={s.title} loading="lazy" />
              <span className="show__num display">0{i + 1}</span>
            </figure>
            <h3 className="display">{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Shows;
