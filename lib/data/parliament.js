import * as d3 from "d3";
import _ from "lodash";

const cleanMPs = (d) => {
  let cleanMPs = {
    cx: d["cx"],
    cy: d["cy"],
    r: d["r"],
    party: d["party"],
    partyIndex: d["partyIndex"],
    fillColor: mapColors(d["party"]),
    strokeColor: mapColors(d["party"]),
  };
  return cleanMPs;
};

const getPositionJSON = (d) => {
  let positionJSON = {};
  d.split(" ").forEach((partyPosition) => {
    let [party, votes] = partyPosition.split("-");
    positionJSON[party] = votes;
  });
  return positionJSON;
};

const cleanVotes = (d) => {
  let cleanVotes = {
    id: d["id"],
    party: d["party"],
    detail: d["detail"],
    date: d["date"],
    type: d["type"],
    passed: d["passed"] === "yes" ? true : false,
    for: getPositionJSON(d["for"]),
    against: getPositionJSON(d["against"]),
    abstention: getPositionJSON(d["abstention"]),
  };
  return cleanVotes;
};

const mapColors = (party) => {
  let partyColors = {
    PS: "#F734B6",
    PSD: "#FA8723",
    BE: "#F50505",
    PCP: "#8A0101",
    CDS: "#0F69D6",
    PAN: "#02A65F",
    PEV: "#02C90F",
    IL: "#11CFF5",
    CH: "#04004A",
    L: "#FAE902",
  };
  return partyColors[party];
};

const getPartyInfo = (MPs) => {
  let partyInfoJSON = _.reduce(
    MPs,
    function (result, d) {
      result[d.party] = {
        count: result[d.party] ? result[d.party]["count"] + 1 : 1,
        fillColor: d.fillColor,
        strokeColor: d.strokeColor,
      };
      return result;
    },
    {}
  );
  return Object.entries(partyInfoJSON)
    .map((d) => ({ party: d[0], info: d[1] }))
    .reverse()
    .sort((a, b) => b.info.count - a.info.count);
};

const getVoteDetailArray = (
  votesFor,
  votesAgainst,
  votesAbstention,
  partyInfo
) => {
  let voteDetailArray = [];
  let indexFor = 0;
  let indexAgainst = 0;
  let indexAbstention = 0;
  Object.entries(partyInfo).forEach((d) => {
    let forCount =
      d[1].party in votesFor
        ? votesFor[d[1].party] === "all"
          ? d[1].info.count
          : votesFor[d[1].party]
        : 0;
    let againstCount =
      d[1].party in votesAgainst
        ? votesAgainst[d[1].party] === "all"
          ? d[1].info.count
          : votesAgainst[d[1].party]
        : 0;
    let abstentionCount =
      d[1].party in votesAbstention
        ? votesAbstention[d[1].party] === "all"
          ? d[1].info.count
          : votesAbstention[d[1].party]
        : 0;
    let i = 0;
    for (var j = 0; j < forCount; j++) {
      voteDetailArray.push({
        party: d[1].party,
        fillColor: d[1].info.fillColor,
        position: "for",
        positionIndex: indexFor,
        partyIndex: i,
      });
      i = i + 1;
      indexFor = indexFor + 1;
    }
    for (var k = 0; k < againstCount; k++) {
      voteDetailArray.push({
        party: d[1].party,
        fillColor: d[1].info.fillColor,
        position: "against",
        positionIndex: indexAgainst,
        partyIndex: i,
      });
      i = i + 1;
      indexAgainst = indexAgainst + 1;
    }
    for (var l = 0; l < abstentionCount; l++) {
      voteDetailArray.push({
        party: d[1].party,
        fillColor: d[1].info.fillColor,
        position: "abstention",
        positionIndex: indexAbstention,
        partyIndex: i,
      });
      i = i + 1;
      indexAbstention = indexAbstention + 1;
    }
  });
  return voteDetailArray;
};

const getVotesData = (votes, partyInfo) => {
  return votes.map((d) => ({
    ...d,
    votesDetail: getVoteDetailArray(d.for, d.against, d.abstention, partyInfo),
  }));
};

const getUniqueDates = (votes) => {
  return [...new Set(votes.map((d) => d.date))];
};

export const loadAllData = (callback = _.noop) => {
  Promise.all([
    d3.csv("/parlamento/parliament.csv", cleanMPs),
    d3.csv("/parlamento/votes.csv", cleanVotes),
  ]).then(([MPs, votes]) => {
    const partyInfo = getPartyInfo(MPs);
    const votesData = getVotesData(votes, partyInfo);
    const uniqueDates = getUniqueDates(votes);
    callback({
      MPs: MPs,
      partyInfo: partyInfo,
      votesData: votesData,
      uniqueDates: uniqueDates,
    });
  });
};
