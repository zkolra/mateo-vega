import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { artist, booking, nav } from "../content";
import "../styles/booking.css";

/* Бронирование: строки выезжают, тему выбирают «чипсами»,
   кнопка притягивается к курсору. Внизу огромное VEGA — буквы
   подпрыгивают по очереди, когда мышь проходит над ними. */
function Booking() {
  const root = useRef(null);
  const btn = useRef(null);
  const [picked, setPicked] = useState([booking.options[0]]);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    if (!reducedMotion()) {
      mm.add("(min-width: 0px)", () => {
        gsap.from(".big__char", {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".book__big", start: "top 95%" },
        });
      });
    }
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = btn.current;
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const move = (e) => {
        const b = el.getBoundingClientRect();
        x((e.clientX - (b.left + b.width / 2)) * 0.3);
        y((e.clientY - (b.top + b.height / 2)) * 0.4);
      };
      const leave = () => (x(0), y(0));
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, []);

  const toggle = (o) => setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]));
  const jump = (e) => {
    if (reducedMotion()) return;
    gsap.fromTo(e.currentTarget, { yPercent: 0 }, { yPercent: -18, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1, overwrite: true });
  };
  const last = booking.title.length - 1;

  return (
    <footer className="book" id="booking" ref={root}>
      <div className="book__grid">
        <div>
          <span className="label">
            <b>08</b> / {booking.label}
          </span>
          <h2 className="book__title display js-lines">
            {booking.title.map((l, i) => (
              <span className="split-line" key={l}>
                <span className={i === last ? "is-hot" : ""}>{l}</span>
              </span>
            ))}
          </h2>
        </div>

        <form
          className="book__form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="book__chips">
            {booking.options.map((o) => (
              <button type="button" key={o} className={`chip${picked.includes(o) ? " is-on" : ""}`} onClick={() => toggle(o)} aria-pressed={picked.includes(o)}>
                {o}
              </button>
            ))}
          </div>
          <label className="field">
            <input type="text" required placeholder=" " />
            <span>{booking.fields.name}</span>
          </label>
          <label className="field">
            <input type="email" required placeholder=" " />
            <span>{booking.fields.email}</span>
          </label>
          <label className="field">
            <textarea rows="3" placeholder=" " />
            <span>{booking.fields.message}</span>
          </label>
          <div className="book__send">
            <button className="book__btn" ref={btn} type="submit">
              {sent ? "✓" : `${booking.button} →`}
            </button>
            {sent && <p className="book__sent">{booking.sent}</p>}
          </div>
        </form>
      </div>

      <div className="book__info">
        <a className="book__mail" href={`mailto:${artist.email}`}>
          {artist.email}
        </a>
        <nav className="small">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="book__socials small">
          {artist.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="book__big display" aria-hidden="true">
        {[...artist.logo].map((c, i) => (
          <span className="big__mask" key={i}>
            <span className="big__char" onPointerEnter={jump}>
              {c}
            </span>
          </span>
        ))}
      </div>

      <div className="book__legal small">
        <span>
          {artist.base} — {artist.reach}
        </span>
        <span>
          © {artist.year} {artist.first} {artist.last}
        </span>
      </div>
    </footer>
  );
}

export default Booking;
