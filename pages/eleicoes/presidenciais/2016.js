import { useEffect, useState } from "react";
import * as d3 from "d3";
import Header from "../../../components/Header";
import MapPT from "../../../components/Maps/MapPT";
import ResultsTable from "../../../components/Elections/ResultsTable";
import Tabs from "../../../components/Tabs";
import { getDataPR2016, getConcelhos } from "../../../lib/data/eleicoes";
import { getType } from "../../../lib/utils/utils";

export default function Presidenciais2016() {
  return (
    <div className="page-wrapper">
      <Header />
      <div className="content content-PR">
        <h1 className="page-title">Presidenciais 2016</h1>
        <Tabs tabs={["Resultados", "Candidatos", "Sondagens", "Constituição"]}>
          <ResultsTabContent />
          <div>Olá aqui são os candidatos</div>
          <div>Olá aqui são as sondagens</div>
          <div>Olá aqui é a constituição</div>
        </Tabs>
      </div>
    </div>
  );
}

const ResultsTabContent = () => {
  // STATE FOR ELECTION DATA
  const [data, setData] = useState(null);
  const [pt, setPt] = useState(null);

  useEffect(() => {
    getDataPR2016((d) => setData(d));
    getConcelhos((pt) => setPt(pt));
  }, []);

  // STATE FOR SELECTED RESULT

  const [selected, setSelected] = useState({
    id: "500000",
    name: "Território Nacional",
  });

  // STATE FOR ABSTENTION MODE

  const [mode, setMode] = useState("normal");

  if (!data || !pt) {
    return <div className="content">Loading...</div>;
  }

  const distrito =
    getType(selected.id) === "pt"
      ? null
      : {
          ...pt.objects.distritos.geometries.filter(
            (d) => d.properties.id.slice(0, 2) === selected.id.slice(0, 2)
          )[0].properties,
        };

  const concelho =
    getType(selected.id) === "pt" || getType(selected.id) === "distrito"
      ? null
      : {
          ...pt.objects.concelhos.geometries.filter(
            (d) => d.properties.id.slice(0, 4) === selected.id.slice(0, 4)
          )[0].properties,
        };

  const { candidates, results } = data;

  return (
    <div className="PR__results-container">
      <div className="PR__results-table">
        <ResultsTable
          candidates={candidates}
          results={results[selected.id]}
          name={selected.name}
          mode={mode}
          toggleMode={() => {
            mode === "normal" ? setMode("abstention") : setMode("normal");
          }}
        />
      </div>
      <div className="PR__results-map">
        <MapPT
          pt={pt}
          idFillColor={(id) => {
            if (mode === "normal")
              return candidates[results[id].winnerId].color;
            else if (mode === "abstention")
              return results[id][results[id].winnerId] >
                results[id].inscritos - results[id].votantes
                ? candidates[results[id].winnerId].color
                : "#a7a7a7";
          }}
          idOnClick={setSelected}
          idSelected={selected.id}
        />
      </div>
      <div className="PR__results-location">
        {distrito && (
          <span onClick={() => setSelected(distrito)}>{distrito.name}</span>
        )}
        {concelho && (
          <span onClick={() => setSelected(concelho)}>
            <i className="material-icons">navigate_next</i>
            {concelho.name}
          </span>
        )}
        {getType(selected.id) === "freguesia" && (
          <span>
            <i className="material-icons">navigate_next</i>
            {selected.name}
          </span>
        )}
      </div>
      {getType(selected.id) !== "pt" && (
        <p
          className="PR__results-zoom-out"
          onClick={() =>
            setSelected({
              id: "500000",
              name: "Território Nacional",
            })
          }
        >
          <i className="material-icons">zoom_out_map</i>
        </p>
      )}
    </div>
  );
};
