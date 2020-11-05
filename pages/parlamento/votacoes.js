import { useEffect, useState } from "react";
import { loadAllData } from "../../lib/data/parliament";
import Header from "../../components/Header";
import ParliamentGraph from "../../components/Parliament/ParliamentGraph";
import VoteCard, { VoteCardDummy } from "../../components/Votes/VoteCard";
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
  const [selectedVote, setSelectedVote] = useState(null);

  const setSelectedVoteById = (id) => {
    setSelectedVote(data.votesData.filter((d) => d.id === id)[0]);
  };

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
      <div className="content content-votacoes">
        <div className="votes__container">
          <div className="votes__selected-container">
            {selectedVote ? (
              <VoteCard
                voteData={selectedVote}
                selected={true}
                selectedColor={
                  data.partyInfo.filter(
                    (p) => p.party === selectedVote.party
                  )[0].info.fillColor
                }
              />
            ) : (
              <VoteCardDummy />
            )}
            <div
              className="votes__select-other"
              onClick={() => setSelectOpen(!selectOpen)}
            >
              <i className="material-icons">
                {selectOpen ? "expand_less" : "expand_more"}
              </i>
            </div>
          </div>
          <div
            className={`votes__grid-container ${
              selectOpen && "votes__grid-open"
            }`}
          >
            <VotesGrid
              votesData={data.votesData}
              partyInfo={data.partyInfo}
              selectedVote={selectedVote}
              uniqueDates={data.uniqueDates}
              onClickVote={(id) => {
                setSelectedVoteById(id);
                setSelectOpen(false);
              }}
              onClickSelectedVote={() => {
                setSelectedVote(null);
                setSelectOpen(false);
              }}
            />
          </div>
        </div>
        <div className="parliament__container">
          <ParliamentGraph
            MPs={data.MPs}
            partyInfo={data.partyInfo}
            selectedVote={selectedVote}
          />
        </div>
      </div>
    </div>
  );
}
