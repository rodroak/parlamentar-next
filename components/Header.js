import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleOpenState = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <Link href="/">
        <img className="nav__logo hover-scale" src="/logo.png" alt="logo" />
      </Link>
      <button
        aria-label="open navigation"
        className="nav__open hover-scale"
        onClick={toggleOpenState}
      >
        &#9776;
      </button>
      <nav className={`nav ${open ? "nav-open" : "nav-closed"}`}>
        <button
          aria-label="close navigation"
          className="nav__close hover-scale"
          onClick={toggleOpenState}
        >
          &times;
        </button>
        <Link href="/">
          <img className="nav__logo nav__logo__drawer hover-scale" src="/logo.png" alt="logo" />
        </Link>
        <ul className="nav__ul">
          <li className="nav__li">
            <Link href="/parlamento">
              <a className="nav__link hover-scale">Parlamento</a>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/governo">
              <a className="nav__link hover-scale">Governo</a>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/orcamento">
              <a className="nav__link hover-scale">Orçamento</a>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/partidos">
              <a className="nav__link hover-scale">Partidos</a>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/eleicoes">
              <a className="nav__link hover-scale">Eleições</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
