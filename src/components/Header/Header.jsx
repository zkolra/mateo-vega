import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="#top">
        VEGA
      </a>

      <nav className="header__nav">
        <a href="#performances">Shows</a>
        <a href="#festivals">Festivals</a>
        <a href="#classes">Classes</a>
        <a href="#camp">Camp</a>
      </nav>

      <a className="header__booking" href="#booking">
        Book Mateo
      </a>
    </header>
  );
}

export default Header;