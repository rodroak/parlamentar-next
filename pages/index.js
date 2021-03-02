import Link from "next/link";

const HomePage = () => {
  return (
    <div className="welcome">
      <img className="welcome__logo" src="/logo.svg" alt="" />
      <p className="welcome__msg">Welcome to Parlamentar!</p>
      <ul className="welcome__ul">
        <li className="welcome__li">
          <Link href="/election_results">
            <a className="btn">#1</a>
          </Link>
        </li>
        <li>
          <Link href="/parliament_votes">
            <a className="btn">#2</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
