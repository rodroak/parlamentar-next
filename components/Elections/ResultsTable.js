import React from "react";
import { numberWithCommas } from "../../lib/utils/utils";

const ResultsTable = ({ candidates, results, name }) => {
  const res_cand = Object.keys(candidates)
    .map((k) => ({
      id: k,
      name: candidates[k].name,
      votes: results[k],
    }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="results-table__container">
      <p className="results-table__title">Resultados - {name}</p>
      <div className="results-table">
        <p className="results-table__header-name">Nome</p>
        <p className="results-table__header-total">Total</p>
        <p className="results-table__header-prct">%</p>
        {res_cand.map((d) => (
          <>
            <p className="results-table__item-name">{d.name}</p>
            <p className="results-table__item-total">
              {numberWithCommas(d.votes)}
            </p>
            <p className="results-table__item-prct">
              {((d.votes / results.validos) * 100).toFixed(1)}%
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default ResultsTable;
