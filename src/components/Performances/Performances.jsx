import "./Performances.css";

function Performances() {
  return (
    <section className="performances" id="performances">
      <div className="performances__label">
        02 / PERFORMANCES
      </div>

      <div className="performances__heading">
        <h2 className="performances__title">
          <span>MADE FOR</span>
          <span>THE STAGE</span>
        </h2>

        <p className="performances__intro">
          Dynamic Latin performances created for festivals, events,
          theatres and special productions — from intimate solo pieces
          to full group shows.
        </p>
      </div>

      <div className="performances__shows">
        <article className="performance-card">
          <div className="performance-card__media">
            <img
              src="/images/performance-solo.png"
              alt="Solo Latin dance performance"
            />
          </div>

          <div className="performance-card__info">
            <span className="performance-card__number">01</span>
            <h3>Solo Shows</h3>
          </div>

          <p className="performance-card__text">
            High-energy solo performances built around musicality,
            precision and stage presence.
          </p>
        </article>

        <article className="performance-card">
          <div className="performance-card__media">
            <img
              src="/images/performance-couple.png"
              alt="Couple Latin dance performance"
            />
          </div>

          <div className="performance-card__info">
            <span className="performance-card__number">02</span>
            <h3>Couple Shows</h3>
          </div>

          <p className="performance-card__text">
            Partner performances combining connection, rhythm and
            expressive choreography.
          </p>
        </article>

        <article className="performance-card">
          <div className="performance-card__media">
            <img
              src="/images/performance-group.png"
              alt="Group Latin dance performance"
            />
          </div>

          <div className="performance-card__info">
            <span className="performance-card__number">03</span>
            <h3>Group Shows</h3>
          </div>

          <p className="performance-card__text">
            Larger productions designed for festivals, stages and
            special events.
          </p>
        </article>
      </div>

      <article className="choreography">
        <div className="choreography__media">
          <img
            src="/images/performance-choreography.png"
            alt="Latin dance choreography and rehearsal"
          />
        </div>

        <div className="choreography__content">
          <div className="choreography__heading">
            <span className="choreography__number">04</span>
            <h3>Choreography</h3>
          </div>

          <p>
            Original choreography for dancers, companies, festivals and
            special productions — developed around the performers,
            music and character of each project.
          </p>

          <a href="#booking" className="choreography__link">
            Discuss a project →
          </a>
        </div>
      </article>
    </section>
  );
}

export default Performances;