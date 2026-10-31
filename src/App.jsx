import { useCallback, useLayoutEffect, useState } from "react";
import { gsap, ScrollTrigger, reducedMotion, startSmoothScroll } from "./lib/motion";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Intro from "./components/Intro";
import Shows from "./components/Shows";
import Showreel from "./components/Showreel";
import Dates from "./components/Dates";
import Studio from "./components/Studio";
import Schedule from "./components/Schedule";
import Camp from "./components/Camp";
import Booking from "./components/Booking";

function App() {
  const [ready, setReady] = useState(false);
  const onReveal = useCallback(() => setReady(true), []);

  /* Плавная прокрутка + общие появления:
     .js-lines — строки заголовка выезжают снизу
     .js-fade  — элемент поднимается и проявляется */
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const lenis = startSmoothScroll();
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".js-lines").forEach((el) => {
        gsap.from(el.querySelectorAll(".split-line > span"), {
          yPercent: 105,
          rotate: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray(".js-fade").forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <Preloader onReveal={onReveal} />
      <Cursor />
      <Header />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Intro />
        <Shows />
        <Showreel />
        <Dates />
        <Studio />
        <Schedule />
        <Camp />
      </main>
      <Booking />
    </>
  );
}

export default App;
