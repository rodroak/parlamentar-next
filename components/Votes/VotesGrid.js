import React, { useState } from "react";
import VoteCard from "./VoteCard";

const VotesGrid = ({
  votesData,
  partyInfo,
  selectedVote,
  onClickVote,
  onClickSelectedVote,
  uniqueDates,
}) => {
  const [currentDate, setCurrentDate] = useState(0);

  const goToNextDate = () => {
    if (currentDate < uniqueDates.length - 1) {
      setCurrentDate(currentDate + 1);
    }
  };

  const goToPrevDate = () => {
    if (currentDate > 0) {
      setCurrentDate(currentDate - 1);
    }
  };

  return (
    <div className="votes-grid">
      <div className="votes-grid__date">
        <div
          className={`votes-grid__date-prev ${
            currentDate === 0 && "votes-grid__date-disabled"
          }`}
          onClick={goToPrevDate}
        ></div>
        <p>
          <i className="material-icons">today</i>
          {uniqueDates[currentDate]}
        </p>
        <div
          className={`votes-grid__date-next ${
            currentDate === uniqueDates.length - 1 &&
            "votes-grid__date-disabled"
          }`}
          onClick={goToNextDate}
        ></div>
      </div>
      <div className="votes-grid__list">
        {votesData
          .filter((d) => d.date === uniqueDates[currentDate])
          .map((d) => {
            const isSelectedVote = selectedVote && d.id === selectedVote.id;
            return (
              <VoteCard
                voteData={d}
                selected={isSelectedVote}
                selectedColor={
                  partyInfo.filter((p) => p.party === d.party)[0].info.fillColor
                }
                onClick={() => {
                  if (isSelectedVote) {
                    onClickSelectedVote();
                  } else {
                    onClickVote(d.id);
                  }
                }}
                key={d.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default VotesGrid;
