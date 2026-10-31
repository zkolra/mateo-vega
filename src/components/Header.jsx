import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/motion";
import { artist, nav } from "../content";
import "../styles/header.css";

/* Шапка: прячется при прокрутке вниз, возвращается вверх.
   Над светлыми блоками (.is-sand) текст тёмный. На телефоне — меню на весь экран. */
function Header() {
  const bar = useRef(null);
  const overlay = useRef(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > window.innerHeight * 0.6;
        gsap.to(bar.current, { yPercent: hide ? -130 : 0, duration: 0.5, ease: "power3.out", overwrite: true });
      },
    });
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = document.elementFromPoint(window.innerWidth / 2, 44);
      bar.current?.classList.toggle("is-dark", !!el?.closest?.(".is-sand"));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(check));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      st.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!overlay.current) return;
    const links = overlay.current.querySelectorAll(".mnav__link span");
    if (open) {
      gsap.timeline()
        .set(overlay.current, { visibility: "visible" })
        .fromTo(overlay.current, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.9, ease: "expo.inOut" })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 }, "-=0.4");
    } else {
      gsap.to(overlay.current, {
        clipPath: "circle(0% at 92% 4%)",
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => gsap.set(overlay.current, { visibility: "hidden" }),
      });
    }
  }, [open]);

  return (
    <>
      <header className={`header${open ? " is-open" : ""}`} ref={bar}>
        <a className="header__logo display" href="#top">
          {artist.logo}
        </a>
        <nav className="header__nav" aria-label="Main">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="pill pill--hot header__cta" href="#booking">
          Book {artist.first}
        </a>
        <button className="header__burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <i />
          <i />
        </button>
      </header>

      <div className="mnav" ref={overlay} onClick={(e) => e.target.closest("a") && setOpen(false)}>
        <nav>
          {[...nav, { label: "Booking", href: "#booking" }].map((n) => (
            <a key={n.href} href={n.href} className="mnav__link display">
              <span>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="mnav__bottom small">
          <a href={`mailto:${artist.email}`}>{artist.email}</a>
          <span>
            {artist.base} — {artist.reach}
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
