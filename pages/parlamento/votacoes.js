import { useEffect, useState } from "react";
import { loadAllData } from "../../lib/data/parliament";
import Header from "../../components/Header";
import ParliamentGraph from "../../components/Parliament/ParliamentGraph";
import VoteCard from "../../components/Votes/VoteCard";
import VotesGrid from "../../components/Votes/VotesGrid";

export default function Votacoes() {
  // STATE FOR PARLIAMENT DATA
  const [data, setData] = useState(null);
  useEffect(() => {
    loadAllData((d) => setData(d));
  }, []);

  // STATE FOR OPENING VOTE SELECTOR
  const [selectOpen, setSelectOpen] = useState(false);

  // STATE FOR SELECTED VOTE
  const [selectedVoteId, setSelectedVoteId] = useState("1");

  if (!data) {
    return (
      <div className="page-wrapper">
        <Header />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <div className="content">
        <div className="votes__container">
          <VoteCard
            {...data.votesData.filter((d) => d.id === selectedVoteId)[0]}
          />
          <div
            className="votes__select-other"
            onClick={() => setSelectOpen(!selectOpen)}
          >
            <i className="material-icons">
              {selectOpen ? "expand_less" : "expand_more"}
            </i>
          </div>
          <div
            className="votes-grid-container"
            style={{ display: selectOpen ? "block" : "none" }}
          >
            <VotesGrid
              votesData={data.votesData}
              setSelectedVoteId={(id) => {
                setSelectedVoteId(id);
                setSelectOpen(false);
              }}
            />
          </div>
        </div>
        <div className="parliament__container">
          <ParliamentGraph
            MPs={data.MPs}
            partyInfo={data.partyInfo}
            selectedVote={
              data.votesData.filter((d) => d.id === selectedVoteId)[0]
            }
          />
        </div>
      </div>
    </div>
  );
}
