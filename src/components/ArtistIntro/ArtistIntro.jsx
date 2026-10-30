import "./ArtistIntro.css";

function ArtistIntro() {
  return (
    <section className="artist-intro" id="artist">
      <div className="artist-intro__label">
        01 / THE ARTIST
      </div>

      <h2 className="artist-intro__title">
        <span>RHYTHM IS WHERE</span>
        <span>IT ALL STARTS</span>
      </h2>

      <div className="artist-intro__bottom">
        <div className="artist-intro__statement">
          <p>
            Mateo Vega is a Latin dancer, choreographer and teacher
            rooted in Salsa and Mambo.
          </p>

          <p>
            From international stages and festivals to regular classes
            and movement camps, his work connects performance,
            musicality and social dance.
          </p>
        </div>

        <div className="artist-intro__stats">
          <div className="artist-intro__stat">
            <span className="artist-intro__number">20+</span>
            <span className="artist-intro__stat-label">
              Years in movement
            </span>
          </div>

          <div className="artist-intro__stat">
            <span className="artist-intro__number">15+</span>
            <span className="artist-intro__stat-label">
              Years on stage
            </span>
          </div>

          <div className="artist-intro__stat">
            <span className="artist-intro__number">10+</span>
            <span className="artist-intro__stat-label">
              Years teaching
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistIntro;