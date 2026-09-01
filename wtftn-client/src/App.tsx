import { Route, Routes } from "react-router-dom";

import Map from "./components/Map";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";

import "./App.css";

function PublicSite() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-kicker">
              Istražuj Novi Sad sa EESTEC
            </h1>

            <p className="hero-description">
              Pronađi mesta, predloge i lokacije selektovane za nove studente. (promeni nešto ig)
              Discover places, recommendations and
              locations selected for visitors exploring
              Novi Sad.
            </p>
          </div>
        </section>

        <section
          id="map"
          className="section map-section"
        >
          <div className="section-heading">
            <p className="section-kicker">
              Istraži
            </p>

            <h2>
              Pronađi kul i korisna mesta na mapi
            </h2>
          </div>

          <Map />
        </section>

        <section
          id="about"
          className="section"
        >
          <div className="content-card">
            <p className="section-kicker">
              O nama
            </p>

            <h2>Šta je WTFTN?</h2>

            <p>
              lorem ipsum
            </p>
          </div>
        </section>

        <section
          id="eestec"
          className="section"
        >
          <div className="content-card">
            <p className="section-kicker">
              EESTEC
            </p>

            <h2>
              Made with EESTEC spirit
            </h2>

            <p>
              lorem ipsum
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="section"
        >
          <div className="content-card">
            <p className="section-kicker">
              Kontakt
            </p>

            <h2>Treba ti pomoć?</h2>

            <p>
              Have a question about a location or
              need help while visiting Novi Sad?
              Get in touch with the local EESTEC
              community.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          WTFTN · EESTEC LC Novi Sad
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<PublicSite />}
      />

      <Route
        path="/67bord"
        element={<AdminLogin />}
      />
    </Routes>
  );
}

export default App;