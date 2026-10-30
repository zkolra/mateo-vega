import "./StudioIntro.css";

function StudioIntro() {
  return (
    <section className="studio-intro" id="classes">
      <div className="studio-intro__top">
        <span className="studio-intro__label">
          05 / THE STUDIO
        </span>

        <p className="studio-intro__intro">
          Regular Salsa and Mambo classes focused on musicality,
          technique, movement and connection.
        </p>
      </div>

      <div className="studio-intro__heading">
        <h2>
          MOVE. LEARN.
          <br />
          CONNECT.
        </h2>

        <div className="studio-intro__location">
          <span>BASED IN</span>
          <strong>MADRID</strong>
        </div>
      </div>

      <div className="studio-intro__video-wrap">
        <video
          className="studio-intro__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/studio-class.mp4"
            type="video/mp4"
          />
        </video>

        <span className="studio-intro__video-caption">
          MATEO VEGA STUDIO / CLASS IN MOTION
        </span>
      </div>

      <div className="studio-intro__gallery">
        <figure className="studio-photo">
          <div className="studio-photo__media">
            <img
              src="/images/class-01.png"
              alt="Mateo teaching Salsa partnerwork"
            />
          </div>

          <figcaption>
            <span>01</span>
            <p>Partnerwork</p>
          </figcaption>
        </figure>

        <figure className="studio-photo">
          <div className="studio-photo__media">
            <img
              src="/images/class-02.png"
              alt="Mateo demonstrating Salsa movement to a class"
            />
          </div>

          <figcaption>
            <span>02</span>
            <p>Technique &amp; musicality</p>
          </figcaption>
        </figure>

        <figure className="studio-photo">
          <div className="studio-photo__media">
            <img
              src="/images/class-03.png"
              alt="Mateo talking with students at his dance studio"
            />
          </div>

          <figcaption>
            <span>03</span>
            <p>Community</p>
          </figcaption>
        </figure>
      </div>

      <div className="studio-intro__gallery-bottom">
        <p>
          Train, explore and share the floor with a community
          built around movement and music.
        </p>

        <a href="#classes">
          View more photos →
        </a>
      </div>
    </section>
  );
}

export default StudioIntro;