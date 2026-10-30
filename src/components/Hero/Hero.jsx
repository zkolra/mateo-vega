import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
  <img
    src="/images/artist-backstage.png"
    alt="Mateo Vega"
    className="hero__image"
  />
</div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__meta">
          <span>SALSA / MAMBO DANCER & CHOREOGRAPHER</span>
          <span>MADRID — WORLDWIDE</span>
        </div>

        <div className="hero__title-wrap">
  <h1 className="hero__title">
    <span>MATEO</span>
    <span>VEGA</span>
  </h1>
</div>

        <div className="hero__footer">
          <a href="#showreel">WATCH SHOWREEL</a>
          <a href="#booking">BOOK MATEO</a>
          <span className="hero__scroll">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;