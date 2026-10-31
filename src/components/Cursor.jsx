import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/motion";

/* Красная точка с кольцом, которое пульсирует в такт (100 ударов в минуту).
   Над ссылками и кнопками точка растёт. */
function Cursor() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = root.current;
      const x = gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" });
      const y = gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" });
      let last = { x: -100, y: -100 };
      const update = (t) => {
        el.classList.toggle("is-hot", !!t?.closest?.("a, button, input, textarea"));
      };
      const move = (e) => {
        last = { x: e.clientX, y: e.clientY };
        x(e.clientX);
        y(e.clientY);
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
        update(e.target);
      };
      const scroll = () => update(document.elementFromPoint(last.x, last.y));
      window.addEventListener("pointermove", move);
      window.addEventListener("scroll", scroll, { passive: true });
      return () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("scroll", scroll);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <span className="cursor__beat" />
      <span className="cursor__dot" />
    </div>
  );
}

export default Cursor;
