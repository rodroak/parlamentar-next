import React, { useState } from "react";
import VoteCard from "./VoteCard";

const VotesGrid = ({ votesData, setSelectedVoteId }) => {
  const [currentDate, setCurrentDate] = useState(votesData[0].date);

  return (
    <div className="votes-grid">
      <div className="votes-grid__date">
        <div className="votes-grid__date-prev"></div>
        <p>
          <i className="material-icons">today</i>
          {currentDate}
        </p>
        <div className="votes-grid__date-next"></div>
      </div>
      <div className="votes-grid__list">
        {votesData
          .filter((d) => d.date === currentDate)
          .map((d) => (
            <VoteCard
              {...d}
              onClick={() => setSelectedVoteId(d.id)}
              key={d.id}
            />
          ))}
      </div>
    </div>
  );
};

export default VotesGrid;
