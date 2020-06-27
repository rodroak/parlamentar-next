import { useEffect } from "react";
import Partido from "../../components/Partido";
import { parties } from '../../lib/partidos';

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
  return {
    props: {
      party,
      parties,
    },
  };
}