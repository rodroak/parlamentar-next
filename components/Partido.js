import Link from "next/link";
import Header from "./Header";
import Range from "./Range";

const partyPosition = [
  {
    name: "Mário Soares",
    src: "/pessoas/MarioSoares.png",
    position: "Secretário-Geral",
  },
  {
    name: "António Macedo",
    src: "/pessoas/AntonioMacedo.png",
    position: "Presidente",
  },
  {
    name: "Francisco Salgado Zenha",
    src: "/pessoas/FranciscoSalgadoZenha.png",
    position: "Presidente do Grupo Parlamentar",
  },
];

class Partido extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { otherParties } = this.props;
    const { party, nameFull, color, partyData } = this.props.party;

    return (
      <div className="page-wrapper">
        <Header />
        <div className="content content-party">
          <img
            className="party__logo"
            src={`/partidos/${party}.png`}
            alt={`logo ${party}`}
          />
          <Link href="#">
            <a className="btn btn-floating-action party__btn-small">
              <i className="material-icons">fast_forward</i>
            </a>
          </Link>
          <Link href="#">
            <a className="btn party__btn-large">
              <i className="material-icons">fast_forward</i>
              Ver programa 2019
            </a>
          </Link>
          <h1 className="party__name">{nameFull}</h1>
          <ul className="party__data">
            {partyData.map((item) => {
              const gradientPercent = (item.value / item.total) * 100;
              return (
                <li className="party__data-item" key={item.title}>
                  <p className="party__data-item-title">{item.title}</p>
                  <div
                    className="party__data-item-bar"
                    style={{
                      background: `linear-gradient(90deg, ${color} 0%, ${color} ${gradientPercent}%, white ${gradientPercent}%, white 100%)`,
                    }}
                  >
                    <p className="party__data-item-value">
                      {item.value} / {item.total}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="party__position">
            {partyPosition.map((position) => (
              <li className="party__position-item" key={position.position}>
                <img
                  src={position.src}
                  alt={position.name}
                  className="party__position-img"
                />
                <div className="party__position-details">
                  <p className="party__position-name">{position.name}</p>
                  <p className="party__position-title">{position.position}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="party__range-container">
            <Range value="1986" min="1976" max="2020" color={color} />
          </div>
          <div className="party__other-logos">
            {otherParties.map((party) => (
              <Link key={party.party} href='/partidos/[id]' as={`/partidos/${party.party}`}>
                <img
                  className="party__other-logo hover-scale"
                  src={`/partidos/${party.party}.png`}
                  alt={`logo ${party.party}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Partido;
