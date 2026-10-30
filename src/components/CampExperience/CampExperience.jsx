import "./CampExperience.css";

function CampExperience() {
  return (
    <section className="camp-experience">
      <div className="camp-experience__intro">
        <span>10 / THE EXPERIENCE</span>

        <p>
          A few days of movement, music, nature, food, conversation and
          dancing together.
        </p>
      </div>

      <div className="camp-experience__gallery">
        <div className="camp-experience__item camp-experience__item--one">
          PHOTO 15
          <small>MORNING MOVEMENT</small>
        </div>

        <div className="camp-experience__item camp-experience__item--two">
          PHOTO 16
          <small>CIRCLE / GRASS</small>
        </div>

        <div className="camp-experience__item camp-experience__item--three">
          PHOTO 17
          <small>CAMP EVENING</small>
        </div>
      </div>
    </section>
  );
}

export default CampExperience;