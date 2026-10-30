import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <strong>VEGA</strong>

        <nav>
          <a href="#performances">Shows</a>
          <a href="#showreel">Showreel</a>
          <a href="#festivals">Festival Dates</a>
          <a href="#classes">Regular Classes</a>
          <a href="#schedule">Weekly Schedule</a>
          <a href="#camp">Movement Camp</a>
          <a href="#booking">Booking</a>
        </nav>

        <div>
          <p>Madrid, Spain</p>
          <p>Available worldwide</p>
        </div>
      </div>

      <div className="footer__word">VEGA</div>
    </footer>
  );
}

export default Footer;