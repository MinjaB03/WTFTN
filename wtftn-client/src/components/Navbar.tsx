import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function closeMenu() {
        setIsOpen(false);
    }

    const isAdmin =
        !!sessionStorage.getItem("wtftn_admin_token");

    function handleLogout() {
        sessionStorage.removeItem("wtftn_admin_token");
        window.location.href = "/";
    }

    return (
        <header className="navbar">
            <div className="navbar-inner">
                <a href="#map" className="navbar-logo" onClick={closeMenu}>
                    <img
                        src="\EESTEC_logo.svg.png"
                        alt="EESTEC"
                        className="navbar-logo-image"
                    />
                </a>

                <button
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen((current) => !current)}
                    aria-label="Toggle navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`navbar-links ${isOpen ? "open" : ""}`}>
                    <a href="#map" onClick={closeMenu}>
                        Mapa
                    </a>

                    <a href="#about" onClick={closeMenu}>
                        O nama
                    </a>

                    <a href="#eestec" onClick={closeMenu}>
                        EESTEC
                    </a>

                    <a href="#contact" onClick={closeMenu}>
                        Kontakt
                    </a>

                    {isAdmin && (
                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Odloguj se
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;