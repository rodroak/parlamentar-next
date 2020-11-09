import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import MapPT from "../../../components/Maps/MapPT";
import ResultsTable from "../../../components/Elections/ResultsTable";
import { getDataPR2016 } from "../../../lib/data/eleicoes";

export default function Presidenciais2016() {
  // STATE FOR ELECTION DATA
  const [data, setData] = useState(null);

  useEffect(() => {
    getDataPR2016((d) => setData(d));
  }, []);

  // STATE FOR SELECTED RESULT

  const [selected, setSelected] = useState({
    id: "500000",
    name: "Território Nacional",
  });

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
      <div className="content content-PR">
        <div className="PR__map-container">
          <MapPT
            idFillColor={(id) => candidates[results[id].winnerId].color}
            idOnClick={setSelected}
            idSelected={selected.id}
          />
        </div>
        <div className="PR__results-container">
          <ResultsTable
            candidates={candidates}
            results={results[selected.id]}
            name={selected.name}
          />
        </div>
      </div>
    </div>
  );
}
