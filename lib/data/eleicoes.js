import * as d3 from "d3";

const getJsonIdFromArray = (array) => {
  const output = {};
  for (const elem of array) {
    const id = elem.id;
    delete elem.id;
    output[id] = elem;
  }
  return output;
};

const cleanResults = (results) => {
  Object.keys(results).forEach((k) => {
    results[k] =
      k === "id" ? results[k] : parseInt(results[k].replace(",", ""));
  });
  return {
    ...results,
    winnerId: getWinnerByConcelho(results),
  };
};

const getWinnerByConcelho = (results) => {
  const resultsArray = [];
  Object.keys(results)
    .filter((k) => !isNaN(k))
    .forEach((k) =>
      resultsArray.push({
        id: k,
        count: results[k],
      })
    );
  const winner = resultsArray.reduce(
    (prev, current) => (current.count > prev.count ? current : prev),
    resultsArray[0]
  );
  return winner.id;
};

export const getDataPR2016 = async (callback = _.noop) => {
  const resultsCSV = await d3.csv("/eleicoes/PR_2016.csv", cleanResults);
  const candidatesCSV = await d3.csv("/eleicoes/PR_2016_Candidates.csv");
  callback({
    results: getJsonIdFromArray(resultsCSV),
    candidates: getJsonIdFromArray(candidatesCSV),
  });
};

export const getConcelhos = async (callback = _.noop) => {
  const concelhos = await d3.json("/maps/concelhos.json");
  callback(concelhos);
};
