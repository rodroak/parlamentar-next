import Link from "next/link";
import { detect } from "detect-browser";
import Header from "../components/Header";

const colorPS = "#f733b6";

const partyData = [
  { title: "Assembleia da República", value: 108, total: 230 },
  { title: "Parlamento Europeu", value: 9, total: 21 },
  { title: "Assembleia dos Açores", value: 30, total: 57 },
  { title: "Assembleia da Madeira", value: 19, total: 47 },
  { title: "Câmaras Municipais", value: 160, total: 308 },
];

const partyPosition = [
  {
    name: "Mário Soares",
    src: "pessoas/MarioSoares.png",
    position: "Secretário-Geral",
  },
  {
    name: "António Macedo",
    src: "pessoas/AntonioMacedo.png",
    position: "Presidente",
  },
  {
    name: "Francisco Salgado Zenha",
    src: "pessoas/FranciscoSalgadoZenha.png",
    position: "Presidente do Grupo Parlamentar",
  },
];

class PartidosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "1986",
      isChrome: false,
    };
  }

  componentDidMount() {
    const browser = detect();
    this.setState({
      isChrome: browser.name === "chrome",
    });
  }

  handleChange = (event) => {
    this.setState({ year: event.target.value });
  };

  render() {
    const newValue = Number(((this.state.year - 1976) * 100) / (2020 - 1976));
    const newPosition = 11 - newValue * 0.26;
    const { isChrome } = this.state;
    return (
      <div className="page-wrapper">
        <Header />
        <div className="content content-party">
          <img className="party__logo" src="/partidos/PS.png" alt="logo PS" />
          <Link href="#">
            <a className="btn party__btn">&#43;</a>
          </Link>
          <h1 className="party__name">Partido Socialista</h1>
          <ul className="party__data">
            {partyData.map((item) => {
              const gradientPercent = (item.value / item.total) * 100;
              return (
                <li className="party__data-item" key={item.title}>
                  <p className="party__data-item-title">{item.title}</p>
                  <div
                    className="party__data-item-bar"
                    style={{
                      background: `linear-gradient(90deg, ${colorPS} 0%, ${colorPS} ${gradientPercent}%, white ${gradientPercent}%, white 100%)`,
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
            <p className="party__range-min">1976</p>
            <div className="party__range-wrapper">
              <input
                className="party__range"
                min="1976"
                max="2020"
                type="range"
                value={this.state.year}
                onChange={this.handleChange}
                style={{ background: isChrome ? `linear-gradient(90deg, ${colorPS} 0%, ${colorPS} ${newValue}%, #a7a7a7 ${newValue}%, #a7a7a7 100%)` : "transparent" }}
              />
              <p
                className="party__range-value"
                style={{
                  left: `calc(${newValue}% + (${newPosition}px))`,
                }}
              >
                {this.state.year}
              </p>
            </div>
            <p className="party__range-max">2020</p>
          </div>
          <div className="party__other-logos">
            <img
              className="party__other-logo hover-scale"
              src="/partidos/PSD.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/BE.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/PCP.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/CDS.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/PAN.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/PEV.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/CH.png"
              alt="logo PS"
            />
            <img
              className="party__other-logo hover-scale"
              src="/partidos/IL.png"
              alt="logo PS"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PartidosPage;
