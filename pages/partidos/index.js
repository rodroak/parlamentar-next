import Link from "next/link";
import { parties } from '../../lib/partidos';
import Header from '../../components/Header';

const PartidosHomePage = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="content content-party-index">
          {parties.map((p) => (
            <Link key={p.party} href='/partidos/[id]' as={`/partidos/${p.party}`}>
              <img
                className="party-index__logo"
                src={`/partidos/${p.party}.png`}
                alt={`logo ${p.party}`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PartidosHomePage;
