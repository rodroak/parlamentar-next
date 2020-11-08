import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Concelhos from "../../../components/Maps/Concelhos";
import { getDataPR2016 } from "../../../lib/data/eleicoes";

export default function Presidenciais2016() {
  // STATE FOR ELECTION DATA
  const [data, setData] = useState(null);

  useEffect(() => {
    getDataPR2016((d) => setData(d));
  }, []);

  if (!data) {
    return (
      <div className="page-wrapper">
        <Header />
        <div className="content">Loading...</div>
      </div>
    );
  }

  const { candidates, results } = data;

  return (
    <div className="page-wrapper">
      <Header />
      <div className="content">
        <div>
          <Concelhos
            idFillColor={(id) => candidates[results[id].winnerId].color}
          />
        </div>
      </div>
    </div>
  );
}
