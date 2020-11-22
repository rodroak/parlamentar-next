import React from "react";
import { numberWithCommas } from "../../lib/utils/utils";

const ResultsTable = ({ candidates, results, name, mode, toggleMode }) => {
  const res_cand = Object.keys(candidates)
    .map((k) => ({
      id: k,
      name: candidates[k].name,
      votes: results[k],
      color: candidates[k].color,
    }))
    .sort((a, b) => b.votes - a.votes);

  const res_others = [
    {
      id: "A",
      name: "Abstenção",
      votes: results.inscritos - results.votantes,
    },
    {
      id: "BN",
      name: "Brancos ou Nulos",
      votes: results.nulos + results.brancos,
    },
  ].sort((a, b) => b.votes - a.votes);

  return (
    <div className="results-table__container">
      <div className="results-table">
        {mode === "normal" &&
          res_cand.map((d, i) => (
            <React.Fragment key={i}>
              <img
                src={img_url}
                className="results-table__item-img"
                style={{ borderColor: d.color }}
              />
              <p className="results-table__item-name">{d.name}</p>
              <p className="results-table__item-total">
                {numberWithCommas(d.votes)}
              </p>
              <p className="results-table__item-prct">
                {((d.votes / results.validos) * 100).toFixed(1)}%
              </p>
            </React.Fragment>
          ))}
        {mode === "normal" && <div className="results-table__item-gap"></div>}
        {mode === "normal" &&
          res_others
            .filter((d) => d.name === "Abstenção")
            .map((d, i) => (
              <React.Fragment key={i}>
                <div className="results-table__item-others">{d.id}</div>
                <p className="results-table__item-name">{d.name}</p>
                <p className="results-table__item-total">
                  {numberWithCommas(d.votes)}
                </p>
                <p className="results-table__item-prct">
                  {((d.votes / results.inscritos) * 100).toFixed(1)}%
                </p>
              </React.Fragment>
            ))}
        {mode === "abstention" &&
          [...res_cand, ...res_others]
            .filter((d) => d.name !== "Válidos")
            .sort((a, b) => b.votes - a.votes)
            .map((d, i) => (
              <React.Fragment key={i}>
                {d.color ? (
                  <img
                    src={img_url}
                    className="results-table__item-img"
                    style={{ borderColor: d.color }}
                  />
                ) : (
                  <div className="results-table__item-others">
                    {d.id}
                  </div>
                )}
                <p className="results-table__item-name">{d.name}</p>
                <p className="results-table__item-total">
                  {numberWithCommas(d.votes)}
                </p>
                <p className="results-table__item-prct">
                  {((d.votes / results.inscritos) * 100).toFixed(1)}%
                </p>
              </React.Fragment>
            ))}
        <label className="results-table__checkbox">
          Incluir abstenção
          <input
            type="checkbox"
            checked={mode === "abstention"}
            onChange={toggleMode}
          />
          <span></span>
        </label>
      </div>
    </div>
  );
};

const img_url =
  "https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/jmt.jfif?alt=media&token=8270242d-bb07-41da-a116-4265639fb98b";

export default ResultsTable;
