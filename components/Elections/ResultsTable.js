import React from "react";
import { numberWithCommas } from "../../lib/utils/utils";

const ResultsTable = ({ candidates, results, name }) => {
  const res_cand = Object.keys(candidates)
    .map((k) => ({
      id: k,
      name: candidates[k].name,
      votes: results[k],
      color: candidates[k].color,
    }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="results-table__container">
      <div className="results-table">
        {res_cand.map((d, i) => (
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
      </div>
    </div>
  );
};

const img_url =
  "https://firebasestorage.googleapis.com/v0/b/parlamentar-915f4.appspot.com/o/jmt.jfif?alt=media&token=8270242d-bb07-41da-a116-4265639fb98b";

export default ResultsTable;
