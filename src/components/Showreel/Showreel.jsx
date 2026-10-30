import "./Showreel.css";

function Showreel() {
  return (
    <section className="showreel" id="showreel">
      <div className="showreel__top">
        <div className="showreel__label">
          03 / SHOWREEL
        </div>

        <div className="showreel__meta">
          PERFORMANCE / SALSA / MAMBO
        </div>
      </div>

      <div className="showreel__heading">
        <h2 className="showreel__title">
          IN MOTION
        </h2>

        <p className="showreel__intro">
          Selected moments from live performances,
          solo work and partner choreography.
        </p>
      </div>

      <div className="showreel__video-wrap">
        <video
          className="showreel__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/showreel.mp4"
            type="video/mp4"
          />
        </video>

        <div className="showreel__video-label">
          MATEO VEGA / SHOWREEL
        </div>
      </div>

      <div className="showreel__bottom">
        <a href="#booking">
          Book Mateo →
        </a>
      </div>
    </section>
  );
}

export default Showreel;