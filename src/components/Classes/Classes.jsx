import "./Classes.css";

function Classes() {
  return (
    <section className="classes">
      <div className="classes__intro">
        <span>REGULAR CLASSES / MADRID</span>
        <h2>TRAIN. LISTEN. MOVE.</h2>

        <p>
          Weekly classes built around rhythm, technique, musicality and
          connection.
        </p>
      </div>

      <div className="classes__gallery">
        <div className="classes__photo classes__photo--large">
          PHOTO 11
          <small>MAMBO / FULL CLASS</small>
        </div>

        <div className="classes__photo">
          PHOTO 12
          <small>PARTNERWORK</small>
        </div>

        <div className="classes__photo">
          PHOTO 13
          <small>TEACHING / FOOTWORK</small>
        </div>
      </div>

      <div className="classes__types">
        <span>MAMBO ON2</span>
        <span>SHINES & MUSICALITY</span>
        <span>PARTNERWORK</span>
        <span>BODY MOVEMENT</span>
      </div>
    </section>
  );
}

export default Classes;