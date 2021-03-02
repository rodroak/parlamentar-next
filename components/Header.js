import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleOpenState = () => {
    setOpen((prev) => !prev);
  };

  const router = useRouter();
  const selected = router.asPath.split("/")[1];

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
          <img
            className="nav__logo nav__logo__drawer hover-scale"
            src="/logo.png"
            alt="logo"
          />
        </Link>
        <ul className="nav__ul">
          <li className="nav__li">
            <Link href="/election_results">
              <a
                className={`nav__link hover-scale ${
                  selected === "election_results" ? "nav__link-selected" : ""
                }`}
              >
                Election Results
              </a>
            </Link>
          </li>
          <li className="nav__li">
            <Link href="/parliament_votes">
              <a
                className={`nav__link hover-scale ${
                  selected === "parliament_votes" ? "nav__link-selected" : ""
                }`}
              >
                Parliament Votes
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
