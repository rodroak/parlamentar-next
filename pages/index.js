import Link from "next/link";

const HomePage = () => {
  return (
    <div className="welcome">
      <img className="welcome__logo" src="/logo.svg" alt="" />
      <p className="welcome__msg">Welcome to Parlamentar!</p>
      <ul className="welcome__ul">
        <li className="welcome__li">
          <Link href="/partidos/[id]" as="/partidos/PS">
            <a className="btn">Let's go</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="btn">About us</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
