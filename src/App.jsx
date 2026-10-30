import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ArtistIntro from "./components/ArtistIntro/ArtistIntro";
import Performances from "./components/Performances/Performances";
import Showreel from "./components/Showreel/Showreel";
import Festivals from "./components/Festivals/Festivals";
import StudioIntro from "./components/StudioIntro/StudioIntro";

import Schedule from "./components/Schedule/Schedule";

import CampIntro from "./components/CampIntro/CampIntro";
import CampExperience from "./components/CampExperience/CampExperience";
import NextCamp from "./components/NextCamp/NextCamp";
import Booking from "./components/Booking/Booking";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <ArtistIntro />
        <Performances />
        <Showreel />
        <Festivals />
        <StudioIntro />
        
        <Schedule />
        

        <CampIntro />
        <CampExperience />
        <NextCamp />

        <Booking />
      </main>

      <Footer />
    </>
  );
}

export default App;