import { useEffect } from "react";
import Partido from "../../components/Partido";

export default function PartidoPage(props) {
  useEffect(() =>
    document.documentElement.style.setProperty("--clr-ps", props.party.color)
  );
  return <Partido {...props} />;
}

export async function getStaticPaths() {
  const paths = parties.map((party) => ({
    params: { id: party.party },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const party = parties.filter((party) => party.party === params.id)[0];
  const otherParties = parties.filter((party) => party.party !== params.id);
  return {
    props: {
      party,
      otherParties,
    },
  };
}

const parties = [
  {
    party: "PS",
    nameFull: "Partido Socialista",
    color: "#f733b6",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "PSD",
    nameFull: "Partido Social Democrata",
    color: "#FA8723",
    partyData: [
      { title: "Assembleia da República", value: 70, total: 230 },
      { title: "Parlamento Europeu", value: 5, total: 21 },
      { title: "Assembleia dos Açores", value: 20, total: 57 },
      { title: "Assembleia da Madeira", value: 14, total: 47 },
      { title: "Câmaras Municipais", value: 120, total: 308 },
    ],
  },
  {
    party: "BE",
    nameFull: "Bloco de Esquerda",
    color: "#F50404",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "PCP",
    nameFull: "Partido Comunista Português",
    color: "#8A0100",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "CDS",
    nameFull: "Centro Democrático e Social",
    color: "#3972E0",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "PAN",
    nameFull: "Pessoas Animais Natureza",
    color: "#01A65F",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "PEV",
    nameFull: "Partido Ecologista - Os Verdes",
    color: "#01C90F",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "CH",
    nameFull: "Chega",
    color: "#03004A",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
  {
    party: "IL",
    nameFull: "Iniciativa Liberal",
    color: "#11CFF5",
    partyData: [
      { title: "Assembleia da República", value: 108, total: 230 },
      { title: "Parlamento Europeu", value: 9, total: 21 },
      { title: "Assembleia dos Açores", value: 30, total: 57 },
      { title: "Assembleia da Madeira", value: 19, total: 47 },
      { title: "Câmaras Municipais", value: 160, total: 308 },
    ],
  },
];
