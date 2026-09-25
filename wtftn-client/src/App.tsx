import { Route, Routes } from "react-router-dom";

import Map from "./components/Map";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function PublicSite() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-kicker">
              Istražuj Novi Sad sa EESTEC-om
            </h1>

            <p className="hero-description">
              Otkrij mesta koja čine Novi Sad posebnim — od omiljenih EESTEC lokacija
              i studentskih mesta do skrivenih kutaka koje vredi posetiti.
            </p>
            <p><b>
              Istraži mapu, pronađi svoje novo omiljeno mesto i upoznaj Novi Sad iz EESTEC perspektive.</b>
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
              O projektu
            </p>

            <h2>Šta je WTFTN?</h2>

            <p>
              Upisao/la si faks i odjednom se našao/la u moru novih termina,
              zgrada i skraćenica? Potpuno je normalno da se pitaš gde si to zapravo došao/la i šta te čeka.
            </p>
            <p>
              <b>Welcome to FTN (WTFTN)</b> je EESTEC-ov događaj kreiran posebno za brucoše, sa ciljem da im olakša prve korake na fakultetu
              i pomogne da se snađu u novoj sredini.
            </p>
            <p>
              Kroz obilazak kampusa, druženje sa starijim kolegama i razgovor o svemu što studentski život
              na FTN-u nosi, WTFTN ti daje ono što ti nijedan klasičan vodič ne može, iskustvo iz prve ruke.
            </p>
            <p></p>
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
              <b>EESTEC – Electrical Engineering STudents’ European assoCiation</b> je neprofitno i nepolitičko udruženje koje povezuje studente
              elektrotehnike i računarstva širom Evrope.
            </p>
            <p>
              Kroz međunarodne seminare, razmene, stručne prakse, radionice i druge događaje, EESTEC studentima pruža priliku
              da steknu nova znanja, upoznaju ljude iz različitih zemalja i povežu se sa industrijom i savremenim trendovima u struci.
            </p>
            <h3 ><b>EESTEC LC Novi Sad</b></h3>
            <p>
              <b>EESTEC LC Novi Sad</b> osnovan je 2001. godine i okuplja studente Fakulteta tehničkih nauka i Prirodno-matematičkog fakulteta u Novom Sadu.
            </p>
            <p>
              Tokom više od dve decenije rada, naš lokalni komitet organizovao je brojne internacionalne i lokalne događaje, radionice, takmičenja i projekte,
              a posebno mesto zauzima <b>KONTEH – Sajam poslovnih mogućnosti i stručnih praksi</b>, koji već više od 25 godina povezuje studente i kompanije.
            </p>
            <p>
              Danas EESTEC LC Novi Sad okuplja veliki broj studenata koji zajedno stvaraju prilike za učenje, povezivanje, druženje i istraživanje novih iskustava –
              kako u Novom Sadu, tako i širom Evrope.
            </p>
            <p></p>
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

            <h2>Imaš pitanje?</h2>

            <p>
              Slobodno nam se javi — bilo da imaš pitanje, predlog za novu lokaciju na mapi ili samo želiš da nas upoznaš.
            </p>
            <h4>Pronađi nas na društvenim mrežama ili nam piši direktno.</h4>
            <div className="contact-links">
              <a
                href="https://www.instagram.com/eestec_lcnovisad/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/eestecNS"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </span>
                <span>Facebook</span>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=board@eestecns.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span>Email</span>
              </a>
              <a
                href="https://www.linkedin.com/company/eestec---lc-novi-sad/home/" 
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-icon">
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
                <span>LinkedIn</span>
              </a>
            </div>
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