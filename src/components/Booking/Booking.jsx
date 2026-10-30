import "./Booking.css";

function Booking() {
  return (
    <section className="booking" id="booking">
      <div className="booking__media">
        VIDEO 06 / PHOTO 19
        <small>FINAL PERFORMANCE / MATEO</small>
      </div>

      <div className="booking__content">
        <span>11 / BOOKING</span>

        <h2>
          LET'S
          <br />
          MAKE
          <br />
          SOMETHING
          <br />
          MOVE.
        </h2>

        <div className="booking__options">
          <span>BOOK A SHOW</span>
          <span>INVITE TO TEACH</span>
          <span>COLLABORATE</span>
        </div>

        <form>
          <input type="text" placeholder="NAME" />
          <input type="email" placeholder="EMAIL" />
          <input type="text" placeholder="I'M INTERESTED IN..." />
          <textarea placeholder="MESSAGE" rows="4" />

          <button type="submit">SEND INQUIRY →</button>
        </form>
      </div>
    </section>
  );
}

export default Booking;