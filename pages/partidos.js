import Header from "../components/Header";
import Link from "next/link";

const colorPS = "#f733b6";

const partyData = [
  { title: "Assembleia da República", value: 108, total: 230 },
  { title: "Parlamento Europeu", value: 9, total: 21 },
  { title: "Assembleia dos Açores", value: 30, total: 57 },
  { title: "Assembleia da Madeira", value: 19, total: 47 },
  { title: "Câmaras Municipais", value: 160, total: 308 },
];

const PartidosPage = () => {
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
          <li className="party__position-item">
            <img
              src="pessoas/MarioSoares.png"
              alt="Mario Soares"
              className="party__position-img"
            />
            <p className="party__position-name">Mario Soares</p>
            <p className="party__position-title">Secretário Geral</p>
          </li>
          <li className="party__position-item">
            <img
              src="pessoas/AntonioMacedo.png"
              alt="Antonio Macedo"
              className="party__position-img"
            />
            <p className="party__position-name">Antonio Macedo</p>
            <p className="party__position-title">Presidente</p>
          </li>
          <li className="party__position-item">
            <img
              src="pessoas/FranciscoSalgadoZenha.png"
              alt="Francisco Salgado Zenha"
              className="party__position-img"
            />
            <p className="party__position-name">Francisco Salgado Zenha</p>
            <p className="party__position-title">
              Presidente do Grupo Parlamentar
            </p>
          </li>
        </ul>
        <input className="party__range" type="range" />
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
};

export default PartidosPage;
